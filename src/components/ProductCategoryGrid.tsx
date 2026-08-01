import Link from "next/link";
import Image from "next/image";
import {
  productCategories as staticProductCategories,
  type ProductCategory,
} from "@/data/content";

export default function ProductCategoryGrid({
  productCategories = staticProductCategories,
}: {
  productCategories?: ProductCategory[];
} = {}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-[60px] pt-[60px] sm:px-10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {productCategories.map((card) => (
          <Link
            key={card.id}
            href={`/products/${card.slug}`}
            className="group block cursor-pointer overflow-hidden rounded-lg bg-white/5 transition-all duration-[350ms] ease-out hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(232,52,28,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-200"
          >
            <div className="relative h-[320px] w-full overflow-hidden">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-ember-400/50 transition-opacity duration-[350ms] ease-out group-hover:opacity-100" />
            </div>
            <p className="p-4 text-center text-lg font-medium uppercase tracking-wide text-white">
              {card.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

