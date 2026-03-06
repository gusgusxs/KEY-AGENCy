import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers"; // ✅ นำเข้า Providers

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ ปรับแต่งชื่อเว็บและคำอธิบาย
export const metadata: Metadata = {
  title: "Key Platform | เชื่อมโยงนายหน้ากับเจ้าของทรัพย์",
  description: "แพลตฟอร์มจัดการอสังหาริมทรัพย์ที่โปร่งใสที่สุดสำหรับนายหน้าและเจ้าของ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}