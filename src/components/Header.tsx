"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DynamicLogo } from "@/components/Logo";

export default function Header() {
  const [pages, setPages] = useState([]); // עמודים מה-API
  const [isClient, setIsClient] = useState(false); // וידוא טעינה בצד לקוח
  const [isLoading, setIsLoading] = useState(true); // מצב טעינה

  useEffect(() => {
    setIsClient(true);

    async function fetchPages() {
      try {
        const res = await fetch("https://admin.master-pool.co.il/api/pages-p");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        setPages(data.data.filter((page: any) => page.Show_in_Menu === true));
      } catch (err) {
        console.error("🚨 Error fetching pages:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPages();
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* לוגו עם קישור לדף הבית */}
        <Link href="/">
          <DynamicLogo />
        </Link>

        <nav className="hidden md:flex space-x-6 space-x-reverse">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            דף הבית
          </Link>

          {isLoading ? (
            <p className="text-gray-500">טוען תפריט...</p>
          ) : pages.length > 0 ? (
            pages.map((page: any) => (
              <Link
                key={page.id}
                href={`/${page.Slug}`}
                className="text-foreground hover:text-primary transition-colors"
              >
                {page.Title}
              </Link>
            ))
          ) : (
            <p className="text-gray-500">⚠️ לא נמצאו עמודים</p>
          )}

          <Link href="/Contact" className="text-foreground hover:text-primary transition-colors">
            צור קשר
          </Link>
        </nav>
      </div>
    </header>
  );
}
