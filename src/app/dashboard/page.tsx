'use client';

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { MedicalDashboard } from '@/components/medical-dashboard'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Chargement...</div>
  }

  if (!session) {
    return null
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord médical</h1>
      <MedicalDashboard />
    </main>
  )
}