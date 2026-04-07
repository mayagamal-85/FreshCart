export default function ProfilePage() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-4xl font-bold text-slate-900">My Profile</h2>
      <p className="mt-3 text-xl text-slate-500">
        View and manage your account information.
      </p>

      <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-10 text-center">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <span className="text-4xl">👤</span>
        </div>

        <h3 className="mt-6 text-3xl font-semibold text-slate-900">
          Welcome to your profile
        </h3>

        <p className="mx-auto mt-3 max-w-2xl text-xl leading-8 text-slate-500">
          From here you can manage your saved addresses and account settings.
        </p>
      </div>
    </section>
  );
}