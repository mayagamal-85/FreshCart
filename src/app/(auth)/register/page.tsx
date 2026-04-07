"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Shield, Truck, Star, UserPlus } from "lucide-react";
import { FaFacebookF, FaGoogle, FaStar } from "react-icons/fa6";
import { UserRegister } from "@/actions/auth.actions";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain 1 lowercase letter")
      .regex(/[0-9]/, "Password must contain 1 number"),
    rePassword: z.string().min(1, "Please confirm your password"),
    phone: z.string().min(8, "Please enter a valid phone number"),
    acceptTerms: z.literal(true, {
      error: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

type RegisterType = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      acceptTerms: true,
    },
  });

  const passwordValue = watch("password") || "";

  function getPasswordStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", width: "33%", color: "bg-red-400" };
    if (score <= 4) return { label: "Medium", width: "66%", color: "bg-yellow-400" };
    return { label: "Strong", width: "100%", color: "bg-green-500" };
  }

  const strength = getPasswordStrength(passwordValue);

  async function onSubmit(data: RegisterType) {
    const response = await UserRegister({
      name: data.name,
      email: data.email,
      password: data.password,
      rePassword: data.rePassword,
      phone: data.phone,
    });

    if (response) {
      toast.success("You registered successfully 💚", {
        duration: 3000,
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/login");
      }, 900);
      return;
    }

    toast.error("We can't register now", {
      duration: 3000,
      position: "top-center",
    });
  }

  return (
    <section className="min-h-screen bg-[#f8fafc] px-4 pb-12 pt-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>

            <p className="mt-6 text-[28px] leading-[1.5] text-slate-600 max-lg:text-xl">
              Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
                  <Star className="size-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">Premium Quality</h3>
                  <p className="mt-1 text-2xl text-slate-600 max-lg:text-lg">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
                  <Truck className="size-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">Fast Delivery</h3>
                  <p className="mt-1 text-2xl text-slate-600 max-lg:text-lg">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
                  <Shield className="size-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">Secure Shopping</h3>
                  <p className="mt-1 text-2xl text-slate-600 max-lg:text-lg">
                    Your data and payments are completely secure
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Image
                  src="/images/auth/avatar-sarah.jpg"
                  alt="Sarah Johnson"
                  width={56}
                  height={56}
                  className="rounded-full"
                />

                <div>
                  <h4 className="text-2xl font-semibold text-slate-900">Sarah Johnson</h4>
                  <div className="mt-2 flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[26px] italic leading-[1.6] text-slate-700 max-lg:text-lg">
                "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-slate-900">Create Your Account</h2>
            <p className="mt-4 text-[28px] text-slate-600 max-lg:text-xl">
              Start your fresh journey with us today
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              className="flex h-16 items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white text-xl font-semibold text-slate-800 hover:bg-slate-50"
            >
              <FaGoogle className="text-red-500" />
              Google
            </button>

            <button
              type="button"
              className="flex h-16 items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white text-xl font-semibold text-slate-800 hover:bg-slate-50"
            >
              <FaFacebookF className="text-blue-600" />
              Facebook
            </button>
          </div>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-2xl text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-xl font-medium text-slate-800">Name*</label>
              <input
                type="text"
                placeholder="Ali"
                className="h-16 w-full rounded-2xl border border-slate-300 px-4 text-xl outline-none transition focus:border-green-600"
                {...register("name")}
              />
              {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-xl font-medium text-slate-800">Email*</label>
              <input
                type="email"
                placeholder="ali@example.com"
                className="h-16 w-full rounded-2xl border border-slate-300 px-4 text-xl outline-none transition focus:border-green-600"
                {...register("email")}
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-xl font-medium text-slate-800">Password*</label>
              <input
                type="password"
                placeholder="create a strong password"
                className="h-16 w-full rounded-2xl border border-slate-300 px-4 text-xl outline-none transition focus:border-green-600"
                {...register("password")}
              />

              <div className="mt-4 flex items-center gap-4">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div className={`h-full ${strength.color}`} style={{ width: strength.width }} />
                </div>
                <span className="text-lg text-slate-600">{strength.label}</span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Must be at least 8 characters with numbers and symbols
              </p>

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xl font-medium text-slate-800">
                Confirm Password*
              </label>
              <input
                type="password"
                placeholder="confirm your password"
                className="h-16 w-full rounded-2xl border border-slate-300 px-4 text-xl outline-none transition focus:border-green-600"
                {...register("rePassword")}
              />
              {errors.rePassword && (
                <p className="mt-2 text-sm text-red-500">{errors.rePassword.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xl font-medium text-slate-800">
                Phone Number*
              </label>
              <input
                type="text"
                placeholder="+1 234 567 8900"
                className="h-16 w-full rounded-2xl border border-slate-300 px-4 text-xl outline-none transition focus:border-green-600"
                {...register("phone")}
              />
              {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <label className="flex items-start gap-3 text-lg text-slate-700">
              <input
                type="checkbox"
                className="mt-1 size-5 rounded border-slate-300 accent-green-600"
                {...register("acceptTerms")}
              />
              <span>
                I agree to the{" "}
                <span className="text-green-600">Terms of Service</span> and{" "}
                <span className="text-green-600">Privacy Policy</span> *
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-green-600 text-2xl font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <UserPlus className="size-5" />
              {isSubmitting ? "Creating..." : "Create My Account"}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-8 text-center">
            <p className="text-2xl text-slate-700">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-green-600 hover:text-green-700">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}