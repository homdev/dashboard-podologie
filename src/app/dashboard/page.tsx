import { MedicalDashboard } from '@/components/medical-dashboard'

export default function DashboardPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord médical</h1>
      <MedicalDashboard />
    </main>
  )
}