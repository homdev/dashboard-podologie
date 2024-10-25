'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRight, Calendar, ClipboardCheck, FileText, Link, LucideIcon, Menu, Users } from "lucide-react"

export function HomePageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between sticky top-0 bg-background z-50 shadow-sm">
        <a className="flex items-center justify-center" href="#">
          <span className="sr-only">Podologie Médicale</span>
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Logo"
            className="h-8 w-8"
            width={32}
            height={32}
          />
          <span className="ml-2 text-lg font-bold hidden sm:inline-block">PodoScan Pro</span>
        </a>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-lg font-semibold hover:underline">Fonctionnalités</a>
              <a href="#" className="text-lg font-semibold hover:underline">Tarifs</a>
              <a href="#" className="text-lg font-semibold hover:underline">Contact</a>
              <Button asChild className="mt-4">
                <Link href="/auth">Se connecter</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="hidden lg:flex gap-4 sm:gap-6">
          <Button variant="ghost" className="text-sm font-medium">
            Fonctionnalités
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Tarifs
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Contact
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Révolutionnez votre pratique podologique
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 text-sm sm:text-base">
                  PodoScan Pro : Outil ultime pour le diagnostic et le suivi podologique de précision.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  <Link href="/auth">Se connecter</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl text-center mb-8 sm:mb-12">
              Fonctionnalités clés
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={ClipboardCheck}
                title="Diagnostic précis"
                description="Analyse détaillée des empreintes plantaires pour un diagnostic podologique précis."
              />
              <FeatureCard
                icon={Calendar}
                title="Gestion des rendez-vous"
                description="Planifiez et gérez facilement vos consultations avec un calendrier intégré."
              />
              <FeatureCard
                icon={Users}
                title="Suivi patient"
                description="Historique complet et évolution du traitement pour chaque patient."
              />
              <FeatureCard
                icon={FileText}
                title="Rapports détaillés"
                description="Générez des rapports professionnels pour vos patients et les professionnels de santé."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-center sm:text-left text-gray-500 dark:text-gray-400">
            © 2024 PodoScan Pro. Tous droits réservés.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Conditions utilisation
            </a>
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Politique de confidentialité
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <CardHeader className="pb-2 flex flex-col items-center">
        <div className="rounded-full bg-primary/10 p-3 mb-4 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}