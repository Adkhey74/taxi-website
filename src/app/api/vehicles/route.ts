import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// GET - Récupérer tous les véhicules
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const availableOnly = searchParams.get('available') === 'true'

    const where: Prisma.VehicleWhereInput = {}
    
    if (availableOnly) {
      where.isAvailable = true
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({ vehicles }, { status: 200 })
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des véhicules' },
      { status: 500 }
    )
  }
}

