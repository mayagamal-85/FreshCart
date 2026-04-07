import { Mail, ArrowRight, CheckCircle2, Star } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="mt-16 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px] rounded-[28px] border border-[#e6efe7] bg-[linear-gradient(90deg,#f6fbf7_0%,#f9f4f4_100%)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_.8fr] lg:items-center">
          <div className="pr-0 lg:pr-8">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00b207] text-white shadow-[0_8px_20px_rgba(0,178,7,0.25)]">
                <Mail className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00b207]">
                  Newsletter
                </p>
                <p className="text-xs text-[#7a7a7a]">50,000+ subscribers</p>
              </div>
            </div>

            <h2 className="max-w-[620px] text-[28px] font-bold leading-[1.2] text-[#1a1a1a] md:text-[38px]">
              Get the Freshest Updates{" "}
              <span className="text-[#00b207]">Delivered Free</span>
            </h2>

            <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#6b7280] md:text-[15px]">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Badge text="Fresh Picks Weekly" />
              <Badge text="Free Delivery Codes" />
              <Badge text="Members-Only Deals" />
            </div>

            <form className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-14 flex-1 rounded-2xl border border-[#d7e5d9] bg-white px-4 text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#a3a3a3] focus:border-[#00b207] focus:ring-2 focus:ring-[#00b207]/15"
              />
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#00b207] px-7 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,178,7,0.25)] transition hover:bg-[#009a06]"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-3 text-[11px] text-[#b3b3b3]">
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top_right,_rgba(0,178,7,0.22),_transparent_22%),linear-gradient(180deg,#0f1c35_0%,#132746_100%)] p-6 text-white shadow-[0_20px_40px_rgba(8,15,35,0.22)]">
            <div className="mb-5 inline-flex rounded-full bg-[#00b207]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6ee784]">
              Mobile App
            </div>

            <h3 className="text-[28px] font-bold leading-tight">
              Shop Faster on Our App
            </h3>

            <p className="mt-3 max-w-[320px] text-sm leading-6 text-[#c8d3e2]">
              Get app-exclusive deals & 15% off your first order.
            </p>

            <div className="mt-6 space-y-3">
              <StoreButton title="Download on" subtitle="App Store" />
              <StoreButton title="Get it on" subtitle="Google Play" />
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#b7c5d9]">
              <div className="flex items-center gap-0.5 text-[#ffd54a]">
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <span>4.9 • 100K+ downloads</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#dbeadf] bg-white/75 px-3 py-2 text-xs font-medium text-[#4b5563]">
      <CheckCircle2 className="h-4 w-4 text-[#00b207]" />
      <span>{text}</span>
    </div>
  );
}

function StoreButton({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-left transition hover:bg-white/12"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
        <Mail className="h-4 w-4 opacity-90" />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#9fb0c7]">
          {title}
        </p>
        <p className="text-sm font-semibold text-white">{subtitle}</p>
      </div>
    </button>
  );
}