import { User } from "lucide-react";

type ProfileHeroProps = {
  title: string;
  description: string;
};

export default function ProfileHero({
  title,
  description,
}: ProfileHeroProps) {
  return (
    <section className="rounded-[28px] bg-gradient-to-r from-green-500 to-green-400 px-8 py-8 text-white shadow-sm">
      <div className="flex items-center gap-5">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20">
          <User className="size-8" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-base text-white/90">{description}</p>
        </div>
      </div>
    </section>
  );
}