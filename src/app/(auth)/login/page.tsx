"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Truck, Headphones } from "lucide-react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { useState } from "react";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginType) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.ok) {
      toast.success("Welcome back 💚", {
        duration: 3000,
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/");
      }, 800);
      return;
    }

    toast.error("Can't login right now", {
      duration: 3000,
      position: "top-center",
    });
  }

  return (
    <section className="min-h-screen bg-[#f8fafc] px-4 pb-12 pt-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[1.25/1] w-full bg-[#f7f7f7]">
              <Image
                src="/images/auth/cart-vegetables.png"
                alt="FreshCart login"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl text-center">
            <h2 className="text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>

            <p className="mt-6 text-[28px] leading-[1.5] text-slate-600 max-lg:text-xl">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-lg text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="size-5 text-green-600" />
                <span>Free Delivery</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-green-600" />
                <span>Secure Payment</span>
              </div>

              <div className="flex items-center gap-2">
                <Headphones className="size-5 text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              <span className="text-green-600">Fresh</span>Cart
            </h1>
            <h2 className="mt-5 text-4xl font-extrabold text-slate-900">Welcome Back!</h2>
            <p className="mt-4 text-[28px] text-slate-600 max-lg:text-xl">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <button
              type="button"
              className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white text-xl font-medium text-slate-800 transition hover:bg-slate-50"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>

            <button
              type="button"
              className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white text-xl font-medium text-slate-800 transition hover:bg-slate-50"
            >
              <FaFacebookF className="text-blue-600" />
              Continue with Facebook
            </button>
          </div>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-lg uppercase tracking-wide text-slate-500">
              Or continue with email
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="mb-3 block text-xl font-medium text-slate-800">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-16 w-full rounded-2xl border border-slate-300 bg-white pl-14 pr-4 text-xl text-slate-900 outline-none transition focus:border-green-600"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-xl font-medium text-slate-800">Password</label>
                <Link href="#" className="text-xl font-medium text-green-600 hover:text-green-700">
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-16 w-full rounded-2xl border border-slate-300 bg-white pl-14 pr-14 text-xl text-slate-900 outline-none transition focus:border-green-600"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <label className="flex items-center gap-3 text-lg text-slate-700">
              <input
                type="checkbox"
                className="size-5 rounded border-slate-300 accent-green-600"
                {...register("rememberMe")}
              />
              Keep me signed in
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-16 w-full items-center justify-center rounded-2xl bg-green-600 text-2xl font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-10 border-t border-slate-200 pt-8 text-center">
            <p className="text-2xl text-slate-700">
              New to FreshCart?{" "}
              <Link href="/signup" className="font-semibold text-green-600 hover:text-green-700">
                Create an account
              </Link>
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-lg text-slate-500">
              <div className="flex items-center gap-2">
                <Lock className="size-4" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👥</span>
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}