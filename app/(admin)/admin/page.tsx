"use client";

import { useEffect, useState } from "react";

interface Subject {
  id: string;
  nameTh: string;
  icon: string | null;
  topics: Array<{ id: string; nameTh: string; _count: { questions: number } }>;
}

export default function AdminPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState("MEDIUM");
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");

  // New question form
  const [newQ, setNewQ] = useState({
    topicId: "",
    content: "",
    explanation: "",
    difficulty: "MEDIUM",
    options: [
      { content: "", isCorrect: true, order: 1 },
      { content: "", isCorrect: false, order: 2 },
      { content: "", isCorrect: false, order: 3 },
      { content: "", isCorrect: false, order: 4 },
    ],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/subjects").then((r) => r.json()).then(setSubjects);
  }, []);

  async function generateWithAI() {
    if (!selectedTopic) return;
    setGenerating(true);
    setMessage("");
    const r = await fetch("/api/ai/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId: selectedTopic, difficulty, count }),
    });
    const d = await r.json();
    setGenerating(false);
    if (r.ok) {
      setMessage(`✅ สร้างข้อสอบสำเร็จ ${d.created} ข้อ`);
      fetch("/api/subjects").then((r) => r.json()).then(setSubjects);
    } else {
      setMessage(`❌ เกิดข้อผิดพลาด: ${d.error}`);
    }
  }

  async function saveQuestion() {
    if (!newQ.topicId || !newQ.content) return;
    setSaving(true);
    const r = await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQ),
    });
    setSaving(false);
    if (r.ok) {
      setMessage("✅ เพิ่มข้อสอบสำเร็จ");
      setNewQ({ topicId: "", content: "", explanation: "", difficulty: "MEDIUM", options: [{ content: "", isCorrect: true, order: 1 }, { content: "", isCorrect: false, order: 2 }, { content: "", isCorrect: false, order: 3 }, { content: "", isCorrect: false, order: 4 }] });
    }
  }

  const allTopics = subjects.flatMap((s) => s.topics.map((t) => ({ ...t, subjectName: s.nameTh })));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
        <p className="text-slate-500 mt-1">จัดการข้อสอบและเนื้อหา</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl border text-sm font-medium ${message.startsWith("✅") ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}>
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {subjects.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-xs font-medium text-slate-700 mb-1">{s.nameTh}</div>
            <div className="text-lg font-bold text-indigo-600">
              {s.topics.reduce((sum, t) => sum + t._count.questions, 0)}
            </div>
            <div className="text-xs text-slate-400">ข้อ</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Generate */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4">🤖 AI สร้างข้อสอบ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">หัวข้อ</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">เลือกหัวข้อ</option>
                {allTopics.map((t) => (
                  <option key={t.id} value={t.id}>{t.subjectName} › {t.nameTh}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">ระดับ</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="EASY">ง่าย</option>
                  <option value="MEDIUM">ปานกลาง</option>
                  <option value="HARD">ยาก</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">จำนวน</label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  min={1}
                  max={20}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              onClick={generateWithAI}
              disabled={generating || !selectedTopic}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? "กำลัง Generate..." : "สร้างด้วย AI"}
            </button>
          </div>
        </div>

        {/* Manual add question */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4">✏️ เพิ่มข้อสอบด้วยตัวเอง</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">หัวข้อ</label>
              <select
                value={newQ.topicId}
                onChange={(e) => setNewQ((p) => ({ ...p, topicId: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">เลือกหัวข้อ</option>
                {allTopics.map((t) => (
                  <option key={t.id} value={t.id}>{t.subjectName} › {t.nameTh}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">คำถาม</label>
              <textarea
                value={newQ.content}
                onChange={(e) => setNewQ((p) => ({ ...p, content: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="พิมพ์คำถาม..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">คำอธิบายเฉลย</label>
              <textarea
                value={newQ.explanation}
                onChange={(e) => setNewQ((p) => ({ ...p, explanation: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="อธิบายเฉลย..."
              />
            </div>
            <div className="space-y-2">
              {newQ.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct"
                    checked={opt.isCorrect}
                    onChange={() => setNewQ((p) => ({
                      ...p,
                      options: p.options.map((o, j) => ({ ...o, isCorrect: i === j })),
                    }))}
                    className="text-indigo-600"
                  />
                  <input
                    type="text"
                    value={opt.content}
                    onChange={(e) => setNewQ((p) => ({
                      ...p,
                      options: p.options.map((o, j) => j === i ? { ...o, content: e.target.value } : o),
                    }))}
                    placeholder={`ตัวเลือก ${String.fromCharCode(64 + opt.order)}`}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
              <p className="text-xs text-slate-400">เลือกวงกลมหน้าตัวเลือกที่ถูกต้อง</p>
            </div>
            <button
              onClick={saveQuestion}
              disabled={saving || !newQ.topicId || !newQ.content}
              className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              {saving ? "กำลังบันทึก..." : "บันทึกข้อสอบ"}
            </button>
          </div>
        </div>
      </div>

      {/* Topics overview */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">หัวข้อทั้งหมด</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 text-slate-500 font-medium">วิชา</th>
                <th className="text-left py-2 text-slate-500 font-medium">หัวข้อ</th>
                <th className="text-right py-2 text-slate-500 font-medium">จำนวนข้อ</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) =>
                s.topics.map((t) => (
                  <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-2 text-slate-500 text-xs">{s.icon} {s.nameTh}</td>
                    <td className="py-2 font-medium text-slate-900">{t.nameTh}</td>
                    <td className="py-2 text-right text-slate-900 font-mono">{t._count.questions}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
