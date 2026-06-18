import Link from "next/link";

const features = [
  { icon: "📝", title: "ข้อสอบจริง + AI", desc: "คลังข้อสอบจากข้อสอบจริงและ AI สร้างโจทย์จำลองครบทุกหมวด" },
  { icon: "⏱️", title: "สอบจำลองเต็มรูปแบบ", desc: "จำลองบรรยากาศสอบจริง มีเวลา countdown 2.5 ชม." },
  { icon: "📊", title: "วิเคราะห์จุดแข็ง-จุดอ่อน", desc: "Radar chart แสดงสัดส่วนคะแนนแต่ละวิชา พร้อมแนะนำหัวข้อที่ต้องซ้อม" },
  { icon: "🏆", title: "ระบบเลเวลและ XP", desc: "เก็บ XP จากการทำข้อสอบ เลื่อนยศจากผู้สมัครสู่ผู้เชี่ยวชาญ กพ" },
  { icon: "🔥", title: "Streak ต่อเนื่อง", desc: "นับวันที่เรียนต่อเนื่อง รับ XP โบนัสและ badge พิเศษ" },
  { icon: "🤖", title: "AI อธิบายเฉลย", desc: "เมื่อตอบผิด AI จะอธิบาย step-by-step ว่าทำไมถึงผิดและเฉลยถูก" },
  { icon: "📤", title: "แชร์ผลสอบ", desc: "สร้าง card แสดงจุดแข็งแชร์ให้เพื่อนได้ทาง Line และ Facebook" },
  { icon: "🥇", title: "Leaderboard", desc: "แข่งกับเพื่อนๆ ผ่านอันดับรายสัปดาห์และรายเดือน" },
];

const subjects = [
  { icon: "🧮", name: "ความสามารถทั่วไป", topics: "อนุกรม ตรรกะ อุปมา", color: "bg-blue-50 border-blue-200" },
  { icon: "📖", name: "ภาษาไทย", topics: "ไวยากรณ์ การอ่าน สำนวน", color: "bg-red-50 border-red-200" },
  { icon: "🇬🇧", name: "ภาษาอังกฤษ", topics: "Grammar Vocabulary Reading", color: "bg-purple-50 border-purple-200" },
  { icon: "⚖️", name: "ระเบียบราชการ", topics: "พรบ. ข้าราชการ จรรยาบรรณ", color: "bg-yellow-50 border-yellow-200" },
  { icon: "🌏", name: "ความรู้ทั่วไป", topics: "ประวัติศาสตร์ เหตุการณ์ปัจจุบัน", color: "bg-green-50 border-green-200" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <span className="text-2xl">📋</span>
            <span>KP Exam</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-slate-600 hover:text-slate-900">
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              เริ่มต้นฟรี
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🎯</span>
            <span>เตรียมสอบ ก.พ. ภาค ก อย่างมีระบบ</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            ติวสอบ ก.พ.
            <br />
            <span className="text-indigo-600">อัจฉริยะ</span> ด้วย AI
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            ฝึกทำข้อสอบ วิเคราะห์จุดแข็งจุดอ่อน รับคำแนะนำจาก AI
            และติดตามพัฒนาการแบบ Real-time ผ่านระบบเลเวลและ streak
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-200"
            >
              เริ่มต้นฟรีเลย →
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-indigo-300 transition-all"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[
              { n: "5", label: "วิชาหลัก" },
              { n: "500+", label: "ข้อสอบ" },
              { n: "AI", label: "อธิบายเฉลย" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{s.n}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">ครอบคลุมทุกวิชา กพ ภาค ก</h2>
          <p className="text-slate-500 text-center mb-8">ข้อสอบครบทุกหมวดตามที่สำนักงาน ก.พ. กำหนด</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {subjects.map((s) => (
              <div key={s.name} className={`rounded-2xl border-2 p-4 text-center ${s.color}`}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-semibold text-sm text-slate-800">{s.name}</div>
                <div className="text-xs text-slate-500 mt-1">{s.topics}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">ฟีเจอร์ครบครัน</h2>
          <p className="text-slate-500 text-center mb-10">ทุกอย่างที่คุณต้องการสำหรับการเตรียมสอบ ก.พ.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Level system */}
      <section className="py-16 px-4 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">ระบบยศข้าราชการ</h2>
          <p className="text-indigo-200 mb-8">เลื่อนยศผ่านการทำข้อสอบ สะสม XP และพิสูจน์ว่าคุณพร้อม</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["ผู้สมัคร","นักเรียน","ผู้ช่วยเจ้าหน้าที่","เจ้าพนักงาน","นักวิชาการ","ข้าราชการ","ข้าราชการชำนาญการ","ข้าราชการชำนาญการพิเศษ","ผู้เชี่ยวชาญ กพ"].map((title, i) => (
              <div key={title} className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20">
                Lv.{i + 1} {title}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">พร้อมสอบ ก.พ. หรือยัง?</h2>
        <p className="text-slate-500 mb-8">เริ่มฟรีวันนี้ ไม่ต้องใช้บัตรเครดิต</p>
        <Link href="/auth/register" className="inline-block px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-200 text-lg">
          เริ่มต้นฟรีเลย 🚀
        </Link>
      </section>

      <footer className="border-t border-slate-100 py-8 px-4 text-center text-sm text-slate-400">
        <p>© 2024 KP Exam · ระบบเตรียมสอบ ก.พ. ภาค ก</p>
      </footer>
    </div>
  );
}
