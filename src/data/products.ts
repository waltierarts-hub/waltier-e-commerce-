import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'wal-01',
    slug: 'after-hours',
    title: 'AFTER HOURS',
    subtitle: 'Underground Electronic Soundscape',
    description: 'Inspired by Tokyo 3:00 AM basement listening bars, dark club corridors, and hypnotic repetitive beats. An oversized statement piece printed on 300 GSM heavy archival matte stock with museum-grade UV-stable inks.',
    collection: 'AFTER HOURS',
    tags: ['Dark', 'Club', 'Typographic', 'Electronic', 'Minimal'],
    orientation: 'Portrait',
    basePrice: 799,
    badge: 'DROP 04',
    palette: ['#101010', '#EF171C', '#F4F2EC'],
    specs: {
      paperWeight: '300 GSM Archival Textured Cotton Paper',
      finish: 'Matte, glare-free museum finish',
      printTech: '12-Color Giclée fine art pigment ink',
      packaging: 'Reinforced triangle kraft tube / heavy foam core protection'
    },
    mockups: {
      artwork: 'after-hours',
      room: '/images/hero-room.jpg',
      detail: '/images/study-desk.jpg',
      scale: '/images/bedroom-duo.jpg'
    },
    variants: [
      { id: 'wal-01-a4-unframed', size: 'A4', framed: false, price: 799, inStock: true },
      { id: 'wal-01-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1499, inStock: true },
      { id: 'wal-01-a4-oak', size: 'A4', framed: true, frameColor: 'Natural Oak', price: 1599, inStock: true },
      { id: 'wal-01-a3-unframed', size: 'A3', framed: false, price: 1199, inStock: true },
      { id: 'wal-01-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2199, inStock: true },
      { id: 'wal-01-a3-oak', size: 'A3', framed: true, frameColor: 'Natural Oak', price: 2399, inStock: true },
      { id: 'wal-01-a2-unframed', size: 'A2', framed: false, price: 1799, inStock: true },
      { id: 'wal-01-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3299, inStock: true },
      { id: 'wal-01-a1-unframed', size: 'A1', framed: false, price: 2599, inStock: true },
      { id: 'wal-01-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4799, inStock: true }
    ],
    relatedIds: ['wal-02', 'wal-03', 'wal-06']
  },
  {
    id: 'wal-02',
    slug: 'no-signal',
    title: 'NO SIGNAL',
    subtitle: 'Analog Frequency Distortion',
    description: 'The iconic test screen reimagined through brutalist graphic architecture. A meditation on turning down the digital static to build your own signal.',
    collection: 'MINIMAL MOOD',
    tags: ['Retro', 'Brutalist', 'Analog', 'Statement'],
    orientation: 'Portrait',
    basePrice: 699,
    badge: 'POPULAR',
    palette: ['#F4F2EC', '#101010', '#EF171C', '#77736E'],
    specs: {
      paperWeight: '300 GSM Textured Off-White Stock',
      finish: 'Ultra-matte velvety texture',
      printTech: 'High-density pigment print',
      packaging: 'Plastic-free rigid protective mailer'
    },
    mockups: {
      artwork: 'no-signal',
      room: '/images/study-desk.jpg',
      detail: '/images/bedroom-duo.jpg',
      scale: '/images/hero-room.jpg'
    },
    variants: [
      { id: 'wal-02-a4-unframed', size: 'A4', framed: false, price: 699, inStock: true },
      { id: 'wal-02-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1399, inStock: true },
      { id: 'wal-02-a3-unframed', size: 'A3', framed: false, price: 1099, inStock: true },
      { id: 'wal-02-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 1999, inStock: true },
      { id: 'wal-02-a2-unframed', size: 'A2', framed: false, price: 1699, inStock: true },
      { id: 'wal-02-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3099, inStock: true },
      { id: 'wal-02-a1-unframed', size: 'A1', framed: false, price: 2499, inStock: true },
      { id: 'wal-02-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4499, inStock: true }
    ],
    relatedIds: ['wal-01', 'wal-04', 'wal-07']
  },
  {
    id: 'wal-03',
    slug: 'loud-silence',
    title: 'LOUD SILENCE',
    subtitle: 'Concentric Acoustic Form',
    description: 'Visualizing resonance without noise. A deep black and crimson acoustic motif designed for studio environments and creative focus spaces.',
    collection: 'SOUND & RHYTHM',
    tags: ['Acoustic', 'Dark', 'Sound', 'Focus'],
    orientation: 'Portrait',
    basePrice: 849,
    badge: 'NEW',
    palette: ['#101010', '#EF171C', '#F4F2EC'],
    specs: {
      paperWeight: '310 GSM Fine Cotton Rag',
      finish: 'True deep matte velvet',
      printTech: 'Multi-pass Giclée pigment',
      packaging: 'Heavy duty studio tube'
    },
    mockups: {
      artwork: 'loud-silence',
      room: '/images/hero-room.jpg',
      detail: '/images/study-desk.jpg',
      scale: '/images/bedroom-duo.jpg'
    },
    variants: [
      { id: 'wal-03-a4-unframed', size: 'A4', framed: false, price: 849, inStock: true },
      { id: 'wal-03-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1549, inStock: true },
      { id: 'wal-03-a3-unframed', size: 'A3', framed: false, price: 1249, inStock: true },
      { id: 'wal-03-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2249, inStock: true },
      { id: 'wal-03-a2-unframed', size: 'A2', framed: false, price: 1849, inStock: true },
      { id: 'wal-03-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3349, inStock: true },
      { id: 'wal-03-a1-unframed', size: 'A1', framed: false, price: 2649, inStock: true },
      { id: 'wal-03-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4849, inStock: true }
    ],
    relatedIds: ['wal-01', 'wal-08', 'wal-09']
  },
  {
    id: 'wal-04',
    slug: 'stay-offline',
    title: 'STAY OFFLINE',
    subtitle: 'The Attention Economy Antidote',
    description: 'An aggressive, warning-tape diagonal graphic piece reminding you that real life does not happen in browser tabs. Bold, unapologetic, printed sharp.',
    collection: 'TYPE & ATTITUDE',
    tags: ['Typography', 'Anti-Tech', 'Editorial', 'Street'],
    orientation: 'Portrait',
    basePrice: 749,
    badge: 'POPULAR',
    palette: ['#F4F2EC', '#101010', '#EF171C'],
    specs: {
      paperWeight: '280 GSM Matte Litho Stock',
      finish: 'Matte tactile finish',
      printTech: 'Precision digital offset',
      packaging: 'Flat heavy cardboard for smaller sizes, tube for larger'
    },
    mockups: {
      artwork: 'stay-offline',
      room: '/images/study-desk.jpg',
      detail: '/images/bedroom-duo.jpg',
      scale: '/images/hero-room.jpg'
    },
    variants: [
      { id: 'wal-04-a4-unframed', size: 'A4', framed: false, price: 749, inStock: true },
      { id: 'wal-04-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1449, inStock: true },
      { id: 'wal-04-a3-unframed', size: 'A3', framed: false, price: 1149, inStock: true },
      { id: 'wal-04-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2149, inStock: true },
      { id: 'wal-04-a2-unframed', size: 'A2', framed: false, price: 1749, inStock: true },
      { id: 'wal-04-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3249, inStock: true },
      { id: 'wal-04-a1-unframed', size: 'A1', framed: false, price: 2549, inStock: true },
      { id: 'wal-04-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4699, inStock: true }
    ],
    relatedIds: ['wal-11', 'wal-05', 'wal-02']
  },
  {
    id: 'wal-05',
    slug: 'redline',
    title: 'REDLINE',
    subtitle: 'Street Velocity & Mechanical Tension',
    description: 'Raw dynamic slashes in signature Waltier crimson and ink black. Designed for high-octane desk spaces and modern loft setups.',
    collection: 'STREET ENERGY',
    tags: ['Bold', 'Red', 'Velocity', 'Abstract'],
    orientation: 'Portrait',
    basePrice: 899,
    badge: 'NEW',
    palette: ['#EF171C', '#101010', '#F4F2EC'],
    specs: {
      paperWeight: '300 GSM Heavyweight Archival Art Card',
      finish: 'Velvet matte finish',
      printTech: '12-Color archival pigment print',
      packaging: 'Custom Waltier archival envelope'
    },
    mockups: {
      artwork: 'redline',
      room: '/images/hero-room.jpg',
      detail: '/images/bedroom-duo.jpg',
      scale: '/images/study-desk.jpg'
    },
    variants: [
      { id: 'wal-05-a4-unframed', size: 'A4', framed: false, price: 899, inStock: true },
      { id: 'wal-05-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1599, inStock: true },
      { id: 'wal-05-a3-unframed', size: 'A3', framed: false, price: 1299, inStock: true },
      { id: 'wal-05-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2299, inStock: true },
      { id: 'wal-05-a2-unframed', size: 'A2', framed: false, price: 1899, inStock: true },
      { id: 'wal-05-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3399, inStock: true },
      { id: 'wal-05-a1-unframed', size: 'A1', framed: false, price: 2699, inStock: true },
      { id: 'wal-05-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4899, inStock: true }
    ],
    relatedIds: ['wal-09', 'wal-04', 'wal-01']
  },
  {
    id: 'wal-06',
    slug: 'night-shift',
    title: 'NIGHT SHIFT',
    subtitle: 'Studio Perspective at Midnight',
    description: 'A glowing crimson wireframe grid floating in pitch black. An homage to code sprints, late night music production, and uninterrupted creative momentum.',
    collection: 'AFTER HOURS',
    tags: ['Cyber', 'Grid', 'Night', 'Dark'],
    orientation: 'Portrait',
    basePrice: 799,
    badge: 'DROP 04',
    palette: ['#101010', '#EF171C', '#F4F2EC'],
    specs: {
      paperWeight: '300 GSM Archival Fine Art Matte',
      finish: 'Ultra-deep non-reflective black',
      printTech: 'Epson UltraChrome Pro pigment inks',
      packaging: 'Sturdy kraft roll'
    },
    mockups: {
      artwork: 'night-shift',
      room: '/images/study-desk.jpg',
      detail: '/images/hero-room.jpg',
      scale: '/images/bedroom-duo.jpg'
    },
    variants: [
      { id: 'wal-06-a4-unframed', size: 'A4', framed: false, price: 799, inStock: true },
      { id: 'wal-06-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1499, inStock: true },
      { id: 'wal-06-a3-unframed', size: 'A3', framed: false, price: 1199, inStock: true },
      { id: 'wal-06-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2199, inStock: true },
      { id: 'wal-06-a2-unframed', size: 'A2', framed: false, price: 1799, inStock: true },
      { id: 'wal-06-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3299, inStock: true },
      { id: 'wal-06-a1-unframed', size: 'A1', framed: false, price: 2599, inStock: true },
      { id: 'wal-06-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4799, inStock: true }
    ],
    relatedIds: ['wal-01', 'wal-03', 'wal-08']
  },
  {
    id: 'wal-07',
    slug: 'out-of-frame',
    title: 'OUT OF FRAME',
    subtitle: 'Brutalist Boundary Breaking',
    description: 'A physical boundary cannot dictate thought. This piece features a stark geometric block literally overflowing the printed framing line.',
    collection: 'MINIMAL MOOD',
    tags: ['Architectural', 'Minimal', 'Red Accent'],
    orientation: 'Portrait',
    basePrice: 699,
    badge: 'LIMITED',
    palette: ['#F4F2EC', '#101010', '#EF171C'],
    specs: {
      paperWeight: '290 GSM Natural Rag Paper',
      finish: 'Smooth organic matte',
      printTech: 'Fine Art Pigment',
      packaging: 'Padded flat shipping pack'
    },
    mockups: {
      artwork: 'out-of-frame',
      room: '/images/bedroom-duo.jpg',
      detail: '/images/study-desk.jpg',
      scale: '/images/hero-room.jpg'
    },
    variants: [
      { id: 'wal-07-a4-unframed', size: 'A4', framed: false, price: 699, inStock: true },
      { id: 'wal-07-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1399, inStock: true },
      { id: 'wal-07-a3-unframed', size: 'A3', framed: false, price: 1099, inStock: true },
      { id: 'wal-07-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 1999, inStock: true },
      { id: 'wal-07-a2-unframed', size: 'A2', framed: false, price: 1699, inStock: true },
      { id: 'wal-07-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3099, inStock: true },
      { id: 'wal-07-a1-unframed', size: 'A1', framed: false, price: 2499, inStock: true },
      { id: 'wal-07-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4499, inStock: true }
    ],
    relatedIds: ['wal-02', 'wal-12', 'wal-10']
  },
  {
    id: 'wal-08',
    slug: 'static-dreams',
    title: 'STATIC DREAMS',
    subtitle: 'Oscilloscope Waveform Studies',
    description: 'Analog oscillator wavelengths sampled and translated onto paper. Subtle wave gradients and high contrast typographic notes.',
    collection: 'ABSTRACT CHAOS',
    tags: ['Waves', 'Analog', 'Synth', 'Abstract'],
    orientation: 'Portrait',
    basePrice: 849,
    badge: 'NEW',
    palette: ['#101010', '#EF171C', '#F4F2EC', '#77736E'],
    specs: {
      paperWeight: '300 GSM Archival Textured Cotton Paper',
      finish: 'Matte, glare-free museum finish',
      printTech: '12-Color Giclée fine art pigment ink',
      packaging: 'Heavy duty tube'
    },
    mockups: {
      artwork: 'static-dreams',
      room: '/images/hero-room.jpg',
      detail: '/images/study-desk.jpg',
      scale: '/images/bedroom-duo.jpg'
    },
    variants: [
      { id: 'wal-08-a4-unframed', size: 'A4', framed: false, price: 849, inStock: true },
      { id: 'wal-08-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1549, inStock: true },
      { id: 'wal-08-a3-unframed', size: 'A3', framed: false, price: 1249, inStock: true },
      { id: 'wal-08-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2249, inStock: true },
      { id: 'wal-08-a2-unframed', size: 'A2', framed: false, price: 1849, inStock: true },
      { id: 'wal-08-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3349, inStock: true },
      { id: 'wal-08-a1-unframed', size: 'A1', framed: false, price: 2649, inStock: true },
      { id: 'wal-08-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4849, inStock: true }
    ],
    relatedIds: ['wal-03', 'wal-10', 'wal-01']
  },
  {
    id: 'wal-09',
    slug: 'make-some-noise',
    title: 'MAKE SOME NOISE',
    subtitle: 'Street Banner Typographic Manifesto',
    description: 'Thick black framing border, raw crimson punch, and bold heavy type designed to grab attention from across the apartment.',
    collection: 'STREET ENERGY',
    tags: ['Loud', 'Street', 'Banner', 'Red'],
    orientation: 'Portrait',
    basePrice: 799,
    badge: 'POPULAR',
    palette: ['#EF171C', '#101010', '#F4F2EC'],
    specs: {
      paperWeight: '300 GSM Heavy Poster Stock',
      finish: 'Matte finish with vibrant color retention',
      printTech: 'Pigment Giclée',
      packaging: 'Rigid kraft cylinder'
    },
    mockups: {
      artwork: 'make-some-noise',
      room: '/images/study-desk.jpg',
      detail: '/images/hero-room.jpg',
      scale: '/images/bedroom-duo.jpg'
    },
    variants: [
      { id: 'wal-09-a4-unframed', size: 'A4', framed: false, price: 799, inStock: true },
      { id: 'wal-09-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1499, inStock: true },
      { id: 'wal-09-a3-unframed', size: 'A3', framed: false, price: 1199, inStock: true },
      { id: 'wal-09-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2199, inStock: true },
      { id: 'wal-09-a2-unframed', size: 'A2', framed: false, price: 1799, inStock: true },
      { id: 'wal-09-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3299, inStock: true },
      { id: 'wal-09-a1-unframed', size: 'A1', framed: false, price: 2599, inStock: true },
      { id: 'wal-09-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4799, inStock: true }
    ],
    relatedIds: ['wal-05', 'wal-04', 'wal-11']
  },
  {
    id: 'wal-10',
    slug: 'soft-chaos',
    title: 'SOFT CHAOS',
    subtitle: 'Organic Equilibrium & Contrast',
    description: 'An asymmetrical organic ellipse colliding with a stark crimson sun and a clean diagonal hairline axis. Zen discipline meets brutalist tension.',
    collection: 'ABSTRACT CHAOS',
    tags: ['Organic', 'Balance', 'Japanese Minimalism', 'Modern'],
    orientation: 'Portrait',
    basePrice: 749,
    badge: 'NEW',
    palette: ['#F4F2EC', '#101010', '#EF171C', '#77736E'],
    specs: {
      paperWeight: '310 GSM Fine Cotton Rag Paper',
      finish: 'Matte archival textured',
      printTech: 'Museum standard Giclée',
      packaging: 'Flat cardboard mailer with glassine protection'
    },
    mockups: {
      artwork: 'soft-chaos',
      room: '/images/bedroom-duo.jpg',
      detail: '/images/hero-room.jpg',
      scale: '/images/study-desk.jpg'
    },
    variants: [
      { id: 'wal-10-a4-unframed', size: 'A4', framed: false, price: 749, inStock: true },
      { id: 'wal-10-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1449, inStock: true },
      { id: 'wal-10-a3-unframed', size: 'A3', framed: false, price: 1149, inStock: true },
      { id: 'wal-10-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2149, inStock: true },
      { id: 'wal-10-a2-unframed', size: 'A2', framed: false, price: 1749, inStock: true },
      { id: 'wal-10-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3249, inStock: true },
      { id: 'wal-10-a1-unframed', size: 'A1', framed: false, price: 2549, inStock: true },
      { id: 'wal-10-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4699, inStock: true }
    ],
    relatedIds: ['wal-08', 'wal-12', 'wal-02']
  },
  {
    id: 'wal-11',
    slug: 'lost-in-type',
    title: 'LOST IN TYPE',
    subtitle: 'Typographic Taxonomy Sheet',
    description: 'An oversized editorial study of typography nomenclature: Kern, Glyph, Ligature, Pica, and the bold red Waltier insignia.',
    collection: 'TYPE & ATTITUDE',
    tags: ['Type', 'Font', 'Design', 'Editorial'],
    orientation: 'Portrait',
    basePrice: 849,
    badge: 'LIMITED',
    palette: ['#101010', '#EF171C', '#F4F2EC'],
    specs: {
      paperWeight: '300 GSM Heavy Black Cardstock',
      finish: 'Deep matte pigment ink finish',
      printTech: '12-Color archival pigment print',
      packaging: 'Rigid kraft tube'
    },
    mockups: {
      artwork: 'lost-in-type',
      room: '/images/study-desk.jpg',
      detail: '/images/bedroom-duo.jpg',
      scale: '/images/hero-room.jpg'
    },
    variants: [
      { id: 'wal-11-a4-unframed', size: 'A4', framed: false, price: 849, inStock: true },
      { id: 'wal-11-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1549, inStock: true },
      { id: 'wal-11-a3-unframed', size: 'A3', framed: false, price: 1249, inStock: true },
      { id: 'wal-11-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2249, inStock: true },
      { id: 'wal-11-a2-unframed', size: 'A2', framed: false, price: 1849, inStock: true },
      { id: 'wal-11-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3349, inStock: true },
      { id: 'wal-11-a1-unframed', size: 'A1', framed: false, price: 2649, inStock: true },
      { id: 'wal-11-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4849, inStock: true }
    ],
    relatedIds: ['wal-04', 'wal-01', 'wal-12']
  },
  {
    id: 'wal-12',
    slug: 'wall-theory',
    title: 'WALL THEORY',
    subtitle: 'Spatial Construct & Proportion',
    description: 'Geometric harmony distilled into pure shape and proportion. The core thesis that every room speaks to its occupant through its vertical surfaces.',
    collection: 'MINIMAL MOOD',
    tags: ['Architecture', 'Bauhaus', 'Geometry', 'Theory'],
    orientation: 'Portrait',
    basePrice: 799,
    badge: 'DROP 04',
    palette: ['#F4F2EC', '#101010', '#EF171C', '#D8D4CC'],
    specs: {
      paperWeight: '300 GSM Heavy Archival Textured Cotton',
      finish: 'Matte glare-free finish',
      printTech: 'Archival Giclée pigment print',
      packaging: 'Heavy duty tube with tissue wraps'
    },
    mockups: {
      artwork: 'wall-theory',
      room: '/images/hero-room.jpg',
      detail: '/images/study-desk.jpg',
      scale: '/images/bedroom-duo.jpg'
    },
    variants: [
      { id: 'wal-12-a4-unframed', size: 'A4', framed: false, price: 799, inStock: true },
      { id: 'wal-12-a4-black', size: 'A4', framed: true, frameColor: 'Matte Black', price: 1499, inStock: true },
      { id: 'wal-12-a3-unframed', size: 'A3', framed: false, price: 1199, inStock: true },
      { id: 'wal-12-a3-black', size: 'A3', framed: true, frameColor: 'Matte Black', price: 2199, inStock: true },
      { id: 'wal-12-a2-unframed', size: 'A2', framed: false, price: 1799, inStock: true },
      { id: 'wal-12-a2-black', size: 'A2', framed: true, frameColor: 'Matte Black', price: 3299, inStock: true },
      { id: 'wal-12-a1-unframed', size: 'A1', framed: false, price: 2599, inStock: true },
      { id: 'wal-12-a1-black', size: 'A1', framed: true, frameColor: 'Matte Black', price: 4799, inStock: true }
    ],
    relatedIds: ['wal-07', 'wal-10', 'wal-02']
  }
];

export const COLLECTIONS = [
  {
    id: 'TYPE & ATTITUDE',
    title: 'TYPE & ATTITUDE',
    count: 2,
    description: 'Loud statements, bold sans-serifs, and unfiltered typography designed to confront ordinary rooms.',
    bg: '#101010',
    color: '#F4F2EC',
    tag: 'EDITORIAL MANIFESTOS',
    previewSvgId: 'stay-offline'
  },
  {
    id: 'AFTER HOURS',
    title: 'AFTER HOURS',
    count: 2,
    description: 'Subterranean electronic music aesthetics, dark room tones, and nocturnal studio vibes.',
    bg: '#181818',
    color: '#EF171C',
    tag: 'NIGHT TIME CULTURE',
    previewSvgId: 'after-hours'
  },
  {
    id: 'SOUND & RHYTHM',
    title: 'SOUND & RHYTHM',
    count: 1,
    description: 'Visual representations of resonance, acoustic waveforms, and sonic balance.',
    bg: '#101010',
    color: '#F4F2EC',
    tag: 'SONIC ARCHITECTURE',
    previewSvgId: 'loud-silence'
  },
  {
    id: 'STREET ENERGY',
    title: 'STREET ENERGY',
    count: 2,
    description: 'High velocity graphics, asphalt attitude, raw tape elements, and aggressive crimson accents.',
    bg: '#EF171C',
    color: '#FFFFFF',
    tag: 'UNDERGROUND STREET',
    previewSvgId: 'redline'
  },
  {
    id: 'MINIMAL MOOD',
    title: 'MINIMAL MOOD',
    count: 3,
    description: 'Stark geometric tensions, purposeful negative space, and calculated brutalist balance.',
    bg: '#EAE6DC',
    color: '#101010',
    tag: 'CALCULATED RESTRAINT',
    previewSvgId: 'no-signal'
  },
  {
    id: 'ABSTRACT CHAOS',
    title: 'ABSTRACT CHAOS',
    count: 2,
    description: 'Synthesizer waves, collision of organic curves and sharp razor lines.',
    bg: '#101010',
    color: '#F4F2EC',
    tag: 'PURE EXPRESSION',
    previewSvgId: 'soft-chaos'
  }
];

