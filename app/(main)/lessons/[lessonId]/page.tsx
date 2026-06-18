"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

interface Lesson {
  id: string;
  titleTh: string;
  content: string;
  topic: {
    id: string;
    nameTh: string;
    subject: { nameTh: string; icon: string | null };
  };
}

// ตัวแปลง Markdown แบบเบา (heading / bold / list / table / blockquote)
function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const inline = (text: string): React.ReactNode[] =>
    text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={idx}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={idx}>{part}</span>
      )
    );

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    // ตาราง (มี | และบรรทัดถัดไปเป็นเส้นคั่น)
    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const header = line.split("|").map((c) => c.trim()).filter(Boolean);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(lines[i].split("|").map((c) => c.trim()).filter(Boolean));
        i++;
      }
      out.push(
        <div key={key++} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                {header.map((h, hi) => (
                  <th key={hi} className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">
                    {inline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci} className="border border-slate-200 px-3 py-2 text-slate-600">
                      {inline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("# ")) {
      out.push(<h1 key={key++} className="text-2xl font-bold text-slate-900 mt-2 mb-3">{inline(line.slice(2))}</h1>);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      out.push(<h2 key={key++} className="text-lg font-bold text-slate-800 mt-5 mb-2">{inline(line.slice(3))}</h2>);
      i++;
      continue;
    }
    if (line.startsWith("> ")) {
      out.push(
        <blockquote key={key++} className="border-l-4 border-indigo-300 bg-indigo-50 px-4 py-2 my-3 text-sm text-indigo-800 rounded-r-lg">
          {inline(line.slice(2))}
        </blockquote>
      );
      i++;
      continue;
    }
    // รายการ (ordered / unordered)
    if (/^\s*[-*]\s/.test(line) || /^\s*\d+\.\s/.test(line)) {
      const items: string[] = [];
      const ordered = /^\s*\d+\.\s/.test(line);
      while (i < lines.length && (/^\s*[-*]\s/.test(lines[i]) || /^\s*\d+\.\s/.test(lines[i]))) {
        items.push(lines[i].replace(/^\s*(?:[-*]|\d+\.)\s/, ""));
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      out.push(
        <ListTag key={key++} className={`my-3 space-y-1 text-slate-600 text-sm pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>
          {items.map((it, ii) => (
            <li key={ii}>{inline(it)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    out.push(<p key={key++} className="text-slate-600 text-sm leading-relaxed my-2">{inline(line)}</p>);
    i++;
  }

  return out;
}

export default function LessonDetailPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lessons/${lessonId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setLesson(d);
        setLoading(false);
      });
  }, [lessonId]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-slate-400">กำลังโหลด...</div>;
  }

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-500">ไม่พบบทเรียนนี้</p>
        <Link href="/lessons" className="mt-4 inline-block text-indigo-600 hover:underline">กลับหน้าบทเรียน</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/lessons" className="text-sm text-slate-500 hover:text-indigo-600">← บทเรียนทั้งหมด</Link>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mt-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
          <span>{lesson.topic.subject.icon}</span>
          <span>{lesson.topic.subject.nameTh} · {lesson.topic.nameTh}</span>
        </div>
        <article>{renderMarkdown(lesson.content)}</article>
      </div>

      <Link
        href={`/practice/${lesson.topic.id}`}
        className="mt-6 flex items-center justify-center w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors"
      >
        ฝึกทำข้อสอบหัวข้อนี้ →
      </Link>
    </div>
  );
}
