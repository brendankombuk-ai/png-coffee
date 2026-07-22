import { productsValueAdded as staticProductsValueAdded } from "@/data/content";

export default function ProductsValueAdded({
  productsValueAdded = staticProductsValueAdded,
  titleAs: TitleTag = "h2",
}: {
  productsValueAdded?: typeof staticProductsValueAdded;
  /** Heading level for the title — "h1" when this is a standalone page's main heading. */
  titleAs?: "h1" | "h2";
} = {}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-[100px] pt-[60px] sm:px-10">
      <TitleTag className="text-center font-display text-[38px] font-extrabold uppercase leading-[1.1] tracking-[1px] text-white sm:text-[48px] lg:text-[52px]">
        {productsValueAdded.title}
      </TitleTag>

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
