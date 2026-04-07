import type { ReactNode } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
} from "lucide-react";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Electronics", href: "/shop" },
  { label: "Men's Fashion", href: "/shop" },
  { label: "Women's Fashion", href: "/shop" },
];

const accountLinks = [
  { label: "My Account", href: "/profile" },
  { label: "Order History", href: "/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" },
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/register" },
];

const supportLinks = [
  { label: "Contact Us", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Shipping Info", href: "#" },
  { label: "Returns & Refunds", href: "#" },
  { label: "Track Order", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="bg-[#eef8ef]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-4 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          <FeatureItem
            icon={<Truck className="h-4 w-4 text-[#00b207]" />}
            title="Free Shipping"
            subtitle="Free shipping over 500 EGP"
          />
          <FeatureItem
            icon={<RotateCcw className="h-4 w-4 text-[#00b207]" />}
            title="Easy Returns"
            subtitle="14-day return policy"
          />
          <FeatureItem
            icon={<ShieldCheck className="h-4 w-4 text-[#00b207]" />}
            title="Secure Payment"
            subtitle="100% secure checkout"
          />
          <FeatureItem
            icon={<Headphones className="h-4 w-4 text-[#00b207]" />}
            title="24/7 Support"
            subtitle="Contact us anytime"
          />
        </div>
      </div>

      <div className="bg-[#00152f] text-white">
        <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.25fr_.8fr_.8fr_.8fr_.8fr]">
            <div>
              <div className="mb-5 inline-flex items-center rounded-md bg-white px-3 py-2 text-[#1a1a1a]">
                <span className="text-lg font-bold">
                  <span className="text-[#00b207]">Fresh</span>Cart
                </span>
              </div>

              <p className="mb-5 max-w-[300px] text-sm leading-6 text-[#9fb0c7]">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>

              <div className="space-y-3 text-sm text-[#d7dfeb]">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#00b207]" />
                  <span>+20113177422</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#00b207]" />
                  <span>support@freshcart.com</span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#00b207]" />
                  <span>123 Commerce Street, cairo</span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <SocialIcon href="#" icon={<FacebookIcon className="h-4 w-4" />} />
                <SocialIcon href="#" icon={<InstagramIcon className="h-4 w-4" />} />
                <SocialIcon href="#" icon={<YoutubeIcon className="h-4 w-4" />} />
              </div>
            </div>

            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="Account" links={accountLinks} />
            <FooterColumn title="Support" links={supportLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-4 py-4 text-xs text-[#8fa1b8] md:flex-row md:items-center lg:px-6">
            <p>© 2026 FreshCart. All rights reserved.</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Visa</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Mastercard</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5" />
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FeatureItem({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#dff1e1] bg-transparent px-2 py-1.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9f9eb]">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-[#1a1a1a]">{title}</h4>
        <p className="text-xs text-[#7a7a7a]">{subtitle}</p>
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold text-white">{title}</h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#9fb0c7] transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  icon,
  href,
}: {
  icon: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#d7dfeb] transition hover:border-[#00b207] hover:bg-[#00b207] hover:text-white"
      aria-label="social link"
    >
      {icon}
    </a>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.17 8.44 9.93v-7.03H7.9V12.07h2.54V9.86c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.77l-.44 2.9h-2.33V22c4.78-.76 8.45-4.91 8.45-9.93Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.25 1.65a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.11C17.62 4.6 12 4.6 12 4.6s-5.62 0-7.48.48a2.98 2.98 0 0 0-2.1 2.11C1.94 9.06 1.94 12 1.94 12s0 2.94.48 4.81a2.98 2.98 0 0 0 2.1 2.11c1.86.48 7.48.48 7.48.48s5.62 0 7.48-.48a2.98 2.98 0 0 0 2.1-2.11c.48-1.87.48-4.81.48-4.81s0-2.94-.48-4.81ZM10.2 15.1V8.9L15.4 12l-5.2 3.1Z" />
    </svg>
  );
}