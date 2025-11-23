"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DEMO_UPDATES } from "@/lib/demo-data"
import { Share2, CheckCircle2, Users, ArrowLeft } from "lucide-react"

interface ProjectDetailPageProps {
  projectId: string
  onNavigate: (page: any) => void
  onDonate: () => void
  projects: any[]
}

export default function ProjectDetailPage({ projectId, onNavigate, onDonate, projects }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.id === projectId)
  const projectUpdates = DEMO_UPDATES.filter((u) => u.projectId === projectId)
  const [activeTab, setActiveTab] = useState<"about" | "updates" | "comments">("about")
  const [newComment, setNewComment] = useState("")

  if (!project) return <div>Project not found</div>

  const fundingPercent = Math.min((project.raised / project.fundingGoal) * 100, 100)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("projects")}
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>

        {/* Hero Image and Funding Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl overflow-hidden mb-4">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Funding Card */}
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-3xl font-bold text-primary">${project.raised.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">of ${project.fundingGoal.toLocaleString()} goal</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                  <div className="bg-primary h-3" style={{ width: `${fundingPercent}%` }} />
                </div>
                <p className="text-sm font-semibold">{Math.round(fundingPercent)}% funded</p>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{project.donors} supporters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{project.daysLeft} days left</span>
                </div>
              </div>

              <Button className="w-full mb-2" onClick={onDonate}>
                Donate Now
              </Button>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </Card>

            {/* Verification Badge */}
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Verified Creator</p>
                  <p className="text-muted-foreground">Identity verified & community endorsed</p>
                </div>
              </div>
            </Card>

            {/* Creator Info */}
            <Card className="p-4">
              <p className="text-sm font-semibold mb-3">Project Lead</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold">{project.creator.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{project.creator}</p>
                  <p className="text-xs text-muted-foreground">Community Leader</p>
                </div>
              </div>
              <Button variant="outline" className="w-full text-sm bg-transparent">
                Message Creator
              </Button>
            </Card>
          </div>
        </div>

        {/* Project Details */}
        <Card className="p-8">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

          <div className="flex gap-4 mb-8 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {project.donors} supporters
            </span>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <div className="flex gap-8">
              {(["about", "updates", "comments"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium transition capitalize ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">About This Project</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">What We'll Achieve</h3>
                  <ul className="space-y-2">
                    {project.milestones.map((milestone, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Budget Breakdown</h3>
                  <div className="space-y-2">
                    {project.budget.map((item, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-border">
                        <span>{item.category}</span>
                        <span className="font-semibold">${item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "updates" && (
              <div className="space-y-6">
                {projectUpdates.map((update) => (
                  <Card key={update.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold">{update.title}</p>
                        <p className="text-sm text-muted-foreground">{update.date}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{update.content}</p>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "comments" && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span>Y</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Share your thoughts..."
                      className="w-full p-3 rounded-lg border border-input bg-background resize-none"
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button className="mt-2">Post Comment</Button>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <span>D</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Donor #{i}</p>
                          <p className="text-sm text-muted-foreground mb-2">2 days ago</p>
                          <p>Great project! Looking forward to seeing the impact.</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
