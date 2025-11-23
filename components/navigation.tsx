"use client"
import { Heart, Home, Users, BarChart3, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  currentPage: string
  onNavigate: (page: any) => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <button onClick={() => onNavigate("home")} className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>CrowdFund360</span>
            </button>

            <div className="hidden md:flex gap-1">
              <button
                onClick={() => onNavigate("home")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  currentPage === "home" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Home
              </button>
              <button
                onClick={() => onNavigate("projects")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  currentPage === "projects" || currentPage === "project-detail"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Projects
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={currentPage === "creator-dashboard" ? "default" : "outline"}
              size="sm"
              onClick={() => onNavigate("creator-dashboard")}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Creator
            </Button>
            <Button
              variant={currentPage === "donor-dashboard" ? "default" : "outline"}
              size="sm"
              onClick={() => onNavigate("donor-dashboard")}
            >
              <Heart className="w-4 h-4 mr-1" />
              My Donations
            </Button>
            <Button
              variant={currentPage === "admin-dashboard" ? "default" : "outline"}
              size="sm"
              onClick={() => onNavigate("admin-dashboard")}
            >
              <Shield className="w-4 h-4 mr-1" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
