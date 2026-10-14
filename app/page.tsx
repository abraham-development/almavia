import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Header } from "@/components/header/Header";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Services } from "@/components/sections/Services";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "HealthAndBeautyBusiness"],
  name: site.name,
  slogan: site.slogan,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/hero-estetica.webp`,
  logo: `${site.url}/brand/logo-vertical.png`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.unit}`,
    addressLocality: site.address.district,
    addressRegion: site.address.city,
    addressCountry: "PE",
  },
  sameAs: Object.values(site.socials).filter((href) => href.startsWith("http")),
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
