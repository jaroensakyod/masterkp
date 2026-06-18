"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { cn, calculatePercentage } from "@/lib/utils";

interface ExamResult {
  id: string;
  mode: string;
  score: number;
  totalQuestions: number;
  startTime: string;
  endTime: string;
  answers: Array<{
    id: string;
    isCorrect: boolean;
    selectedOptionId: string | null;
    question: {
      id: string;
      content: string;
      explanation: string | null;
      options: Array<{ id: string; content: string; isCorrect: boolean; order: number }>;
      topic: { nameTh: string; subject: { nameTh: string } };
    };
  }>;
}

export default function ResultPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"summary" | "review">("summary");
  const [aiExplains, setAiExplains] = useState<Record<string, string>>({});
  const [loadingAI, setLoadingAI] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/exam/${sessionId}`)
      .then((r) => r.json())
      .then((d) => { setResult(d); setLoading(false); });
  }, [sessionId]);

  async function getAIExplain(questionId: string, selectedOptionId: string | null) {
    setLoadingAI((p) => ({ ...p, [questionId]: true }));
    const r = await fetch("/api/ai/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, selectedOptionId }),
    });
    const d = await r.json();
    setAiExplains((p) => ({ ...p, [questionId]: d.explanation ?? "" }));
    setLoadingAI((p) => ({ ...p, [questionId]: false }));
  }

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-slate-400">กำลังโหลดผลสอบ...</div>;
  if (!result) return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-slate-400">ไม่พบผลสอบ</div>;

  const pct = calculatePercentage(result.score ?? 0, result.totalQuestions);
  const wrongAnswers = result.answers.filter((a) => !a.isCorrect);

  // Group by subject
  const subjectMap = new Map<string, { name: string; correct: number; total: number }>();
  for (const a of result.answers) {
    const sub = a.question.topic.subject.nameTh;
    const cur = subjectMap.get(sub) ?? { name: sub, correct: 0, total: 0 };
    cur.total++;
    if (a.isCorrect) cur.correct++;
    subjectMap.set(sub, cur);
  }

  const subjectStats = Array.from(subjectMap.values());

  const shareText = `ฉันสอบ ก.พ. ได้ ${result.score}/${result.totalQuestions} คะแนน (${pct}%) บน KP Exam!`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Score banner */}
      <div className={cn(
        "rounded-2xl p-8 text-center mb-6 text-white",
        pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-yellow-500" : "bg-red-500"
      )}>
        <div className="text-5xl mb-2">{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪"}</div>
        <div className="text-4xl font-bold mb-1">{pct}%</div>
        <div className="text-xl font-semibold opacity-90 mb-1">
          {result.score}/{result.totalQuestions} ข้อ
        </div>
        <div className="text-sm opacity-75">
          {pct >= 80 ? "ยอดเยี่ยม! คุณพร้อมสอบแล้ว 🎉" : pct >= 60 ? "ดีมาก! ยังมีที่ต้องปรับปรุง" : "อย่าท้อ! ทำซ้ำเพื่อพัฒนา"}
        </div>
      </div>

      {/* Subject breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <h2 className="font-bold text-slate-900 mb-4">คะแนนแยกตามวิชา</h2>
        <div className="space-y-3">
          {subjectStats.map((s) => {
            const sp = calculatePercentage(s.correct, s.total);
            return (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{s.name}</span>
                  <span className={sp >= 80 ? "text-green-600" : sp >= 60 ? "text-yellow-600" : "text-red-600"}>
                    {s.correct}/{s.total} ({sp}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sp >= 80 ? "bg-green-500" : sp >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${sp}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setActiveTab("summary")}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === "summary" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
          )}
        >
          สรุปผล
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === "review" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
          )}
        >
          ทบทวนข้อผิด ({wrongAnswers.length})
        </button>
      </div>

      {activeTab === "summary" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-3">สถิติ</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-700">{result.score}</div>
                <div className="text-sm text-green-600">ตอบถูก</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-700">{result.totalQuestions - (result.score ?? 0)}</div>
                <div className="text-sm text-red-600">ตอบผิด</div>
              </div>
            </div>
          </div>

          {/* Share */}
          <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-5">
            <h3 className="font-bold text-indigo-900 mb-3">📤 แชร์ผลสอบ</h3>
            <p className="text-sm text-indigo-700 mb-3">{shareText}</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(shareText)}
                className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 text-sm font-medium rounded-xl hover:bg-indigo-50"
              >
                คัดลอก
              </button>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-xl hover:bg-green-600"
              >
                แชร์ LINE
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/exam" className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 text-center">
              สอบอีกครั้ง
            </Link>
            <Link href="/analytics" className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 text-center">
              ดูสถิติ
            </Link>
          </div>
        </div>
      )}

      {activeTab === "review" && (
        <div className="space-y-4">
          {wrongAnswers.length === 0 ? (
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="font-bold text-green-800">คุณตอบถูกทุกข้อ!</p>
            </div>
          ) : (
            wrongAnswers.map((a, i) => {
              const correctOpt = a.question.options.find((o) => o.isCorrect);
              const selectedOpt = a.question.options.find((o) => o.id === a.selectedOptionId);
              return (
                <div key={a.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="text-xs text-slate-400 mb-2">
                    {a.question.topic.subject.nameTh} · {a.question.topic.nameTh}
                  </div>
                  <p className="font-medium text-slate-900 mb-4 text-sm leading-relaxed">
                    {i + 1}. {a.question.content}
                  </p>
                  <div className="space-y-2 mb-3">
                    {a.question.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={cn(
                          "p-3 rounded-xl text-sm border",
                          opt.isCorrect ? "border-green-500 bg-green-50 text-green-800 font-medium" :
                          opt.id === a.selectedOptionId ? "border-red-400 bg-red-50 text-red-700" :
                          "border-slate-100 text-slate-500"
                        )}
                      >
                        {String.fromCharCode(64 + opt.order)}. {opt.content}
                        {opt.isCorrect && <span className="ml-1">✓ ถูก</span>}
                        {opt.id === a.selectedOptionId && !opt.isCorrect && <span className="ml-1">✗ เลือก</span>}
                      </div>
                    ))}
                  </div>
                  {a.question.explanation && (
                    <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600 leading-relaxed">
                      {a.question.explanation}
                    </div>
                  )}
                  {aiExplains[a.question.id] ? (
                    <div className="mt-2 bg-indigo-50 rounded-xl p-3 text-sm text-indigo-800 leading-relaxed">
                      <span className="font-semibold">🤖 AI:</span> {aiExplains[a.question.id]}
                    </div>
                  ) : (
                    <button
                      onClick={() => getAIExplain(a.question.id, a.selectedOptionId)}
                      disabled={loadingAI[a.question.id]}
                      className="mt-2 text-sm text-indigo-600 hover:underline disabled:opacity-50"
                    >
                      {loadingAI[a.question.id] ? "กำลังอธิบาย..." : "🤖 AI อธิบาย"}
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
