import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
  // Pehle Shoply loading GIF dikhega
  await wait(2000);

  // Uske baad session check hoga
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("shoply_session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const session = await verifySession(sessionToken);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#faf7ff]">
      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center gap-8 px-6">
          <div className="flex min-w-[150px] items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ed1760] text-2xl font-bold text-white">
              ◇
            </div>

            <span className="text-[28px] font-bold tracking-tight text-[#ed1760]">
              Shoply
            </span>
          </div>

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

            <button
              type="button"
              className="w-12 bg-[#ed1760] text-white"
            >
              🔍
            </button>
          </div>

          <div className="flex items-center gap-7 text-xs">
            <div className="text-center">
              <div className="mb-1 text-[24px]">♙</div>
              <span>Account</span>
            </div>

            <div className="text-center">
              <div className="mb-1 text-[25px]">♡</div>
              <span>Wishlist</span>
            </div>

            <div className="relative text-center">
              <div className="mb-1 text-[24px]">🛒</div>

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ed1760] text-[9px] text-white">
                0
              </span>

              <span>Cart</span>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
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

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#fff0f7] via-[#fff8fc] to-[#fbf8ff]">
        <div className="mx-auto grid min-h-[430px] max-w-[1440px] grid-cols-2 items-center gap-10 px-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ed1760]">
              Welcome to Shoply
            </p>

            <h1 className="text-5xl font-bold leading-tight text-[#171827]">
              Shop Smart.
              <br />
              Live Better.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-7 text-gray-600">
              Discover quality products at amazing prices with a simple,
              secure and enjoyable shopping experience.
            </p>

            <button
              type="button"
              className="mt-7 rounded-lg bg-[#ed1760] px-8 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Shop Now
            </button>
          </div>

          <div className="relative flex h-[360px] items-center justify-center">
            <div className="absolute h-[300px] w-[300px] rounded-full bg-[#f9dff0]" />

            <div className="relative z-10 text-center">
              <div className="text-8xl">🛍️</div>

              <div className="mt-4 text-3xl font-bold text-[#ed1760]">
                SHOPLY
              </div>

              <p className="mt-2 text-gray-500">
                Everything you love, in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-[1400px] px-8 py-10">
        <h2 className="mb-6 text-2xl font-bold text-[#171827]">
          Shop by Category
        </h2>

        <div className="grid grid-cols-5 gap-5">
          {[
            ["👗", "Women"],
            ["👕", "Men"],
            ["🧸", "Kids"],
            ["💄", "Beauty"],
            ["🏠", "Home"],
          ].map(([icon, title]) => (
            <div
              key={title}
              className="cursor-pointer rounded-xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-4xl">{icon}</div>

              <h3 className="mt-3 font-semibold text-gray-800">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-[1400px] px-8 pb-10">
        <div className="grid grid-cols-4 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-r p-6">
            <div className="text-2xl">🚚</div>
            <h3 className="mt-3 font-semibold">Free Delivery</h3>
            <p className="mt-1 text-sm text-gray-500">
              On orders above ₹499
            </p>
          </div>

          <div className="border-r p-6">
            <div className="text-2xl">↩️</div>
            <h3 className="mt-3 font-semibold">Easy Returns</h3>
            <p className="mt-1 text-sm text-gray-500">
              7 days return policy
            </p>
          </div>

          <div className="border-r p-6">
            <div className="text-2xl">🔒</div>
            <h3 className="mt-3 font-semibold">Secure Payments</h3>
            <p className="mt-1 text-sm text-gray-500">
              100% secure payments
            </p>
          </div>

          <div className="p-6">
            <div className="text-2xl">🎧</div>
            <h3 className="mt-3 font-semibold">24/7 Support</h3>
            <p className="mt-1 text-sm text-gray-500">
              Customer support
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#171827] px-8 py-10 text-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-2xl font-bold text-[#ed1760]">
            Shoply
          </div>

          <p className="mt-3 text-sm text-gray-400">
            Best quality products, best prices and best experience.
          </p>

          <div className="mt-8 border-t border-gray-700 pt-5 text-sm text-gray-500">
            © 2026 Shoply. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}