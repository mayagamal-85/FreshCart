import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Headphones,
  Send,
  HelpCircle,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <section className="bg-slate-50">
      <div className="bg-gradient-to-r from-green-500 to-emerald-400">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-white">Contact Us</span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex size-18 items-center justify-center rounded-3xl bg-white/15 shadow-lg backdrop-blur">
                <Headphones className="size-9 text-white" />
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
                  Contact Us
                </h1>
                <p className="mt-3 text-lg text-white/90">
                  We&apos;d love to hear from you. Get in touch with our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-green-50">
                  <Phone className="size-7 text-green-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Phone</h3>
                  <p className="mt-2 text-lg text-slate-500">
                    Mon-Fri from 8am to 6pm
                  </p>
                  <p className="mt-3 text-4xl font-medium text-green-600">
                    +1 (800) 123-4567
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-green-50">
                  <Mail className="size-7 text-green-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Email</h3>
                  <p className="mt-2 text-lg text-slate-500">
                    We&apos;ll respond within 24 hours
                  </p>
                  <p className="mt-3 text-4xl font-medium text-green-600">
                    support@freshcart.com
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-green-50">
                  <MapPin className="size-7 text-green-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Office</h3>
                  <p className="mt-3 text-2xl leading-relaxed text-slate-600">
                    123 Commerce Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-green-50">
                  <Clock className="size-7 text-green-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Business Hours
                  </h3>
                  <p className="mt-3 text-2xl leading-relaxed text-slate-600">
                    Monday - Friday: 8am - 6pm
                    <br />
                    Saturday: 9am - 4pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Follow Us</h3>

              <div className="mt-6 flex items-center gap-4">
                <a
                  href="#"
                  className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-green-600 hover:text-white"
                >
                  <FaFacebookF className="size-5" />
                </a>

                <a
                  href="#"
                  className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-green-600 hover:text-white"
                >
                  <FaXTwitter className="size-5" />
                </a>

                <a
                  href="#"
                  className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-green-600 hover:text-white"
                >
                  <FaInstagram className="size-5" />
                </a>

                <a
                  href="#"
                  className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-green-600 hover:text-white"
                >
                  <FaLinkedinIn className="size-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-green-50">
                  <Headphones className="size-7 text-green-600" />
                </div>

                <div>
                  <h2 className="text-4xl font-bold text-slate-900">
                    Send us a Message
                  </h2>
                  <p className="mt-2 text-xl text-slate-500">
                    Fill out the form and we&apos;ll get back to you
                  </p>
                </div>
              </div>

              <form className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-xl font-medium text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="h-16 w-full rounded-2xl border border-slate-200 px-5 text-xl text-slate-700 outline-none transition focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-xl font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="h-16 w-full rounded-2xl border border-slate-200 px-5 text-xl text-slate-700 outline-none transition focus:border-green-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-xl font-medium text-slate-700">
                    Subject
                  </label>
                  <select className="h-16 w-full rounded-2xl border border-slate-200 px-5 text-xl text-slate-700 outline-none transition focus:border-green-600">
                    <option>Select a subject</option>
                    <option>Order Support</option>
                    <option>Shipping Inquiry</option>
                    <option>Returns & Refunds</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-xl font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-xl text-slate-700 outline-none transition focus:border-green-600"
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex h-16 items-center gap-3 rounded-2xl bg-green-600 px-8 text-xl font-semibold text-white transition hover:bg-green-700"
                >
                  <Send className="size-5" />
                  Send Message
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-green-100 bg-green-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <HelpCircle className="size-7 text-green-600" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-slate-900">
                    Looking for quick answers?
                  </h3>
                  <p className="mt-3 text-xl leading-relaxed text-slate-600">
                    Check out our Help Center for frequently asked questions
                    about orders, shipping, returns, and more.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center text-2xl font-medium text-green-600 hover:text-green-700"
                  >
                    Visit Help Center →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}