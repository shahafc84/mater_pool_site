import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeaderLine from '@/components/HeaderLine';

export async function generateStaticParams() {
  // קבלת כל ה-Slugs מ-Strapi
  const res = await fetch("https://admin.master-pool.co.il/api/pages-p");
  const data = await res.json();
  return data.data.map((page: any) => ({
    slug: page.Slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  // קבלת תוכן העמוד לפי ה-Slug
  const res = await fetch(
    `https://admin.master-pool.co.il/api/pages-p?filters[Slug][$eq]=${params.slug}`
  );
  const data = await res.json();
  const page = data.data[0];

  if (!page) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <HeaderLine />
        <main className="flex-grow bg-white p-6">
          <h1 className="text-3xl font-bold text-center text-red-500">
            ⚠️ עמוד לא נמצא
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeaderLine />

      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-6 max-w-screen-md">
          <h1 className="text-3xl font-bold text-center">{page.Title}</h1>
          <div className="prose max-w-none text-lg text-gray-700 mt-4">
            {page.Content.map((block: any, index: number) => (
              <p key={index}>
                {block.children.map((child: any, childIndex: number) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
