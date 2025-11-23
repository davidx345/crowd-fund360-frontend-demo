"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, TrendingUp, Calendar, Plus, ArrowLeft, ExternalLink } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import CreateProjectForm from "./create-project-form"

interface CreatorDashboardProps {
  onNavigate: (page: any) => void
  onAddProject: (project: any) => void
  projects: any[]
  currentUser: { type: string; name: string } | null
}

const chartData = [
  { date: "Jan 1", donations: 2400 },
  { date: "Jan 8", donations: 1398 },
  { date: "Jan 15", donations: 9800 },
  { date: "Jan 22", donations: 3908 },
  { date: "Jan 29", donations: 4800 },
]

const budgetData = [
  { category: "Materials", value: 4000 },
  { category: "Labor", value: 3000 },
  { category: "Transport", value: 2000 },
  { category: "Other", value: 1000 },
]

export default function CreatorDashboard({ onNavigate, onAddProject, projects, currentUser }: CreatorDashboardProps) {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const creatorProjects = projects.filter((p) => p.creatorId === "current-user")
  const totalRaised = creatorProjects.reduce((sum, p) => sum + p.raised, 0)
  const totalSupporters = creatorProjects.reduce((sum, p) => sum + p.donors, 0)

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

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Creator Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects and track performance</p>
          </div>
          <Button className="gap-2" onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Active Projects",
              value: creatorProjects.length,
              icon: <BarChart3 className="w-8 h-8 text-primary" />,
            },
            {
              label: "Total Raised",
              value: `$${totalRaised.toLocaleString()}`,
              icon: <TrendingUp className="w-8 h-8 text-primary" />,
            },
            {
              label: "Supporters",
              value: totalSupporters.toLocaleString(),
              icon: <Users className="w-8 h-8 text-primary" />,
            },
            {
              label: "Success Rate",
              value: "94%",
              icon: <Calendar className="w-8 h-8 text-primary" />,
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

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Donation Trend */}
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-6">Donation Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Line type="monotone" dataKey="donations" stroke="var(--color-primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Budget Allocation */}
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-6">Budget Allocation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar dataKey="value" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Your Projects */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Your Projects</h3>
            <Button variant="outline" size="sm" onClick={() => onNavigate("projects")} className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Discover Projects
            </Button>
          </div>

          {creatorProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {creatorProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex-1">
                    <p className="font-bold">{project.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Status: {project.status} • {project.daysLeft} days left
                    </p>
                  </div>
                  <div className="text-right mr-6">
                    <p className="font-bold">
                      ${project.raised.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((project.raised / project.fundingGoal) * 100)}% funded
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {showCreateForm && (
        <CreateProjectForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={(newProject) => {
            onAddProject(newProject)
            setShowCreateForm(false)
          }}
        />
      )}
    </div>
  )
}
