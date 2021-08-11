const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    username: 'Alice',
    email: 'alice@prisma.io',
    password: 'alice',
  },
  {
    username: 'Nilu',
    email: 'nilu@prisma.io',
    password: 'nilu',
  },
  {
    username: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: 'mahmoud',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
