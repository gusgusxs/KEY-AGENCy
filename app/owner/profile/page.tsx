import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import OwnerProfileClient from "./OwnerProfileClient";

export const dynamic = 'force-dynamic';

export default async function OwnerProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !(session.user as any).id) {
    redirect("/login"); 
  }

  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true, // ✅ 2. เพิ่มบรรทัดนี้! เพื่อดึงสถานะการยืนยันอีเมลส่งไปให้หน้า Client
      image: true,
      phone: true,
      role: true,
      lineId: true,     
      whatsapp: true,   
      bio: true,        
      hideListings: true,
      phoneVerified: true,
      kycStatus: true,
    }
  });

  if (!user) {
    redirect("/login");
  }

  return <OwnerProfileClient user={user} />;
}