"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getXpProgress, LEVELS } from "@/lib/xp";
import { calculatePercentage } from "@/lib/utils";

interface DashboardData {
  profile: { xp: number; level: number; streak: number; totalQuestions: number; correctAnswers: number } | null;
  recentSessions: Array<{ id: string; score: number; totalQuestions: number; endTime: string; mode: string }>;
  weakTopics: Array<{ topicId: string; topicName: string; subjectName: string; accuracy: number }>;
  achievements: Array<{ id: string; unlockedAt: string; achievement: { name: string; nameTh: string; icon: string } }>;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [aiRec, setAiRec] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function loadAIRecommendation() {
    setLoadingAI(true);
    const r = await fetch("/api/ai/recommend");
    const d = await r.json();
    setAiRec(d.recommendation ?? "");
    setLoadingAI(false);
  }

  const xpInfo = data?.profile ? getXpProgress(data.profile.xp) : null;
  const accuracy = data?.profile
    ? calculatePercentage(data.profile.correctAnswers, data.profile.totalQuestions)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          สวัสดี, {session?.user?.name ?? "นักเรียน"} 👋
        </h1>
        <p className="text-slate-500 mt-1">พร้อมสอบ ก.พ. ของวันนี้หรือยัง?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level & XP card */}
          {xpInfo && data?.profile && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">ระดับของคุณ</div>
                  <div className="text-2xl font-bold text-indigo-600 mt-1">
                    Lv.{xpInfo.current.level} {xpInfo.current.title}
                  </div>
                </div>
                {data.profile.streak > 0 && (
                  <div className="flex flex-col items-center">
                    <div className="text-3xl streak-active">🔥</div>
                    <div className="text-sm font-bold text-orange-500">{data.profile.streak} วัน</div>
                  </div>
                )}
              </div>
              {/* XP bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>{xpInfo.xpInLevel} XP</span>
                  <span>{xpInfo.xpNeeded} XP</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full xp-bar transition-all"
                    style={{ width: `${xpInfo.progress}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {xpInfo.next
                    ? `อีก ${xpInfo.xpNeeded - xpInfo.xpInLevel} XP → ${xpInfo.next.title}`
                    : "ระดับสูงสุด!"}
                </div>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">{data.profile.xp.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">XP ทั้งหมด</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">{data.profile.totalQuestions}</div>
                  <div className="text-xs text-slate-500">ข้อที่ทำ</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">{accuracy}%</div>
                  <div className="text-xs text-slate-500">ความแม่น</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/subjects"
              className="bg-indigo-600 text-white rounded-2xl p-5 hover:bg-indigo-700 transition-colors group"
            >
              <div className="text-2xl mb-2">📝</div>
              <div className="font-bold">ฝึกทำข้อสอบ</div>
              <div className="text-indigo-200 text-sm mt-1">เลือกวิชาและหัวข้อ</div>
            </Link>
            <Link
              href="/exam"
              className="bg-white border-2 border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-colors group"
            >
              <div className="text-2xl mb-2">⏱️</div>
              <div className="font-bold text-slate-900">สอบจำลอง</div>
              <div className="text-slate-500 text-sm mt-1">100 ข้อ 2.5 ชั่วโมง</div>
            </Link>
          </div>

          {/* Recent sessions */}
          {data?.recentSessions && data.recentSessions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">ผลสอบล่าสุด</h2>
                <Link href="/history" className="text-sm text-indigo-600 hover:underline">ดูทั้งหมด</Link>
              </div>
              <div className="space-y-3">
                {data.recentSessions.map((s) => {
                  const pct = calculatePercentage(s.score, s.totalQuestions);
                  return (
                    <Link
                      key={s.id}
                      href={`/exam/${s.id}/result`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{s.mode === "EXAM" ? "⏱️" : "📝"}</div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {s.mode === "EXAM" ? "สอบจำลอง" : "ฝึกทำข้อสอบ"}
                          </div>
                          <div className="text-xs text-slate-500">
                            {new Date(s.endTime).toLocaleDateString("th-TH")}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${pct >= 80 ? "text-green-600" : pct >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                          {s.score}/{s.totalQuestions}
                        </div>
                        <div className="text-xs text-slate-500">{pct}%</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Weak topics */}
          {data?.weakTopics && data.weakTopics.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 mb-4">⚠️ หมวดที่ต้องซ้อม</h2>
              <div className="space-y-3">
                {data.weakTopics.map((t) => (
                  <Link
                    key={t.topicId}
                    href={`/practice/${t.topicId}`}
                    className="block p-3 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{t.topicName}</div>
                        <div className="text-xs text-slate-500">{t.subjectName}</div>
                      </div>
                      <div className="text-sm font-bold text-red-600">{t.accuracy}%</div>
                    </div>
                    <div className="mt-2 h-1.5 bg-red-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${t.accuracy}%` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-900 mb-3">🤖 AI แนะนำ</h2>
            {aiRec ? (
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{aiRec}</p>
            ) : (
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-4">ให้ AI วิเคราะห์และแนะนำแผนการเรียนสำหรับคุณ</p>
                <button
                  onClick={loadAIRecommendation}
                  disabled={loadingAI}
                  className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loadingAI ? "กำลังวิเคราะห์..." : "วิเคราะห์จุดอ่อนด้วย AI"}
                </button>
              </div>
            )}
          </div>

          {/* Achievements */}
          {data?.achievements && data.achievements.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 mb-4">🏆 ป้ายล่าสุด</h2>
              <div className="space-y-2">
                {data.achievements.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 p-2 rounded-xl bg-amber-50">
                    <div className="text-2xl">{a.achievement.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{a.achievement.nameTh}</div>
                      <div className="text-xs text-slate-500">{new Date(a.unlockedAt).toLocaleDateString("th-TH")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All levels */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-900 mb-4">📈 ระดับทั้งหมด</h2>
            <div className="space-y-1">
              {LEVELS.map((l) => (
                <div
                  key={l.level}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                    data?.profile && data.profile.level >= l.level
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-slate-400"
                  }`}
                >
                  <span>Lv.{l.level} {l.title}</span>
                  <span className="text-xs">{l.minXp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
