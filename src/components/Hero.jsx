export default function Hero() {
  return (
    <section className="h-[70vh] flex flex-col justify-center items-center text-center bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold">
        Elevate Your Style
      </h1>

      <p className="mt-4 text-black-600">
        Discover premium fashion curated for you
      </p>

      <a
        href="/products"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
      >
        Shop Now
      </a>
    </section>
  );
}