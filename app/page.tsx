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
import AuthPage from "@/components/auth-page"
import { DEMO_PROJECTS } from "@/lib/demo-data"

type PageType =
  | "home"
  | "projects"
  | "project-detail"
  | "creator-dashboard"
  | "donor-dashboard"
  | "admin-dashboard"
  | "donation-flow"
  | "auth"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<{ type: string; name: string } | null>(null)
  const [projects, setProjects] = useState(DEMO_PROJECTS)

  const handleNavigate = (page: PageType, projectId?: string) => {
    setCurrentPage(page)
    if (projectId) setSelectedProjectId(projectId)
  }

  const handleAddProject = (newProject: any) => {
    setProjects([...projects, newProject])
  }

  const handleUpdateProjectStatus = (projectId: string, status: string) => {
    setProjects(projects.map((p) => (p.id === projectId ? { ...p, status } : p)))
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPage === "auth" ? (
        <AuthPage onNavigate={handleNavigate} setCurrentUser={setCurrentUser} />
      ) : (
        <>
          <Navigation
            currentPage={currentPage}
            onNavigate={handleNavigate}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />

          {currentPage === "home" && <HomePage onNavigate={handleNavigate} currentUser={currentUser} />}

          {currentPage === "projects" && (
            <ProjectListingPage
              onNavigate={handleNavigate}
              onSelectProject={(id) => {
                setSelectedProjectId(id)
                setCurrentPage("project-detail")
              }}
              projects={projects}
            />
          )}

          {currentPage === "project-detail" && selectedProjectId && (
            <ProjectDetailPage
              projectId={selectedProjectId}
              onNavigate={handleNavigate}
              onDonate={() => setCurrentPage("donation-flow")}
              projects={projects}
            />
          )}

          {currentPage === "creator-dashboard" && (
            <CreatorDashboard
              onNavigate={handleNavigate}
              onAddProject={handleAddProject}
              projects={projects}
              currentUser={currentUser}
            />
          )}

          {currentPage === "donor-dashboard" && <DonorDashboard onNavigate={handleNavigate} />}

          {currentPage === "admin-dashboard" && (
            <AdminDashboard
              onNavigate={handleNavigate}
              projects={projects}
              onUpdateProjectStatus={handleUpdateProjectStatus}
            />
          )}

          {currentPage === "donation-flow" && (
            <DonationFlow
              onComplete={() => {
                setCurrentPage("donor-dashboard")
              }}
              onCancel={() => setCurrentPage("projects")}
            />
          )}
        </>
      )}
    </div>
  )
}
