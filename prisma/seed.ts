import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const tours = [
    {
      title: "Majestic Hunza Valley Expedition",
      slug: "hunza-valley-expedition",
      description: "Explore the heart of the Karakoram range with our 7-day Hunza Valley tour. Visit Altit and Baltit forts, Attabad Lake, and the Khunjerab Pass.",
      price: 125000,
      duration: 7,
      location: "Hunza Valley",
      difficulty: "Easy",
      featured: true,
      images: "/images/destinations/attabad-lake.jpeg,/images/destinations/baldi-viewpoint.jpeg,/images/destinations/kharphocho-fort.jpeg"
    },
    {
      title: "Skardu & Deosai Plains Adventure",
      slug: "skardu-deosai-adventure",
      description: "Discover the 'Land of Giants' at Deosai National Park and the serene beauty of Shangrila Resort in Skardu.",
      price: 95000,
      duration: 5,
      location: "Skardu",
      difficulty: "Moderate",
      featured: true,
      images: "/images/destinations/deosai-plains.jpeg,/images/destinations/cold-desert.jpeg,/images/destinations/shangrilla-lake.jpeg"
    },
    {
      title: "Fairy Meadows & Nanga Parbat Base",
      slug: "fairy-meadows-trek",
      description: "A trekker's paradise. Experience the breathtaking views of the Killer Mountain from the lush green Fairy Meadows.",
      price: 65000,
      duration: 4,
      location: "Gilgit-Baltistan",
      difficulty: "Hard",
      featured: false,
      images: "/images/destinations/nanga-parbat.jpeg,/images/destinations/cold-desert.jpeg,/images/destinations/kharphocho-fort.jpeg"
    },
    {
      title: "Swat Valley Cultural Tour",
      slug: "swat-valley-culture",
      description: "Experience the Switzerland of the East. Visit Malam Jabba, Kalam, and the ancient Buddhist sites.",
      price: 55000,
      duration: 3,
      location: "Swat Valley",
      difficulty: "Easy",
      featured: false,
      images: "/images/destinations/malam-jabba.jpeg,/images/destinations/babusar-top.jpeg,/images/destinations/rainbow-lake.jpeg"
    },
    {
      title: "Naran & Kaghan Lake Saiful Malook",
      slug: "naran-kaghan-lakes",
      description: "The classic Northern areas trip. Visit Lake Saiful Malook and Babusar Top.",
      price: 45000,
      duration: 3,
      location: "Naran",
      difficulty: "Easy",
      featured: true,
      images: "/images/destinations/saiful-malook.jpeg,/images/destinations/babusar-top.jpeg,/images/destinations/deosai-plains.jpeg"
    }
  ]

  console.log('Start seeding...')
  for (const t of tours) {
    const tour = await prisma.tour.upsert({
      where: { slug: t.slug },
      update: t,
      create: t,
    })
    console.log(`Created/Updated tour: ${tour.title}`)
  }
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
