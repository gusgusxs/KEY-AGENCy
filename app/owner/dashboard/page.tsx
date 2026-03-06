import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma"; 
import { redirect } from "next/navigation";
import OwnerDashboardClient from "./OwnerDashboardClient";

export default async function OwnerDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !(session.user as any).id) {
    redirect("/login");
  }

  const sessionUserId = (session.user as any).id;

  let dbUser = await prisma.user.findUnique({
    where: { id: sessionUserId },
    select: {
      id: true,
      name: true,
      image: true,
      role: true,
    }
  });

  if (!dbUser) redirect("/login");

  if (dbUser.role !== "OWNER") {
    dbUser = await prisma.user.update({
      where: { id: dbUser.id },
      data: { role: "OWNER" },
      select: { id: true, name: true, image: true, role: true }
    });
  }

  console.log("Current User ID:", dbUser.id);

  // 4. ดึงข้อมูลประกาศของเจ้าของคนนี้
  const myListings = await prisma.listing.findMany({
    where: { ownerId: dbUser.id },
    orderBy: { createdAt: 'desc' }
  });
  
  console.log("Listings found:", myListings.length); // ✅ จะขึ้นที่ Terminal
  console.log("First listing ownerId:", myListings[0]?.ownerId); // ✅ ดูว่า ID ตรงกันไหม

  // 5. ส่งให้หน้า UI
  return (
    <OwnerDashboardClient 
      user={dbUser} 
      listings={myListings} 
    />
  );
}