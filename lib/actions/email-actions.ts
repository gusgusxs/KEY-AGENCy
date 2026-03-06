"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function sendVerificationEmail(email: string) {
  try {
    // 1. สร้าง Token สุ่มที่เดาไม่ได้
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // หมดอายุใน 24 ชั่วโมง

    // 2. บันทึก Token ลง Database
    await prisma.verificationToken.create({
      data: { email, token, expiresAt },
    });

    // 3. สร้างลิงก์ยืนยัน
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationLink = `${appUrl}/api/verify-email?token=${token}`;

    // 4. ตั้งค่าระบบส่งอีเมลด้วย Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 5. ส่งอีเมล
    await transporter.sendMail({
      from: `"ระบบอสังหาฯ" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "ยืนยันที่อยู่อีเมลของคุณ",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #a51c24;">ยืนยันการลงทะเบียนอีเมล</h2>
          <p>สวัสดีครับ,</p>
          <p>กรุณากดปุ่มด้านล่างเพื่อยืนยันที่อยู่อีเมลของคุณสำหรับใช้งานระบบของเรา (ลิงก์นี้มีอายุ 24 ชั่วโมง)</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #a51c24; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              คลิกเพื่อยืนยันอีเมล
            </a>
          </div>
          <p style="font-size: 12px; color: #888;">หากปุ่มไม่ทำงาน สามารถคัดลอกลิงก์นี้ไปวางในเบราว์เซอร์ได้:<br/>${verificationLink}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email Send Error:", error);
    return { success: false, error: "ไม่สามารถส่งอีเมลได้ กรุณาลองใหม่อีกครั้ง" };
  }
}