import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
