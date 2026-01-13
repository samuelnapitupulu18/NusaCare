import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // 1. Create Admin User
    const passwordHash = await Bun.password.hash('password123')
    const admin = await prisma.user.upsert({
        where: { email: 'admin@nusanet.com' },
        update: {},
        create: {
            email: 'admin@nusanet.com',
            name: 'Admin NusaCare',
            passwordHash,
            role: 'ADMIN',
            points: {
                create: {
                    balance: 2450,
                    tier: 'GOLD'
                }
            }
        },
    })
    console.log({ admin })

    // 2. Create Technician
    const tech = await prisma.technician.create({
        data: {
            name: 'Budi Santoso',
            locationLogs: {
                create: [
                    { latitude: -6.2088, longitude: 106.8456 }, // Jakarta center
                ]
            }
        }
    })
    console.log({ tech })

    // 3. Create active Ticket
    const ticket = await prisma.ticket.create({
        data: {
            title: 'Internet Slow / Latency High',
            description: 'Customer reports > 100ms jitter.',
            status: 'IN_PROGRESS',
            userId: admin.id,
            technicianId: tech.id
        }
    })
    console.log({ ticket })

    console.log('✅ Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
