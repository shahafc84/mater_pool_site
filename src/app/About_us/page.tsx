import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeaderLine from '@/components/HeaderLine';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeaderLine />

      <main className="flex-grow bg-white p-6">
        <h1 className="text-3xl font-bold text-center">אודותינו</h1>
        <p className="text-lg text-center text-gray-700 mt-4">
          כאן יהיה תוכן על החברה שלנו...
        </p>
      </main>

      <Footer />
    </div>
  );
}
