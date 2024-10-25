import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 400 })
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer le nouvel utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "Utilisateur créé avec succès", user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    return NextResponse.json({ message: "Erreur lors de l'inscription" }, { status: 500 })
  }
}