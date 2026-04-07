import ChangePasswordForm from "@/components/ProfileForms/ChangePasswordForm";

export default function ProfileSettingsPage() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-4xl font-bold text-slate-900">Settings</h2>
      <p className="mt-3 text-xl text-slate-500">
        Manage your account password and preferences
      </p>

      <div className="mt-8">
        <ChangePasswordForm />
      </div>
    </section>
  );
}