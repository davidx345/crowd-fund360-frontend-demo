"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface CreateProjectFormProps {
  onClose: () => void
  onSubmit: (project: any) => void
}

export default function CreateProjectForm({ onClose, onSubmit }: CreateProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Community",
    description: "",
    fundingGoal: "",
    image: "",
  })

  const categories = ["Community", "Education", "Healthcare", "Environment"]

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.fundingGoal) {
      alert("Please fill in all required fields")
      return
    }

    const newProject = {
      id: String(Math.random()),
      title: formData.title,
      category: formData.category,
      description: formData.description || "Project description coming soon",
      fundingGoal: Number.parseInt(formData.fundingGoal),
      raised: 0,
      donors: 0,
      daysLeft: 30,
      creator: "You",
      creatorId: "current-user",
      image: "/placeholder.svg?height=300&width=400&query=" + formData.title,
      createdDate: new Date().toISOString().split("T")[0],
      status: "Awaiting Verification",
      milestones: ["Project planning", "Implementation phase", "Launch & monitoring"],
      budget: [
        { category: "Operations", amount: Number.parseInt(formData.fundingGoal) * 0.5 },
        { category: "Materials", amount: Number.parseInt(formData.fundingGoal) * 0.3 },
        { category: "Other", amount: Number.parseInt(formData.fundingGoal) * 0.2 },
      ],
    }

    onSubmit(newProject)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create New Project</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Project Title *</label>
            <Input
              placeholder="e.g., Community Art Center"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <textarea
              placeholder="Describe your project, its impact, and how the funds will be used..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Funding Goal ($) *</label>
            <Input
              type="number"
              placeholder="e.g., 50000"
              value={formData.fundingGoal}
              onChange={(e) => setFormData({ ...formData, fundingGoal: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Create Project
          </Button>
        </div>
      </Card>
    </div>
  )
}
