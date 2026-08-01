/**
 * Seed script — populates the Sanity `production` dataset from static content.
 * Run with:  npx sanity exec scripts/seed-sanity.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'
import * as fs from 'fs'
import * as path from 'path'

const client = getCliClient({ apiVersion: '2025-01-01' })

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function uploadImage(publicPath: string) {
  const fullPath = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''))
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠  Image not found, skipping: ${publicPath}`)
    return undefined
  }
  const filename = path.basename(fullPath)
  const asset = await client.assets.upload('image', fs.createReadStream(fullPath), { filename })
  console.log(`    ↑ ${filename}`)
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } }
}

function img(maybeImg: { _type: 'image'; asset: { _type: 'reference'; _ref: string } } | undefined) {
  return maybeImg ? { image: maybeImg } : {}
}

// ─── Seed ────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌱  Seeding Sanity (project: f4srl2my / dataset: production)\n')

  // ── Homepage ────────────────────────────────────────────────────────────────
  console.log('📄  Homepage — uploading feature card images…')
  const [fcAbout, fcPng, fcCoffee] = await Promise.all([
    uploadImage('/images/about-us.jpg'),
    uploadImage('/images/png.jpg'),
    uploadImage('/images/our-coffee.jpg'),
  ])

  await client.createOrReplace({
    _id: 'homepage',
    _type: 'homepage',
    heroEyebrow: 'Small batch · Papua New Guinea',
    heroHeadline: 'Welcome to PNG Coffee.',
    heroBody: [
      'We specialise in producing high-quality roasted coffee beans. From roasting and sorting to packaging, every step is meticulously handled to deliver the freshest coffee straight to you.',
      'Experience the rich, full-bodied flavours of our coffee, crafted with passion and care.',
    ].join('\n\n'),
    heroCta: 'Explore Our Coffee',
    bannerLineOne: 'PNG GROWN,',
    bannerLineTwo: 'SHARED WITH THE WORLD',
    featureCards: [
      { _key: 'fc-about', _type: 'featureCard', title: 'About Us', ...img(fcAbout), alt: 'Farm worker raking coffee cherries out to dry on raised beds in Papua New Guinea', description: 'Learn about our journey, values and commitment to quality coffee from Papua New Guinea.', href: '/about' },
      { _key: 'fc-png', _type: 'featureCard', title: 'PNG', ...img(fcPng), alt: 'A Papua New Guinean highlands farmer tending the coffee harvest', description: 'Proudly grown in the rich highlands of Papua New Guinea by dedicated local farmers.', href: '/png' },
      { _key: 'fc-coffee', _type: 'featureCard', title: 'Our Coffee', ...img(fcCoffee), alt: 'Two cups of freshly brewed PNG Coffee beside roasted beans', description: 'Handcrafted with passion to bring rich, full-bodied flavours in every cup.', href: '/products' },
    ],
    footerSocialLinks: [],
  })
  console.log('  ✓  Homepage\n')

  // ── About Us ────────────────────────────────────────────────────────────────
  console.log('📄  About Us — uploading value card images…')
  const [vcValueAdded, vcRoastery, vcBarista, vcEquipment] = await Promise.all([
    uploadImage('/images/about-values/value-added.jpg'),
    uploadImage('/images/about-values/roastery.jpg'),
    uploadImage('/images/about-values/barista-training.jpg'),
    uploadImage('/images/about-values/equipment-service.jpg'),
  ])

  await client.createOrReplace({
    _id: 'aboutUs',
    _type: 'aboutUs',
    storyHeading: 'Our Story',
    storyParagraphs: [
      'www.pngcoffee.com was launched in 1996, marking a historic milestone as the first website in Papua New Guinea. This pioneering platform opened the door for the world to experience the unique and exquisite coffee grown in the highlands of Papua New Guinea (PNG).',
      'SwissXpresso (PNG) Limited, trading under the registered name/label PNG Coffee (IPA No.93551), is proud to bring the rich flavours of PNG coffee to the global stage.',
    ].join('\n\n'),
    exploreLinks: [
      { _key: 'el-coffee', _type: 'link', label: 'Our Coffee', href: '/products' },
      { _key: 'el-mission', _type: 'link', label: 'Our Mission', href: '#mission' },
    ],
    missionHeading: 'Our Mission',
    missionTagline: 'PNG Grown, Shared with the World.',
    missionParagraph: 'We are committed to showcasing the exceptional quality of PNG coffee to the world while supporting the livelihoods of local farmers and promoting sustainable practices.',
    valueCards: [
      { _key: 'vc-value-added', _type: 'valueCard', title: 'Value Added', description: "In alignment with the directives of PNG's Government and the Coffee Industry Corporation (CIC)…", icon: 'seal', ...img(vcValueAdded), alt: 'Roasted coffee beans, ground coffee, and packaged value-added coffee products', accent: 'from-ember-600 to-ember-800' },
      { _key: 'vc-roastery', _type: 'valueCard', title: 'The Roastery', description: 'Located at Gabaka Street, Gordon, Port Moresby, our state-of-the-art roastery allows us to provide…', icon: 'flame', ...img(vcRoastery), alt: "PNG Coffee's roasting machine at the Gabaka Street roastery", accent: 'from-ember-500 to-void-900' },
      { _key: 'vc-barista', _type: 'valueCard', title: 'Barista Training', description: 'Our baristas and personnel are trained and qualified in Australia, bringing world-class expertise to PNG…', icon: 'cup', ...img(vcBarista), alt: 'Barista tamping espresso grounds during a training session', accent: 'from-ember-400 to-ember-600' },
      { _key: 'vc-equipment', _type: 'valueCard', title: 'Coffee Equipment Service', description: 'We provide comprehensive servicing for all coffee equipment…', icon: 'gear', ...img(vcEquipment), alt: 'Row of professional espresso machines and grinders being serviced', accent: 'from-void-900 to-ember-900' },
    ],
  })
  console.log('  ✓  About Us\n')

  // ── PNG Coffee Page ─────────────────────────────────────────────────────────
  console.log('📄  PNG Coffee Page — uploading tourism card images…')
  const [tcTradition, tcSurprises, tcUnderworld, tcKokoda, tcWilhelm, tcBirds] = await Promise.all([
    uploadImage('/images/png-tourism/tradition.jpg'),
    uploadImage('/images/png-tourism/surprises.jpg'),
    uploadImage('/images/png-tourism/underworld.jpg'),
    uploadImage('/images/png-tourism/kokoda.jpg'),
    uploadImage('/images/png-tourism/wilhelm.jpg'),
    uploadImage('/images/png-tourism/birds.jpg'),
  ])

  await client.createOrReplace({
    _id: 'pngCoffeePage',
    _type: 'pngCoffeePage',
    heroTitle: 'Papua New Guinea',
    heroParagraphs: [
      'Papua New Guinea is a land of breathtaking beauty and cultural diversity. Located north of Australia, on the eastern side of the island of New Guinea near the Equator, PNG is part of the Pacific Ring of Fire. Its landscape is dominated by rugged mountains, lush tropical rainforests, and fertile volcanic soil. The highest peak, Mount Wilhelm, rises to an impressive 4,509 meters (14,793 feet). At times with snowfall at its peak is a phenomenon being so close to the Equator.',
      'PNG is home to over 800 distinct languages, making it one of the most linguistically diverse countries in the world. This diversity is reflected in the rich cultural heritage of its people, who have nurtured the land and its resources for generations.',
    ].join('\n\n'),
    tourismCards: [
      { _key: 'tc-tradition', _type: 'tourismCard', title: 'A Tapestry Of Tradition', description: 'Papua New Guinea is rich in cultural diversity, with over 800 languages spoken and hundreds of distinct ethnic groups.', icon: 'mask', ...img(tcTradition), alt: 'Traditional PNG sing-sing headdress and painted mask', accent: 'from-ember-700 to-void-900' },
      { _key: 'tc-surprises', _type: 'tourismCard', title: 'The Land Of Surprises', description: 'Uncover a world of hidden treasure, vibrant culture, and the finest coffee. Papua New Guinea is where tradition and nature come together to create unforgettable experiences.', icon: 'island', ...img(tcSurprises), alt: 'Tropical island beach fringed with palm trees', accent: 'from-ember-500 to-ember-800' },
      { _key: 'tc-underworld', _type: 'tourismCard', title: 'Dive Into A Hidden Underworld', description: "Experience Papua New Guinea's pristine waters, vibrant reefs, and extraordinary marine life — a true underwater wonderland.", icon: 'wave', ...img(tcUnderworld), alt: 'Crystal-clear coral reef seen from the waterline', accent: 'from-ember-600 to-void-900' },
      { _key: 'tc-kokoda', _type: 'tourismCard', title: 'Kokoda Track', description: 'The Kokoda Track in Papua New Guinea is a 96-kilometer trail of history and adventure. Winding through rugged terrain and vibrant villages, it honors WWII heroes while showcasing stunning rainforests and mountain views.', icon: 'track', ...img(tcKokoda), alt: 'Trekkers walking through a highlands village on the Kokoda Track', accent: 'from-void-900 to-ember-900' },
      { _key: 'tc-wilhelm', _type: 'tourismCard', title: 'Mount Wilhelm', description: "Mount Wilhelm, Papua New Guinea's highest peak at 4,509 meters (14,793 feet), offers breathtaking views and an unforgettable adventure. This iconic climb takes you through lush forests, alpine meadows, and stunning landscapes, making it a must-visit for trekkers and nature lovers.", icon: 'peak', ...img(tcWilhelm), alt: 'Cloud-wreathed summit ridge of Mount Wilhelm', accent: 'from-ember-400 to-ember-700' },
      { _key: 'tc-birds', _type: 'tourismCard', title: 'Birds Watching', description: "Papua New Guinea is a bird-watcher's paradise, home to over 700 species, including the iconic birds of paradise. Explore lush rainforests and diverse habitats to witness vibrant plumage and unique behaviors in one of the world's richest birding destinations.", icon: 'bird', ...img(tcBirds), alt: "Raggiana bird-of-paradise displaying its plumage on a branch", accent: 'from-ember-700 to-ember-900' },
    ],
  })
  console.log('  ✓  PNG Coffee Page\n')

  // ── Categories ──────────────────────────────────────────────────────────────
  console.log('📄  Categories — uploading category images…')
  const [imgWholeBeans, imgGround, imgDrip, imgCapsules] = await Promise.all([
    uploadImage('/images/products/whole-beans.jpg'),
    uploadImage('/images/products/ground.jpg'),
    uploadImage('/images/products/drip-coffee.jpg'),
    uploadImage('/images/products/capsules.jpg'),
  ])

  const categories = [
    { _id: 'category-whole-beans', name: 'The Whole Beans', slug: 'whole-beans', description: 'Small-batch roasted whole beans from the PNG highlands, ready to grind fresh at home or in your cafe.', image: imgWholeBeans },
    { _id: 'category-ground-coffee', name: 'Ground Coffee', slug: 'ground-coffee', description: 'Freshly ground and ready to brew — the same highland coffee, milled for your filter or plunger.', image: imgGround },
    { _id: 'category-drip-coffee', name: 'Drip Coffee', slug: 'drip-coffee', description: 'Single-serve drip filter bags for a fresh, no-fuss cup of PNG coffee anywhere, anytime.', image: imgDrip },
    { _id: 'category-capsules', name: 'Capsules', slug: 'capsules', description: "Nespresso-compatible capsules bringing PNG's highland coffee to your machine at the touch of a button.", image: imgCapsules },
  ]

  for (const cat of categories) {
    await client.createOrReplace({
      _id: cat._id,
      _type: 'category',
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
      ...img(cat.image),
    })
    console.log(`    ✓ ${cat.name}`)
  }

  // ── Our Coffee Page ─────────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'ourCoffeePage',
    _type: 'ourCoffeePage',
    heroTitle: 'Our Coffee',
    heroParagraphs: [
      'Our coffee is grown in the pristine highlands of PNG, at altitudes exceeding 5,000 feet. Here, Arabica coffee trees have thrived for decades in their natural state, untouched by fertilisers, chemicals, or insecticides. The combination of the perfect climate, rich volcanic soil, and traditional farming practices ensures that our coffee is truly organic, even if it lacks costly certifications.',
      "Smallholder farmers, who produce 85% of the country's coffee, are the backbone of PNG's coffee industry. Despite challenges such as poor infrastructure—limited roads, bridges, and transport—these dedicated farmers work tirelessly to bring their ripe coffee cherries to market, sustaining their livelihoods.",
    ].join('\n\n'),
    valueAddedTitle: 'Value Added',
    valueAddedIntro: "In alignment with the directives of PNG's Government and the Coffee Industry Corporation (CIC), we focus on downstream processing to add value to our coffee. At our facility in Port Moresby, we roast green coffee beans and package them in various forms, including:",
    valueAddedItems: ['Whole Beans', 'Ground Coffee', 'Nespresso-Compatible Capsules', 'Drip Filter Bags'],
    valueAddedOutro: 'Our products cater to retail customers, restaurants, cafes, and export markets, ensuring that the world can enjoy the authentic taste of PNG coffee.',
    featuredCategories: categories.map((c, i) => ({ _key: `cat-${i}`, _type: 'reference', _ref: c._id })),
  })
  console.log('  ✓  Our Coffee Page\n')

  // ── Products ────────────────────────────────────────────────────────────────
  console.log('📄  Products — uploading product images…')

  const products = [
    // Whole Beans
    { id: 'medium-roast-whole-bean', name: 'Medium Roast – Whole Bean', desc: 'Whole bean Arabica coffee, medium roast, 250g bag.', short: 'Whole bean Arabica, medium roast, 250g.', price: 14.99, img: '/images/products/whole-beans/medium-roast-whole-bean.png', alt: 'PNG Coffee Whole Bean 250g Medium Roast bag', catId: 'category-whole-beans' },
    { id: 'dark-roast-beans', name: 'Dark Roast', desc: 'Rich, bold dark roast whole beans, 250g bag.', short: 'Dark roast whole beans, 250g.', price: 14.99, img: '/images/products/whole-beans/dark-roast-beans.png', alt: 'PNG Coffee Dark Roast whole bean 250g bag', catId: 'category-whole-beans' },
    { id: 'medium-roast-beans', name: 'Medium Roast', desc: 'Smooth, balanced medium roast whole beans, 250g bag.', short: 'Medium roast whole beans, 250g.', price: 14.99, img: '/images/products/whole-beans/medium-roast-beans.png', alt: 'PNG Coffee Medium Roast whole bean 250g bag', catId: 'category-whole-beans' },
    { id: 'arabica-medium-roast', name: 'Papua New Guinea Arabica Coffee', desc: 'Wild, naturally organic Arabica, medium roast. Sold in 3, 6 or 10 × 220g packets — price includes EMS postage.', short: 'Wild organic Arabica, medium roast. Ships as 3/6/10 packet bundles.', price: 16.99, img: '/images/products/whole-beans/arabica-medium-roast.png', alt: 'PNG Coffee wild organic Arabica whole bean bag, medium roast', catId: 'category-whole-beans' },
    // Ground Coffee
    { id: 'ground-medium-roast-blue', name: 'Medium Roast', desc: 'Ground Arabica coffee, medium roast, 250g bag.', short: 'Ground Arabica, medium roast, 250g.', price: 13.99, img: '/images/products/ground-coffee/ground-medium-roast-blue.png', alt: 'PNG Coffee Ground Coffee 250g Medium Roast bag', catId: 'category-ground-coffee' },
    { id: 'ground-dark-roast', name: 'Dark Roast', desc: 'Rich, bold dark roast ground coffee, 250g bag.', short: 'Dark roast ground coffee, 250g.', price: 13.99, img: '/images/products/ground-coffee/ground-dark-roast.png', alt: 'PNG Coffee Dark Roast ground coffee 250g bag', catId: 'category-ground-coffee' },
    { id: 'ground-medium-roast-green', name: 'Papua New Guinea Ground Coffee', desc: 'Arabica ground coffee, medium roast, 250g bag.', short: 'Arabica ground coffee, medium roast, 250g.', price: 13.99, img: '/images/products/ground-coffee/ground-medium-roast-green.png', alt: 'PNG Coffee green bag Ground Coffee 250g Medium Roast', catId: 'category-ground-coffee' },
    { id: 'ground-medium-roast-black', name: 'Medium Roast', desc: 'Smooth, balanced medium roast ground coffee, 250g bag.', short: 'Medium roast ground coffee, 250g.', price: 13.99, img: '/images/products/ground-coffee/ground-medium-roast-black.png', alt: 'PNG Coffee Medium Roast ground coffee 250g bag', catId: 'category-ground-coffee' },
    // Drip Coffee
    { id: 'drip-coffee-box', name: 'Drip Coffee', desc: 'Single-serve drip filter bags, 12g x 10 bags per box.', short: '12g × 10 drip filter bags per box.', price: 9.99, img: '/images/products/drip-coffee/drip-coffee-box.png', alt: 'PNG Coffee Drip Coffee box, 12g x 10 bags', catId: 'category-drip-coffee' },
    // Capsules
    { id: 'capsule-arabica-medium', name: 'Arabica Medium Roast', desc: 'Arabica medium roast capsules for Nespresso machines, 10 capsules per box.', short: 'Medium roast, 10 Nespresso-compatible capsules.', price: 17.99, img: '/images/products/capsules/capsule-arabica-medium.png', alt: 'PNG Coffee Arabica Medium Roast Nespresso-compatible capsules box', catId: 'category-capsules' },
    { id: 'capsule-boka', name: 'Boka', desc: 'Boka capsules for Nespresso machines, 10 capsules per box.', short: 'Boka blend, 10 Nespresso-compatible capsules.', price: 19.99, img: '/images/products/capsules/capsule-boka.png', alt: 'PNG Coffee Boka Nespresso-compatible capsules box', catId: 'category-capsules' },
    { id: 'capsule-geisha', name: 'Geisha', desc: 'Geisha capsules for Nespresso machines, 10 capsules per box.', short: 'Geisha single origin, 10 Nespresso-compatible capsules.', price: 21.99, img: '/images/products/capsules/capsule-geisha.png', alt: 'PNG Coffee Geisha Nespresso-compatible capsules box', catId: 'category-capsules' },
    { id: 'capsule-honey', name: 'Honey Processed', desc: 'Honey processed capsules for Nespresso machines, 10 capsules per box.', short: 'Honey processed, 10 Nespresso-compatible capsules.', price: 19.99, img: '/images/products/capsules/capsule-honey.png', alt: 'PNG Coffee Honey Processed Nespresso-compatible capsules box', catId: 'category-capsules' },
    { id: 'capsule-arabica-original', name: 'Arabica Original', desc: 'Arabica original capsules for Nespresso machines, 10 capsules per box.', short: 'Arabica original, 10 Nespresso-compatible capsules.', price: 17.99, img: '/images/products/capsules/capsule-arabica-original.png', alt: 'PNG Coffee Arabica Original Nespresso-compatible capsules box', catId: 'category-capsules' },
  ]

  for (const p of products) {
    const prodImg = await uploadImage(p.img)
    await client.createOrReplace({
      _id: `product-${p.id}`,
      _type: 'product',
      name: p.name,
      slug: { _type: 'slug', current: p.id },
      description: p.desc,
      shortDescription: p.short,
      category: { _type: 'reference', _ref: p.catId },
      price: p.price,
      stock: 100,
      weight: '250g',
      ...img(prodImg),
      featuredProduct: false,
      newProduct: false,
    })
    console.log(`    ✓ ${p.name} (${p.catId.replace('category-', '')})`)
  }
  console.log()

  // ── Contact Page ────────────────────────────────────────────────────────────
  console.log('📄  Contact Page…')
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    phone: '+675 7244 4888',
    email: 'swissxpresso.png@gmail.com',
    address: 'Sec 64, Lot 11 Gabaka Street, Gordons\nPort Moresby, National Capital District\nPapua New Guinea',
    googleMapEmbedUrl: 'https://www.google.com/maps?q=-9.4552808,147.1922892&z=16&output=embed',
    businessHours: [
      { _key: 'bh-1', _type: 'businessHours', day: 'Monday – Friday', hours: '8:00 AM – 5:00 PM' },
      { _key: 'bh-2', _type: 'businessHours', day: 'Saturday', hours: '8:00 AM – 12:00 PM' },
      { _key: 'bh-3', _type: 'businessHours', day: 'Sunday', hours: 'Closed' },
    ],
    socialLinks: [
      { _key: 'sl-fb', _type: 'socialLink', platform: 'Facebook', url: 'https://www.facebook.com/share/1F5zznFU1h/?mibextid=wwXIfr' },
      { _key: 'sl-ig', _type: 'socialLink', platform: 'Instagram', url: 'https://www.instagram.com/pngcoffee?igsh=MWYzbDVvMmNjdXRnNQ%3D%3D&utm_source=qr' },
      { _key: 'sl-tt', _type: 'socialLink', platform: 'TikTok', url: 'https://www.tiktok.com/@pngcoffee1996?_r=1&_t=ZS-98GnkxJEsSK' },
    ],
  })
  console.log('  ✓  Contact Page\n')

  console.log('✅  Seed complete — all documents created in Sanity.\n')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
