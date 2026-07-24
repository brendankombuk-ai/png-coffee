import { productsValueAdded as staticProductsValueAdded } from "@/data/content";

export default function ProductsValueAdded({
  productsValueAdded = staticProductsValueAdded,
}: {
  productsValueAdded?: typeof staticProductsValueAdded;
} = {}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-[100px] pt-[60px] sm:px-10">
      <h2 className="text-center font-display text-[38px] font-extrabold uppercase leading-[1.1] tracking-[1px] text-white sm:text-[48px] lg:text-[52px]">
        {productsValueAdded.title}
      </h2>

      <div className="mx-auto mt-[30px] max-w-[1000px] text-left">
        <p className="text-base leading-[1.8] text-white/90 sm:text-lg">
          {productsValueAdded.intro}
        </p>
        <div className="mt-1">
          {productsValueAdded.items.map((item) => (
            <p
              key={item}
              className="text-base leading-[1.8] text-white/90 sm:text-lg"
            >
              - {item}
            </p>
          ))}
        </div>
        <p className="mt-1 text-base leading-[1.8] text-white/90 sm:text-lg">
          {productsValueAdded.outro}
        </p>
      </div>
    </section>
  );
}
