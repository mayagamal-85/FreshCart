export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-[#f8f9fa] px-4 py-12">
      {children}
    </section>
  );
}