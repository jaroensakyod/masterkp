import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "KP Exam — เตรียมสอบ ก.พ. ภาค ก",
  description:
    "ระบบเตรียมสอบ ก.พ. ครบวงจร ฝึกทำข้อสอบ วิเคราะห์จุดแข็งจุดอ่อน พร้อม AI ช่วยสอน",
  keywords: "สอบ กพ, ก.พ., ข้าราชการ, แนวข้อสอบ, ติวสอบ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-slate-50 text-slate-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
