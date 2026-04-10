// app/page.jsx

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <main className="bg-[#f8f8f8] text-black">

      <Navbar />

      {/* HERO */}
     
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white">

  <img
    src="/hero.jpg"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/50" />

  <div className="relative z-10 max-w-2xl px-6">

    <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
      Shop Trendy Fashion That Turns Heads
    </h1>

    <p className="mt-4 text-gray-200">
      Affordable, stylish outfits delivered fast across Ghana
    </p>

    <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium hover:scale-105 transition">
      Shop Collection
    </button>

  </div>

</section>
<section className="bg-white py-6 border-b">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 text-center text-sm text-gray-600">

    <p>🚚 Fast Delivery</p>
    <p>💬 Easy WhatsApp Orders</p>
    <p>✅ Quality Guaranteed</p>

  </div>
</section>

      {/* FEATURED PRODUCTS */}
      
     <section className="max-w-5xl mx-auto px-10 py-16">

  <h2 className="text-2xl md:text-3xl font-semibold mb-8">
    Featured Products
  </h2>


        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
          {products.slice(0, 6).map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>

              
            
        <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

  <div className="relative overflow-hidden">

    <img
      src={p.image}
      className="w-full aspect-[3/4] md:h-96 object-cover group-hover:scale-105 transition duration-300"
    />

    {/* HOVER BUTTON */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
      <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
        view details
      </button>
    </div>

  </div>

  <div className="p-4">

    <h3 className="text-sm font-medium text-gray-900">
      {p.name}
    </h3>

    <p className="text-base font-semibold text-gray-700 mt-1">
      GH₵{p.price}
    </p>


    

  </div>

  

</div>


            </Link>
          ))}

        
        </div>

<a
        href="/products"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg mx-auto block w-max hover:bg-gray-900 transition"
      >
        Shop Now
      </a>
      </section>

      {/* CATEGORY SECTION */}
      
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">

  {[
    { name: "Dresses", image: "/cloths.jpg" },
    { name: "Bags", image: "/bags.jpg" },
    { name: "Accessories", image: "/acces.jpg" },
  ].map((cat, i) => (
    <div key={i} className="relative rounded-xl overflow-hidden group">

      <img
        src={cat.image}
        className="w-full h-64 object-cover group-hover:scale-105 transition"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-lg font-semibold">
          {cat.name}
        </h3>
      </div>

    </div>
  ))}

</section>


      {/* TRUST SECTION */}
      <section className="px-6 py-16 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold">
          Why Shop With Us
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm text-black">
          <div>
            <h4 className="font-semibold text-black">Fast Delivery</h4>
            <p className="mt-2">Get your orders delivered quickly anywhere in Ghana</p>
          </div>

          <div>
            <h4 className="font-semibold text-black">Premium Quality</h4>
            <p className="mt-2">Carefully selected high-quality products</p>
          </div>

          <div>
            <h4 className="font-semibold text-black">Easy Ordering</h4>
            <p className="mt-2">Order directly on WhatsApp with no stress</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white text-center py-16">

  <h2 className="text-2xl font-semibold">
    Ready to Order?
  </h2>

  <p className="mt-2 text-gray-300">
    Send your order directly via WhatsApp
  </p>

  <button className="mt-6 bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600 transition">
    Order on WhatsApp
  </button>

</section>

    </main>
  );
}