"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, Users, Clock, ArrowLeft } from "lucide-react"

interface DonorDashboardProps {
  onNavigate: (page: any) => void
}

export default function DonorDashboard({ onNavigate }: DonorDashboardProps) {
  const donations = [
    {
      id: 1,
      project: "Clean Water Initiative",
      amount: 500,
      date: "2025-01-15",
      status: "Active",
      raised: 38000,
      goal: 50000,
    },
    {
      id: 2,
      project: "Youth Tech Education",
      amount: 250,
      date: "2025-01-10",
      status: "Active",
      raised: 28500,
      goal: 30000,
    },
    {
      id: 3,
      project: "Urban Garden Project",
      amount: 100,
      date: "2024-12-20",
      status: "Completed",
      raised: 15000,
      goal: 15000,
    },
  ]

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
            <h1 className="text-4xl font-bold">My Donations</h1>
            <p className="text-muted-foreground">Track your donations and project updates</p>
          </div>
          <Button onClick={() => onNavigate("projects")} className="gap-2">
            <Heart className="w-4 h-4" />
            Donate to More Projects
          </Button>
        </div>

        {/* Impact Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Donated", value: "$850", icon: <Heart className="w-8 h-8 text-primary" /> },
            { label: "Projects Supported", value: "3", icon: <TrendingUp className="w-8 h-8 text-primary" /> },
            { label: "People Helped", value: "2.4K", icon: <Users className="w-8 h-8 text-primary" /> },
            { label: "Active Projects", value: "2", icon: <Clock className="w-8 h-8 text-primary" /> },
          ].map((stat, i) => (
            <Card key={i} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </Card>
          ))}
        </div>

        {/* Donations List */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-6">Your Donations</h3>
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold">{donation.project}</p>
                    <p className="text-sm text-muted-foreground">
                      Donated {donation.date} • ${donation.amount}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      donation.status === "Active" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                    }`}
                  >
                    {donation.status}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>${donation.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">${donation.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2" style={{ width: `${(donation.raised / donation.goal) * 100}%` }} />
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  View Project
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
