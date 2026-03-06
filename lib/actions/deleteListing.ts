"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteListing(listingId: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !(session.user as any).id) {
      return { success: false, error: "กรุณาเข้าสู่ระบบก่อนทำรายการ" };
    }

    const userId = (session.user as any).id;

    // 1. เช็คความปลอดภัย: ประกาศนี้ต้องเป็นของคนที่กำลัง Login อยู่เท่านั้น
    const existingListing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { ownerId: true },
    });

    if (!existingListing || existingListing.ownerId !== userId) {
      return { success: false, error: "คุณไม่มีสิทธิ์ลบประกาศนี้" };
    }

    // 2. สั่งลบข้อมูลจาก Database
    await prisma.listing.delete({
      where: { id: listingId },
    });

    // 3. สั่งให้ Next.js เคลียร์ Cache เพื่อให้หน้าเว็บอัปเดตข้อมูลใหม่ทันที
    revalidatePath("/owner/dashboard");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Delete Listing Error:", error);
    return { success: false, error: "ไม่สามารถลบประกาศได้ กรุณาลองใหม่อีกครั้ง" };
  }
}