"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn, formatDuration } from "@/lib/utils";

interface Option {
  id: string;
  content: string;
  order: number;
}

interface Question {
  id: string;
  content: string;
  difficulty: string;
  options: Option[];
  topic: { nameTh: string; subject: { nameTh: string } };
}

export default function ExamPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") ?? "EXAM";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(mode === "EXAM" ? 9000 : 0); // 2.5h in seconds
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTimes, setStartTimes] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const paramStr = mode === "EXAM" ? "?mode=exam" : "?mode=exam";
      const r = await fetch(`/api/questions${paramStr}`);
      const q = await r.json();
      setQuestions(q);
      setLoading(false);
      if (q.length > 0) setStartTimes({ [q[0].id]: Date.now() });
    };
    fetchQuestions();
  }, [mode]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    const answers = questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: userAnswers[q.id] ?? null,
      timeSpent: startTimes[q.id] ? Math.round((Date.now() - startTimes[q.id]) / 1000) : null,
    }));
    await fetch("/api/exam/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, answers }),
    });
    router.push(`/exam/${sessionId}/result`);
  }, [submitting, questions, userAnswers, startTimes, sessionId, router]);

  // Timer
  useEffect(() => {
    if (mode !== "EXAM" || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) { clearInterval(t); handleSubmit(); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [mode, timeLeft, handleSubmit]);

  function selectAnswer(questionId: string, optionId: string) {
    setUserAnswers((p) => ({ ...p, [questionId]: optionId }));
  }

  function goToQuestion(idx: number) {
    const nextQ = questions[idx];
    if (nextQ && !startTimes[nextQ.id]) {
      setStartTimes((p) => ({ ...p, [nextQ.id]: Date.now() }));
    }
    setCurrentIdx(idx);
  }

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-slate-400">กำลังโหลดข้อสอบ...</div>;
  if (!questions.length) return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-slate-400">ไม่พบข้อสอบ</div>;

  const currentQ = questions[currentIdx];
  const answered = Object.keys(userAnswers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Exam header */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-2xl border border-slate-200 p-4">
        <div className="text-sm text-slate-600">
          ข้อ {currentIdx + 1}/{questions.length} · ตอบแล้ว{" "}
          <span className="font-bold text-indigo-600">{answered}</span>/{questions.length}
        </div>
        {mode === "EXAM" && (
          <div className={cn("font-mono font-bold text-lg", timeLeft < 300 ? "text-red-600" : "text-slate-900")}>
            ⏱ {formatDuration(timeLeft)}
          </div>
        )}
        <button
          onClick={() => {
            if (confirm("ต้องการส่งข้อสอบหรือไม่?")) handleSubmit();
          }}
          disabled={submitting}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? "กำลังส่ง..." : "ส่งข้อสอบ"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question panel */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
            <div className="text-xs text-slate-400 mb-4">
              {currentQ.topic.subject.nameTh} · {currentQ.topic.nameTh}
            </div>
            <p className="text-slate-900 font-medium text-base leading-relaxed mb-6">
              {currentIdx + 1}. {currentQ.content}
            </p>
            <div className="space-y-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectAnswer(currentQ.id, opt.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all text-sm",
                    userAnswers[currentQ.id] === opt.id
                      ? "border-indigo-500 bg-indigo-50 font-medium text-indigo-800"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                  )}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(64 + opt.order)}.</span>
                  {opt.content}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => goToQuestion(currentIdx - 1)}
              disabled={currentIdx === 0}
              className="px-5 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 disabled:opacity-30"
            >
              ← ก่อนหน้า
            </button>
            <button
              onClick={() => goToQuestion(currentIdx + 1)}
              disabled={currentIdx === questions.length - 1}
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-30"
            >
              ถัดไป →
            </button>
          </div>
        </div>

        {/* Question grid navigator */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sticky top-24">
            <h3 className="text-sm font-bold text-slate-700 mb-3">ภาพรวม</h3>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(i)}
                  className={cn(
                    "h-8 w-full rounded-lg text-xs font-bold transition-all",
                    i === currentIdx
                      ? "bg-indigo-600 text-white"
                      : userAnswers[q.id]
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100" />
                <span>ตอบแล้ว ({answered})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-100" />
                <span>ยังไม่ตอบ ({questions.length - answered})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
