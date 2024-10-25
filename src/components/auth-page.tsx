"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"

export function AuthPageComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [error, setError] = useState("")
  const router = useRouter()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError("Identifiants incorrects. Veuillez réessayer.")
    } else {
      router.push("/dashboard")
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
  
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
  
    if (response.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      if (result?.error) {
        setError("Erreur lors de la connexion automatique. Veuillez vous connecter manuellement.")
      } else {
        router.push("/dashboard")
      }
    } else {
      const data = await response.json()
      setError(data.message || "Erreur lors de l\'inscription. Veuillez réessayer.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Bienvenue sur PodoScan Pro</CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login" ? "Connectez-vous à votre compte" : "Créez votre compte"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <Input id="email-login" name="email" type="email" placeholder="nom@exemple.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-login">Mot de passe</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <Input
                        id="password-login"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6" type="submit">
                  Se connecter
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-register">Nom complet</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <Input id="name-register" name="name" type="text" placeholder="John Doe" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <Input id="email-register" name="email" type="email" placeholder="nom@exemple.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register">Mot de passe</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <Input
                        id="password-register"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6" type="submit">
                  Inscription
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500 text-center">
            En vous connectant, vous acceptez nos{" "}
            <a href="#" className="underline hover:text-primary">
              conditions utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="underline hover:text-primary">
              politique de confidentialité
            </a>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}