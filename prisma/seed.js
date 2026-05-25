const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const TOURS = [
  {
    title: "Kashmir • Neelum Valley Tour",
    slug: "kashmir-neelum-valley",
    price: 18000,
    duration: 3,
    location: "Kashmir",
    difficulty: "Easy",
    featured: true,
    description: "Explore the breathtaking Neelum Valley. Solo: PKR 18,000 | Couple: PKR 50,000. Package includes premium hotel accommodation, luxury transport, delicious meals, and a professional guide.",
    images: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Naran Valley Tour",
    slug: "naran-valley",
    price: 18000,
    duration: 3,
    location: "Naran",
    difficulty: "Easy",
    featured: true,
    description: "Journey to the heart of the Himalayas. Solo: PKR 18,000 | Couple: PKR 55,000. Package includes premium hotel stay, luxury transport, all meals, and a professional guide.",
    images: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Hunza Valley Tour",
    slug: "hunza-valley",
    price: 30000,
    duration: 5,
    location: "Hunza",
    difficulty: "Moderate",
    featured: true,
    description: "Experience the magic of Hunza. Solo: PKR 30,000 | Couple: PKR 85,000. Package includes luxury hotel accommodation, premium transport, all meals, and an expert guide.",
    images: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Fairy Meadows Tour",
    slug: "fairy-meadows-tour",
    price: 30000,
    duration: 5,
    location: "Diamer",
    difficulty: "Moderate",
    featured: true,
    description: "A dream trip to the base of Nanga Parbat. Solo: PKR 30,000 | Couple: PKR 75,000. Package includes camping/hotel stay, transport, meals, and a professional guide.",
    images: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Skardu Tour",
    slug: "skardu-tour",
    price: 32000,
    duration: 6,
    location: "Skardu",
    difficulty: "Moderate",
    featured: true,
    description: "Explore the throne of mountains. Solo: PKR 32,000 | Couple: PKR 85,000. Package includes premium hotel stay, luxury transport, all meals, and a professional guide.",
    images: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800"
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

  // Create hashed passwords using built-in crypto
  const crypto = require("crypto");
  const hashPassword = (pwd) => crypto.createHash("sha256").update(pwd).digest("hex");

  // Create an admin user for dashboard testing
  const admin = await prisma.user.create({
    data: {
      name: "Admin Shamaal",
      email: "admin@shamaaltourism.com",
      password: hashPassword("admin123"),
      role: "ADMIN",
    }
  });
  console.log(`Created Admin account: ${admin.email}`);

  // Create a standard test user
  const user = await prisma.user.create({
    data: {
      name: "Ali Khan",
      email: "ali@gmail.com",
      password: hashPassword("user123"),
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
