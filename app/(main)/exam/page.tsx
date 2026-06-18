"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Subject {
  id: string;
  nameTh: string;
  icon: string | null;
  topics: Array<{ id: string; nameTh: string; _count: { questions: number } }>;
}

export default function ExamSetupPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [mode, setMode] = useState<"EXAM" | "TOPIC">("EXAM");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/subjects").then((r) => r.json()).then(setSubjects);
  }, []);

  function toggleTopic(id: string) {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  // เริ่มสอบจาก questionIds ที่เตรียมไว้
  async function startSession(questionIds: string[], sessionMode: string) {
    if (!questionIds.length) {
      alert("ไม่พบข้อสอบ");
      setLoading(false);
      return;
    }
    const startRes = await fetch("/api/exam/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: sessionMode, questionIds }),
    });
    const { sessionId } = await startRes.json();
    const idParams = questionIds.map((id) => `id=${id}`).join("&");
    router.push(`/exam/${sessionId}?mode=${sessionMode}&${idParams}`);
  }

  async function startExam() {
    setLoading(true);
    if (mode === "EXAM") {
      // สอบจำลองตามสัดส่วนสนามจริง ก.พ. ภาค ก
      const res = await fetch("/api/exam/mock");
      const { questionIds } = await res.json();
      await startSession(questionIds, "EXAM");
      return;
    }
    // เฉพาะวิชา: ดึงข้อของหัวข้อที่เลือก
    const queryParams = selectedTopics.map((id) => `topicId=${id}`).join("&");
    const questionsRes = await fetch(`/api/questions?limit=100&${queryParams}`);
    const questions = await questionsRes.json();
    await startSession(
      questions.map((q: { id: string }) => q.id),
      "TOPIC"
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">สอบจำลอง</h1>
        <p className="text-slate-500 mt-1">เลือกรูปแบบการสอบ</p>
      </div>

      {/* Mode selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setMode("EXAM")}
          className={`p-5 rounded-2xl border-2 text-left transition-all ${
            mode === "EXAM" ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-300"
          }`}
        >
          <div className="text-2xl mb-2">📋</div>
          <div className="font-bold text-slate-900">สอบจำลอง (เสมือนจริง)</div>
          <div className="text-sm text-slate-500 mt-1">สุ่มทุกวิชาตามสัดส่วน ก.พ. · จับเวลา</div>
        </button>
        <button
          onClick={() => setMode("TOPIC")}
          className={`p-5 rounded-2xl border-2 text-left transition-all ${
            mode === "TOPIC" ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-300"
          }`}
        >
          <div className="text-2xl mb-2">🎯</div>
          <div className="font-bold text-slate-900">เฉพาะวิชา</div>
          <div className="text-sm text-slate-500 mt-1">เลือกหัวข้อที่ต้องการ</div>
        </button>
      </div>

      {/* Topic selection */}
      {mode === "TOPIC" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
          <h3 className="font-bold text-slate-900 mb-4">เลือกหัวข้อ</h3>
          {subjects.map((s) => (
            <div key={s.id} className="mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <span>{s.icon}</span>
                <span>{s.nameTh}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pl-6">
                {s.topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => toggleTopic(t.id)}
                    className={`p-2.5 rounded-xl border text-left text-sm transition-all ${
                      selectedTopics.includes(t.id)
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-600 hover:border-indigo-300"
                    }`}
                  >
                    <div className="font-medium">{t.nameTh}</div>
                    <div className="text-xs text-slate-400">{t._count.questions} ข้อ</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exam info */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
        <h3 className="font-bold text-amber-800 mb-2">📌 ข้อมูลการสอบ</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• {mode === "EXAM" ? "สุ่มข้อสอบครอบคลุมทุกวิชาตามสัดส่วนสนามจริง" : `เลือก ${selectedTopics.length} หัวข้อ`}</li>
          <li>• เวลา {mode === "EXAM" ? "2 ชั่วโมง 30 นาที (จับเวลา)" : "ไม่จำกัดเวลา"}</li>
          <li>• ไม่มีเฉลยระหว่างทำข้อสอบ — จะแสดงหลังส่งงาน</li>
          <li>• สามารถทบทวนคำตอบก่อนส่งได้</li>
        </ul>
      </div>

      <button
        onClick={startExam}
        disabled={loading || (mode === "TOPIC" && selectedTopics.length === 0)}
        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {loading ? "กำลังเตรียมข้อสอบ..." : "เริ่มสอบ →"}
      </button>
    </div>
  );
}
