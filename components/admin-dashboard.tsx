"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle2, AlertCircle, Clock, ArrowLeft, Trash2 } from "lucide-react"
import { useState } from "react"

interface AdminDashboardProps {
  onNavigate: (page: any) => void
  projects: any[]
  onUpdateProjectStatus: (projectId: string, status: string) => void
}

export default function AdminDashboard({ onNavigate, projects, onUpdateProjectStatus }: AdminDashboardProps) {
  const [rejectionReason, setRejectionReason] = useState<string | null>(null)

  const pendingProjects = projects.filter((p) => p.status === "Awaiting Verification" || p.status === "Under Review")

  const handleApprove = (projectId: string) => {
    onUpdateProjectStatus(projectId, "Active")
  }

  const handleReject = (projectId: string, reason: string) => {
    onUpdateProjectStatus(projectId, "Rejected")
    setRejectionReason(null)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage project verification and platform integrity</p>
        </div>

        {/* Admin Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Pending Review",
              value: pendingProjects.length,
              icon: <Clock className="w-8 h-8 text-primary" />,
            },
            {
              label: "Verified Projects",
              value: projects.filter((p) => p.status === "Active").length,
              icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
            },
            {
              label: "Rejected",
              value: projects.filter((p) => p.status === "Rejected").length,
              icon: <AlertCircle className="w-8 h-8 text-destructive" />,
            },
            {
              label: "Platform Health",
              value: "98%",
              icon: <Shield className="w-8 h-8 text-primary" />,
            },
          ].map((metric, i) => (
            <Card key={i} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </div>
                {metric.icon}
              </div>
            </Card>
          ))}
        </div>

        {/* Pending Projects */}
        <Card className="p-6 mb-8">
          <h3 className="font-bold text-lg mb-6">Pending Project Verification</h3>
          {pendingProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No pending projects</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingProjects.map((project) => (
                <div key={project.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold">{project.title}</p>
                      <p className="text-sm text-muted-foreground">by {project.creator}</p>
                      <p className="text-xs text-muted-foreground mt-1">{project.description.substring(0, 100)}...</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{project.createdDate}</span>
                  </div>
                  <p className="text-sm mb-4 text-primary">{project.status}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" className="gap-2" onClick={() => handleApprove(project.id)}>
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Request More Info
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive bg-transparent"
                      onClick={() => handleReject(project.id, "")}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-6">Platform Activity</h3>
          <div className="space-y-3">
            {[
              '12:45 PM - Project "Tech for Elders" approved',
              "11:30 AM - User dispute resolved between creator and donor",
              "10:15 AM - 45 new projects submitted for verification",
              "09:00 AM - Monthly verification report generated",
              "08:30 AM - System backup completed successfully",
            ].map((activity, i) => (
              <div key={i} className="py-3 border-b border-border last:border-0 flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{activity}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
