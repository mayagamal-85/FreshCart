import Slider from "@/components/Slider/Slider";
import HomeCategories from "@/components/HomeCategories/HomeCategories";
import ServiceHighlights from "@/components/ServiceHighlights/ServiceHighlights";
import HomeDeals from "@/components/HomeDeals/HomeDeals";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";

const heroSlides = [
  {
    id: 1,
    image: "/images/hero/hero-grocery.png",
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primaryBtn: "Shop Now",
    secondaryBtn: "View Deals",
  },
  {
    id: 2,
    image: "/images/hero/hero-grocery.png",
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    primaryBtn: "Shop Now",
    secondaryBtn: "Learn More",
  },
  {
    id: 3,
    image: "/images/hero/hero-grocery.png",
    title: "Daily Essentials, Always Fresh",
    subtitle: "Fast delivery with the best prices",
    primaryBtn: "Browse Now",
    secondaryBtn: "See Offers",
  },
];

export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl space-y-12 px-4 py-8 lg:px-8 lg:py-10">
      <Slider slides={heroSlides} />
      <ServiceHighlights />
      <HomeCategories />
      <HomeDeals />
      <FeaturedProducts />
      <NewsletterSection />
    </section>
  );
}