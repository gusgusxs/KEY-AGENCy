import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ⚠️ เช็ค path ให้ตรงกับไฟล์ auth ของคุณ
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditProfileClient from "./EditProfileClient";

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !(session.user as any).id) {
    redirect("/login");
  }

  const userId = (session.user as any).id;

  // ดึงข้อมูลปัจจุบันจาก Database มาแสดงในช่องกรอก
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true, // ดึงมาโชว์เฉยๆ (ไม่ให้แก้)
      phone: true,
      lineId: true,
      whatsapp: true,
      bio: true,
    }
  });

  if (!user) {
    redirect("/login");
  }

  // ส่งข้อมูลที่ได้ไปให้ไฟล์ Client วาดหน้าจอ
  return <EditProfileClient user={user} />;
}