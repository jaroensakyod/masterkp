import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { lessons } from "./lessons";

const prisma = new PrismaClient();

type SeedOption = { content: string; isCorrect: boolean; order: number };
type SeedQuestion = {
  content: string;
  difficulty: string;
  explanation: string;
  options: SeedOption[];
};
type SeedTopic = {
  name: string;
  nameTh: string;
  slug: string;
  description: string;
  order: number;
  questions: SeedQuestion[];
};
type SeedSubject = {
  name: string;
  nameTh: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  topics: SeedTopic[];
};

const subjects: SeedSubject[] = [
  {
    name: "Verbal & Numerical Reasoning",
    nameTh: "ความสามารถทั่วไป",
    slug: "general-ability",
    description: "ทดสอบความสามารถด้านตัวเลข ตรรกะ และการอุปมา",
    icon: "🧮",
    color: "#3B82F6",
    order: 1,
    topics: [
      {
        name: "Number Series",
        nameTh: "อนุกรมตัวเลข",
        slug: "number-series",
        description: "หาตัวเลขลำดับต่อไปของอนุกรม",
        order: 1,
        questions: [
          {
            content: "2, 4, 8, 16, ?",
            difficulty: "EASY",
            explanation: "อนุกรมคูณ 2 ทุกตัว: 16×2 = 32",
            options: [
              { content: "24", isCorrect: false, order: 1 },
              { content: "32", isCorrect: true, order: 2 },
              { content: "30", isCorrect: false, order: 3 },
              { content: "28", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "3, 6, 11, 18, 27, ?",
            difficulty: "MEDIUM",
            explanation: "ผลต่างเพิ่มทีละ 2: +3, +5, +7, +9, +11 → 27+11 = 38",
            options: [
              { content: "36", isCorrect: false, order: 1 },
              { content: "38", isCorrect: true, order: 2 },
              { content: "40", isCorrect: false, order: 3 },
              { content: "34", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "1, 1, 2, 3, 5, 8, ?",
            difficulty: "EASY",
            explanation: "อนุกรมฟีโบนักชี: ตัวถัดไป = ผลบวกของสองตัวก่อนหน้า 5+8 = 13",
            options: [
              { content: "11", isCorrect: false, order: 1 },
              { content: "12", isCorrect: false, order: 2 },
              { content: "13", isCorrect: true, order: 3 },
              { content: "14", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "100, 95, 85, 70, 50, ?",
            difficulty: "MEDIUM",
            explanation: "ผลต่างเพิ่มทีละ 5: -5, -10, -15, -20, -25 → 50-25 = 25",
            options: [
              { content: "20", isCorrect: false, order: 1 },
              { content: "25", isCorrect: true, order: 2 },
              { content: "30", isCorrect: false, order: 3 },
              { content: "35", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "2, 3, 5, 8, 12, 17, ?",
            difficulty: "MEDIUM",
            explanation: "ผลต่างเพิ่มทีละ 1: +1, +2, +3, +4, +5, +6 → 17+6 = 23",
            options: [
              { content: "22", isCorrect: false, order: 1 },
              { content: "23", isCorrect: true, order: 2 },
              { content: "24", isCorrect: false, order: 3 },
              { content: "25", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "5, 10, 20, 40, ?",
            difficulty: "EASY",
            explanation: "คูณ 2 ทุกตัว: 40×2 = 80",
            options: [
              { content: "60", isCorrect: false, order: 1 },
              { content: "70", isCorrect: false, order: 2 },
              { content: "80", isCorrect: true, order: 3 },
              { content: "100", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "81, 27, 9, 3, ?",
            difficulty: "EASY",
            explanation: "หารด้วย 3 ทุกตัว: 3÷3 = 1",
            options: [
              { content: "1", isCorrect: true, order: 1 },
              { content: "2", isCorrect: false, order: 2 },
              { content: "0", isCorrect: false, order: 3 },
              { content: "1.5", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "1, 4, 9, 16, 25, ?",
            difficulty: "EASY",
            explanation: "กำลังสองของจำนวนนับ: 6² = 36",
            options: [
              { content: "30", isCorrect: false, order: 1 },
              { content: "36", isCorrect: true, order: 2 },
              { content: "49", isCorrect: false, order: 3 },
              { content: "35", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "2, 6, 12, 20, 30, ?",
            difficulty: "MEDIUM",
            explanation: "ผลต่างเพิ่มทีละ 2: +4, +6, +8, +10, +12 → 30+12 = 42",
            options: [
              { content: "40", isCorrect: false, order: 1 },
              { content: "42", isCorrect: true, order: 2 },
              { content: "44", isCorrect: false, order: 3 },
              { content: "36", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "3, 9, 27, 81, ?",
            difficulty: "EASY",
            explanation: "คูณ 3 ทุกตัว: 81×3 = 243",
            options: [
              { content: "162", isCorrect: false, order: 1 },
              { content: "243", isCorrect: true, order: 2 },
              { content: "108", isCorrect: false, order: 3 },
              { content: "240", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "1, 2, 4, 7, 11, 16, ?",
            difficulty: "MEDIUM",
            explanation: "ผลต่างเพิ่มทีละ 1: +1, +2, +3, +4, +5, +6 → 16+6 = 22",
            options: [
              { content: "21", isCorrect: false, order: 1 },
              { content: "22", isCorrect: true, order: 2 },
              { content: "23", isCorrect: false, order: 3 },
              { content: "20", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "2, 5, 11, 23, 47, ?",
            difficulty: "HARD",
            explanation: "คูณ 2 บวก 1: 2×2+1=5, 5×2+1=11, ... 47×2+1 = 95",
            options: [
              { content: "94", isCorrect: false, order: 1 },
              { content: "95", isCorrect: true, order: 2 },
              { content: "96", isCorrect: false, order: 3 },
              { content: "93", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "1, 3, 6, 10, 15, 21, ?",
            difficulty: "MEDIUM",
            explanation: "จำนวนสามเหลี่ยม ผลต่างเพิ่มทีละ 1: +2,+3,+4,+5,+6,+7 → 21+7 = 28",
            options: [
              { content: "27", isCorrect: false, order: 1 },
              { content: "28", isCorrect: true, order: 2 },
              { content: "29", isCorrect: false, order: 3 },
              { content: "26", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "4, 8, 16, 32, 64, ?",
            difficulty: "EASY",
            explanation: "คูณ 2 ทุกตัว: 64×2 = 128",
            options: [
              { content: "96", isCorrect: false, order: 1 },
              { content: "128", isCorrect: true, order: 2 },
              { content: "100", isCorrect: false, order: 3 },
              { content: "124", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Logic & Reasoning",
        nameTh: "ตรรกศาสตร์และเงื่อนไข",
        slug: "logic-reasoning",
        description: "ฝึกทักษะการคิดเชิงตรรกะและการอุปมาน",
        order: 2,
        questions: [
          {
            content: "ถ้า A > B และ B > C แล้ว ข้อใดต่อไปนี้ถูกต้อง?",
            difficulty: "EASY",
            explanation: "กฎถ่ายทอด (Transitive): ถ้า A>B และ B>C ดังนั้น A>C",
            options: [
              { content: "C > A", isCorrect: false, order: 1 },
              { content: "A > C", isCorrect: true, order: 2 },
              { content: "B > A", isCorrect: false, order: 3 },
              { content: "C = A", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ทุกคนที่ขยันสอบผ่าน และสมชายขยัน ดังนั้น...",
            difficulty: "EASY",
            explanation: "การอุปมานแบบ Syllogism: สมชายเป็นสมาชิกของกลุ่มคนขยัน ดังนั้นสมชายสอบผ่าน",
            options: [
              { content: "สมชายสอบไม่ผ่าน", isCorrect: false, order: 1 },
              { content: "สมชายสอบผ่าน", isCorrect: true, order: 2 },
              { content: "สมชายอาจสอบผ่าน", isCorrect: false, order: 3 },
              { content: "สรุปไม่ได้", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ถ้าเมื่อวานคือวันพุธ วันนี้คือวันอะไร?",
            difficulty: "EASY",
            explanation: "เมื่อวานวันพุธ ดังนั้นวันนี้คือวันพฤหัสบดี",
            options: [
              { content: "วันอังคาร", isCorrect: false, order: 1 },
              { content: "วันพุธ", isCorrect: false, order: 2 },
              { content: "วันพฤหัสบดี", isCorrect: true, order: 3 },
              { content: "วันศุกร์", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ดินสอ 3 โหล มีกี่แท่ง?",
            difficulty: "EASY",
            explanation: "1 โหล = 12 แท่ง ดังนั้น 3×12 = 36 แท่ง",
            options: [
              { content: "30", isCorrect: false, order: 1 },
              { content: "36", isCorrect: true, order: 2 },
              { content: "24", isCorrect: false, order: 3 },
              { content: "42", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ใน 1 สัปดาห์มี 7 วัน ใน 4 สัปดาห์มีกี่วัน?",
            difficulty: "EASY",
            explanation: "4 × 7 = 28 วัน",
            options: [
              { content: "24 วัน", isCorrect: false, order: 1 },
              { content: "28 วัน", isCorrect: true, order: 2 },
              { content: "30 วัน", isCorrect: false, order: 3 },
              { content: "32 วัน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "นก ก เร็วกว่า นก ข, นก ข เร็วกว่า นก ค ตัวใดเร็วที่สุด?",
            difficulty: "EASY",
            explanation: "เรียงลำดับ: ก > ข > ค ดังนั้น นก ก เร็วที่สุด",
            options: [
              { content: "นก ก", isCorrect: true, order: 1 },
              { content: "นก ข", isCorrect: false, order: 2 },
              { content: "นก ค", isCorrect: false, order: 3 },
              { content: "เท่ากัน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ถ้าบางคนในห้องเป็นนักกีฬา ข้อใดถูกต้องเสมอ?",
            difficulty: "MEDIUM",
            explanation: "'บางคน' หมายถึงอย่างน้อยหนึ่งคน จึงสรุปได้แค่ว่ามีนักกีฬาอยู่ในห้อง",
            options: [
              { content: "ทุกคนเป็นนักกีฬา", isCorrect: false, order: 1 },
              { content: "มีนักกีฬาอย่างน้อย 1 คนในห้อง", isCorrect: true, order: 2 },
              { content: "ไม่มีนักกีฬาในห้อง", isCorrect: false, order: 3 },
              { content: "ครึ่งหนึ่งเป็นนักกีฬา", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "รถออกจากบ้าน 08:00 ถึงที่ทำงานใช้เวลา 45 นาที ถึงกี่โมง?",
            difficulty: "EASY",
            explanation: "08:00 + 45 นาที = 08:45",
            options: [
              { content: "08:30", isCorrect: false, order: 1 },
              { content: "08:45", isCorrect: true, order: 2 },
              { content: "09:00", isCorrect: false, order: 3 },
              { content: "08:40", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ถ้า P แล้ว Q. พบว่า Q เป็นเท็จ สรุปได้ว่า?",
            difficulty: "HARD",
            explanation: "Modus Tollens: ถ้า P→Q และ Q เป็นเท็จ ดังนั้น P เป็นเท็จ",
            options: [
              { content: "P เป็นจริง", isCorrect: false, order: 1 },
              { content: "P เป็นเท็จ", isCorrect: true, order: 2 },
              { content: "สรุปไม่ได้", isCorrect: false, order: 3 },
              { content: "Q เป็นจริง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "มีไก่และหมูรวมกัน 10 ตัว นับขาได้ 28 ขา มีหมูกี่ตัว?",
            difficulty: "HARD",
            explanation: "ถ้าทั้งหมดเป็นไก่จะได้ 20 ขา ขาที่เกิน 28-20=8 มาจากหมู หมูมี 2 ขาเพิ่ม → 8÷2 = 4 ตัว",
            options: [
              { content: "3 ตัว", isCorrect: false, order: 1 },
              { content: "4 ตัว", isCorrect: true, order: 2 },
              { content: "5 ตัว", isCorrect: false, order: 3 },
              { content: "6 ตัว", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "วันนี้วันพุธ อีก 10 วันเป็นวันอะไร?",
            difficulty: "MEDIUM",
            explanation: "10 ÷ 7 เหลือเศษ 3 นับจากพุธไป 3 วัน = เสาร์",
            options: [
              { content: "ศุกร์", isCorrect: false, order: 1 },
              { content: "เสาร์", isCorrect: true, order: 2 },
              { content: "อาทิตย์", isCorrect: false, order: 3 },
              { content: "จันทร์", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ราคาสินค้า 500 บาท ลด 20% เหลือเท่าไร?",
            difficulty: "EASY",
            explanation: "ลด 20% = 100 บาท เหลือ 500 - 100 = 400 บาท",
            options: [
              { content: "380 บาท", isCorrect: false, order: 1 },
              { content: "400 บาท", isCorrect: true, order: 2 },
              { content: "450 บาท", isCorrect: false, order: 3 },
              { content: "420 บาท", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "A อายุมากกว่า B 5 ปี, B อายุ 20 ปี A อายุเท่าไร?",
            difficulty: "EASY",
            explanation: "A = B + 5 = 20 + 5 = 25 ปี",
            options: [
              { content: "15 ปี", isCorrect: false, order: 1 },
              { content: "25 ปี", isCorrect: true, order: 2 },
              { content: "20 ปี", isCorrect: false, order: 3 },
              { content: "30 ปี", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Analogies",
        nameTh: "อุปมาอุปไมย",
        slug: "analogies",
        description: "ความสัมพันธ์ระหว่างคำและแนวคิด",
        order: 3,
        questions: [
          {
            content: "นกบิน : ท้องฟ้า เปรียบเหมือนกับ ปลาว่าย : ?",
            difficulty: "EASY",
            explanation: "นกบินในท้องฟ้า ปลาว่ายในน้ำ จึงเป็นความสัมพันธ์ของถิ่นที่อยู่",
            options: [
              { content: "อากาศ", isCorrect: false, order: 1 },
              { content: "น้ำ", isCorrect: true, order: 2 },
              { content: "ทราย", isCorrect: false, order: 3 },
              { content: "ต้นไม้", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ครู : โรงเรียน เปรียบเหมือนกับ แพทย์ : ?",
            difficulty: "EASY",
            explanation: "ครูทำงานที่โรงเรียน แพทย์ทำงานที่โรงพยาบาล",
            options: [
              { content: "คลินิก", isCorrect: false, order: 1 },
              { content: "โรงพยาบาล", isCorrect: true, order: 2 },
              { content: "สถานีอนามัย", isCorrect: false, order: 3 },
              { content: "ห้องตรวจ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ร้อน : เย็น เปรียบเหมือนกับ สว่าง : ?",
            difficulty: "EASY",
            explanation: "ร้อนกับเย็นเป็นคู่ตรงข้าม สว่างกับมืดเป็นคู่ตรงข้าม",
            options: [
              { content: "แสง", isCorrect: false, order: 1 },
              { content: "กลางวัน", isCorrect: false, order: 2 },
              { content: "มืด", isCorrect: true, order: 3 },
              { content: "เย็น", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "หนังสือ : ห้องสมุด เปรียบเหมือนกับ ยา : ?",
            difficulty: "EASY",
            explanation: "หนังสืออยู่ในห้องสมุด ยาอยู่ในร้านขายยา",
            options: [
              { content: "โรงพยาบาล", isCorrect: false, order: 1 },
              { content: "ร้านขายยา", isCorrect: true, order: 2 },
              { content: "ตลาด", isCorrect: false, order: 3 },
              { content: "คลินิก", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ปากกา : เขียน เปรียบเหมือนกับ มีด : ?",
            difficulty: "EASY",
            explanation: "ปากกาใช้เขียน มีดใช้หั่น/ตัด",
            options: [
              { content: "แทง", isCorrect: false, order: 1 },
              { content: "หั่น", isCorrect: true, order: 2 },
              { content: "ตี", isCorrect: false, order: 3 },
              { content: "ยิง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "นิ้ว : มือ เปรียบเหมือนกับ นิ้วเท้า : ?",
            difficulty: "EASY",
            explanation: "นิ้วเป็นส่วนของมือ นิ้วเท้าเป็นส่วนของเท้า",
            options: [
              { content: "ขา", isCorrect: false, order: 1 },
              { content: "เท้า", isCorrect: true, order: 2 },
              { content: "แขน", isCorrect: false, order: 3 },
              { content: "ส้น", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "2 : 4 เปรียบเหมือนกับ 3 : ?",
            difficulty: "EASY",
            explanation: "ความสัมพันธ์คูณ 2: 2×2=4 ดังนั้น 3×2 = 6",
            options: [
              { content: "5", isCorrect: false, order: 1 },
              { content: "6", isCorrect: true, order: 2 },
              { content: "9", isCorrect: false, order: 3 },
              { content: "8", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "หิว : กิน เปรียบเหมือนกับ ง่วง : ?",
            difficulty: "EASY",
            explanation: "หิวจึงกิน ง่วงจึงนอน เป็นความสัมพันธ์เหตุ-ผล",
            options: [
              { content: "ตื่น", isCorrect: false, order: 1 },
              { content: "นอน", isCorrect: true, order: 2 },
              { content: "เดิน", isCorrect: false, order: 3 },
              { content: "วิ่ง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ใหญ่ : เล็ก เปรียบเหมือนกับ สูง : ?",
            difficulty: "EASY",
            explanation: "ใหญ่กับเล็กเป็นคู่ตรงข้าม สูงกับเตี้ยเป็นคู่ตรงข้าม",
            options: [
              { content: "ยาว", isCorrect: false, order: 1 },
              { content: "เตี้ย", isCorrect: true, order: 2 },
              { content: "อ้วน", isCorrect: false, order: 3 },
              { content: "กว้าง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "วงกลม : ทรงกลม เปรียบเหมือนกับ สี่เหลี่ยม : ?",
            difficulty: "MEDIUM",
            explanation: "วงกลมเป็นรูป 2 มิติของทรงกลม สี่เหลี่ยมเป็นรูป 2 มิติของลูกบาศก์",
            options: [
              { content: "สามเหลี่ยม", isCorrect: false, order: 1 },
              { content: "ลูกบาศก์", isCorrect: true, order: 2 },
              { content: "พีระมิด", isCorrect: false, order: 3 },
              { content: "ทรงกระบอก", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Symbol Conditions",
        nameTh: "เงื่อนไขสัญลักษณ์",
        slug: "symbol-conditions",
        description: "เปรียบเทียบค่าตามเงื่อนไขสัญลักษณ์ (ออกสอบจริงมากที่สุด)",
        order: 4,
        questions: [
          {
            content: "ถ้า A > B, B > C แล้ว A กับ C ข้อใดถูกต้อง?",
            difficulty: "EASY",
            explanation: "ตามกฎถ่ายทอด A > B > C ดังนั้น A > C เสมอ",
            options: [
              { content: "A > C", isCorrect: true, order: 1 },
              { content: "A < C", isCorrect: false, order: 2 },
              { content: "A = C", isCorrect: false, order: 3 },
              { content: "สรุปไม่ได้", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "กำหนด A = B, B > C, C ≥ D ข้อสรุป 'A > D' เป็นจริงหรือไม่?",
            difficulty: "MEDIUM",
            explanation: "A = B > C ≥ D ดังนั้น A > D เป็นจริงแน่นอน (B>C ทำให้เป็นมากกว่าเด็ดขาด)",
            options: [
              { content: "เป็นจริงแน่นอน", isCorrect: true, order: 1 },
              { content: "เป็นเท็จแน่นอน", isCorrect: false, order: 2 },
              { content: "ไม่แน่นอน", isCorrect: false, order: 3 },
              { content: "ข้อมูลไม่พอ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "กำหนด A ≥ B, B = C ข้อสรุป 'A = C' เป็นอย่างไร?",
            difficulty: "MEDIUM",
            explanation: "A ≥ B และ B = C ดังนั้น A ≥ C จึงสรุปแน่นอนว่า A=C ไม่ได้ (A อาจมากกว่า C) → ไม่แน่นอน",
            options: [
              { content: "เป็นจริงแน่นอน", isCorrect: false, order: 1 },
              { content: "เป็นเท็จแน่นอน", isCorrect: false, order: 2 },
              { content: "ไม่แน่นอน (อาจจริงหรือเท็จ)", isCorrect: true, order: 3 },
              { content: "ข้อมูลขัดแย้ง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "กำหนด X < Y, Y < Z ข้อสรุป 'Z > X' เป็นอย่างไร?",
            difficulty: "EASY",
            explanation: "X < Y < Z ดังนั้น Z > X เป็นจริงแน่นอน",
            options: [
              { content: "เป็นจริงแน่นอน", isCorrect: true, order: 1 },
              { content: "เป็นเท็จแน่นอน", isCorrect: false, order: 2 },
              { content: "ไม่แน่นอน", isCorrect: false, order: 3 },
              { content: "ข้อมูลไม่พอ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "กำหนด P ≤ Q, Q ≤ R, R ≤ P ข้อสรุปที่ถูกต้องคือ?",
            difficulty: "HARD",
            explanation: "P ≤ Q ≤ R ≤ P เป็นไปได้เมื่อ P = Q = R เท่านั้น",
            options: [
              { content: "P = Q = R", isCorrect: true, order: 1 },
              { content: "P > R", isCorrect: false, order: 2 },
              { content: "Q < P", isCorrect: false, order: 3 },
              { content: "ข้อมูลขัดแย้ง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "กำหนด A > B, C > B ข้อสรุป 'A > C' เป็นอย่างไร?",
            difficulty: "MEDIUM",
            explanation: "ทั้ง A และ C ต่างมากกว่า B แต่เทียบ A กับ C โดยตรงไม่ได้ → ไม่แน่นอน",
            options: [
              { content: "เป็นจริงแน่นอน", isCorrect: false, order: 1 },
              { content: "ไม่แน่นอน", isCorrect: true, order: 2 },
              { content: "เป็นเท็จแน่นอน", isCorrect: false, order: 3 },
              { content: "A = C", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "กำหนด M = N, N ≠ O ข้อสรุป 'M ≠ O' เป็นอย่างไร?",
            difficulty: "MEDIUM",
            explanation: "M = N และ N ≠ O ดังนั้น M ≠ O เป็นจริงแน่นอน",
            options: [
              { content: "เป็นจริงแน่นอน", isCorrect: true, order: 1 },
              { content: "ไม่แน่นอน", isCorrect: false, order: 2 },
              { content: "เป็นเท็จแน่นอน", isCorrect: false, order: 3 },
              { content: "M = O", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "กำหนด A < B < C < D ข้อสรุป 'D เป็นค่ามากที่สุด' เป็นอย่างไร?",
            difficulty: "EASY",
            explanation: "เรียงจากน้อยไปมาก A<B<C<D ดังนั้น D มากที่สุดแน่นอน",
            options: [
              { content: "เป็นจริงแน่นอน", isCorrect: true, order: 1 },
              { content: "ไม่แน่นอน", isCorrect: false, order: 2 },
              { content: "เป็นเท็จ", isCorrect: false, order: 3 },
              { content: "A มากที่สุด", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Table & Data Interpretation",
        nameTh: "การอ่านตารางและข้อมูล",
        slug: "table-reading",
        description: "วิเคราะห์ข้อมูลจากตารางและกราฟ",
        order: 5,
        questions: [
          {
            content: "ร้านค้าขายของได้ จันทร์ 100, อังคาร 150, พุธ 200 บาท รวม 3 วันได้กี่บาท?",
            difficulty: "EASY",
            explanation: "100 + 150 + 200 = 450 บาท",
            options: [
              { content: "400 บาท", isCorrect: false, order: 1 },
              { content: "450 บาท", isCorrect: true, order: 2 },
              { content: "500 บาท", isCorrect: false, order: 3 },
              { content: "350 บาท", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "นักเรียน 4 ห้อง มี 30, 35, 28, 27 คน เฉลี่ยห้องละกี่คน?",
            difficulty: "MEDIUM",
            explanation: "(30+35+28+27) ÷ 4 = 120 ÷ 4 = 30 คน",
            options: [
              { content: "28 คน", isCorrect: false, order: 1 },
              { content: "30 คน", isCorrect: true, order: 2 },
              { content: "32 คน", isCorrect: false, order: 3 },
              { content: "29 คน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ยอดขาย ปี 1 = 200, ปี 2 = 250 ล้านบาท เพิ่มขึ้นกี่เปอร์เซ็นต์?",
            difficulty: "MEDIUM",
            explanation: "เพิ่มขึ้น 50 จากฐาน 200 → (50/200)×100 = 25%",
            options: [
              { content: "20%", isCorrect: false, order: 1 },
              { content: "25%", isCorrect: true, order: 2 },
              { content: "50%", isCorrect: false, order: 3 },
              { content: "30%", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ตารางแสดงคะแนน A=80, B=90, C=70, D=60 ใครได้คะแนนสูงสุด?",
            difficulty: "EASY",
            explanation: "เปรียบเทียบ 80, 90, 70, 60 → B = 90 สูงสุด",
            options: [
              { content: "A", isCorrect: false, order: 1 },
              { content: "B", isCorrect: true, order: 2 },
              { content: "C", isCorrect: false, order: 3 },
              { content: "D", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "โรงงานผลิต ม.ค. 1,200, ก.พ. 1,500 ชิ้น ก.พ. ผลิตมากกว่ากี่ชิ้น?",
            difficulty: "EASY",
            explanation: "1,500 − 1,200 = 300 ชิ้น",
            options: [
              { content: "200 ชิ้น", isCorrect: false, order: 1 },
              { content: "300 ชิ้น", isCorrect: true, order: 2 },
              { content: "500 ชิ้น", isCorrect: false, order: 3 },
              { content: "250 ชิ้น", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "พนักงาน 50 คน เป็นชาย 30 คน คิดเป็นกี่เปอร์เซ็นต์ของทั้งหมด?",
            difficulty: "MEDIUM",
            explanation: "(30/50)×100 = 60%",
            options: [
              { content: "50%", isCorrect: false, order: 1 },
              { content: "60%", isCorrect: true, order: 2 },
              { content: "40%", isCorrect: false, order: 3 },
              { content: "70%", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "งบรายจ่าย 4 ด้านรวม 100% อาหาร 40% เดินทาง 25% ที่พัก 20% เหลือด้านอื่นกี่ %?",
            difficulty: "MEDIUM",
            explanation: "100 − (40+25+20) = 100 − 85 = 15%",
            options: [
              { content: "10%", isCorrect: false, order: 1 },
              { content: "15%", isCorrect: true, order: 2 },
              { content: "20%", isCorrect: false, order: 3 },
              { content: "5%", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สินค้าราคา 800 บาท ลด 25% ต้องจ่ายเท่าไร?",
            difficulty: "MEDIUM",
            explanation: "ลด 25% = 200 บาท เหลือ 800 − 200 = 600 บาท",
            options: [
              { content: "550 บาท", isCorrect: false, order: 1 },
              { content: "600 บาท", isCorrect: true, order: 2 },
              { content: "650 บาท", isCorrect: false, order: 3 },
              { content: "700 บาท", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Thai Language",
    nameTh: "ภาษาไทย",
    slug: "thai-language",
    description: "ทดสอบความรู้ภาษาไทย ไวยากรณ์ และการอ่าน",
    icon: "📖",
    color: "#EF4444",
    order: 2,
    topics: [
      {
        name: "Grammar & Spelling",
        nameTh: "ไวยากรณ์และการสะกดคำ",
        slug: "thai-grammar",
        description: "ไวยากรณ์ภาษาไทยและการสะกดคำที่ถูกต้อง",
        order: 1,
        questions: [
          {
            content: "ข้อใดเขียนถูกต้องตามหลักภาษาไทย?",
            difficulty: "MEDIUM",
            explanation: "'อนุญาต' สะกดด้วย ญ และไม่มี ิ ที่ ต ไม่ใช่ 'อนุญาติ'",
            options: [
              { content: "อนุญาติ", isCorrect: false, order: 1 },
              { content: "อนุญาต", isCorrect: true, order: 2 },
              { content: "อณุญาต", isCorrect: false, order: 3 },
              { content: "อนุญาด", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คำใดสะกดถูกต้อง (ใบไม้ที่ใช้ทำอาหาร)?",
            difficulty: "MEDIUM",
            explanation: "'กะเพรา' สะกดด้วย กะ ไม่ใช่ 'กระเพรา'",
            options: [
              { content: "กระเพรา", isCorrect: false, order: 1 },
              { content: "กะเพรา", isCorrect: true, order: 2 },
              { content: "กะเพา", isCorrect: false, order: 3 },
              { content: "กระเพา", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อใดเขียนถูกต้อง (ชื่ออาหาร)?",
            difficulty: "EASY",
            explanation: "'ผัดไทย' ใช้ ผัด (คนให้เข้ากัน) ไม่ใช่ 'พัด' หรือ 'ผัส'",
            options: [
              { content: "พัดไทย", isCorrect: false, order: 1 },
              { content: "ผัดไทย", isCorrect: true, order: 2 },
              { content: "ผัสไทย", isCorrect: false, order: 3 },
              { content: "ภัดไทย", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อใดใช้ลักษณนามถูกต้อง?",
            difficulty: "MEDIUM",
            explanation: "พระสงฆ์ใช้ลักษณนาม 'รูป' เช่น พระ 3 รูป",
            options: [
              { content: "พระ 3 องค์", isCorrect: false, order: 1 },
              { content: "พระ 3 รูป", isCorrect: true, order: 2 },
              { content: "พระ 3 คน", isCorrect: false, order: 3 },
              { content: "พระ 3 ตัว", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "'นาฬิกา' มีกี่พยางค์?",
            difficulty: "EASY",
            explanation: "นา-ฬิ-กา = 3 พยางค์",
            options: [
              { content: "2 พยางค์", isCorrect: false, order: 1 },
              { content: "3 พยางค์", isCorrect: true, order: 2 },
              { content: "4 พยางค์", isCorrect: false, order: 3 },
              { content: "1 พยางค์", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อใดเป็นคำสมาส?",
            difficulty: "HARD",
            explanation: "'ราชการ' = ราช + การ เป็นคำสมาส (คำบาลี/สันสกฤตประสมกัน)",
            options: [
              { content: "แม่น้ำ", isCorrect: false, order: 1 },
              { content: "ราชการ", isCorrect: true, order: 2 },
              { content: "พ่อบ้าน", isCorrect: false, order: 3 },
              { content: "ลูกเสือ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คำราชาศัพท์ของ 'กิน' สำหรับพระมหากษัตริย์คือ?",
            difficulty: "MEDIUM",
            explanation: "คำราชาศัพท์ของ 'กิน' คือ 'เสวย'",
            options: [
              { content: "รับประทาน", isCorrect: false, order: 1 },
              { content: "เสวย", isCorrect: true, order: 2 },
              { content: "ฉัน", isCorrect: false, order: 3 },
              { content: "ทาน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อใดสะกดถูกต้อง?",
            difficulty: "MEDIUM",
            explanation: "'ลายเซ็น' สะกดด้วย เซ็น ไม่ใช่ 'เซ็นต์'",
            options: [
              { content: "ลายเซ็นต์", isCorrect: false, order: 1 },
              { content: "ลายเซ็น", isCorrect: true, order: 2 },
              { content: "ลายเชน", isCorrect: false, order: 3 },
              { content: "ลายเซน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คำว่า 'บรรทัด' มีกี่พยางค์?",
            difficulty: "EASY",
            explanation: "บรรทัด แยกได้เป็น บัน-ทัด = 2 พยางค์",
            options: [
              { content: "1 พยางค์", isCorrect: false, order: 1 },
              { content: "2 พยางค์", isCorrect: true, order: 2 },
              { content: "3 พยางค์", isCorrect: false, order: 3 },
              { content: "4 พยางค์", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อใดเขียนถูกต้อง?",
            difficulty: "MEDIUM",
            explanation: "'ปรากฏ' สะกดด้วย ฏ ปฏัก ไม่ใช่ 'ปรากฎ'",
            options: [
              { content: "ปรากฎ", isCorrect: false, order: 1 },
              { content: "ปรากฏ", isCorrect: true, order: 2 },
              { content: "ปรากด", isCorrect: false, order: 3 },
              { content: "ปรากฏ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อใดเขียนถูกต้อง?",
            difficulty: "MEDIUM",
            explanation: "'สังเกต' ไม่มี ุ ที่ ต ไม่ใช่ 'สังเกตุ'",
            options: [
              { content: "สังเกตุ", isCorrect: false, order: 1 },
              { content: "สังเกต", isCorrect: true, order: 2 },
              { content: "สังเกษ", isCorrect: false, order: 3 },
              { content: "สังเกด", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คำว่า 'กตัญญู' หมายถึงอะไร?",
            difficulty: "EASY",
            explanation: "กตัญญู หมายถึง การรู้คุณท่านผู้มีพระคุณ",
            options: [
              { content: "ความขยัน", isCorrect: false, order: 1 },
              { content: "การรู้คุณผู้มีพระคุณ", isCorrect: true, order: 2 },
              { content: "ความซื่อสัตย์", isCorrect: false, order: 3 },
              { content: "ความกล้าหาญ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Reading Comprehension",
        nameTh: "การอ่านจับใจความ",
        slug: "thai-reading",
        description: "ทดสอบความเข้าใจในการอ่านบทความภาษาไทย",
        order: 2,
        questions: [
          {
            content: "\"การออมเงินเป็นนิสัยที่ดี ควรเริ่มตั้งแต่ยังเด็ก\" ใจความสำคัญคือ?",
            difficulty: "EASY",
            explanation: "ใจความสำคัญคือควรเริ่มออมเงินตั้งแต่เด็ก",
            options: [
              { content: "เด็กไม่ควรมีเงิน", isCorrect: false, order: 1 },
              { content: "ควรเริ่มออมเงินตั้งแต่เด็ก", isCorrect: true, order: 2 },
              { content: "ผู้ใหญ่ออมเงินไม่ได้", isCorrect: false, order: 3 },
              { content: "เงินไม่สำคัญ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คำว่า 'ขยันขันแข็ง' จัดเป็นคำชนิดใด?",
            difficulty: "MEDIUM",
            explanation: "เป็นคำซ้อนเพื่อความหมาย (ขยัน + ขันแข็ง ความหมายใกล้เคียงกัน)",
            options: [
              { content: "คำซ้ำ", isCorrect: false, order: 1 },
              { content: "คำซ้อน", isCorrect: true, order: 2 },
              { content: "คำประสม", isCorrect: false, order: 3 },
              { content: "คำสมาส", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "\"แม้ฝนจะตก เขาก็ยังไปทำงาน\" คำว่า 'แม้' แสดงความสัมพันธ์แบบใด?",
            difficulty: "MEDIUM",
            explanation: "'แม้...ก็' แสดงความขัดแย้ง/ยอมให้ (ถึงแม้จะเกิดสิ่งหนึ่ง อีกสิ่งก็ยังเกิด)",
            options: [
              { content: "เหตุและผล", isCorrect: false, order: 1 },
              { content: "ความขัดแย้ง/ยอมให้", isCorrect: true, order: 2 },
              { content: "เพิ่มเติม", isCorrect: false, order: 3 },
              { content: "เปรียบเทียบ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อใดเป็นประโยคความรวม?",
            difficulty: "HARD",
            explanation: "ประโยคความรวมมีใจความตั้งแต่สองส่วนเชื่อมด้วยสันธาน เช่น 'ฉันอ่านหนังสือและน้องดูทีวี'",
            options: [
              { content: "เด็กวิ่งเล่น", isCorrect: false, order: 1 },
              { content: "ฉันอ่านหนังสือและน้องดูทีวี", isCorrect: true, order: 2 },
              { content: "แมวสีดำ", isCorrect: false, order: 3 },
              { content: "เขากิน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คำว่า 'อเนกประสงค์' หมายถึง?",
            difficulty: "MEDIUM",
            explanation: "อเนก = มาก, ประสงค์ = ความต้องการ จึงหมายถึงใช้ได้หลายอย่าง",
            options: [
              { content: "ใช้ได้อย่างเดียว", isCorrect: false, order: 1 },
              { content: "ใช้ได้หลายอย่าง", isCorrect: true, order: 2 },
              { content: "ใช้ไม่ได้", isCorrect: false, order: 3 },
              { content: "ราคาแพง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "\"เขาทำงานหนักเพื่อเก็บเงินส่งน้องเรียน\" ข้อความนี้แสดงถึงสิ่งใด?",
            difficulty: "EASY",
            explanation: "แสดงถึงความเสียสละและความรับผิดชอบต่อครอบครัว",
            options: [
              { content: "ความเกียจคร้าน", isCorrect: false, order: 1 },
              { content: "ความเสียสละและรับผิดชอบ", isCorrect: true, order: 2 },
              { content: "ความฟุ่มเฟือย", isCorrect: false, order: 3 },
              { content: "ความเห็นแก่ตัว", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คำว่า 'ปฏิสันถาร' หมายถึง?",
            difficulty: "HARD",
            explanation: "ปฏิสันถาร หมายถึง การต้อนรับด้วยความเป็นมิตร",
            options: [
              { content: "การต่อสู้", isCorrect: false, order: 1 },
              { content: "การต้อนรับทักทาย", isCorrect: true, order: 2 },
              { content: "การลงโทษ", isCorrect: false, order: 3 },
              { content: "การปฏิเสธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อใดเป็นคำที่มีความหมายโดยนัย?",
            difficulty: "HARD",
            explanation: "'มือขวา' โดยนัยหมายถึงคนสนิทที่ไว้ใจได้ ไม่ใช่อวัยวะ",
            options: [
              { content: "โต๊ะ", isCorrect: false, order: 1 },
              { content: "มือขวา (คนสนิท)", isCorrect: true, order: 2 },
              { content: "ปากกา", isCorrect: false, order: 3 },
              { content: "หนังสือ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คำว่า 'ทัศนคติ' หมายถึง?",
            difficulty: "MEDIUM",
            explanation: "ทัศนคติ หมายถึง ความคิดเห็นหรือมุมมองที่มีต่อสิ่งใดสิ่งหนึ่ง",
            options: [
              { content: "ความรู้สึกทางกาย", isCorrect: false, order: 1 },
              { content: "ความคิดเห็น/มุมมอง", isCorrect: true, order: 2 },
              { content: "ความสามารถ", isCorrect: false, order: 3 },
              { content: "ความจำ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "\"น้ำขึ้นให้รีบตัก\" ในบทความสื่อความหมายให้รีบทำสิ่งใด?",
            difficulty: "MEDIUM",
            explanation: "หมายถึงเมื่อมีโอกาสดีควรรีบใช้ประโยชน์ อย่าปล่อยให้โอกาสหลุดมือ",
            options: [
              { content: "รีบตักน้ำตอนน้ำขึ้น", isCorrect: false, order: 1 },
              { content: "รีบใช้โอกาสที่มีอยู่", isCorrect: true, order: 2 },
              { content: "อย่ารีบร้อน", isCorrect: false, order: 3 },
              { content: "ให้รอเวลาที่เหมาะสม", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Proverbs & Idioms",
        nameTh: "สำนวนและสุภาษิต",
        slug: "thai-proverbs",
        description: "สำนวนและสุภาษิตไทยที่ใช้บ่อยในข้อสอบ",
        order: 3,
        questions: [
          {
            content: "สุภาษิต 'น้ำขึ้นให้รีบตัก' สื่อความหมายว่าอย่างไร?",
            difficulty: "MEDIUM",
            explanation: "มีโอกาสควรรีบทำ อย่าปล่อยให้โอกาสผ่านไป",
            options: [
              { content: "รีบตักน้ำก่อนหมด", isCorrect: false, order: 1 },
              { content: "มีโอกาสควรรีบทำ", isCorrect: true, order: 2 },
              { content: "ทำงานตอนน้ำขึ้น", isCorrect: false, order: 3 },
              { content: "อย่ารีบร้อน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สำนวน 'ขี่ช้างจับตั๊กแตน' หมายถึงอะไร?",
            difficulty: "MEDIUM",
            explanation: "ลงทุนมากแต่ได้ผลเล็กน้อย ไม่คุ้มค่า",
            options: [
              { content: "ทำงานยากลำบาก", isCorrect: false, order: 1 },
              { content: "ลงทุนมากแต่ได้ผลน้อย", isCorrect: true, order: 2 },
              { content: "ทำงานเก่ง", isCorrect: false, order: 3 },
              { content: "ใช้ของใหญ่", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สุภาษิต 'กว่าถั่วจะสุกงาก็ไหม้' หมายถึง?",
            difficulty: "MEDIUM",
            explanation: "ทำอะไรช้าเกินไปจนเสียประโยชน์ทั้งสองอย่าง",
            options: [
              { content: "ทำอาหารไม่เป็น", isCorrect: false, order: 1 },
              { content: "ทำอะไรช้าจนเสียประโยชน์ทั้งสองทาง", isCorrect: true, order: 2 },
              { content: "รีบร้อนเกินไป", isCorrect: false, order: 3 },
              { content: "ทำงานเก่ง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สำนวน 'ชักน้ำเข้าลึก ชักศึกเข้าบ้าน' หมายถึง?",
            difficulty: "HARD",
            explanation: "นำความเดือดร้อนหรือภัยมาสู่ตนเองหรือพวกพ้อง",
            options: [
              { content: "นำภัยมาสู่ตนเอง", isCorrect: true, order: 1 },
              { content: "ทำนา", isCorrect: false, order: 2 },
              { content: "ป้องกันบ้าน", isCorrect: false, order: 3 },
              { content: "ทำสงคราม", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สุภาษิต 'รักวัวให้ผูก รักลูกให้ตี' หมายถึง?",
            difficulty: "MEDIUM",
            explanation: "การอบรมสั่งสอนบุตรหลานต้องเข้มงวดบ้างจึงจะดี",
            options: [
              { content: "ต้องเลี้ยงวัว", isCorrect: false, order: 1 },
              { content: "การอบรมลูกต้องเข้มงวดบ้าง", isCorrect: true, order: 2 },
              { content: "ห้ามตีลูก", isCorrect: false, order: 3 },
              { content: "ผูกวัวไว้", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สำนวน 'ปิดทองหลังพระ' หมายถึง?",
            difficulty: "MEDIUM",
            explanation: "การทำความดีโดยไม่หวังให้ผู้อื่นเห็นหรือยกย่อง",
            options: [
              { content: "ทำดีโดยไม่หวังคำชม", isCorrect: true, order: 1 },
              { content: "ปิดทองที่พระ", isCorrect: false, order: 2 },
              { content: "ทำงานลับ ๆ", isCorrect: false, order: 3 },
              { content: "หลบหนีความผิด", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สำนวน 'วัวหายล้อมคอก' หมายถึง?",
            difficulty: "MEDIUM",
            explanation: "เมื่อเกิดความเสียหายแล้วจึงคิดป้องกัน",
            options: [
              { content: "เลี้ยงวัวในคอก", isCorrect: false, order: 1 },
              { content: "เกิดเรื่องแล้วจึงป้องกัน", isCorrect: true, order: 2 },
              { content: "ป้องกันก่อนเกิดเหตุ", isCorrect: false, order: 3 },
              { content: "ตามหาวัว", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สำนวน 'น้ำร้อนปลาเป็น น้ำเย็นปลาตาย' หมายถึง?",
            difficulty: "HARD",
            explanation: "คำพูดที่ตรงไปตรงมาแม้ฟังดูแรงอาจมีประโยชน์ ส่วนคำพูดอ่อนหวานอาจเป็นโทษ",
            options: [
              { content: "เลี้ยงปลาในน้ำร้อน", isCorrect: false, order: 1 },
              { content: "คำพูดตรงไปตรงมาอาจมีประโยชน์", isCorrect: true, order: 2 },
              { content: "อุณหภูมิน้ำสำคัญ", isCorrect: false, order: 3 },
              { content: "ปลาชอบน้ำเย็น", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สำนวน 'เข้าเมืองตาหลิ่ว ต้องหลิ่วตาตาม' หมายถึง?",
            difficulty: "MEDIUM",
            explanation: "ควรประพฤติตามธรรมเนียมของสถานที่ที่เราไปอยู่",
            options: [
              { content: "ต้องหลิ่วตา", isCorrect: false, order: 1 },
              { content: "ทำตัวให้เข้ากับท้องถิ่น", isCorrect: true, order: 2 },
              { content: "เดินทางบ่อย ๆ", isCorrect: false, order: 3 },
              { content: "อยู่บ้านดีกว่า", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สำนวน 'ตำน้ำพริกละลายแม่น้ำ' หมายถึง?",
            difficulty: "MEDIUM",
            explanation: "ลงทุนหรือใช้จ่ายไปโดยเปล่าประโยชน์ ไม่ได้ผลคุ้มค่า",
            options: [
              { content: "ทำอาหารจำนวนมาก", isCorrect: false, order: 1 },
              { content: "ใช้จ่ายเปล่าประโยชน์", isCorrect: true, order: 2 },
              { content: "ทำงานหนัก", isCorrect: false, order: 3 },
              { content: "ประหยัดเงิน", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Sentence Ordering",
        nameTh: "การเรียงประโยค",
        slug: "sentence-ordering",
        description: "เรียงลำดับข้อความให้เป็นประโยคหรือเรื่องที่สมบูรณ์",
        order: 4,
        questions: [
          {
            content: "เรียงประโยคให้ถูกต้อง: (1) จึงไปโรงเรียน (2) เขาตื่นนอน (3) อาบน้ำแต่งตัว",
            difficulty: "EASY",
            explanation: "ลำดับเหตุการณ์ตามธรรมชาติ: ตื่นนอน → อาบน้ำแต่งตัว → ไปโรงเรียน คือ 2-3-1",
            options: [
              { content: "1-2-3", isCorrect: false, order: 1 },
              { content: "2-3-1", isCorrect: true, order: 2 },
              { content: "3-2-1", isCorrect: false, order: 3 },
              { content: "2-1-3", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เรียงประโยค: (1) ทำให้น้ำท่วม (2) ฝนตกหนัก (3) ประชาชนเดือดร้อน",
            difficulty: "MEDIUM",
            explanation: "เหตุ-ผลต่อเนื่อง: ฝนตกหนัก → ทำให้น้ำท่วม → ประชาชนเดือดร้อน คือ 2-1-3",
            options: [
              { content: "2-1-3", isCorrect: true, order: 1 },
              { content: "1-2-3", isCorrect: false, order: 2 },
              { content: "3-2-1", isCorrect: false, order: 3 },
              { content: "2-3-1", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เรียงประโยค: (1) เก็บเงินได้มากพอ (2) เขาทำงานหนัก (3) จึงซื้อบ้านได้",
            difficulty: "MEDIUM",
            explanation: "ลำดับเหตุผล: ทำงานหนัก → เก็บเงินได้มากพอ → จึงซื้อบ้านได้ คือ 2-1-3",
            options: [
              { content: "2-1-3", isCorrect: true, order: 1 },
              { content: "1-2-3", isCorrect: false, order: 2 },
              { content: "2-3-1", isCorrect: false, order: 3 },
              { content: "3-1-2", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อความใดควรเป็นประโยคแรกของย่อหน้าเรื่อง 'การออกกำลังกาย'?",
            difficulty: "MEDIUM",
            explanation: "ประโยคนำควรเป็นใจความหลัก/บทนำกว้าง ๆ ก่อนลงรายละเอียด",
            options: [
              { content: "เช่น วิ่ง ว่ายน้ำ ปั่นจักรยาน", isCorrect: false, order: 1 },
              { content: "การออกกำลังกายมีประโยชน์ต่อสุขภาพ", isCorrect: true, order: 2 },
              { content: "ดังนั้นจึงควรทำสม่ำเสมอ", isCorrect: false, order: 3 },
              { content: "และช่วยลดความเครียดได้ด้วย", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เรียงประโยค: (1) ปรุงรสตามชอบ (2) ล้างผัก (3) หั่นเป็นชิ้น (4) นำไปผัด",
            difficulty: "MEDIUM",
            explanation: "ขั้นตอนทำอาหาร: ล้างผัก → หั่นเป็นชิ้น → นำไปผัด → ปรุงรส คือ 2-3-4-1",
            options: [
              { content: "2-3-4-1", isCorrect: true, order: 1 },
              { content: "1-2-3-4", isCorrect: false, order: 2 },
              { content: "2-3-1-4", isCorrect: false, order: 3 },
              { content: "3-2-4-1", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้อความใดควรเป็นประโยคปิดท้ายย่อหน้า?",
            difficulty: "EASY",
            explanation: "ประโยคปิดมักสรุปด้วยคำว่า 'ดังนั้น/จึง' เพื่อรวบความ",
            options: [
              { content: "ประการแรก...", isCorrect: false, order: 1 },
              { content: "ดังนั้นเราจึงควรช่วยกันรักษาสิ่งแวดล้อม", isCorrect: true, order: 2 },
              { content: "ตัวอย่างเช่น...", isCorrect: false, order: 3 },
              { content: "นอกจากนี้...", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เรียงประโยค: (1) จึงสอบผ่าน (2) อ่านหนังสือทุกวัน (3) ตั้งใจเรียน",
            difficulty: "EASY",
            explanation: "เหตุ-ผล: ตั้งใจเรียน → อ่านหนังสือทุกวัน → จึงสอบผ่าน คือ 3-2-1",
            options: [
              { content: "3-2-1", isCorrect: true, order: 1 },
              { content: "2-3-1", isCorrect: false, order: 2 },
              { content: "1-2-3", isCorrect: false, order: 3 },
              { content: "2-1-3", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เรียงประโยค: (1) ออกผลให้เก็บเกี่ยว (2) ปลูกต้นไม้ (3) รดน้ำพรวนดิน",
            difficulty: "MEDIUM",
            explanation: "ลำดับการเกษตร: ปลูกต้นไม้ → รดน้ำพรวนดิน → ออกผลให้เก็บเกี่ยว คือ 2-3-1",
            options: [
              { content: "2-3-1", isCorrect: true, order: 1 },
              { content: "1-2-3", isCorrect: false, order: 2 },
              { content: "3-2-1", isCorrect: false, order: 3 },
              { content: "2-1-3", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "English Language",
    nameTh: "ภาษาอังกฤษ",
    slug: "english",
    description: "ทดสอบทักษะภาษาอังกฤษ ไวยากรณ์ และการอ่าน",
    icon: "🔤",
    color: "#8B5CF6",
    order: 3,
    topics: [
      {
        name: "Grammar & Vocabulary",
        nameTh: "ไวยากรณ์และคำศัพท์",
        slug: "english-grammar",
        description: "ไวยากรณ์ภาษาอังกฤษและคำศัพท์ที่ใช้บ่อย",
        order: 1,
        questions: [
          {
            content: "Choose the correct sentence:",
            difficulty: "MEDIUM",
            explanation: "'She has worked here for five years' เป็น Present Perfect เพราะเป็นสิ่งที่ยังทำอยู่ถึงปัจจุบัน",
            options: [
              { content: "She work here for five years.", isCorrect: false, order: 1 },
              { content: "She has worked here for five years.", isCorrect: true, order: 2 },
              { content: "She is working here since five years.", isCorrect: false, order: 3 },
              { content: "She worked here since five years.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "The word 'benevolent' is closest in meaning to:",
            difficulty: "MEDIUM",
            explanation: "'Benevolent' หมายถึง มีความเมตตา ใจดี ตรงกับ 'kind and generous'",
            options: [
              { content: "strict and demanding", isCorrect: false, order: 1 },
              { content: "kind and generous", isCorrect: true, order: 2 },
              { content: "cold and indifferent", isCorrect: false, order: 3 },
              { content: "fierce and aggressive", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Fill in the blank: If I _____ rich, I would travel the world.",
            difficulty: "MEDIUM",
            explanation: "Second Conditional ใช้ were + would + V1: 'If I were rich, I would travel'",
            options: [
              { content: "am", isCorrect: false, order: 1 },
              { content: "will be", isCorrect: false, order: 2 },
              { content: "were", isCorrect: true, order: 3 },
              { content: "had been", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "The passive voice of 'The teacher teaches the students' is:",
            difficulty: "MEDIUM",
            explanation: "Passive voice: The students are taught by the teacher (Subject + is/are + V3 + by + agent)",
            options: [
              { content: "The students taught by the teacher.", isCorrect: false, order: 1 },
              { content: "The students are taught by the teacher.", isCorrect: true, order: 2 },
              { content: "The students were taught by the teacher.", isCorrect: false, order: 3 },
              { content: "The teacher is taught the students.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Which word is a synonym of 'diligent'?",
            difficulty: "EASY",
            explanation: "'Diligent' หมายถึง ขยันหมั่นเพียร ตรงกับ 'hardworking'",
            options: [
              { content: "lazy", isCorrect: false, order: 1 },
              { content: "hardworking", isCorrect: true, order: 2 },
              { content: "careless", isCorrect: false, order: 3 },
              { content: "reckless", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Choose the correct form: He _____ to school every day.",
            difficulty: "EASY",
            explanation: "Present Simple กับ He ต้องเติม s: goes",
            options: [
              { content: "go", isCorrect: false, order: 1 },
              { content: "goes", isCorrect: true, order: 2 },
              { content: "going", isCorrect: false, order: 3 },
              { content: "gone", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Choose the antonym of 'generous':",
            difficulty: "MEDIUM",
            explanation: "'Generous' (ใจกว้าง) ตรงข้ามกับ 'stingy' (ขี้เหนียว)",
            options: [
              { content: "kind", isCorrect: false, order: 1 },
              { content: "stingy", isCorrect: true, order: 2 },
              { content: "friendly", isCorrect: false, order: 3 },
              { content: "warm", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "They have lived here _____ 2010.",
            difficulty: "MEDIUM",
            explanation: "'since' ใช้กับจุดเวลา (2010), 'for' ใช้กับช่วงเวลา",
            options: [
              { content: "for", isCorrect: false, order: 1 },
              { content: "since", isCorrect: true, order: 2 },
              { content: "from", isCorrect: false, order: 3 },
              { content: "at", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "This box is _____ than that one.",
            difficulty: "EASY",
            explanation: "Comparative ของ heavy = heavier (เปลี่ยน y เป็น i + er)",
            options: [
              { content: "heavy", isCorrect: false, order: 1 },
              { content: "heavier", isCorrect: true, order: 2 },
              { content: "heaviest", isCorrect: false, order: 3 },
              { content: "more heavy", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "The word 'abundant' means:",
            difficulty: "MEDIUM",
            explanation: "'Abundant' หมายถึง มีมาก อุดมสมบูรณ์ = plentiful",
            options: [
              { content: "scarce", isCorrect: false, order: 1 },
              { content: "plentiful", isCorrect: true, order: 2 },
              { content: "empty", isCorrect: false, order: 3 },
              { content: "rare", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "I saw _____ elephant at the zoo.",
            difficulty: "EASY",
            explanation: "ใช้ 'an' หน้าคำที่ขึ้นต้นด้วยเสียงสระ (elephant)",
            options: [
              { content: "a", isCorrect: false, order: 1 },
              { content: "an", isCorrect: true, order: 2 },
              { content: "the", isCorrect: false, order: 3 },
              { content: "no article", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Neither John nor his friends _____ coming.",
            difficulty: "HARD",
            explanation: "Neither...nor ใช้กริยาตามประธานที่อยู่ใกล้ที่สุด (friends = are)",
            options: [
              { content: "is", isCorrect: false, order: 1 },
              { content: "are", isCorrect: true, order: 2 },
              { content: "was", isCorrect: false, order: 3 },
              { content: "am", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Reading Comprehension",
        nameTh: "การอ่านภาษาอังกฤษ",
        slug: "english-reading",
        description: "ฝึกอ่านบทความภาษาอังกฤษและตอบคำถาม",
        order: 2,
        questions: [
          {
            content: "Read: 'Climate change affects weather patterns, sea levels, and biodiversity worldwide.' What is the main topic?",
            difficulty: "EASY",
            explanation: "บทความพูดถึง Climate change และผลกระทบ ดังนั้น main topic คือ climate change and its impacts",
            options: [
              { content: "Weather forecasting", isCorrect: false, order: 1 },
              { content: "Climate change and its impacts", isCorrect: true, order: 2 },
              { content: "Ocean biodiversity", isCorrect: false, order: 3 },
              { content: "Environmental laws", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "The word 'pressing' in 'one of the most pressing issues' means:",
            difficulty: "MEDIUM",
            explanation: "'Pressing' ในบริบทนี้หมายถึง urgent/important ไม่ใช่การกด",
            options: [
              { content: "pushing physically", isCorrect: false, order: 1 },
              { content: "urgent and important", isCorrect: true, order: 2 },
              { content: "difficult to understand", isCorrect: false, order: 3 },
              { content: "controversial", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Choose the sentence with correct punctuation:",
            difficulty: "MEDIUM",
            explanation: "ประโยคที่ถูกต้องมี comma หลัง introductory word (However)",
            options: [
              { content: "However he decided to stay.", isCorrect: false, order: 1 },
              { content: "However, he decided to stay.", isCorrect: true, order: 2 },
              { content: "However he decided, to stay.", isCorrect: false, order: 3 },
              { content: "However he decided to stay!", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "What does 'FAQ' stand for?",
            difficulty: "EASY",
            explanation: "FAQ = Frequently Asked Questions = คำถามที่พบบ่อย",
            options: [
              { content: "Fast Answer Questions", isCorrect: false, order: 1 },
              { content: "Frequently Asked Questions", isCorrect: true, order: 2 },
              { content: "Full Accuracy Queries", isCorrect: false, order: 3 },
              { content: "Formal Answer Questionnaire", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Choose the correct preposition: She is interested _____ learning Thai.",
            difficulty: "EASY",
            explanation: "'Interested in' เป็น collocation ที่ถูกต้อง",
            options: [
              { content: "at", isCorrect: false, order: 1 },
              { content: "on", isCorrect: false, order: 2 },
              { content: "in", isCorrect: true, order: 3 },
              { content: "for", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "The cat is hiding _____ the table.",
            difficulty: "EASY",
            explanation: "'under' หมายถึง ใต้ ใช้เมื่ออยู่ข้างใต้โต๊ะ",
            options: [
              { content: "on", isCorrect: false, order: 1 },
              { content: "under", isCorrect: true, order: 2 },
              { content: "at", isCorrect: false, order: 3 },
              { content: "of", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "'Reduce, Reuse, Recycle' relates mainly to:",
            difficulty: "EASY",
            explanation: "เป็นหลัก 3R เกี่ยวกับการจัดการขยะและสิ่งแวดล้อม",
            options: [
              { content: "Cooking", isCorrect: false, order: 1 },
              { content: "Environment / waste management", isCorrect: true, order: 2 },
              { content: "Banking", isCorrect: false, order: 3 },
              { content: "Sports", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "What does 'ASAP' stand for?",
            difficulty: "EASY",
            explanation: "ASAP = As Soon As Possible (โดยเร็วที่สุด)",
            options: [
              { content: "As Slow As Possible", isCorrect: false, order: 1 },
              { content: "As Soon As Possible", isCorrect: true, order: 2 },
              { content: "Always Stay At Place", isCorrect: false, order: 3 },
              { content: "After Sales And Profit", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Choose the synonym of 'tired':",
            difficulty: "EASY",
            explanation: "'Exhausted' หมายถึงเหนื่อยมาก ตรงกับ tired",
            options: [
              { content: "energetic", isCorrect: false, order: 1 },
              { content: "exhausted", isCorrect: true, order: 2 },
              { content: "happy", isCorrect: false, order: 3 },
              { content: "fresh", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Complete the dialogue: 'How are you?' '_____'",
            difficulty: "EASY",
            explanation: "คำตอบทักทายที่เหมาะสมคือ 'I'm fine, thank you.'",
            options: [
              { content: "I am a teacher.", isCorrect: false, order: 1 },
              { content: "I'm fine, thank you.", isCorrect: true, order: 2 },
              { content: "It is Monday.", isCorrect: false, order: 3 },
              { content: "Yes, I do.", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Conversation",
        nameTh: "บทสนทนาภาษาอังกฤษ",
        slug: "english-conversation",
        description: "เลือกประโยคสนทนาที่เหมาะสมกับสถานการณ์",
        order: 3,
        questions: [
          {
            content: "A: 'Thank you for your help.' B: '_____'",
            difficulty: "EASY",
            explanation: "การตอบรับคำขอบคุณที่สุภาพคือ 'You're welcome.'",
            options: [
              { content: "You're welcome.", isCorrect: true, order: 1 },
              { content: "I'm sorry.", isCorrect: false, order: 2 },
              { content: "Yes, please.", isCorrect: false, order: 3 },
              { content: "No, thanks.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "A: 'Would you like some coffee?' B: '_____'",
            difficulty: "EASY",
            explanation: "การตอบรับข้อเสนออย่างสุภาพคือ 'Yes, please.'",
            options: [
              { content: "Yes, please.", isCorrect: true, order: 1 },
              { content: "You're welcome.", isCorrect: false, order: 2 },
              { content: "Never mind.", isCorrect: false, order: 3 },
              { content: "Here you are.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "A: 'Could you tell me the way to the station?' B: '_____'",
            difficulty: "MEDIUM",
            explanation: "เมื่อถูกถามทาง ตอบด้วยการให้ทิศทาง 'Sure, go straight ahead.'",
            options: [
              { content: "Sure, go straight ahead.", isCorrect: true, order: 1 },
              { content: "No, thank you.", isCorrect: false, order: 2 },
              { content: "I'm fine.", isCorrect: false, order: 3 },
              { content: "It's delicious.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "A: 'I'm sorry I'm late.' B: '_____'",
            difficulty: "MEDIUM",
            explanation: "การให้อภัยที่สุภาพคือ 'That's all right.'",
            options: [
              { content: "That's all right.", isCorrect: true, order: 1 },
              { content: "You're welcome.", isCorrect: false, order: 2 },
              { content: "Yes, I do.", isCorrect: false, order: 3 },
              { content: "Good luck.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "On the phone: 'Hello, may I speak to John?' '_____'",
            difficulty: "MEDIUM",
            explanation: "การรับโทรศัพท์ที่ถูกต้องคือ 'Hold on, please.' (รอสักครู่)",
            options: [
              { content: "Hold on, please.", isCorrect: true, order: 1 },
              { content: "You're welcome.", isCorrect: false, order: 2 },
              { content: "Help yourself.", isCorrect: false, order: 3 },
              { content: "Never mind.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "A: 'How was your trip?' B: '_____'",
            difficulty: "EASY",
            explanation: "ตอบเกี่ยวกับประสบการณ์ทริปคือ 'It was wonderful!'",
            options: [
              { content: "It was wonderful!", isCorrect: true, order: 1 },
              { content: "You're welcome.", isCorrect: false, order: 2 },
              { content: "Yes, I can.", isCorrect: false, order: 3 },
              { content: "Here you are.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "At a restaurant: 'Are you ready to order?' '_____'",
            difficulty: "MEDIUM",
            explanation: "เมื่อบริกรถาม ตอบขอเวลาอีกนิดคือ 'Just a moment, please.'",
            options: [
              { content: "Just a moment, please.", isCorrect: true, order: 1 },
              { content: "You're welcome.", isCorrect: false, order: 2 },
              { content: "I'm sorry.", isCorrect: false, order: 3 },
              { content: "Good night.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "A: 'Nice to meet you.' B: '_____'",
            difficulty: "EASY",
            explanation: "การตอบทักทายเมื่อพบกันครั้งแรกคือ 'Nice to meet you, too.'",
            options: [
              { content: "Nice to meet you, too.", isCorrect: true, order: 1 },
              { content: "You're welcome.", isCorrect: false, order: 2 },
              { content: "No problem.", isCorrect: false, order: 3 },
              { content: "Goodbye.", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Civil Service Regulations",
    nameTh: "ระเบียบราชการ",
    slug: "civil-service",
    description: "กฎหมายและระเบียบที่เกี่ยวข้องกับข้าราชการ",
    icon: "⚖️",
    color: "#F59E0B",
    order: 4,
    topics: [
      {
        name: "Civil Service Act",
        nameTh: "พรบ. ระเบียบข้าราชการพลเรือน",
        slug: "civil-service-act",
        description: "พระราชบัญญัติระเบียบข้าราชการพลเรือน พ.ศ. 2551",
        order: 1,
        questions: [
          {
            content: "พระราชบัญญัติระเบียบข้าราชการพลเรือนฉบับปัจจุบัน คือ พ.ศ. ใด?",
            difficulty: "MEDIUM",
            explanation: "พรบ. ระเบียบข้าราชการพลเรือนฉบับปัจจุบันคือ พ.ศ. 2551",
            options: [
              { content: "พ.ศ. 2535", isCorrect: false, order: 1 },
              { content: "พ.ศ. 2545", isCorrect: false, order: 2 },
              { content: "พ.ศ. 2551", isCorrect: true, order: 3 },
              { content: "พ.ศ. 2560", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้าราชการพลเรือนสามัญแบ่งออกเป็นกี่ประเภท?",
            difficulty: "MEDIUM",
            explanation: "ตาม พรบ. 2551 แบ่งเป็น 4 ประเภท: บริหาร อำนวยการ วิชาการ และทั่วไป",
            options: [
              { content: "2 ประเภท", isCorrect: false, order: 1 },
              { content: "3 ประเภท", isCorrect: false, order: 2 },
              { content: "4 ประเภท", isCorrect: true, order: 3 },
              { content: "5 ประเภท", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "อายุขั้นต่ำในการสมัครสอบเข้าเป็นข้าราชการพลเรือนคือกี่ปี?",
            difficulty: "EASY",
            explanation: "ผู้สมัครสอบข้าราชการต้องมีอายุไม่ต่ำกว่า 18 ปี",
            options: [
              { content: "15 ปี", isCorrect: false, order: 1 },
              { content: "18 ปี", isCorrect: true, order: 2 },
              { content: "20 ปี", isCorrect: false, order: 3 },
              { content: "25 ปี", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ผู้รักษาการตามพระราชบัญญัติระเบียบข้าราชการพลเรือน พ.ศ. 2551 คือใคร?",
            difficulty: "MEDIUM",
            explanation: "นายกรัฐมนตรีเป็นผู้รักษาการตาม พรบ. ระเบียบข้าราชการพลเรือน 2551",
            options: [
              { content: "รัฐมนตรีว่าการกระทรวงการคลัง", isCorrect: false, order: 1 },
              { content: "นายกรัฐมนตรี", isCorrect: true, order: 2 },
              { content: "เลขาธิการ ก.พ.", isCorrect: false, order: 3 },
              { content: "ปลัดสำนักนายกรัฐมนตรี", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "โทษทางวินัยของข้าราชการพลเรือนมีกี่สถาน?",
            difficulty: "MEDIUM",
            explanation: "โทษทางวินัยมี 5 สถาน: ภาคทัณฑ์ ตัดเงินเดือน ลดเงินเดือน ปลดออก ไล่ออก",
            options: [
              { content: "3 สถาน", isCorrect: false, order: 1 },
              { content: "4 สถาน", isCorrect: false, order: 2 },
              { content: "5 สถาน", isCorrect: true, order: 3 },
              { content: "6 สถาน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "โทษทางวินัยที่ร้ายแรงที่สุดคือ?",
            difficulty: "EASY",
            explanation: "ไล่ออกเป็นโทษร้ายแรงที่สุด ผู้ถูกไล่ออกไม่มีสิทธิรับบำเหน็จบำนาญ",
            options: [
              { content: "ปลดออก", isCorrect: false, order: 1 },
              { content: "ไล่ออก", isCorrect: true, order: 2 },
              { content: "ลดเงินเดือน", isCorrect: false, order: 3 },
              { content: "ภาคทัณฑ์", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ก.พ. ย่อมาจากอะไร?",
            difficulty: "EASY",
            explanation: "ก.พ. = คณะกรรมการข้าราชการพลเรือน",
            options: [
              { content: "กองบริหารพล", isCorrect: false, order: 1 },
              { content: "คณะกรรมการข้าราชการพลเรือน", isCorrect: true, order: 2 },
              { content: "การพัฒนาบุคคล", isCorrect: false, order: 3 },
              { content: "กรมพลเรือน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้าราชการพลเรือนประเภท 'วิชาการ' มีกี่ระดับ?",
            difficulty: "MEDIUM",
            explanation: "ประเภทวิชาการมี 5 ระดับ: ปฏิบัติการ ชำนาญการ ชำนาญการพิเศษ เชี่ยวชาญ ทรงคุณวุฒิ",
            options: [
              { content: "3 ระดับ", isCorrect: false, order: 1 },
              { content: "4 ระดับ", isCorrect: false, order: 2 },
              { content: "5 ระดับ", isCorrect: true, order: 3 },
              { content: "6 ระดับ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ผู้ที่ถูกลงโทษ 'ปลดออก' มีสิทธิได้รับบำเหน็จบำนาญหรือไม่?",
            difficulty: "HARD",
            explanation: "ผู้ถูกปลดออกยังมีสิทธิได้รับบำเหน็จบำนาญ ต่างจากไล่ออกที่ไม่มีสิทธิ",
            options: [
              { content: "ไม่มีสิทธิเลย", isCorrect: false, order: 1 },
              { content: "มีสิทธิได้รับ", isCorrect: true, order: 2 },
              { content: "ได้รับครึ่งหนึ่ง", isCorrect: false, order: 3 },
              { content: "ขึ้นอยู่กับศาล", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "องค์กรกลางบริหารงานบุคคลของข้าราชการพลเรือนคือ?",
            difficulty: "MEDIUM",
            explanation: "สำนักงาน ก.พ. เป็นองค์กรกลางบริหารงานบุคคลของข้าราชการพลเรือน",
            options: [
              { content: "สำนักงาน ก.พ.", isCorrect: true, order: 1 },
              { content: "กรมบัญชีกลาง", isCorrect: false, order: 2 },
              { content: "สำนักงบประมาณ", isCorrect: false, order: 3 },
              { content: "กระทรวงมหาดไทย", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Government Ethics",
        nameTh: "จริยธรรมข้าราชการ",
        slug: "government-ethics",
        description: "มาตรฐานจริยธรรมและธรรมาภิบาลของข้าราชการ",
        order: 2,
        questions: [
          {
            content: "หลักธรรมาภิบาล (Good Governance) ประกอบด้วยกี่หลักการ?",
            difficulty: "MEDIUM",
            explanation: "หลักธรรมาภิบาลมี 6 หลัก: นิติธรรม คุณธรรม โปร่งใส มีส่วนร่วม รับผิดชอบ คุ้มค่า",
            options: [
              { content: "4 หลัก", isCorrect: false, order: 1 },
              { content: "5 หลัก", isCorrect: false, order: 2 },
              { content: "6 หลัก", isCorrect: true, order: 3 },
              { content: "8 หลัก", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "หลัก 'ความโปร่งใส' ในธรรมาภิบาลหมายถึง?",
            difficulty: "EASY",
            explanation: "ความโปร่งใส = การเปิดเผยข้อมูล ตรวจสอบได้",
            options: [
              { content: "การปกปิดข้อมูล", isCorrect: false, order: 1 },
              { content: "การเปิดเผยข้อมูลและตรวจสอบได้", isCorrect: true, order: 2 },
              { content: "การทำงานเร็ว", isCorrect: false, order: 3 },
              { content: "การประหยัด", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "การกระทำใดถือเป็นผลประโยชน์ทับซ้อน (Conflict of Interest)?",
            difficulty: "HARD",
            explanation: "การใช้ตำแหน่งหน้าที่เอื้อประโยชน์ส่วนตัวหรือพวกพ้องถือเป็นผลประโยชน์ทับซ้อน",
            options: [
              { content: "ทำงานตรงเวลา", isCorrect: false, order: 1 },
              { content: "ใช้ตำแหน่งเอื้อประโยชน์ส่วนตัว", isCorrect: true, order: 2 },
              { content: "ช่วยเหลือประชาชน", isCorrect: false, order: 3 },
              { content: "ประชุมตามวาระ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ค่านิยมหลักของข้าราชการข้อใดเน้น 'การยึดมั่นในความถูกต้องชอบธรรม'?",
            difficulty: "MEDIUM",
            explanation: "การยึดมั่นในความถูกต้องชอบธรรมและจริยธรรมเป็นค่านิยมหลักของข้าราชการ",
            options: [
              { content: "ทำงานเร็ว", isCorrect: false, order: 1 },
              { content: "ยึดมั่นความถูกต้องชอบธรรม", isCorrect: true, order: 2 },
              { content: "ประหยัดงบ", isCorrect: false, order: 3 },
              { content: "ทำงานคนเดียว", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "การรับสินบนของข้าราชการถือเป็นความผิดประเภทใด?",
            difficulty: "MEDIUM",
            explanation: "การรับสินบนถือเป็นการทุจริตต่อหน้าที่ ซึ่งเป็นความผิดวินัยร้ายแรงและความผิดอาญา",
            options: [
              { content: "ความผิดเล็กน้อย", isCorrect: false, order: 1 },
              { content: "การทุจริตต่อหน้าที่ (ผิดร้ายแรง)", isCorrect: true, order: 2 },
              { content: "ไม่ผิดถ้าไม่มีคนรู้", isCorrect: false, order: 3 },
              { content: "เป็นเรื่องส่วนตัว", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "หลัก 'ความคุ้มค่า' ในธรรมาภิบาลหมายถึง?",
            difficulty: "EASY",
            explanation: "ความคุ้มค่า = การใช้ทรัพยากรอย่างประหยัดและเกิดประโยชน์สูงสุด",
            options: [
              { content: "ใช้เงินให้มาก", isCorrect: false, order: 1 },
              { content: "ใช้ทรัพยากรอย่างประหยัดและเกิดประโยชน์สูงสุด", isCorrect: true, order: 2 },
              { content: "ทำงานช้า ๆ", isCorrect: false, order: 3 },
              { content: "ซื้อของแพง", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ข้าราชการที่ดีควรยึดถือประโยชน์ของใครเป็นหลัก?",
            difficulty: "EASY",
            explanation: "ข้าราชการที่ดีต้องยึดถือประโยชน์ส่วนรวมและประชาชนเป็นหลัก",
            options: [
              { content: "ประโยชน์ส่วนตัว", isCorrect: false, order: 1 },
              { content: "ประโยชน์ส่วนรวม/ประชาชน", isCorrect: true, order: 2 },
              { content: "ประโยชน์ของหัวหน้า", isCorrect: false, order: 3 },
              { content: "ประโยชน์ของพรรคพวก", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "หลัก 'การมีส่วนร่วม' ในธรรมาภิบาลหมายถึง?",
            difficulty: "MEDIUM",
            explanation: "การเปิดโอกาสให้ประชาชนมีส่วนร่วมในการตัดสินใจและตรวจสอบการทำงานของรัฐ",
            options: [
              { content: "ทำงานคนเดียว", isCorrect: false, order: 1 },
              { content: "เปิดโอกาสให้ประชาชนมีส่วนร่วม", isCorrect: true, order: 2 },
              { content: "ปิดข้อมูล", isCorrect: false, order: 3 },
              { content: "ทำตามคำสั่งเท่านั้น", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Administrative Law",
        nameTh: "กฎหมายปกครองและการบริหารราชการ",
        slug: "administrative-law",
        description: "พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน พ.ร.ฎ.บ้านเมืองที่ดี และวิธีปฏิบัติราชการทางปกครอง",
        order: 3,
        questions: [
          {
            content: "การบริหารราชการแผ่นดินแบ่งออกเป็นกี่ส่วน?",
            difficulty: "MEDIUM",
            explanation: "ตาม พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน แบ่งเป็น 3 ส่วน: ส่วนกลาง ส่วนภูมิภาค และส่วนท้องถิ่น",
            options: [
              { content: "2 ส่วน", isCorrect: false, order: 1 },
              { content: "3 ส่วน", isCorrect: true, order: 2 },
              { content: "4 ส่วน", isCorrect: false, order: 3 },
              { content: "5 ส่วน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ราชการบริหารส่วนภูมิภาคประกอบด้วยหน่วยใด?",
            difficulty: "MEDIUM",
            explanation: "ราชการส่วนภูมิภาคได้แก่ จังหวัด และอำเภอ",
            options: [
              { content: "กระทรวง กรม", isCorrect: false, order: 1 },
              { content: "จังหวัด อำเภอ", isCorrect: true, order: 2 },
              { content: "อบต. เทศบาล", isCorrect: false, order: 3 },
              { content: "หมู่บ้าน ตำบล", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ผู้ว่าราชการจังหวัดเป็นข้าราชการสังกัดส่วนใด?",
            difficulty: "EASY",
            explanation: "ผู้ว่าราชการจังหวัดเป็นหัวหน้าราชการบริหารส่วนภูมิภาคในจังหวัด สังกัดกระทรวงมหาดไทย",
            options: [
              { content: "ส่วนท้องถิ่น", isCorrect: false, order: 1 },
              { content: "ส่วนภูมิภาค", isCorrect: true, order: 2 },
              { content: "ส่วนกลางเท่านั้น", isCorrect: false, order: 3 },
              { content: "องค์กรอิสระ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "พ.ร.ฎ.ว่าด้วยหลักเกณฑ์และวิธีการบริหารกิจการบ้านเมืองที่ดี มีเป้าหมายหลักเพื่อ?",
            difficulty: "MEDIUM",
            explanation: "มุ่งให้การบริหารราชการเกิดประโยชน์สุขของประชาชน เกิดผลสัมฤทธิ์ และมีประสิทธิภาพคุ้มค่า",
            options: [
              { content: "เพิ่มจำนวนข้าราชการ", isCorrect: false, order: 1 },
              { content: "ประโยชน์สุขของประชาชนและประสิทธิภาพ", isCorrect: true, order: 2 },
              { content: "ลดอำนาจประชาชน", isCorrect: false, order: 3 },
              { content: "เพิ่มงบประมาณ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ราชการบริหารส่วนท้องถิ่นรูปแบบใดต่อไปนี้ถูกต้อง?",
            difficulty: "MEDIUM",
            explanation: "ราชการส่วนท้องถิ่น เช่น อบต. เทศบาล อบจ. กรุงเทพมหานคร เมืองพัทยา",
            options: [
              { content: "กระทรวง", isCorrect: false, order: 1 },
              { content: "เทศบาล / อบต. / อบจ.", isCorrect: true, order: 2 },
              { content: "จังหวัด", isCorrect: false, order: 3 },
              { content: "อำเภอ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ตาม พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง 'คำสั่งทางปกครอง' หมายถึง?",
            difficulty: "HARD",
            explanation: "การใช้อำนาจตามกฎหมายของเจ้าหน้าที่ที่มีผลกระทบต่อสิทธิหน้าที่ของบุคคล เช่น การออกใบอนุญาต",
            options: [
              { content: "การประชุมภายใน", isCorrect: false, order: 1 },
              { content: "การใช้อำนาจที่กระทบสิทธิของบุคคล เช่น ออกใบอนุญาต", isCorrect: true, order: 2 },
              { content: "การพูดคุยทั่วไป", isCorrect: false, order: 3 },
              { content: "การเขียนรายงาน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "คู่กรณีในกระบวนการพิจารณาทางปกครองมีสิทธิใดที่สำคัญ?",
            difficulty: "MEDIUM",
            explanation: "มีสิทธิได้รับแจ้งข้อเท็จจริงและโต้แย้งแสดงพยานหลักฐานก่อนมีคำสั่ง (สิทธิในการได้รับฟัง)",
            options: [
              { content: "สิทธิออกคำสั่งเอง", isCorrect: false, order: 1 },
              { content: "สิทธิได้รับฟังและโต้แย้งแสดงพยานหลักฐาน", isCorrect: true, order: 2 },
              { content: "สิทธิแต่งตั้งเจ้าหน้าที่", isCorrect: false, order: 3 },
              { content: "สิทธิยกเลิกกฎหมาย", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "หัวหน้ารัฐบาลผู้กำกับการบริหารราชการแผ่นดินคือ?",
            difficulty: "EASY",
            explanation: "นายกรัฐมนตรีเป็นหัวหน้ารัฐบาลและกำกับการบริหารราชการแผ่นดิน",
            options: [
              { content: "ประธานรัฐสภา", isCorrect: false, order: 1 },
              { content: "นายกรัฐมนตรี", isCorrect: true, order: 2 },
              { content: "ปลัดกระทรวง", isCorrect: false, order: 3 },
              { content: "ผู้ว่าราชการจังหวัด", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "General Knowledge",
    nameTh: "ความรู้ทั่วไป",
    slug: "general-knowledge",
    description: "ความรู้ทั่วไป เหตุการณ์ปัจจุบัน และประวัติศาสตร์ไทย",
    icon: "🌏",
    color: "#10B981",
    order: 5,
    topics: [
      {
        name: "Thai History & Society",
        nameTh: "ประวัติศาสตร์และสังคมไทย",
        slug: "thai-history",
        description: "ประวัติศาสตร์ไทยและสังคมไทยที่ออกสอบ",
        order: 1,
        questions: [
          {
            content: "กรุงรัตนโกสินทร์ถูกตั้งขึ้นในปี พ.ศ. ใด?",
            difficulty: "EASY",
            explanation: "กรุงรัตนโกสินทร์ตั้งขึ้นเมื่อ พ.ศ. 2325 โดยพระบาทสมเด็จพระพุทธยอดฟ้าจุฬาโลกมหาราช (ร.1)",
            options: [
              { content: "พ.ศ. 2310", isCorrect: false, order: 1 },
              { content: "พ.ศ. 2325", isCorrect: true, order: 2 },
              { content: "พ.ศ. 2350", isCorrect: false, order: 3 },
              { content: "พ.ศ. 2400", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "วันพ่อแห่งชาติของไทยตรงกับวันใด?",
            difficulty: "EASY",
            explanation: "วันพ่อแห่งชาติตรงกับวันที่ 5 ธันวาคม ซึ่งเป็นวันคล้ายวันพระราชสมภพของรัชกาลที่ 9",
            options: [
              { content: "5 ธันวาคม", isCorrect: true, order: 1 },
              { content: "12 สิงหาคม", isCorrect: false, order: 2 },
              { content: "1 มกราคม", isCorrect: false, order: 3 },
              { content: "10 ธันวาคม", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ประเทศไทยปกครองด้วยระบอบใดในปัจจุบัน?",
            difficulty: "EASY",
            explanation: "ไทยปกครองด้วยระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุข",
            options: [
              { content: "สาธารณรัฐ", isCorrect: false, order: 1 },
              { content: "ประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุข", isCorrect: true, order: 2 },
              { content: "สมบูรณาญาสิทธิราชย์", isCorrect: false, order: 3 },
              { content: "สังคมนิยม", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ธงชาติไทยมีกี่สี?",
            difficulty: "EASY",
            explanation: "ธงชาติไทยมี 3 สี คือ แดง ขาว และน้ำเงิน",
            options: [
              { content: "2 สี", isCorrect: false, order: 1 },
              { content: "3 สี", isCorrect: true, order: 2 },
              { content: "4 สี", isCorrect: false, order: 3 },
              { content: "5 สี", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ไทยเปลี่ยนแปลงการปกครองเป็นระบอบประชาธิปไตยในปี พ.ศ. ใด?",
            difficulty: "MEDIUM",
            explanation: "เปลี่ยนแปลงการปกครอง 24 มิถุนายน พ.ศ. 2475 โดยคณะราษฎร",
            options: [
              { content: "พ.ศ. 2475", isCorrect: true, order: 1 },
              { content: "พ.ศ. 2500", isCorrect: false, order: 2 },
              { content: "พ.ศ. 2435", isCorrect: false, order: 3 },
              { content: "พ.ศ. 2490", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เมืองหลวงของอาณาจักรสุโขทัยคือ?",
            difficulty: "EASY",
            explanation: "อาณาจักรสุโขทัยมีเมืองหลวงคือเมืองสุโขทัย",
            options: [
              { content: "อยุธยา", isCorrect: false, order: 1 },
              { content: "สุโขทัย", isCorrect: true, order: 2 },
              { content: "ลพบุรี", isCorrect: false, order: 3 },
              { content: "นครปฐม", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "วันรัฐธรรมนูญตรงกับวันที่เท่าไร?",
            difficulty: "EASY",
            explanation: "วันรัฐธรรมนูญตรงกับวันที่ 10 ธันวาคมของทุกปี",
            options: [
              { content: "5 ธันวาคม", isCorrect: false, order: 1 },
              { content: "10 ธันวาคม", isCorrect: true, order: 2 },
              { content: "1 มกราคม", isCorrect: false, order: 3 },
              { content: "12 สิงหาคม", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "กรุงศรีอยุธยาเสียกรุงครั้งที่ 2 แก่พม่าในปี พ.ศ. ใด?",
            difficulty: "MEDIUM",
            explanation: "เสียกรุงศรีอยุธยาครั้งที่ 2 ในปี พ.ศ. 2310",
            options: [
              { content: "พ.ศ. 2112", isCorrect: false, order: 1 },
              { content: "พ.ศ. 2310", isCorrect: true, order: 2 },
              { content: "พ.ศ. 2325", isCorrect: false, order: 3 },
              { content: "พ.ศ. 2475", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "อำนาจอธิปไตยของไทยแบ่งออกเป็นกี่ฝ่าย?",
            difficulty: "EASY",
            explanation: "อำนาจอธิปไตยแบ่งเป็น 3 ฝ่าย: นิติบัญญัติ บริหาร และตุลาการ",
            options: [
              { content: "2 ฝ่าย", isCorrect: false, order: 1 },
              { content: "3 ฝ่าย", isCorrect: true, order: 2 },
              { content: "4 ฝ่าย", isCorrect: false, order: 3 },
              { content: "5 ฝ่าย", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Current Affairs",
        nameTh: "เหตุการณ์ปัจจุบัน",
        slug: "current-affairs",
        description: "ข่าวสารและเหตุการณ์สำคัญที่ควรรู้",
        order: 2,
        questions: [
          {
            content: "ASEAN ก่อตั้งขึ้นในปี พ.ศ. ใด?",
            difficulty: "EASY",
            explanation: "ASEAN ก่อตั้งเมื่อปี ค.ศ. 1967 (พ.ศ. 2510)",
            options: [
              { content: "ค.ศ. 1945", isCorrect: false, order: 1 },
              { content: "ค.ศ. 1960", isCorrect: false, order: 2 },
              { content: "ค.ศ. 1967", isCorrect: true, order: 3 },
              { content: "ค.ศ. 1975", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สกุลเงินของสหภาพยุโรป (EU) คืออะไร?",
            difficulty: "EASY",
            explanation: "สกุลเงินของ EU คือ ยูโร (Euro)",
            options: [
              { content: "ดอลลาร์", isCorrect: false, order: 1 },
              { content: "ยูโร", isCorrect: true, order: 2 },
              { content: "ปอนด์", isCorrect: false, order: 3 },
              { content: "เยน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "SDGs คือเป้าหมายการพัฒนาที่ยั่งยืนของหน่วยงานใด?",
            difficulty: "MEDIUM",
            explanation: "SDGs เป็นเป้าหมาย 17 ข้อขององค์การสหประชาชาติ (UN)",
            options: [
              { content: "World Bank", isCorrect: false, order: 1 },
              { content: "ASEAN", isCorrect: false, order: 2 },
              { content: "สหประชาชาติ (UN)", isCorrect: true, order: 3 },
              { content: "WHO", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "องค์การการค้าโลกใช้อักษรย่อว่าอะไร?",
            difficulty: "EASY",
            explanation: "WTO = World Trade Organization (องค์การการค้าโลก)",
            options: [
              { content: "WHO", isCorrect: false, order: 1 },
              { content: "WTO", isCorrect: true, order: 2 },
              { content: "IMF", isCorrect: false, order: 3 },
              { content: "WWF", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "สำนักงานใหญ่ของสหประชาชาติ (UN) ตั้งอยู่ที่เมืองใด?",
            difficulty: "MEDIUM",
            explanation: "สำนักงานใหญ่ UN ตั้งอยู่ที่นครนิวยอร์ก สหรัฐอเมริกา",
            options: [
              { content: "เจนีวา", isCorrect: false, order: 1 },
              { content: "นิวยอร์ก", isCorrect: true, order: 2 },
              { content: "ปารีส", isCorrect: false, order: 3 },
              { content: "ลอนดอน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "ปัจจุบันอาเซียน (ASEAN) มีสมาชิกกี่ประเทศ?",
            difficulty: "EASY",
            explanation: "อาเซียนมีสมาชิก 10 ประเทศ",
            options: [
              { content: "8 ประเทศ", isCorrect: false, order: 1 },
              { content: "10 ประเทศ", isCorrect: true, order: 2 },
              { content: "12 ประเทศ", isCorrect: false, order: 3 },
              { content: "15 ประเทศ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "WHO เป็นองค์กรที่ดูแลด้านใด?",
            difficulty: "EASY",
            explanation: "WHO = World Health Organization ดูแลด้านสุขภาพ/สาธารณสุขโลก",
            options: [
              { content: "การค้า", isCorrect: false, order: 1 },
              { content: "สุขภาพ/สาธารณสุข", isCorrect: true, order: 2 },
              { content: "การศึกษา", isCorrect: false, order: 3 },
              { content: "การเงิน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "GDP ย่อมาจากอะไร?",
            difficulty: "MEDIUM",
            explanation: "GDP = Gross Domestic Product (ผลิตภัณฑ์มวลรวมในประเทศ)",
            options: [
              { content: "Global Domestic Price", isCorrect: false, order: 1 },
              { content: "Gross Domestic Product", isCorrect: true, order: 2 },
              { content: "General Data Protection", isCorrect: false, order: 3 },
              { content: "Gross Direct Profit", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
];


const achievements = [
  { name: "First Step", nameTh: "ก้าวแรก", description: "ทำข้อสอบครั้งแรก", icon: "🌱", condition: "first_question", xpReward: 50 },
  { name: "Century", nameTh: "ร้อยข้อ", description: "ตอบคำถามครบ 100 ข้อ", icon: "💯", condition: "questions_100", xpReward: 100 },
  { name: "Streak 7", nameTh: "ต่อเนื่อง 7 วัน", description: "เรียนต่อเนื่อง 7 วัน", icon: "🔥", condition: "streak_7", xpReward: 150 },
  { name: "Perfect Score", nameTh: "เต็มร้อย", description: "ได้คะแนน 100% ในการสอบ", icon: "⭐", condition: "perfect_exam", xpReward: 200 },
  { name: "All Subjects", nameTh: "ครบทุกวิชา", description: "ทำข้อสอบครบทุกวิชา", icon: "🎯", condition: "all_subjects", xpReward: 250 },
  { name: "Speed Demon", nameTh: "ไวเหมือนสายฟ้า", description: "ตอบถูก 10 ข้อติดต่อกัน", icon: "⚡", condition: "correct_10_streak", xpReward: 100 },
  { name: "Scholar", nameTh: "นักวิชาการ", description: "ถึงระดับ 6", icon: "🎓", condition: "level_6", xpReward: 300 },
  { name: "Expert", nameTh: "ผู้เชี่ยวชาญ", description: "ถึงระดับ 10", icon: "👑", condition: "level_10", xpReward: 500 },
];

async function main() {
  console.log("Seeding database...");

  // ล้างข้อมูลที่ insert ซ้ำได้ก่อน เพื่อให้ seed รันซ้ำได้อย่างปลอดภัย (idempotent)
  await prisma.examAnswer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.lesson.deleteMany();

  for (const subject of subjects) {
    const { topics, ...subjectData } = subject;
    const createdSubject = await prisma.subject.upsert({
      where: { slug: subjectData.slug },
      update: subjectData,
      create: subjectData,
    });

    for (const topic of topics) {
      const { questions, ...topicData } = topic;
      const createdTopic = await prisma.topic.upsert({
        where: { slug: topicData.slug },
        update: { ...topicData, subjectId: createdSubject.id },
        create: { ...topicData, subjectId: createdSubject.id },
      });

      for (const question of questions) {
        const { options, ...questionData } = question;
        await prisma.question.create({
          data: {
            ...questionData,
            topicId: createdTopic.id,
            options: { create: options },
          },
        });
      }
      console.log(`  Topic ${topicData.slug}: ${questions.length} questions`);

      for (const lesson of lessons[topicData.slug] ?? []) {
        await prisma.lesson.create({
          data: { ...lesson, topicId: createdTopic.id },
        });
      }
    }
  }

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: achievement.name.toLowerCase().replace(/\s/g, "-") },
      update: achievement,
      create: { ...achievement, id: achievement.name.toLowerCase().replace(/\s/g, "-") },
    });
  }

  const hashedPassword = await bcrypt.hash("admin1234", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@kpexam.com" },
    update: {},
    create: {
      email: "admin@kpexam.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
      profile: { create: { xp: 9999, level: 10, streak: 0 } },
    },
  });
  console.log(`Admin user: ${admin.email}`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
