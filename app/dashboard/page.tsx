// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 1. ถ้าไม่ได้ Login ให้เด้งไปหน้า Login
  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;

  // 2. ส่งไปตามหน้าของแต่ละ Role
  if (user.role === "AGENT") {
    redirect("/agent/dashboard");
  } else if (user.role === "OWNER") {
    redirect("/owner/dashboard");
  } else {
    // ถ้าเป็น TENANT (ผู้เช่า) หรือยังไม่มี Role ให้กลับหน้าหลัก
    redirect("/");
  }
}