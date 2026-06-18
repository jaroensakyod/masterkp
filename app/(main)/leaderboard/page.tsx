"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getLevelFromXp } from "@/lib/xp";
import { calculatePercentage } from "@/lib/utils";

interface Entry {
  rank: number;
  userId: string;
  name: string;
  image: string | null;
  xp: number;
  level: number;
  totalQuestions: number;
  correctAnswers: number;
}

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => { setEntries(d); setLoading(false); });
  }, []);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-slate-400">กำลังโหลด...</div>;

  const myRank = entries.find((e) => e.userId === session?.user?.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">🏆 อันดับ</h1>
        <p className="text-slate-500 mt-1">ผู้เรียน Top 50 ที่มี XP สูงสุด</p>
      </div>

      {myRank && (
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <div className="text-2xl font-bold text-indigo-700 w-10 text-center">#{myRank.rank}</div>
          <div className="flex-1">
            <div className="font-bold text-slate-900">คุณ</div>
            <div className="text-sm text-indigo-600">Lv.{myRank.level} · {myRank.xp.toLocaleString()} XP</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {entries.map((e, i) => {
          const levelInfo = getLevelFromXp(e.xp);
          const isMe = e.userId === session?.user?.id;
          const accuracy = calculatePercentage(e.correctAnswers, e.totalQuestions);

          return (
            <div
              key={e.userId}
              className={`flex items-center gap-4 p-4 border-b border-slate-100 last:border-0 ${isMe ? "bg-indigo-50" : "hover:bg-slate-50"} transition-colors`}
            >
              <div className={`w-8 text-center font-bold ${i < 3 ? "text-lg" : "text-sm text-slate-400"}`}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${e.rank}`}
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm shrink-0">
                {e.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 text-sm truncate">
                  {e.name} {isMe && <span className="text-indigo-500">(คุณ)</span>}
                </div>
                <div className="text-xs text-slate-400">Lv.{levelInfo.level} {levelInfo.title}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-indigo-600">{e.xp.toLocaleString()} XP</div>
                <div className="text-xs text-slate-400">
                  {e.totalQuestions > 0 ? `${accuracy}% (${e.totalQuestions} ข้อ)` : "ยังไม่ทำ"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
