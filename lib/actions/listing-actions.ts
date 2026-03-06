"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createListing(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session || !(session.user as any).id) {
    return { message: "กรุณาเข้าสู่ระบบก่อนทำรายการ" };
  }

  const userId = (session.user as any).id;
  const uploadedImages = formData.getAll("images") as string[];

  // ✅ 1. รับค่าจากปุ่มกด เพื่อเช็คว่าเป็น Draft หรือ ประกาศจริง
  const submitAction = formData.get("submitAction") as string;
  const targetStatus = submitAction === "DRAFT" ? "DRAFT" : "AVAILABLE";

  const data: any = {
    title: formData.get("title") as string,
    description: formData.get("description") as string || "",
    price: parseFloat(formData.get("price") as string) || 0,
    location: formData.get("location") as string,
    images: uploadedImages.filter(img => img.trim() !== ""),
    size: parseFloat(formData.get("area") as string) || 0,
    bedrooms: (formData.get("bedrooms") as string) || "0", 
    bathrooms: (formData.get("bathrooms") as string) || "0", 
    listingType: formData.get("listingType") as string,
    propertyType: formData.get("propertyType") as string,
    status: targetStatus, // ✅ 2. ยัดสถานะลงไปตรงนี้แทนการฟิกซ์ค่าตายตัว
    
    owner: {
      connect: { id: userId }
    }
  };

  // ตรวจสอบข้อมูลเสริม (ถ้ามีส่งมาจากฟอร์ม)
  const distance = formData.get("distanceToBts");
  if (distance) data.distanceToBts = distance as string;

  const furniture = formData.get("furniture");
  if (furniture) data.furniture = furniture as string;

  try {
    console.log(`กำลังบันทึกข้อมูล (สถานะ: ${targetStatus}):`, data);
    await prisma.listing.create({ data });
    
    // ล้าง Cache หน้าเดิมเพื่อให้ข้อมูลใหม่โชว์ทันที
    revalidatePath("/owner/dashboard");
    revalidatePath("/");
  } catch (e) {
    console.error("DATABASE ERROR DETAILS:", e);
    return { message: "บันทึกไม่สำเร็จ: ตรวจสอบข้อมูลใน Terminal" };
  }

  // ถ้าสำเร็จให้ย้ายหน้า
  redirect("/owner/dashboard");
}

export async function updateListing(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any).id) {
    return { message: "Unauthorized: กรุณาเข้าสู่ระบบก่อนทำรายการ" };
  }

  const userId = (session.user as any).id;
  const listingId = formData.get("id") as string;
  
  if (!listingId) {
    return { message: "ไม่พบรายการประกาศที่ต้องการแก้ไข" };
  }

  const existingListing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { ownerId: true },
  });

  if (!existingListing || existingListing.ownerId !== userId) {
    return { message: "คุณไม่มีสิทธิ์แก้ไขประกาศนี้" };
  }

  // รวมรูปภาพเก่าที่เหลืออยู่กับรูปภาพใหม่
  const existingImages = formData.getAll("existingImages") as string[];
  const newImages = formData.getAll("images") as string[];
  const allImages = [
    ...existingImages.filter((img) => img && img.trim() !== ""),
    ...newImages.filter((img) => img && img.trim() !== "")
  ];

  const data: any = {};
  
  // ✅ 3. เช็คค่าปุ่มกดในฝั่งอัปเดตด้วย (เพื่อรองรับการเปลี่ยนจาก Draft เป็น Available)
  const submitAction = formData.get("submitAction") as string;
  if (submitAction) {
    data.status = submitAction === "DRAFT" ? "DRAFT" : "AVAILABLE";
  }
  
  // Only add fields that are provided in the form
  const title = formData.get("title") as string;
  if (title) data.title = title;
  
  const description = formData.get("description") as string;
  if (description) data.description = description;
  
  const price = formData.get("price") as string;
  if (price) data.price = parseFloat(price);
  
  const bedrooms = formData.get("bedrooms") as string;
  if (bedrooms) data.bedrooms = bedrooms;
  
  const bathrooms = formData.get("bathrooms") as string;
  if (bathrooms) data.bathrooms = bathrooms;
  
  const size = formData.get("size") as string;
  if (size) data.size = parseFloat(size);
  
  const listingType = formData.get("listingType") as string;
  if (listingType) data.listingType = listingType;
  
  const propertyType = formData.get("propertyType") as string;
  if (propertyType) data.propertyType = propertyType;
  
  const location = formData.get("location") as string;
  if (location) data.location = location;
  
  // อัปเดตรูปภาพ (รวมรูปเก่าและรูปใหม่)
  if (allImages.length > 0) {
    data.images = allImages;
  }

  try {
    await prisma.listing.update({
      where: { id: listingId },
      data,
    });

    revalidatePath("/owner/dashboard");
    revalidatePath(`/property/${listingId}`);
    revalidatePath("/");
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "ไม่สามารถบันทึกการแก้ไขได้ กรุณาลองใหม่อีกครั้ง" };
  }

  redirect("/owner/dashboard");
}