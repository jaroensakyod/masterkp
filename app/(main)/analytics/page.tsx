"use client";

import { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { calculatePercentage } from "@/lib/utils";

interface SubjectStat {
  name: string;
  nameTh: string;
  total: number;
  correct: number;
  accuracy: number;
}

interface Session {
  id: string;
  score: number;
  totalQuestions: number;
  endTime: string;
  mode: string;
}

export default function AnalyticsPage() {
  const [subjectStats, setSubjectStats] = useState<SubjectStat[]>([]);
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        setSubjectStats(d.subjectStats ?? []);
        setRecentSessions(d.recentSessions ?? []);
        setLoading(false);
      });
  }, []);

  const radarData = subjectStats.map((s) => ({
    subject: s.nameTh,
    value: s.accuracy,
    fullMark: 100,
  }));

  const lineData = recentSessions
    .slice()
    .reverse()
    .map((s, i) => ({
      name: `ครั้งที่ ${i + 1}`,
      score: calculatePercentage(s.score, s.totalQuestions),
    }));

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-12 text-center text-slate-400">กำลังโหลด...</div>;
  }

  if (subjectStats.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">ยังไม่มีข้อมูลสถิติ</h2>
        <p className="text-slate-500 mb-6">ทำข้อสอบอย่างน้อย 3 ข้อในแต่ละวิชาเพื่อดูการวิเคราะห์</p>
        <a href="/subjects" className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
          เริ่มทำข้อสอบ
        </a>
      </div>
    );
  }

  const overallAccuracy = subjectStats.reduce((sum, s) => sum + s.accuracy, 0) / subjectStats.length;
  const strongSubject = subjectStats.reduce((a, b) => (a.accuracy > b.accuracy ? a : b), subjectStats[0]);
  const weakSubject = subjectStats.reduce((a, b) => (a.accuracy < b.accuracy ? a : b), subjectStats[0]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">วิเคราะห์ผลการเรียน</h1>
        <p className="text-slate-500 mt-1">ดูจุดแข็งจุดอ่อนและพัฒนาการของคุณ</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
          <div className="text-3xl font-bold text-indigo-600">{Math.round(overallAccuracy)}%</div>
          <div className="text-sm text-slate-500 mt-1">ความแม่นรวม</div>
        </div>
        <div className="bg-green-50 rounded-2xl border border-green-200 p-5 text-center">
          <div className="text-lg font-bold text-green-700">{strongSubject?.nameTh}</div>
          <div className="text-sm text-green-600 mt-1">วิชาที่เก่งที่สุด ({strongSubject?.accuracy}%)</div>
        </div>
        <div className="bg-red-50 rounded-2xl border border-red-200 p-5 text-center">
          <div className="text-lg font-bold text-red-700">{weakSubject?.nameTh}</div>
          <div className="text-sm text-red-600 mt-1">วิชาที่ต้องพัฒนา ({weakSubject?.accuracy}%)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Radar chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4">จุดแข็ง-จุดอ่อนรายวิชา</h2>
          {radarData.length >= 3 ? (
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <Radar name="ความแม่น" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-400 text-sm">
              ต้องการข้อมูลอย่างน้อย 3 วิชา
            </div>
          )}
        </div>

        {/* Line chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4">พัฒนาการ (10 ครั้งล่าสุด)</h2>
          {lineData.length >= 2 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => [`${Number(v)}%`, "คะแนน"]} />
                <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-400 text-sm">
              ต้องการข้อมูลอย่างน้อย 2 ครั้ง
            </div>
          )}
        </div>
      </div>

      {/* Subject detail */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">รายละเอียดแต่ละวิชา</h2>
        <div className="space-y-4">
          {subjectStats.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-900">{s.nameTh}</span>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-400">{s.correct}/{s.total} ข้อ</span>
                  <span className={`font-bold ${s.accuracy >= 80 ? "text-green-600" : s.accuracy >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                    {s.accuracy}%
                  </span>
                </div>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${s.accuracy >= 80 ? "bg-green-500" : s.accuracy >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${s.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
