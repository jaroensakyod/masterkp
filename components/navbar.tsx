"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getXpProgress } from "@/lib/xp";
import { useState, useEffect } from "react";

interface UserProfile {
  xp: number;
  level: number;
  streak: number;
}

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/profile/me")
        .then((r) => r.json())
        .then((d) => setProfile(d.profile))
        .catch(() => {});
    }
  }, [session]);

  const nav = [
    { href: "/dashboard", label: "หน้าหลัก" },
    { href: "/subjects", label: "วิชา" },
    { href: "/exam", label: "สอบจำลอง" },
    { href: "/analytics", label: "วิเคราะห์" },
    { href: "/leaderboard", label: "อันดับ" },
  ];

  const xpInfo = profile ? getXpProgress(profile.xp) : null;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <span className="text-2xl">📋</span>
          <span>KP Exam</span>
        </Link>

        {/* Desktop nav */}
        {session && (
          <div className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* User area */}
        <div className="flex items-center gap-3">
          {session ? (
            <>
              {/* Streak */}
              {profile && profile.streak > 0 && (
                <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-orange-500">
                  <span className="text-lg">🔥</span>
                  <span>{profile.streak}</span>
                </div>
              )}
              {/* XP + Level */}
              {xpInfo && (
                <div className="hidden sm:flex flex-col items-end gap-0.5">
                  <div className="text-xs font-semibold text-indigo-700">
                    Lv.{xpInfo.current.level} {xpInfo.current.title}
                  </div>
                  <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${xpInfo.progress}%` }}
                    />
                  </div>
                </div>
              )}
              {/* Avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center hover:bg-indigo-200 transition-colors"
                >
                  {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                    </div>
                    {(session.user as { role?: string })?.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      href={`/profile/${session.user?.id}`}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      โปรไฟล์ของฉัน
                    </Link>
                    <Link
                      href="/history"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      ประวัติการสอบ
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                สมัครสมาชิก
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {session && (
        <div className="md:hidden border-t border-slate-100 px-4 py-2 flex gap-1 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                pathname.startsWith(item.href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
