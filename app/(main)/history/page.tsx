"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { calculatePercentage, formatDateTime } from "@/lib/utils";

interface Session {
  id: string;
  mode: string;
  score: number;
  totalQuestions: number;
  startTime: string;
  endTime: string;
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((d) => { setSessions(d); setLoading(false); });
  }, []);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-slate-400">กำลังโหลด...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">ประวัติการสอบ</h1>
        <p className="text-slate-500 mt-1">ดูผลการสอบทั้งหมด {sessions.length} ครั้ง</p>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-slate-500">ยังไม่มีประวัติการสอบ</p>
          <Link href="/exam" className="mt-4 inline-block text-indigo-600 hover:underline text-sm">
            เริ่มสอบเลย →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {sessions.map((s) => {
            const pct = calculatePercentage(s.score, s.totalQuestions);
            return (
              <Link
                key={s.id}
                href={`/exam/${s.id}/result`}
                className="flex items-center gap-4 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <div className="text-2xl">{s.mode === "EXAM" ? "📋" : "📝"}</div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900 text-sm">
                    {s.mode === "EXAM" ? "สอบจำลองเต็ม" : s.mode === "TOPIC" ? "สอบเฉพาะวิชา" : "ฝึกทำข้อสอบ"}
                  </div>
                  <div className="text-xs text-slate-400">{formatDateTime(s.endTime)}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${pct >= 80 ? "text-green-600" : pct >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                    {s.score}/{s.totalQuestions}
                  </div>
                  <div className="text-xs text-slate-400">{pct}%</div>
                </div>
                <div className="text-slate-300 text-sm">›</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
