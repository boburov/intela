# MailService - NestJS Email Xizmat

Bu xizmat NestJS loyihangizda Gmail orqali elektron pochta jo‘natish uchun ishlatiladi. Asosan tasdiqlash kodlarini foydalanuvchilarga yuborish uchun mo‘ljallangan.

---

## 🔧 Talablar

- Node.js >= 16
- NestJS >= 9
- Gmail hisobingiz va unga oid **App Password** (Google xavfsizlik sababli oddiy parol bilan ishlashni cheklaydi)
- `nodemailer` paketi

---

## ⚙️ O‘rnatish

1. Loyihaga `nodemailer` paketini o‘rnating:

```bash
npm install nodemailer

va shu qatorni .envga qoshing
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password


📦 Foydalanish

MailService NestJS servis sifatida ishlaydi. Uni modulga qo‘shing:

import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

✅ Kod yuborish

Servisdan tasdiqlash kodini yuborish:

import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(private readonly mailService: MailService) {}

  async sendCode(email: string, code: string) {
    await this.mailService.sendVerificationCode(email, code);
    console.log('Tasdiqlash kodi yuborildi ✅');
  }
}

🔑 Parametrlar

to – kod yuboriladigan email manzil

code – foydalanuvchiga jo‘natiladigan tasdiqlash kodi

🛠 Xizmat tafsilotlari

host: smtp.gmail.com

port: 465

secure: true (SSL)

auth: .env fayldan olinadi

⚠️ Eslatmalar

Gmail hisobingiz “Less secure app access” ni qo‘llab-quvvatlamasligi mumkin, shuning uchun App Password ishlating.

Katta hajmli email yuborish uchun Gmail limitlarini hisobga oling.
```
