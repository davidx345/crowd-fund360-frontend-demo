"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import HomePage from "@/components/home-page"
import ProjectListingPage from "@/components/project-listing-page"
import ProjectDetailPage from "@/components/project-detail-page"
import CreatorDashboard from "@/components/creator-dashboard"
import DonorDashboard from "@/components/donor-dashboard"
import AdminDashboard from "@/components/admin-dashboard"
import DonationFlow from "@/components/donation-flow"

type PageType =
  | "home"
  | "projects"
  | "project-detail"
  | "creator-dashboard"
  | "donor-dashboard"
  | "admin-dashboard"
  | "donation-flow"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const handleNavigate = (page: PageType, projectId?: string) => {
    setCurrentPage(page)
    if (projectId) setSelectedProjectId(projectId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}

      {currentPage === "projects" && (
        <ProjectListingPage
          onNavigate={handleNavigate}
          onSelectProject={(id) => {
            setSelectedProjectId(id)
            setCurrentPage("project-detail")
          }}
        />
      )}

      {currentPage === "project-detail" && selectedProjectId && (
        <ProjectDetailPage
          projectId={selectedProjectId}
          onNavigate={handleNavigate}
          onDonate={() => setCurrentPage("donation-flow")}
        />
      )}

      {currentPage === "creator-dashboard" && <CreatorDashboard onNavigate={handleNavigate} />}

      {currentPage === "donor-dashboard" && <DonorDashboard onNavigate={handleNavigate} />}

      {currentPage === "admin-dashboard" && <AdminDashboard onNavigate={handleNavigate} />}

      {currentPage === "donation-flow" && (
        <DonationFlow
          onComplete={() => {
            setCurrentPage("donor-dashboard")
          }}
          onCancel={() => setCurrentPage("projects")}
        />
      )}
    </div>
  )
}
