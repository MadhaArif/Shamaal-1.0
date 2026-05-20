const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const TOURS = [
  {
    title: "Hunza Valley Autumn Blossom Tour",
    slug: "hunza-valley-autumn",
    price: 150000,
    duration: 7,
    location: "Hunza, Gilgit",
    difficulty: "Easy",
    featured: true,
    description: "Experience the magic of Hunza Valley during the autumn season. Watch the entire valley transform into a spectacular canvas of gold, orange, and red hues. This easy-paced tour is perfect for families and photography enthusiasts, taking you through ancient forts, crystal clear lakes, and offering majestic views of Rakaposhi and Ladyfinger Peak.",
    images: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800,https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800,https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "K2 Base Camp Trek",
    slug: "k2-base-camp",
    price: 350000,
    duration: 21,
    location: "Skardu",
    difficulty: "Extreme",
    featured: true,
    description: "The ultimate expedition of a lifetime. Trek deep into the heart of the Karakoram Range to the base of K2 (8,611m), the world's second-highest mountain. Walk on giant glaciers, stand at the magnificent Concordia, and experience the raw majesty of high-altitude peaks. Recommended for experienced trekkers in peak physical condition.",
    images: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Fairy Meadows & Nanga Parbat Expedition",
    slug: "fairy-meadows",
    price: 95000,
    duration: 5,
    location: "Diamer",
    difficulty: "Moderate",
    featured: true,
    description: "Hike to the legendary Fairy Meadows, a lush green alpine meadow nestled right at the base of the mighty Nanga Parbat (8,126m), also known as the Killer Mountain. Stay in wooden log cabins, wake up to glorious sunrise views of the snow-covered peak, and hike up to the base camp for an unforgettable close-up view of the mountain wall.",
    images: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Swat Valley Winter Retreat",
    slug: "swat-winter",
    price: 85000,
    duration: 4,
    location: "Swat",
    difficulty: "Easy",
    featured: false,
    description: "Escape to the beautiful snow-covered slopes of Malam Jabba and Kalam in Swat Valley. Enjoy skiing, chairlift rides, hot local trout fish, and cozy nights in premium winter resorts. Perfect for families looking for a short and comfortable snow holiday in Pakistan's Switzerland.",
    images: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Chitral & Kalash Festival Tour",
    slug: "chitral-kalash",
    price: 120000,
    duration: 6,
    location: "Chitral",
    difficulty: "Moderate",
    featured: false,
    description: "Immerse yourself in the unique and fascinating culture of the Kalash people during their annual spring or winter festivals. Witness traditional folk dances, colorful dresses, and ancient customs, combined with scenic drives through the Lowari Tunnel and stunning views of Tirich Mir peak.",
    images: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Skardu Cold Desert Safari",
    slug: "skardu-safari",
    price: 110000,
    duration: 5,
    location: "Skardu",
    difficulty: "Moderate",
    featured: false,
    description: "Explore the magical cold desert of Sarfaranga in Skardu — the highest cold desert in the world. Enjoy ATV rides, camping under the clear Milky Way galaxy skies, boating on Upper Kachura Lake, and visiting the majestic historic forts of Kharpocho and Shigar.",
    images: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
  }
];

async function main() {
  console.log("Seeding Shamaal Tourism SQLite Database...");
  
  // Clear existing data
  await prisma.review.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.tour.deleteMany({});
  await prisma.user.deleteMany({});
  
  // Seed tours
  for (const t of TOURS) {
    const tour = await prisma.tour.create({
      data: t
    });
    console.log(`Created tour: ${tour.title} (${tour.id})`);
  }

  // Create an admin user for dashboard testing
  const admin = await prisma.user.create({
    data: {
      name: "Admin Shamaal",
      email: "admin@shamaaltourism.com",
      role: "ADMIN",
    }
  });
  console.log(`Created Admin account: ${admin.email}`);

  // Create a standard test user
  const user = await prisma.user.create({
    data: {
      name: "Ali Khan",
      email: "ali@gmail.com",
      role: "USER"
    }
  });
  console.log(`Created User account: ${user.email}`);

  console.log("Seeding completed successfully! 🎉");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
