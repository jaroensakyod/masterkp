"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LessonItem {
  id: string;
  title: string;
  titleTh: string;
  order: number;
}

interface Topic {
  id: string;
  nameTh: string;
  lessons: LessonItem[];
}

interface Subject {
  id: string;
  nameTh: string;
  description: string | null;
  icon: string | null;
  topics: Topic[];
}

export default function LessonsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/lessons")
      .then((r) => r.json())
      .then((d) => {
        setSubjects(d);
        setLoading(false);
      });
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
        <h1 className="text-2xl font-bold text-slate-900">บทเรียน / เนื้อหา</h1>
        <p className="text-slate-500 mt-1">อ่านสรุปเนื้อหาและเทคนิคก่อนลงมือทำข้อสอบ</p>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center text-slate-500 py-12">ยังไม่มีบทเรียน</div>
      ) : (
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-4 p-5 border-b border-slate-100">
                <div className="text-3xl">{subject.icon}</div>
                <div className="flex-1">
                  <h2 className="font-bold text-lg text-slate-900">{subject.nameTh}</h2>
                  <p className="text-sm text-slate-500">{subject.description}</p>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {subject.topics.map((topic) =>
                  topic.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.id}`}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📘</span>
                        <div>
                          <div className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                            {lesson.titleTh}
                          </div>
                          <div className="text-xs text-slate-400">{topic.nameTh}</div>
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-indigo-500">→</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
