import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronLeft, Calendar, Share2, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

const POSTS = [
  {
    slug: "ultimate-guide-hunza-valley",
    title: "The Ultimate Guide to Hunza Valley in 2026",
    content: "Hunza Valley is often referred to as the Shangri-La of Pakistan. Nestled in the Gilgit-Baltistan region, it is a place of breathtaking beauty, where the towering peaks of the Karakoram Range meet lush green orchards and turquoise rivers. In this guide, we'll cover everything you need to know to make your trip unforgettable.\n\n### When to Visit\nThe best time to visit Hunza is from April to October. Spring (April-May) brings cherry and apricot blossoms, while Autumn (October) offers a fiery display of colors. Summer is perfect for trekking and escaping the heat of the plains.\n\n### Top Attractions\n1. **Baltit Fort:** A 700-year-old fort offering panoramic views of the valley.\n2. **Altit Fort:** Another historic gem with beautiful gardens.\n3. **Eagle's Nest:** The best spot for sunrise and sunset views over Rakaposhi and Ladyfinger Peak.\n4. **Attabad Lake:** Famous for its stunning blue water, created by a massive landslide in 2010.",
    category: "Destination Guide",
    readTime: "8 min read",
    date: "15 May 2026",
    author: "Shamaal Team",
    image: "/images/destinations/baldi-viewpoint.jpeg",
  },
  {
    slug: "k2-base-camp-packing-list",
    title: "K2 Base Camp Packing List: What You Really Need",
    content: "Trekking to the base of the world's second-highest mountain is no small feat. Preparation is key, and your gear can make or break your expedition. Here is our definitive packing list based on years of experience.\n\n### Essential Gear\n- **Footwear:** High-quality, broken-in trekking boots and plenty of wool socks.\n- **Clothing:** Layering is essential. Bring moisture-wicking base layers, a warm down jacket, and a waterproof outer shell.\n- **Sleeping:** A -20°C rated sleeping bag is a must for the cold nights on the Baltoro Glacier.\n- **Hydration:** Water purification tablets or a portable filter.",
    category: "Packing Guide",
    readTime: "6 min read",
    date: "10 May 2026",
    author: "Zahid Khan",
    image: "/images/destinations/k2-concordia.jpeg",
  },
  {
    slug: "fairy-meadows-sunrise",
    title: "How to Photograph Nanga Parbat at Sunrise From Fairy Meadows",
    content: "Fairy Meadows provides one of the most accessible views of an 8,000-meter peak in the world. Photographing Nanga Parbat (8,126m) at sunrise is a dream for many. Here's how to get the shot.\n\n### Preparation\nWake up at least 45 minutes before sunrise. The 'Alpine Glow' happens quickly. Set up your tripod near the reflection pools for a dramatic double-image of the mountain.\n\n### Settings\nUse a wide-angle lens (16-35mm) to capture the scale. Stop down your aperture to f/11 or f/16 for maximum sharpness throughout the frame.",
    category: "Photography",
    readTime: "5 min read",
    date: "5 May 2026",
    author: "Irfan Ali",
    image: "/images/destinations/nanga-parbat.jpeg",
  },
  {
    slug: "pakistan-north-budget-travel",
    title: "Northern Pakistan on a Budget: The Complete 2026 Guide",
    content: "You don't need a fortune to see the world's most beautiful mountains. By using local transport and staying in traditional guest houses, you can experience the Great North for a fraction of the cost of luxury tours.\n\n### Budget Tips\n- **Transport:** Use the local Hi-Ace vans instead of private jeeps where possible.\n- **Accommodation:** Look for family-run guest houses in villages rather than hotels in main towns.\n- **Food:** Eat at local 'Dhabas' where you can get delicious, fresh food for very little.",
    category: "Travel Tips",
    readTime: "10 min read",
    date: "28 Apr 2026",
    author: "Shamaal Team",
    image: "/images/destinations/deosai-plains.jpeg",
  },
  {
    slug: "chitral-kalash-festivals",
    title: "Kalash Festivals: A Guide to the Unique Culture of Chitral",
    content: "The Kalash people are a unique ethnic group with a culture that predates Islam in the region. Their festivals are a riot of color, music, and dance. Chilam Joshi (May), Uchau (August), and Choimus (December) are the main events.\n\n### Respectful Visiting\nAlways ask for permission before taking photos of people. Dress modestly and avoid interrupting religious ceremonies. The Kalash are incredibly welcoming, and showing respect goes a long way.",
    category: "Culture",
    readTime: "7 min read",
    date: "20 Apr 2026",
    author: "Ayesha Bibi",
    image: "/images/destinations/khaplu-fort.jpeg",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | Shamaal Blog` : "Blog Post Not Found",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 md:pt-40 pb-20 bg-shamaal-cream dark:bg-[var(--background)]">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center text-shamaal-sky hover:text-shamaal-gold font-semibold mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <span className="bg-shamaal-gold/20 text-shamaal-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" /> {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-shamaal-navy dark:text-white mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-gray-100 dark:border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-shamaal-navy flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-shamaal-navy dark:text-white font-bold">{post.author}</p>
                  <p className="text-gray-500 text-sm flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" /> {post.date}
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-shamaal-gold/20 transition-all">
                <Share2 className="w-5 h-5 text-shamaal-navy dark:text-white" />
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" />
          </div>

          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 rounded-3xl bg-shamaal-navy text-white text-center">
            <h3 className="text-2xl font-bold mb-4 text-shamaal-gold">Ready to see it for yourself?</h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">Join our expert guides on a journey through the breathtaking landscapes of Northern Pakistan.</p>
            <Link href="/tours" className="inline-flex items-center px-8 py-4 bg-shamaal-gold text-shamaal-navy font-black rounded-full hover:bg-white transition-all">
              EXPLORE OUR TOURS <ArrowUpRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
