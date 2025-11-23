"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, Heart } from "lucide-react"

interface ProjectListingPageProps {
  onNavigate: (page: any) => void
  onSelectProject: (id: string) => void
  projects: any[]
}

export default function ProjectListingPage({ onNavigate, onSelectProject, projects }: ProjectListingPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("trending")

  const categories = ["All", "Education", "Healthcare", "Environment", "Technology", "Community"]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "trending") return b.donors - a.donors
    if (sortBy === "newest") return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    if (sortBy === "funded") {
      const aPercent = (a.raised / a.fundingGoal) * 100
      const bPercent = (b.raised / b.fundingGoal) * 100
      return bPercent - aPercent
    }
    return 0
  })

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Discover Projects</h1>
        <p className="text-muted-foreground mb-8">Browse verified community projects making real impact</p>

        {/* Search and Filter */}
        <div className="space-y-6 mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-input bg-background"
            >
              <option value="trending">Most Trending</option>
              <option value="newest">Newest</option>
              <option value="funded">Most Funded</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition cursor-pointer group"
              onClick={() => onSelectProject(project.id)}
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/5 relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <p className="text-xs font-semibold text-primary uppercase mb-2">{project.category}</p>
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                {/* Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">${project.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">${project.fundingGoal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-2"
                      style={{ width: `${Math.min((project.raised / project.fundingGoal) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((project.raised / project.fundingGoal) * 100)}% funded • {project.daysLeft} days left
                  </p>
                </div>

                {/* Supporters */}
                <div className="text-xs text-muted-foreground">{project.donors} supporters</div>
              </div>
            </Card>
          ))}
        </div>

        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No projects found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
