"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Eye, Zap, TrendingUp } from "lucide-react"

interface HomePageProps {
  onNavigate: (page: any) => void
  currentUser: { type: string; name: string } | null
}

export default function HomePage({ onNavigate, currentUser }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
              Fund Ideas That
              <span className="text-primary"> Change Communities</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              CrowdFund360 connects innovative community projects with passionate supporters. Transparent, verified, and
              impact-driven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {currentUser ? (
                <>
                  {currentUser.type === "creator" && (
                    <Button size="lg" onClick={() => onNavigate("creator-dashboard")} className="gap-2">
                      Go to Dashboard <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                  {currentUser.type === "donor" && (
                    <Button size="lg" onClick={() => onNavigate("projects")} className="gap-2">
                      Explore Projects <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                  {currentUser.type === "admin" && (
                    <Button size="lg" onClick={() => onNavigate("admin-dashboard")} className="gap-2">
                      Go to Admin Panel <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button size="lg" onClick={() => onNavigate("auth")} className="gap-2">
                    Explore Projects <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => onNavigate("auth")}>
                    Start a Project
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mt-16">
            {[
              { label: "Projects Funded", value: "1,284" },
              { label: "Community Members", value: "45.2K" },
              { label: "Total Raised", value: "$8.2M" },
              { label: "Success Rate", value: "94%" },
            ].map((stat, i) => (
              <Card key={i} className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose CrowdFund360?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Transparent",
                description: "Track fund usage, milestones, and project progress with real-time updates from creators.",
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Verified Projects",
                description:
                  "All projects go through identity verification and community endorsement for your confidence.",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Easy Donations",
                description: "Support causes with cards, bank transfers, mobile money, and digital wallets.",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Community Driven",
                description: "Connect with creators, ask questions, and be part of projects that matter to you.",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Clean Water Initiative",
                category: "Healthcare",
                image: "/water-project.jpg",
                target: 50000,
                raised: 38000,
              },
              {
                title: "Youth Tech Education",
                category: "Education",
                image: "/tech-education.jpg",
                target: 30000,
                raised: 28500,
              },
              {
                title: "Urban Garden Project",
                category: "Environment",
                image: "/garden-project.jpg",
                target: 15000,
                raised: 14200,
              },
            ].map((project, i) => (
              <Card
                key={i}
                className="overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => onNavigate("projects")}
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-primary uppercase mb-2">{project.category}</p>
                  <h3 className="font-bold mb-3">{project.title}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>${project.raised.toLocaleString()}</span>
                      <span className="text-muted-foreground">${project.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(project.raised / project.target) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => onNavigate("projects")} className="gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a community innovator with a big idea or a supporter looking to help, CrowdFund360 is your
            platform.
          </p>
          {currentUser ? (
            <Button size="lg" onClick={() => onNavigate("projects")} className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button size="lg" onClick={() => onNavigate("auth")} className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}
