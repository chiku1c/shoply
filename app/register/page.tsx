"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!form.name.trim()) {
    setError("Please enter your full name.");
    return;
  }

  if (!form.email.trim()) {
    setError("Please enter your email address.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!/^\d{10}$/.test(form.mobile)) {
    setError("Mobile number must be 10 digits.");
    return;
  }

  if (form.password.length < 8) {
    setError("Password must contain at least 8 characters.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (!form.terms) {
    setError("Please accept Terms & Conditions.");
    return;
  }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile,
        password: form.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Registration failed.");
      return;
    }

    setSuccess("Account created successfully! 🎉");

    console.log("Registered User:", data.user);
  } catch (error) {
    console.error("Registration error:", error);
    setError("Unable to connect to the server. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-[#faf7ff] text-[#171717]">

      {/* TOP BAR */}
      <div className="bg-[#171827] px-6 py-2 text-xs text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <span>🚚 Free Delivery on orders above ₹499</span>
          <span>↩ 7 Days Easy Returns</span>
          <span>🔒 100% Secure Payments</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center gap-8 px-6">

          <Link
            href="/"
            className="flex min-w-[150px] items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ed1760] text-2xl font-bold text-white">
              ◇
            </div>

            <span className="text-[28px] font-bold text-[#ed1760]">
              Shoply
            </span>
          </Link>

          {/* SEARCH */}
          <div className="flex h-11 flex-1 overflow-hidden rounded-lg border border-gray-200">

            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="flex-1 px-4 text-sm outline-none"
            />

            <select className="border-l border-gray-200 bg-white px-4 text-sm outline-none">
              <option>All Categories</option>
              <option>Women</option>
              <option>Men</option>
              <option>Kids</option>
              <option>Beauty</option>
              <option>Home</option>
            </select>

            <button className="w-12 bg-[#ed1760] text-white">
              🔍
            </button>

          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-7 text-xs">

            <Link href="/login" className="text-center">
              <User className="mx-auto mb-1" size={21} />
              <span>Account</span>
            </Link>

            <div className="text-center">
              <div className="mb-1 text-[25px]">♡</div>
              <span>Wishlist</span>
            </div>

            <div className="text-center">
              <div className="mb-1 text-[22px]">🛒</div>
              <span>Cart</span>
            </div>

          </div>
        </div>
      </header>

      {/* NAV */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-8 text-sm text-gray-700">

          <span>☰ Categories</span>

          <span>
            ◉ Super Deals{" "}
            <b className="text-[#ed1760]">HOT</b>
          </span>

          <span>✦ New Arrivals</span>
          <span>☆ Top Rated</span>
          <span>♧ Offers Zone</span>
          <span>Track Order</span>
          <span>Sell on Shoply</span>

        </div>
      </nav>

      {/* MAIN */}
      <main className="bg-gradient-to-r from-[#fbf8ff] via-[#fff8fc] to-[#fff0f7]">

        <div className="mx-auto grid min-h-[700px] max-w-[1440px] grid-cols-2 items-center gap-16 px-10 py-12">

          {/* REGISTER */}
          <div className="flex justify-center">

            <div className="w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">

              <h1 className="text-[27px] font-bold">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Join Shoply and start your shopping journey
              </p>

              <form onSubmit={handleSubmit}>

                {/* NAME */}
                <div className="mt-6">

                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>

                  <div className="flex h-11 items-center rounded-lg border border-gray-200 px-4 focus-within:border-[#ed1760]">

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full text-sm outline-none"
                    />

                    <User size={18} className="text-gray-400" />

                  </div>
                </div>

                {/* EMAIL */}
                <div className="mt-4">

                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>

                  <div className="flex h-11 items-center rounded-lg border border-gray-200 px-4 focus-within:border-[#ed1760]">

                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full text-sm outline-none"
                    />

                    <Mail size={18} className="text-gray-400" />

                  </div>
                </div>

                {/* MOBILE */}
                <div className="mt-4">

                  <label className="mb-2 block text-sm font-medium">
                    Mobile Number
                  </label>

                  <div className="flex h-11 items-center rounded-lg border border-gray-200 focus-within:border-[#ed1760]">

                    <div className="border-r px-3 text-sm">
                      +91
                    </div>

                    <input
                      name="mobile"
                      value={form.mobile}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);

                        setForm((prev) => ({
                          ...prev,
                          mobile: value,
                        }));

                        setError("");
                        setSuccess("");
                      }}
                      type="tel"
                      placeholder="Enter mobile number"
                      className="w-full px-3 text-sm outline-none"
                    />

                    <Phone
                      size={18}
                      className="mr-4 text-gray-400"
                    />

                  </div>
                </div>

                {/* PASSWORD */}
                <div className="mt-4">

                  <label className="mb-2 block text-sm font-medium">
                    Password
                  </label>

                  <div className="flex h-11 items-center rounded-lg border border-gray-200 px-4 focus-within:border-[#ed1760]">

                    <input
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="w-full text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    Minimum 8 characters
                  </p>

                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mt-3">

                  <label className="mb-2 block text-sm font-medium">
                    Confirm Password
                  </label>

                  <div className="flex h-11 items-center rounded-lg border border-gray-200 px-4 focus-within:border-[#ed1760]">

                    <input
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm your password"
                      className="w-full text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* TERMS */}
                <div className="mt-5 flex items-start gap-2">

                  <input
                    name="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    type="checkbox"
                    className="mt-1 accent-[#ed1760]"
                  />

                  <p className="text-xs leading-5 text-gray-500">
                    I agree to the{" "}
                    <span className="font-medium text-[#ed1760]">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-[#ed1760]">
                      Privacy Policy
                    </span>
                  </p>

                </div>

                {/* ERROR */}
                {error && (
                  <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* SUCCESS */}
                {success && (
                  <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                    {success}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="mt-5 h-11 w-full rounded-lg bg-gradient-to-r from-[#ff245c] to-[#ed1760] font-semibold text-white transition hover:opacity-90"
                >
                  Create Account
                </button>

              </form>

              {/* SOCIAL */}
              <div className="my-5 flex items-center gap-4">

                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-500">
                  or continue with
                </span>

                <div className="h-px flex-1 bg-gray-200" />

              </div>

              <div className="grid grid-cols-2 gap-3">

                <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50">
                  <b className="text-blue-500">G</b>
                  Google
                </button>

                <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50">
                  <b className="text-blue-600">f</b>
                  Facebook
                </button>

              </div>

              {/* LOGIN */}
              <p className="mt-5 text-center text-sm text-gray-600">

                Already have an account?{" "}

                <Link
                  href="/login"
                  className="font-semibold text-[#ed1760]"
                >
                  Login Now
                </Link>

              </p>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center">

            <div className="w-full max-w-[520px]">

              <h2 className="text-[32px] font-bold">
                Welcome to{" "}
                <span className="text-[#ed1760]">
                  Shoply
                </span>
              </h2>

              <p className="mt-3 text-lg leading-7 text-gray-600">
                Best quality products, best prices
                <br />
                and best experience.
              </p>

              <div className="relative mt-8 flex h-[330px] items-center justify-center">

                <div className="absolute h-[280px] w-[280px] rounded-full bg-[#f9dff0]" />

                <div className="relative z-10 mt-8">

                  <div className="absolute -left-5 -top-12 h-20 w-3 rotate-[-15deg] rounded-full bg-gray-500" />

                  <div className="relative h-[150px] w-[240px] rounded-b-[45px] border-[7px] border-gray-500 bg-white shadow-xl">

                    <div className="absolute bottom-5 left-8 h-24 w-14 rotate-[-7deg] rounded-md bg-[#ed1760]" />

                    <div className="absolute bottom-8 left-[82px] h-28 w-16 rotate-[4deg] rounded-md bg-purple-500" />

                    <div className="absolute bottom-6 right-7 h-20 w-14 rotate-[-4deg] rounded-md bg-yellow-400" />

                  </div>

                  <div className="absolute -bottom-7 left-8 h-12 w-12 rounded-full border-[7px] border-gray-500 bg-white" />

                  <div className="absolute -bottom-7 right-8 h-12 w-12 rounded-full border-[7px] border-gray-500 bg-white" />

                </div>

                <div className="absolute bottom-1 left-12 h-20 w-16 rotate-[-8deg] rounded-sm bg-pink-400" />

                <div className="absolute bottom-0 right-12 h-24 w-20 rotate-[7deg] rounded-sm bg-[#ed1760]" />

              </div>

            </div>
          </div>

        </div>

        {/* FEATURES */}
        <div className="mx-auto max-w-[1400px] px-8 pb-10">

          <div className="grid grid-cols-4 overflow-hidden rounded-xl bg-white shadow-sm">

            <Feature
              icon={<Truck size={21} />}
              title="Free Delivery"
              text="On orders above ₹499"
            />

            <Feature
              icon={<RotateCcw size={21} />}
              title="Easy Returns"
              text="7 days return policy"
            />

            <Feature
              icon={<ShieldCheck size={21} />}
              title="Secure Payments"
              text="100% secure payments"
            />

            <Feature
              icon={<Headphones size={21} />}
              title="24/7 Support"
              text="Customer support"
            />

          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white px-10 py-10">

        <div className="mx-auto grid max-w-[1400px] grid-cols-4 gap-10">

          <FooterColumn
            title="Customer Service"
            items={[
              "Help Center",
              "Track Order",
              "Returns & Refunds",
              "Shipping Policy",
              "Contact Us",
            ]}
          />

          <FooterColumn
            title="About Shoply"
            items={[
              "About Us",
              "Careers",
              "Privacy Policy",
              "Terms & Conditions",
              "Sitemap",
            ]}
          />

          <FooterColumn
            title="My Account"
            items={[
              "My Orders",
              "Wishlist",
              "Account Details",
              "Addresses",
              "Logout",
            ]}
          />

          <div>
            <h3 className="font-semibold">
              Download Our App
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Get the best shopping experience on our app
            </p>

            <div className="mt-5 flex gap-3">
              <button className="rounded-lg bg-black px-4 py-2 text-xs text-white">
                ▶ Google Play
              </button>

              <button className="rounded-lg bg-black px-4 py-2 text-xs text-white">
                App Store
              </button>
            </div>
          </div>

        </div>

        <div className="mx-auto mt-8 max-w-[1400px] border-t pt-6 text-sm text-gray-500">
          © 2026 Shoply. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 border-r p-6 last:border-r-0">

      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f5] text-[#ed1760]">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {text}
        </p>
      </div>

    </div>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>

      <h3 className="font-semibold">
        {title}
      </h3>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p
            key={item}
            className="cursor-pointer text-sm text-gray-500 hover:text-[#ed1760]"
          >
            {item}
          </p>
        ))}
      </div>

    </div>
  );
}