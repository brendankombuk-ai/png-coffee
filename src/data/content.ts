export const nav = {
  logo: "/logo/png-coffee-logo.png",
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "PNG", href: "/png" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
};

export const hero = {
  eyebrow: "Small batch \u00b7 Papua New Guinea",
  headline: "Welcome to PNG Coffee.",
  body: [
    "We specialise in producing high-quality roasted coffee beans. From roasting and sorting to packaging, every step is meticulously handled to deliver the freshest coffee straight to you.",
    "Experience the rich, full-bodied flavours of our coffee, crafted with passion and care.",
  ],
  cta: "Explore Our Coffee",
};

export const banner = {
  lineOne: "PNG GROWN,",
  lineTwo: "SHARED WITH THE WORLD",
};

export type FeatureCard = {
  id: string;
  index: string;
  title: string;
  image: string;
  alt: string;
  description: string;
  href: string;
};

export const featureCards: FeatureCard[] = [
  {
    id: "about",
    index: "01",
    title: "About Us",
    image: "/images/about-us.jpg",
    alt: "Farm worker raking coffee cherries out to dry on raised beds in Papua New Guinea",
    description:
      "Learn about our journey, values and commitment to quality coffee from Papua New Guinea.",
    href: "/about",
  },
  {
    id: "png",
    index: "02",
    title: "PNG",
    image: "/images/png.jpg",
    alt: "A Papua New Guinean highlands farmer tending the coffee harvest",
    description:
      "Proudly grown in the rich highlands of Papua New Guinea by dedicated local farmers.",
    href: "/png",
  },
  {
    id: "coffee",
    index: "03",
    title: "Our Coffee",
    image: "/images/our-coffee.jpg",
    alt: "Two cups of freshly brewed PNG Coffee beside roasted beans",
    description:
      "Handcrafted with passion to bring rich, full-bodied flavours in every cup.",
    href: "/products",
  },
];

export const site = {
  name: "PNG Coffee",
  legalName: "SwissXpresso (PNG) Ltd",
  description:
    "PNG Coffee roasts and packs high-quality, small-batch coffee grown in the highlands of Papua New Guinea \u2014 PNG grown, shared with the world.",
  location: "Papua New Guinea",
  url: "https://www.pngcoffee.com",
};

/* ---------------------------- About page content ---------------------------- */

export const aboutHero = {
  eyebrow: "Our Story",
  headline: "Grown with care, roasted with pride.",
  body: [
    "PNG Coffee was founded on a simple belief: the highlands of Papua New Guinea produce some of the finest arabica in the world, and it deserves to be treated that way from cherry to cup.",
  ],
};

export const aboutBanner = {
  lineOne: "ONE FARM, ONE FAMILY,",
  lineTwo: "ONE CUP AT A TIME",
};

export const story = {
  eyebrow: "Farm To Cup",
  heading: "A journey rooted in the highlands",
  paragraphs: [
    "Every bag of PNG Coffee begins in the volcanic soil of the Papua New Guinean highlands, where smallholder farmers have grown arabica for generations. We work directly with these growers, paying fair prices and investing in the drying beds, training and equipment that keep quality consistently high, harvest after harvest.",
    "Once the cherries arrive at our facility, our team sorts, washes and dries each batch by hand before roasting in small runs. It's slower than the industrial alternative, but it's the only way we know how to protect the rich, full-bodied character that makes PNG coffee distinct \u2014 bright acidity, a heavy body, and notes of dark chocolate and stone fruit.",
    "SwissXpresso (PNG) Ltd was built to close the gap between the growers who produce exceptional coffee and the people who drink it, here in PNG and around the world.",
  ],
  values: [
    {
      title: "Quality First",
      description: "Every batch is cupped and graded before it earns the PNG Coffee name.",
    },
    {
      title: "Fair Partnerships",
      description: "We pay highland growers fairly and invest back into their communities.",
    },
    {
      title: "PNG Proud",
      description: "Roasted, packed and shipped from Papua New Guinea, for the world.",
    },
  ],
};

/* ---------------------------- About page (v2) content ---------------------------- */

export const storyIntro = {
  heading: "Our Story",
  paragraphs: [
    "www.pngcoffee.com was launched in 1996, marking a historic milestone as the first website in Papua New Guinea. This pioneering platform opened the door for the world to experience the unique and exquisite coffee grown in the highlands of Papua New Guinea (PNG).",
    "SwissXpresso (PNG) Limited, trading under the registered name/label PNG Coffee (IPA No.93551), is proud to bring the rich flavours of PNG coffee to the global stage.",
  ],
};

export const exploreLinks = [
  { label: "Our Coffee", href: "/products" },
  { label: "Our Mission", href: "#mission" },
];

export const missionSection = {
  heading: "Our Mission",
  tagline: "PNG Grown, Shared with the World.",
  paragraph:
    "We are committed to showcasing the exceptional quality of PNG coffee to the world while supporting the livelihoods of local farmers and promoting sustainable practices.",
};

export type ValueCard = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: "seal" | "flame" | "cup" | "gear";
  image: string;
  alt: string;
  accent: string;
  /** Optional explicit link target. Falls back to `/about/${slug}` when omitted. */
  href?: string;
};

export const valueCards: ValueCard[] = [
  {
    id: "value-added",
    slug: "value-added",
    title: "Value Added",
    description:
      "In alignment with the directives of PNG's Government and the Coffee Industry Corporation (CIC)\u2026",
    icon: "seal",
    image: "/images/about-values/value-added.jpg",
    alt: "Roasted coffee beans, ground coffee, and packaged value-added coffee products",
    accent: "from-ember-600 to-ember-800",
    href: "/value-added",
  },
  {
    id: "roastery",
    slug: "roastery",
    title: "The Roastery",
    description:
      "Located at Gabaka Street, Gordon, Port Moresby, our state-of-the-art roastery allows us to provide\u2026",
    icon: "flame",
    image: "/images/about-values/roastery.jpg",
    alt: "PNG Coffee's roasting machine at the Gabaka Street roastery",
    accent: "from-ember-500 to-void-900",
    href: "/the-roastery",
  },
  {
    id: "barista-training",
    slug: "barista-training",
    title: "Barista Training",
    description:
      "Our baristas and personnel are trained and qualified in Australia, bringing world-class expertise to PNG\u2026",
    icon: "cup",
    image: "/images/about-values/barista-training.jpg",
    alt: "Barista tamping espresso grounds during a training session",
    accent: "from-ember-400 to-ember-600",
    href: "/barista-training",
  },
  {
    id: "equipment-service",
    slug: "equipment-service",
    title: "Coffee Equipment Service",
    description:
      "We provide comprehensive servicing for all coffee equipment\u2026",
    icon: "gear",
    image: "/images/about-values/equipment-service.jpg",
    alt: "Row of professional espresso machines and grinders being serviced",
    accent: "from-void-900 to-ember-900",
    href: "/coffee-equipment-service",
  },
];

export type ValueCardDetail = {
  eyebrow: string;
  intro: string;
  paragraphs: string[];
  highlights: { title: string; description: string }[];
};

export const valueCardDetails: Record<string, ValueCardDetail> = {
  // The Roastery, Barista Training and Coffee Equipment Service each have a
  // bespoke top-level page (/the-roastery, /barista-training,
  // /coffee-equipment-service) with their own data exports below, and
  // "Value Added" has its own page at /value-added. None use the generic
  // detail template, so this lookup is intentionally empty — it's kept only
  // for the CMS adapter's fallback signature.
};

/* ---------------------------- About > The Roastery ---------------------------- */

export type EquipmentItem = {
  id: string;
  label: string;
  alt: string;
  image: string;
};

export const roasteryHero = {
  title: "The Roastery",
  paragraphs: [
    "Located at Gabaka Street, Gordon, Port Moresby, our state-of-the-art roastery allows us to provide fresher and higher-quality coffee to our corporate customers.",
    "Here, we craft custom blends and micro-lots of single-origin beans, ensuring a unique and personalised coffee experience.",
  ],
};

export const coffeeShowroom = {
  heading: "Coffee Showroom",
  paragraphs: [
    "Our roastery is showcased in a stunning glass cube, where visitors can witness the art of coffee roasting. The showroom features a complete range of coffee equipment for cafes and restaurants, including:",
  ],
  items: ["De-stoners", "Colour Sorters", "Tabletop Roasters", "Espresso Machines"],
  outro:
    "This space is designed to inspire and educate, offering a glimpse into the world of premium coffee production.",
  image: "/images/about-values/roastery.jpg",
  alt: "PNG Coffee's roasting machine at the Gabaka Street roastery",
};

export const roasteryEquipment: EquipmentItem[] = [
  {
    id: "de-stoner",
    label: "De-Stoner",
    alt: "Coffee bean de-stoning machine",
    image: "/images/about-values/gallery/de-stoner.png",
  },
  {
    id: "bagging-filling",
    label: "Bagging & Filling",
    alt: "Automated coffee bagging and filling machine with touchscreen",
    image: "/images/about-values/gallery/bagging-filling.png",
  },
  {
    id: "roaster",
    label: "Roaster",
    alt: "Tall stainless coffee roasting and packaging tower",
    image: "/images/about-values/gallery/roaster.png",
  },
  {
    id: "weighing-filling",
    label: "Weighing & Filling",
    alt: "Coffee weighing and filling unit with control panel",
    image: "/images/about-values/gallery/weighing-filling.png",
  },
  {
    id: "sealing-line",
    label: "Sealing Line",
    alt: "Continuous coffee bag sealing conveyor line with green belt",
    image: "/images/about-values/gallery/sealing-line.png",
  },
];

/* ---------------------------- About > Barista Training ---------------------------- */

export const baristaTrainingHero = {
  title: "Barista Training",
  paragraphs: [
    "Our baristas and personnel are trained and qualified in Australia, bringing world-class expertise to PNG.",
    "We also offer short courses for aspiring baristas who are passionate about mastering the art of coffee-making.",
  ],
};

export const baristaTrainingImage = {
  src: "/images/about-values/barista-training.jpg",
  alt: "Barista tamping freshly ground espresso during a training session",
};

/* ---------------------------- About > Coffee Equipment Service ---------------------------- */

export const equipmentServiceHero = {
  title: "Coffee Equipment Service",
  paragraphs: [
    "We provide comprehensive servicing for all coffee equipment, carried out by qualified technicians.",
    "Our team is trusted by leading hotel groups, eliminating the need for overseas repair services and ensuring that your equipment operates at its best.",
  ],
};

export const equipmentServiceImage = {
  src: "/images/about-values/equipment-service.jpg",
  alt: "A row of professional espresso machines and grinders on a cafe counter",
};

export type Product = {
  id: string;
  name: string;
  weight: string;
  price: string;
  description: string;
  accent: string;
};

export const products: Product[] = [
  {
    id: "classic-roast",
    name: "Classic Roast",
    weight: "250g Whole Bean",
    price: "K45.00",
    description:
      "Our signature medium roast \u2014 balanced, smooth and full-bodied. The everyday cup.",
    accent: "from-ember-600 to-ember-800",
  },
  {
    id: "highlands-reserve",
    name: "Highlands Reserve",
    weight: "250g Whole Bean",
    price: "K62.00",
    description:
      "A limited single-origin lot from our highest-altitude growers. Bright, complex, unforgettable.",
    accent: "from-ember-400 to-ember-600",
  },
  {
    id: "decaf-blend",
    name: "Decaf Blend",
    weight: "250g Ground",
    price: "K48.00",
    description:
      "All the depth of flavour, none of the caffeine. Naturally water-processed.",
    accent: "from-void-900 to-ember-900",
  },
  {
    id: "gift-set",
    name: "Coffee Gift Set",
    weight: "3 x 200g",
    price: "K120.00",
    description:
      "A tasting trio of our best roasts, boxed and ready to share. PNG Grown, gifted with the world.",
    accent: "from-ember-700 to-void-900",
  },
];

/* ---------------------------- PNG page content ---------------------------- */

export const pngHero = {
  eyebrow: "The Origin",
  headline: "Born in the highlands of Papua New Guinea.",
  body: [
    "Between 1,300 and 2,100 metres above sea level, in volcanic soil and equatorial rain, Papua New Guinea's highlands grow some of the most sought-after arabica on earth \u2014 almost all of it on small family plots, picked and processed by hand.",
  ],
};

export const pngBanner = {
  lineOne: "13 GROWING REGIONS,",
  lineTwo: "ONE PROUD NATION",
};

export const originStory = {
  eyebrow: "The Land",
  heading: "A country built for coffee",
  paragraphs: [
    "Coffee arrived in Papua New Guinea in the 1930s and found a near-perfect home: high altitude, rich volcanic soil, distinct wet and dry seasons, and a climate that lets cherries ripen slowly, concentrating flavour. Today, well over 400,000 smallholder households across the highlands grow coffee as their primary source of income.",
    "There is no large industrial farming here \u2014 just family gardens of a few hundred trees each, picked by hand and carried down mountain tracks to wet mills. It's a slower, more human way to grow coffee, and it shows in the cup: PNG arabica is prized for its heavy body, bright acidity and notes of dark chocolate, stone fruit and warm spice.",
    "When you buy PNG Coffee, you're buying directly into that highland economy \u2014 into the farmers, the drying beds, and the communities that have grown this crop for three generations.",
  ],
  values: [
    {
      title: "Volcanic Soil",
      description: "Rich highland earth that gives PNG arabica its heavy body and depth.",
    },
    {
      title: "High Altitude",
      description: "Grown 1,300\u20132,100m up, where cherries ripen slowly and flavour concentrates.",
    },
    {
      title: "Smallholder Farms",
      description: "Over 400,000 family gardens, hand-picked and carried down to the mill.",
    },
  ],
};

export type Region = {
  id: string;
  name: string;
  altitude: string;
  notes: string;
  accent: string;
};

export const regions: Region[] = [
  {
    id: "eastern-highlands",
    name: "Eastern Highlands",
    altitude: "1,500\u20132,000m",
    notes: "The heartland of PNG coffee \u2014 bright acidity, full body, chocolate finish.",
    accent: "from-ember-600 to-ember-800",
  },
  {
    id: "western-highlands",
    name: "Western Highlands",
    altitude: "1,600\u20132,100m",
    notes: "High-altitude lots with winey acidity and dense, syrupy body.",
    accent: "from-ember-400 to-ember-600",
  },
  {
    id: "simbu",
    name: "Simbu (Chimbu)",
    altitude: "1,400\u20131,900m",
    notes: "Steep mountain gardens producing sweet, balanced, low-acid cups.",
    accent: "from-void-900 to-ember-900",
  },
  {
    id: "jiwaka",
    name: "Jiwaka",
    altitude: "1,500\u20131,800m",
    notes: "A newer province with fast-growing cooperatives and vivid fruit-forward lots.",
    accent: "from-ember-700 to-void-900",
  },
];

/* ---------------------------- PNG page (tourism redesign) content ---------------------------- */

export const pngTourism = {
  title: "Papua New Guinea",
  paragraphs: [
    "Papua New Guinea is a land of breathtaking beauty and cultural diversity. Located north of Australia, on the eastern side of the island of New Guinea near the Equator, PNG is part of the Pacific Ring of Fire. Its landscape is dominated by rugged mountains, lush tropical rainforests, and fertile volcanic soil. The highest peak, Mount Wilhelm, rises to an impressive 4,509 meters (14,793 feet). At times with snowfall at its peak is a phenomenon being so close to the Equator.",
    "PNG is home to over 800 distinct languages, making it one of the most linguistically diverse countries in the world. This diversity is reflected in the rich cultural heritage of its people, who have nurtured the land and its resources for generations.",
  ],
};

export type HeartOfPngCard = {
  id: string;
  title: string;
  description: string;
  /** Real photo not yet supplied — see PROJECT_HANDOFF notes. */
  image?: string;
  alt?: string;
};

export const heartOfPngPage = {
  title: "\u201cThe Heart Of Papua New Guinea : A Tapestry Of Tradition\u201d",
  cards: [
    {
      id: "diversity",
      title: "Diversity",
      description:
        "Papua New Guinea is one of the most culturally diverse countries in the world, with over 800 distinct languages and various traditional customs across regions. These languages and cultures are often tied to specific tribes or villages.",
      image: "/images/heart-of-png/diversity.jpg",
      alt: "Highlands warriors in traditional headdress and face paint at a PNG cultural show",
    },
    {
      id: "traditional-art-craft",
      title: "Traditional Art and Craft",
      description:
        "The people of Papua New Guinea are known for their traditional art, including vibrant carvings, intricate basket weaving, and colorful body painting. These crafts often carry significant cultural and spiritual meaning.",
      image: "/images/heart-of-png/traditional-art-craft.jpg",
      alt: "Hand-painted traditional PNG carvings and artwork",
    },
    {
      id: "ceremonies-festivals",
      title: "Ceremonies and Festivals",
      description:
        "Cultural ceremonies are important, with many involving traditional dances, songs, and rituals. Events like the Mount Hagen Cultural Show showcase the vibrant traditions of different tribes through performances and displays of dance, music, and costumes.",
      image: "/images/heart-of-png/ceremonies-festivals.jpg",
      alt: "Group in traditional dress preparing for a cultural ceremony",
    },
    {
      id: "kastom",
      title: "Kastom",
      description:
        "The term \u201ckastom\u201d refers to the traditional customs and practices that vary between tribes. These practices influence social structures, rituals, and daily life, with some communities following ancient customs that have been passed down through generations.",
      image: "/images/heart-of-png/kastom.jpg",
      alt: "Ceremonial mask and traditional dress at a PNG cultural gathering",
    },
    {
      id: "sing-sing",
      title: "The Sing-Sing",
      description:
        "Sing-Sing is a large cultural gathering, where various tribes come together to showcase their unique dances, songs, and traditional dress. These events are significant for community bonding and celebrating identity.",
      image: "/images/heart-of-png/sing-sing.jpg",
      alt: "Performers in feathered headdresses at a PNG sing-sing festival",
    },
    {
      id: "traditional-clothing",
      title: "Traditional Clothing",
      description:
        "Traditional attire varies, often made from natural materials such as bark, leaves, and feathers. In some communities, people wear intricate headdresses, body paint, and adornments made from shells, bones, and other locally sourced materials.",
      image: "/images/heart-of-png/traditional-clothing.jpg",
      alt: "Traditional PNG attire with body paint and grass skirts",
    },
    {
      id: "ties-to-nature",
      title: "Ties To Nature",
      description:
        "The people of Papua New Guinea have a deep connection to the land and sea, often living off subsistence farming and fishing. Many of their customs and beliefs are rooted in respect for the environment, with certain areas being considered sacred.",
      image: "/images/heart-of-png/ties-to-nature.jpg",
      alt: "Turquoise reef lagoon fringed by tropical rainforest",
    },
    {
      id: "spirituality",
      title: "Spirituality",
      description:
        "Spiritual beliefs are central to life in Papua New Guinea, with animism being common in many communities. People believe that the land, animals, and even objects have spiritual significance, influencing various cultural practices and rituals.",
      image: "/images/heart-of-png/spirituality.jpg",
      alt: "Dancers in traditional feathered dress at a spiritual cultural gathering",
    },
  ] as HeartOfPngCard[],
};

export type TourismCard = {
  id: string;
  title: string;
  description: string;
  icon: "mask" | "island" | "wave" | "track" | "peak" | "bird";
  image: string;
  alt: string;
  accent: string;
  /** Optional link — when present, the card becomes clickable. */
  href?: string;
};

export const tourismCards: TourismCard[] = [
  {
    id: "tradition",
    title: "A Tapestry Of Tradition",
    description:
      "Papua New Guinea is rich in cultural diversity, with over 800 languages spoken and hundreds of distinct ethnic groups.",
    icon: "mask",
    image: "/images/png-tourism/tradition.jpg",
    alt: "Traditional PNG sing-sing headdress and painted mask",
    accent: "from-ember-700 to-void-900",
    href: "/png/heart-of-papua-new-guinea",
  },
  {
    id: "surprises",
    title: "The Land Of Surprises",
    description:
      "Uncover a world of hidden treasure, vibrant culture, and the finest coffee. Papua New Guinea is where tradition and nature come together to create unforgettable experiences.",
    icon: "island",
    image: "/images/png-tourism/surprises.jpg",
    alt: "Tropical island beach fringed with palm trees",
    accent: "from-ember-500 to-ember-800",
    href: "https://www.tripadvisor.com/Attractions-g294115-Activities-Papua_New_Guinea.html",
  },
  {
    id: "underworld",
    title: "Dive Into A Hidden Underworld",
    description:
      "Experience Papua New Guinea's pristine waters, vibrant reefs, and extraordinary marine life \u2014 a true underwater wonderland.",
    icon: "wave",
    image: "/images/png-tourism/underworld.jpg",
    alt: "Crystal-clear coral reef seen from the waterline",
    accent: "from-ember-600 to-void-900",
    href: "https://www.tripadvisor.com/HotelsList-Papua_New_Guinea-Diving-Resorts-zfp7671395.html",
  },
  {
    id: "kokoda",
    title: "Kokoda Track",
    description:
      "The Kokoda Track in Papua New Guinea is a 96-kilometer trail of history and adventure. Winding through rugged terrain and vibrant villages, it honors WWII heroes while showcasing stunning rainforests and mountain views.",
    icon: "track",
    image: "/images/png-tourism/kokoda.jpg",
    alt: "Trekkers walking through a highlands village on the Kokoda Track",
    accent: "from-void-900 to-ember-900",
    href: "https://www.tripadvisor.com.au/AttractionProductReview-g294118-d20870744-ADVENTURE_KOKODA_10_Day_Premium_Kokoda_Campaign_Trek_Australian_Led-Port_Moresby_P.html",
  },
  {
    id: "wilhelm",
    title: "Mount Wilhelm",
    description:
      "Mount Wilhelm, Papua New Guinea's highest peak at 4,509 meters, offers breathtaking views and an unforgettable adventure. This iconic climb takes you through lush forests, alpine meadows, and stunning landscapes, making it a must-visit for trekkers and nature lovers.",
    icon: "peak",
    image: "/images/png-tourism/wilhelm.jpg",
    alt: "Cloud-wreathed summit ridge of Mount Wilhelm",
    accent: "from-ember-400 to-ember-700",
    href: "https://www.tripadvisor.com/Attraction_Review-g304035-d309629-Reviews-Mount_Wilhelm-Mount_Hagen_Highlands_Region.html",
  },
  {
    id: "birds",
    title: "Birds Watching",
    description:
      "Papua New Guinea is a bird-watcher's paradise, home to over 700 species, including the iconic birds of paradise. Explore lush rainforests and diverse habitats to witness vibrant plumage and unique behaviors in one of the world's richest birding destinations.",
    icon: "bird",
    image: "/images/png-tourism/birds.jpg",
    alt: "Raggiana bird-of-paradise displaying its plumage on a branch",
    accent: "from-ember-700 to-ember-900",
    href: "https://www.tripadvisor.com/Attraction_Review-g294118-d309620-Reviews-Varirata_National_Park-Port_Moresby_Papua_Region.html",
  },
];

/* ---------------------------- Products page content ---------------------------- */

export const productsHero = {
  title: "Our Coffee",
  paragraphs: [
    "Our coffee is grown in the pristine highlands of PNG, at altitudes exceeding 5,000 feet. Here, Arabica coffee trees have thrived for decades in their natural state, untouched by fertilisers, chemicals, or insecticides. The combination of the perfect climate, rich volcanic soil, and traditional farming practices ensures that our coffee is truly organic, even if it lacks costly certifications.",
    "Smallholder farmers, who produce 85% of the country's coffee, are the backbone of PNG's coffee industry. Despite challenges such as poor infrastructure\u2014limited roads, bridges, and transport\u2014these dedicated farmers work tirelessly to bring their ripe coffee cherries to market, sustaining their livelihoods.",
  ],
};

export type ProductCategory = {
  id: string;
  slug: string;
  label: string;
  image: string;
  alt: string;
};

export const productCategories: ProductCategory[] = [
  {
    id: "whole-beans",
    slug: "whole-beans",
    label: "The Whole Beans",
    image: "/images/products/whole-beans.jpg",
    alt: "Whole roasted PNG coffee beans in a woven bowl",
  },
  {
    id: "ground",
    slug: "ground-coffee",
    label: "Ground",
    image: "/images/products/ground.jpg",
    alt: "Finely ground PNG coffee spilling from a spoon",
  },
  {
    id: "drip-coffee",
    slug: "drip-coffee",
    label: "Drip Coffee",
    image: "/images/products/drip-coffee.jpg",
    alt: "PNG Coffee drip filter sachets and roasted beans",
  },
  {
    id: "capsules",
    slug: "capsules",
    label: "Capsules",
    image: "/images/products/capsules.jpg",
    alt: "Gold Nespresso-compatible PNG Coffee capsule",
  },
];

export const productsValueAdded = {
  title: "Value Added",
  intro:
    "In alignment with the directives of PNG's Government and the Coffee Industry Corporation (CIC), we focus on downstream processing to add value to our coffee. At our facility in Port Moresby, we roast green coffee beans and package them in various forms, including:",
  items: [
    "Whole Beans",
    "Ground Coffee",
    "Nespresso-Compatible Capsules",
    "Drip Filter Bags",
  ],
  outro:
    "Our products cater to retail customers, restaurants, cafes, and export markets, ensuring that the world can enjoy the authentic taste of PNG coffee.",
};

/* ------------------------- Product category detail pages ------------------------- */
/**
 * Placeholder product-catalog data for each category page (/products/[slug]).
 * This shape is deliberately flat and serializable so it can later be swapped
 * for a fetch from a CMS, JSON file, or database/API without touching the
 * page or component code — just replace how `productCategoryPages` (or a
 * per-slug lookup) is populated.
 */
export type ProductPlaceholder = {
  id: string;
  name: string;
  description: string;
  /** Price in whole currency units (e.g. 14.99), not cents. See NEXT_PUBLIC_CURRENCY in .env. */
  price: number;
  /** Optional real product photo (transparent PNG cutout). Falls back to a placeholder icon when absent. */
  image?: string;
  alt?: string;
};

export type ProductCategoryPageData = {
  slug: string;
  title: string;
  description: string;
  products: ProductPlaceholder[];
  /** Optional per-page override for the animated hero background. Defaults to the site-wide image. */
  background?: string;
};

function placeholderProducts(count = 6): ProductPlaceholder[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `placeholder-${i + 1}`,
    name: "Product Name",
    description: "Product description goes here.",
    price: 0,
  }));
}

export const productCategoryPages: Record<string, ProductCategoryPageData> = {
  "whole-beans": {
    slug: "whole-beans",
    title: "Whole Beans",
    description:
      "Small-batch roasted whole beans from the PNG highlands, ready to grind fresh at home or in your cafe.",
    background: "/images/products/whole-beans/whole-beans-bg.jpg",
    products: [
      {
        id: "medium-roast-whole-bean",
        name: "Medium Roast – Whole Bean",
        description: "Whole bean Arabica coffee, medium roast, 250g bag.",
        price: 14.99,
        image: "/images/products/whole-beans/medium-roast-whole-bean.png",
        alt: "PNG Coffee Whole Bean 250g Medium Roast bag",
      },
      {
        id: "dark-roast-beans",
        name: "Dark Roast",
        description: "Rich, bold dark roast whole beans, 250g bag.",
        price: 14.99,
        image: "/images/products/whole-beans/dark-roast-beans.png",
        alt: "PNG Coffee Dark Roast whole bean 250g bag",
      },
      {
        id: "medium-roast-beans",
        name: "Medium Roast",
        description: "Smooth, balanced medium roast whole beans, 250g bag.",
        price: 14.99,
        image: "/images/products/whole-beans/medium-roast-beans.png",
        alt: "PNG Coffee Medium Roast whole bean 250g bag",
      },
      {
        id: "arabica-medium-roast",
        name: "Arabica Coffee – Medium Roast",
        description:
          "Wild, naturally organic Arabica whole beans, medium roast, 250g bag.",
        price: 16.99,
        image: "/images/products/whole-beans/arabica-medium-roast.png",
        alt: "PNG Coffee wild organic Arabica whole bean 250g bag, medium roast",
      },
    ],
  },
  "ground-coffee": {
    slug: "ground-coffee",
    title: "Ground Coffee",
    description:
      "Freshly ground and ready to brew — the same highland coffee, milled for your filter or plunger.",
    products: [
      {
        id: "ground-medium-roast-blue",
        name: "Medium Roast",
        description: "Ground Arabica coffee, medium roast, 250g bag.",
        price: 13.99,
        image: "/images/products/ground-coffee/ground-medium-roast-blue.png",
        alt: "PNG Coffee Ground Coffee 250g Medium Roast bag",
      },
      {
        id: "ground-dark-roast",
        name: "Dark Roast",
        description: "Rich, bold dark roast ground coffee, 250g bag.",
        price: 13.99,
        image: "/images/products/ground-coffee/ground-dark-roast.png",
        alt: "PNG Coffee Dark Roast ground coffee 250g bag",
      },
      {
        id: "ground-medium-roast-green",
        name: "Papua New Guinea Ground Coffee",
        description: "Arabica ground coffee, medium roast, 250g bag.",
        price: 13.99,
        image: "/images/products/ground-coffee/ground-medium-roast-green.png",
        alt: "PNG Coffee green bag Ground Coffee 250g Medium Roast",
      },
      {
        id: "ground-medium-roast-black",
        name: "Medium Roast",
        description: "Smooth, balanced medium roast ground coffee, 250g bag.",
        price: 13.99,
        image: "/images/products/ground-coffee/ground-medium-roast-black.png",
        alt: "PNG Coffee Medium Roast ground coffee 250g bag",
      },
    ],
  },
  "drip-coffee": {
    slug: "drip-coffee",
    title: "Drip Coffee",
    description:
      "Single-serve drip filter bags for a fresh, no-fuss cup of PNG coffee anywhere, anytime.",
    products: [
      {
        id: "drip-coffee-box",
        name: "Drip Coffee",
        description: "Single-serve drip filter bags, 12g x 10 bags per box.",
        price: 9.99,
        image: "/images/products/drip-coffee/drip-coffee-box.png",
        alt: "PNG Coffee Drip Coffee box, 12g x 10 bags",
      },
    ],
  },
  capsules: {
    slug: "capsules",
    title: "Capsules",
    description:
      "Nespresso-compatible capsules bringing PNG's highland coffee to your machine at the touch of a button.",
    products: [
      {
        id: "capsule-arabica-medium",
        name: "Arabica Medium Roast",
        description:
          "Arabica medium roast capsules for Nespresso machines, 10 capsules per box.",
        price: 17.99,
        image: "/images/products/capsules/capsule-arabica-medium.png",
        alt: "PNG Coffee Arabica Medium Roast Nespresso-compatible capsules box",
      },
      {
        id: "capsule-boka",
        name: "Boka",
        description:
          "Boka capsules for Nespresso machines, 10 capsules per box.",
        price: 19.99,
        image: "/images/products/capsules/capsule-boka.png",
        alt: "PNG Coffee Boka Nespresso-compatible capsules box",
      },
      {
        id: "capsule-geisha",
        name: "Geisha",
        description:
          "Geisha capsules for Nespresso machines, 10 capsules per box.",
        price: 21.99,
        image: "/images/products/capsules/capsule-geisha.png",
        alt: "PNG Coffee Geisha Nespresso-compatible capsules box",
      },
      {
        id: "capsule-honey",
        name: "Honey Processed",
        description:
          "Honey processed capsules for Nespresso machines, 10 capsules per box.",
        price: 19.99,
        image: "/images/products/capsules/capsule-honey.png",
        alt: "PNG Coffee Honey Processed Nespresso-compatible capsules box",
      },
      {
        id: "capsule-arabica-original",
        name: "Arabica Original",
        description:
          "Arabica original capsules for Nespresso machines, 10 capsules per box.",
        price: 17.99,
        image: "/images/products/capsules/capsule-arabica-original.png",
        alt: "PNG Coffee Arabica Original Nespresso-compatible capsules box",
      },
    ],
  },
};

/* ---------------------------------- Contact page ---------------------------------- */

export type ContactPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  introHeading: string;
  introText: string;
  phone: string;
  email: string;
  address: string[];
  businessHours: { day: string; hours: string }[];
  socialLinks: { platform: "Facebook" | "Instagram" | "TikTok"; url: string }[];
  mapEmbedUrl: string;
};

export const contactPage: ContactPageContent = {
  heroTitle: "Contact Us",
  heroSubtitle: "PNG Coffee is ready to answer your questions, wherever you're brewing from.",
  introHeading: "Get In Touch",
  introText:
    "Whether you're a retail customer, a cafe, or looking to become a wholesale partner, we'd love to hear from you.",
  phone: "+675 7244 4888",
  email: "swissxpresso.png@gmail.com",
  address: [
    "Sec 64, Lot 11 Gabaka Street, Gordons",
    "Port Moresby, National Capital District",
    "Papua New Guinea",
  ],
  businessHours: [
    { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "8:00 AM – 12:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  socialLinks: [
    { platform: "Facebook", url: "https://www.facebook.com/share/1F5zznFU1h/?mibextid=wwXIfr" },
    { platform: "Instagram", url: "https://www.instagram.com/pngcoffee?igsh=MWYzbDVvMmNjdXRnNQ%3D%3D&utm_source=qr" },
    { platform: "TikTok", url: "https://www.tiktok.com/@pngcoffee1996?_r=1&_t=ZS-98GnkxJEsSK" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=Sec+64+Lot+11+Gabaka+Street+Gordons+Port+Moresby+National+Capital+District+Papua+New+Guinea&output=embed",
};
