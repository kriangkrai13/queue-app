# Queue Management System - Database Mode Configuration

ระบบจัดการคิวนี้สามารถทำงานได้ 2 โหมด:

## 🌐 API Server Mode (โหมดเซิร์ฟเวอร์)
- ใช้งานผ่าน API server (backend)
- เหมาะสำหรับการใช้งานแบบ multi-user
- ข้อมูลจะถูกเก็บใน MySQL database บนเซิร์ฟเวอร์

## 💾 Browser Database Mode (โหมดออฟไลน์)
- ใช้งานผ่าน Browser Database (IndexedDB)
- เหมาะสำหรับการใช้งานแบบ single-user หรือออฟไลน์
- ข้อมูลจะถูกเก็บในเบราว์เซอร์ของผู้ใช้

## การเปลี่ยนโหมด

### วิธีที่ 1: แก้ไขไฟล์ .env
```bash
# เปิดไฟล์ .env แล้วแก้ไข
VITE_USE_API=true   # ใช้ API Server Mode
VITE_USE_API=false  # ใช้ Browser Database Mode
```

### วิธีที่ 2: ใช้ปุ่มสลับ (Development Mode เท่านั้น)
- ในโหมด Development จะมีปุ่ม "สลับ" ที่มุมขวาบน
- คลิกเพื่อเปลี่ยนโหมดทันที (ไม่ต้อง restart)

## ข้อมูลที่แสดงในแต่ละโหมด

### API Server Mode
- ✅ สถานะการเชื่อมต่อ API
- ✅ URL ของ API Server  
- ✅ จำนวนคิวที่รออยู่
- ✅ คิวปัจจุบันและคิวก่อนหน้า

### Browser Database Mode  
- ✅ การทำงานแบบออฟไลน์
- ✅ จำนวนคิวที่รออยู่ (จาก IndexedDB)
- ✅ คิวปัจจุบันและคิวก่อนหน้า
- ✅ ข้อมูลจะถูกเก็บในเบราว์เซอร์

## การใช้งาน

### สำหรับ API Server Mode:
1. ตั้งค่า `VITE_USE_API=true` ในไฟล์ .env
2. เริ่มต้น backend server (port 3001)
3. เริ่มต้น frontend (npm run dev)
4. ระบบจะแสดงสถานะ "API Server" พร้อมสัญญาณสีเขียว

### สำหรับ Browser Database Mode:
1. ตั้งค่า `VITE_USE_API=false` ในไฟล์ .env  
2. เริ่มต้น frontend เท่านั้น (npm run dev)
3. ไม่จำเป็นต้องเริ่ม backend server
4. ระบบจะแสดงสถานะ "Browser DB" พร้อมสัญญาณสีน้ำเงิน

## ข้อดี-ข้อเสีย

### API Server Mode
**ข้อดี:**
- รองรับผู้ใช้หลายคนพร้อมกัน
- ข้อมูลจะไม่หายเมื่อปิดเบราว์เซอร์
- สามารถใช้งานข้ามเครื่องได้

**ข้อเสีย:** 
- ต้องมี backend server ทำงานอยู่
- ต้องการการเชื่อมต่ออินเทอร์เน็ต

### Browser Database Mode
**ข้อดี:**
- ไม่ต้องการ backend server
- ทำงานแบบออฟไลน์ได้
- รวดเร็วและเสถียร

**ข้อเสีย:**
- รองรับผู้ใช้เดียวต่อเบราว์เซอร์
- ข้อมูลจะหายเมื่อลบ browser data
- ไม่สามารถแชร์ข้อมูลข้ามเครื่องได้

## การตรวจสอบโหมดปัจจุบัน

ดูที่มุมขวาบนของหน้าเว็บ:
- 🟢 **API Server** = ใช้ API Server Mode
- 🔵 **Browser DB** = ใช้ Browser Database Mode

## การ Reset ข้อมูล

### API Server Mode:
- ลบข้อมูลผ่าน Database Management Tool
- หรือรีสตาร์ท backend server

### Browser Database Mode:
- เปิด Developer Console (F12)
- ใช้คำสั่ง: `localStorage.clear()` และ `indexedDB.deleteDatabase('QueueManagementDB')`
- หรือลบ browser data ในการตั้งค่าเบราว์เซอร์

## หมายเหตุ
- โหมด Development จะแสดงข้อมูลเพิ่มเติมและปุ่มสลับโหมด
- โหมด Production จะแสดงเฉพาะสถานะการทำงาน
- การเปลี่ยนโหมดจะมีผลทันทีโดยไม่ต้อง restart application