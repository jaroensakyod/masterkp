"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { getXpProgress } from "@/lib/xp";
import { calculatePercentage } from "@/lib/utils";

interface ProfileData {
  id: string;
  name: string | null;
  image: string | null;
  profile: { xp: number; level: number; streak: number; totalQuestions: number; correctAnswers: number } | null;
  achievements: Array<{ id: string; unlockedAt: string; achievement: { nameTh: string; icon: string; description: string } }>;
  progress: Array<{ topicId: string; totalQuestions: number; correctAnswers: number; topic: { nameTh: string; subject: { nameTh: string; color: string | null } } }>;
}

export default function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const { data: session } = useSession();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/profile/${userId}`)
      .then((r) => r.json())
      .then((d) => { setProfile(d); setLoading(false); });
  }, [userId]);

  async function copyShareLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-12 text-center text-slate-400">กำลังโหลด...</div>;
  if (!profile) return <div className="max-w-2xl mx-auto px-4 py-12 text-center text-slate-400">ไม่พบผู้ใช้</div>;

  const xpInfo = profile.profile ? getXpProgress(profile.profile.xp) : null;
  const accuracy = profile.profile ? calculatePercentage(profile.profile.correctAnswers, profile.profile.totalQuestions) : 0;
  const isMe = session?.user?.id === userId;

  // Group progress by subject
  const subjectProgress = profile.progress.reduce((acc, p) => {
    const sub = p.topic.subject.nameTh;
    const cur = acc[sub] ?? { name: sub, total: 0, correct: 0 };
    cur.total += p.totalQuestions;
    cur.correct += p.correctAnswers;
    acc[sub] = cur;
    return acc;
  }, {} as Record<string, { name: string; total: number; correct: number }>);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 font-bold text-2xl flex items-center justify-center shrink-0">
            {profile.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">{profile.name ?? "ผู้ใช้ไม่ระบุชื่อ"}</h1>
            {xpInfo && (
              <div className="text-sm text-indigo-600 font-medium mt-0.5">
                Lv.{xpInfo.current.level} {xpInfo.current.title}
              </div>
            )}
            {profile.profile && profile.profile.streak > 0 && (
              <div className="flex items-center gap-1 mt-1 text-orange-500 text-sm">
                <span>🔥</span>
                <span className="font-medium">{profile.profile.streak} วัน streak</span>
              </div>
            )}
          </div>
          {isMe && (
            <button
              onClick={copyShareLink}
              className="px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 font-medium"
            >
              {copied ? "คัดลอกแล้ว!" : "📤 แชร์"}
            </button>
          )}
        </div>

        {/* XP Bar */}
        {xpInfo && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>XP: {profile.profile?.xp.toLocaleString()}</span>
              {xpInfo.next && <span>ถัดไป: {xpInfo.next.title}</span>}
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${xpInfo.progress}%` }} />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">{profile.profile?.totalQuestions ?? 0}</div>
            <div className="text-xs text-slate-400">ข้อที่ทำ</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">{accuracy}%</div>
            <div className="text-xs text-slate-400">ความแม่น</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">{profile.achievements.length}</div>
            <div className="text-xs text-slate-400">ป้าย</div>
          </div>
        </div>
      </div>

      {/* Subject progress */}
      {Object.values(subjectProgress).length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h2 className="font-bold text-slate-900 mb-4">คะแนนแต่ละวิชา</h2>
          <div className="space-y-3">
            {Object.values(subjectProgress).map((s) => {
              const pct = calculatePercentage(s.correct, s.total);
              return (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">{s.name}</span>
                    <span className={`font-semibold ${pct >= 80 ? "text-green-600" : pct >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievements */}
      {profile.achievements.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4">🏆 ป้ายรางวัล ({profile.achievements.length})</h2>
          <div className="grid grid-cols-2 gap-3">
            {profile.achievements.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                <div className="text-2xl">{a.achievement.icon}</div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{a.achievement.nameTh}</div>
                  <div className="text-xs text-slate-500">{a.achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
