"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DynamicLogo } from "@/components/Logo";

interface PageData {
  id: number;
  Title: string;
  Slug: string;
  Show_in_Menu: boolean;
}

export default function Header() {
  const [pages, setPages] = useState<PageData[]>([]); // השתמשנו במבנה מוגדר מראש
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);

    async function fetchPages() {
      try {
        const res = await fetch("https://admin.master-pool.co.il/api/pages-p");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        setPages(data.data.filter((page: PageData) => page.Show_in_Menu === true));
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
            pages.map((page) => (
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
