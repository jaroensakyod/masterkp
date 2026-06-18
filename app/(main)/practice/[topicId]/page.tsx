"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { cn, calculatePercentage } from "@/lib/utils";

interface Option {
  id: string;
  content: string;
  isCorrect: boolean;
  order: number;
}

interface Question {
  id: string;
  content: string;
  explanation: string | null;
  difficulty: string;
  options: Option[];
  topic: { nameTh: string; subject: { nameTh: string } };
}

export default function PracticePage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = use(params);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Array<{ questionId: string; isCorrect: boolean }>>([]);
  const [done, setDone] = useState(false);
  const [aiExplain, setAiExplain] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/questions?topicId=${topicId}&limit=10`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d); setLoading(false); });
  }, [topicId]);

  const currentQ = questions[currentIdx];

  function handleSelect(optionId: string) {
    if (showResult) return;
    setSelected(optionId);
    setShowResult(true);
    const correct = currentQ.options.find((o) => o.isCorrect);
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, isCorrect: optionId === correct?.id },
    ]);
  }

  function nextQuestion() {
    setAiExplain("");
    if (currentIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  }

  async function getAIExplanation() {
    if (!selected) return;
    setLoadingAI(true);
    const r = await fetch("/api/ai/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: currentQ.id, selectedOptionId: selected }),
    });
    const d = await r.json();
    setAiExplain(d.explanation ?? "");
    setLoadingAI(false);
  }

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-12 text-center text-slate-400">กำลังโหลดข้อสอบ...</div>;
  if (questions.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <p className="text-slate-500">ยังไม่มีข้อสอบในหัวข้อนี้</p>
      <Link href="/subjects" className="mt-4 inline-block text-indigo-600 hover:underline">กลับหน้าวิชา</Link>
    </div>
  );

  if (done) {
    const correct = answers.filter((a) => a.isCorrect).length;
    const pct = calculatePercentage(correct, answers.length);
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className="text-5xl mb-4">{pct >= 80 ? "🎉" : pct >= 60 ? "😊" : "😅"}</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">เสร็จสิ้น!</h2>
          <p className="text-slate-500 mb-6">
            คุณตอบถูก{" "}
            <span className={`font-bold text-lg ${pct >= 80 ? "text-green-600" : pct >= 60 ? "text-yellow-600" : "text-red-600"}`}>
              {correct}/{answers.length}
            </span>{" "}
            ข้อ ({pct}%)
          </p>
          {/* Score bar */}
          <div className="w-full h-4 bg-slate-100 rounded-full mb-6 overflow-hidden">
            <div
              className={`h-full rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setCurrentIdx(0); setSelected(null); setShowResult(false); setAnswers([]); setDone(false); setAiExplain(""); }}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              ทำอีกครั้ง
            </button>
            <Link
              href="/subjects"
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              เลือกวิชาอื่น
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const correctOption = currentQ.options.find((o) => o.isCorrect);
  const isCorrect = selected === correctOption?.id;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-slate-500">{currentQ.topic.subject.nameTh}</div>
          <div className="font-semibold text-slate-900">{currentQ.topic.nameTh}</div>
        </div>
        <div className="text-sm text-slate-500">
          {currentIdx + 1}/{questions.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: `${((currentIdx + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            currentQ.difficulty === "EASY" ? "bg-green-100 text-green-700" :
            currentQ.difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"
          )}>
            {currentQ.difficulty === "EASY" ? "ง่าย" : currentQ.difficulty === "MEDIUM" ? "ปานกลาง" : "ยาก"}
          </span>
        </div>
        <p className="text-slate-900 font-medium text-base leading-relaxed">{currentQ.content}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt) => {
          let style = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50";
          if (showResult) {
            if (opt.isCorrect) style = "border-green-500 bg-green-50 text-green-800";
            else if (opt.id === selected && !opt.isCorrect) style = "border-red-500 bg-red-50 text-red-800";
            else style = "border-slate-200 opacity-50";
          }
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={showResult}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all text-sm font-medium",
                style,
                !showResult && "cursor-pointer"
              )}
            >
              <span className="font-bold mr-2">{String.fromCharCode(64 + opt.order)}.</span>
              {opt.content}
              {showResult && opt.isCorrect && <span className="ml-2">✓</span>}
              {showResult && opt.id === selected && !opt.isCorrect && <span className="ml-2">✗</span>}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          <div className={cn("flex items-center gap-2 mb-3 font-semibold", isCorrect ? "text-green-700" : "text-red-700")}>
            {isCorrect ? "✅ ถูกต้อง!" : "❌ ไม่ถูกต้อง"}
          </div>
          {currentQ.explanation && (
            <p className="text-sm text-slate-600 leading-relaxed">{currentQ.explanation}</p>
          )}
          {!aiExplain && !isCorrect && (
            <button
              onClick={getAIExplanation}
              disabled={loadingAI}
              className="mt-3 text-sm text-indigo-600 hover:underline disabled:opacity-50"
            >
              {loadingAI ? "กำลังอธิบาย..." : "🤖 ให้ AI อธิบายเพิ่มเติม"}
            </button>
          )}
          {aiExplain && (
            <div className="mt-3 p-3 bg-indigo-50 rounded-xl text-sm text-indigo-800 leading-relaxed">
              <span className="font-semibold">🤖 AI:</span> {aiExplain}
            </div>
          )}
          <button
            onClick={nextQuestion}
            className="mt-4 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {currentIdx + 1 >= questions.length ? "ดูผลสรุป" : "ข้อถัดไป →"}
          </button>
        </div>
      )}
    </div>
  );
}
