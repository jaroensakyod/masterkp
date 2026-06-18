"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Topic {
  id: string;
  name: string;
  nameTh: string;
  description: string | null;
  _count: { questions: number };
}

interface Subject {
  id: string;
  name: string;
  nameTh: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  topics: Topic[];
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subjects")
      .then((r) => r.json())
      .then((d) => { setSubjects(d); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="text-slate-400">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">วิชาทั้งหมด</h1>
        <p className="text-slate-500 mt-1">เลือกวิชาที่ต้องการฝึกทำข้อสอบ</p>
      </div>

      <div className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-4 p-5 border-b border-slate-100">
              <div className="text-3xl">{subject.icon}</div>
              <div className="flex-1">
                <h2 className="font-bold text-lg text-slate-900">{subject.nameTh}</h2>
                <p className="text-sm text-slate-500">{subject.description}</p>
              </div>
              <div className="text-sm text-slate-400">
                {subject.topics.reduce((sum, t) => sum + t._count.questions, 0)} ข้อ
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 divide-x divide-y divide-slate-100">
              {subject.topics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/practice/${topic.id}`}
                  className="p-4 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                        {topic.nameTh}
                      </div>
                      {topic.description && (
                        <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{topic.description}</div>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 ml-2 shrink-0">{topic._count.questions} ข้อ</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
