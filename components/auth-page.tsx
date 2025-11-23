"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart } from "lucide-react"

interface AuthPageProps {
  onNavigate: (page: any) => void
  setCurrentUser: (user: { type: string; name: string } | null) => void
}

export default function AuthPage({ onNavigate, setCurrentUser }: AuthPageProps) {
  const [authType, setAuthType] = useState<"creator" | "donor" | "admin" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleCreatorSignUp = () => {
    if (email.trim() && password.trim() && name.trim()) {
      setCurrentUser({ type: "creator", name })
      onNavigate("creator-dashboard")
    }
  }

  const handleDonorSignIn = () => {
    if (email.trim() && password.trim()) {
      const donorName = email.split("@")[0] // Extract name from email
      setCurrentUser({ type: "donor", name: donorName })
      onNavigate("projects")
    }
  }

  const handleAdminEnter = () => {
    if (email.trim() && password.trim()) {
      setCurrentUser({ type: "admin", name: "Admin" })
      onNavigate("admin-dashboard")
    }
  }

  if (authType === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">CrowdFund360</h1>
            <p className="text-muted-foreground">Fund ideas that change communities</p>
          </div>

          <div className="space-y-4">
            <Button size="lg" className="w-full" onClick={() => setAuthType("creator")}>
              Creator Sign Up
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={() => setAuthType("donor")}>
              Donor Sign In
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={() => setAuthType("admin")}>
              Admin Enter
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <button
          onClick={() => {
            setAuthType(null)
            setEmail("")
            setPassword("")
            setName("")
          }}
          className="text-sm text-primary hover:underline mb-6"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {authType === "creator" ? "Create Your Account" : authType === "donor" ? "Sign In" : "Admin Portal"}
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {authType === "creator" && (
            <div>
              <label className="text-sm font-medium mb-2 block">Full Name</label>
              <Input placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={
            authType === "creator" ? handleCreatorSignUp : authType === "donor" ? handleDonorSignIn : handleAdminEnter
          }
          disabled={
            authType === "creator"
              ? !email.trim() || !password.trim() || !name.trim()
              : !email.trim() || !password.trim()
          }
        >
          {authType === "creator" ? "Create Account" : authType === "donor" ? "Sign In" : "Enter Admin"}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {authType === "creator"
            ? "Create your creator account to start a project"
            : authType === "donor"
              ? "Sign in to browse and support projects"
              : "Admin access to verify and manage projects"}
        </p>
      </Card>
    </div>
  )
}
