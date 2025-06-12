"use client";

import { useState } from "react";

/**
 * A reusable button component with basic styling
 * @param onClick = Function to execute on button click
 * @param children - Button label or nested components
 * @returns 
 */
function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full btn-primary text-black mt-auto"
    >
      {children}
    </button>
  );
}

// SimCoin purchase bundles available to users 
const bundles = [
  {
    name: "Starter",
    simcoins: 60,
    price: "$6.88",
    priceId: "price_1RSmQ91aYZsZjxD5M0WBzr2U", //price ID from Stripe 
  },
  {
    name: "Pro",
    simcoins: 150,
    price: "$13.88",
    priceId: "price_1RSmQ71aYZsZjxD5rHrVkdIG", //price ID from Stripe 
  }, 
  {
    name: "Elite",
    simcoins: 400,
    price: "$28.88",
    priceId: "price_1RSmQ61aYZsZjxD53VL9ZAWT", //price ID from Stripe 
  },
];

/**
 * SimCoinPage component renders a UI where users can purchase SimCoins
 * through different pricing tiers using Stripe Checkout
 */
export default function SimCoinPage() {
  const [loading, setLoading] = useState(false);

  /**
   * Sends a request to the backend to create a Stripe Checkout session.
   * Redirects the user to Stripe on success. 
   * @param priceId = Stripe price ID for the selected bundle  
   */
  const handleBuy = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert("Checkout failed.");
        setLoading(false);
      }
    } catch (err) {
      alert("Something went wrong.");
      setLoading(false);
    }
  };

return (
  <main className="w-full px-6 py-20 bg-[#0b0e1c] text-white">
    <h1 className="text-5xl font-bold mb-4 text-center">Purchase SimCoins</h1>
    <p className="text-lg text-center text-gray-400 mb-16">Choose the bundle that works for you</p>

    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {bundles.map((bundle, index) => (
        <div
          key={bundle.name}
          className="relative flex flex-col justify-between border border-gray-700 p-10 rounded-2xl shadow-lg text-center bg-[#11152a] w-full h-full"
        >
          {/* Top Badge */}
          {index === 1 && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Better Value
            </span>
          )}
          {index === 2 && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Best Value
            </span>
          )}

          {/* Card Content */}
          <h2 className="text-2xl font-bold mb-2">{bundle.name}</h2>
          <p className="text-sm text-gray-400 mb-1">{bundle.simcoins} SimCoins</p>
          <p className="text-3xl font-extrabold mb-6">{bundle.price}</p>
          <Button onClick={() => handleBuy(bundle.priceId)}>
            {loading ? "Loading..." : "Buy Now"}
          </Button>
        </div>
      ))}
    </div>
  </main>
  ); 
};