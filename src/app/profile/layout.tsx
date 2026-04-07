import type { ReactNode } from "react";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import ProfileHero from "@/components/Profile/ProfileHero";

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <ProfileHero
          title="My Account"
          description="Manage your addresses and account settings"
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
          <ProfileSidebar />
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}