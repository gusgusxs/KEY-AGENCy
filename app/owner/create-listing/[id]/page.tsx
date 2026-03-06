import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditListingClient from "@/app/owner/edit-listing/[id]/EditListingClient";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing || listing.ownerId !== (session.user as any).id) {
    redirect("/owner/dashboard"); 
  }

  return <EditListingClient listing={listing} />;
}