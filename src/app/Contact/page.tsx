import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeaderLine from '@/components/HeaderLine';
import Contact from '@/components/Contact';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeaderLine />
      {/* קומפוננטת צור קשר */}
      <Contact />
      <Footer />
    </div>
  );
}
