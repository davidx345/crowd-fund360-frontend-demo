"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface DonationFlowProps {
  onComplete: () => void
  onCancel: () => void
}

type Step = "project" | "amount" | "payment" | "confirmation"

export default function DonationFlow({ onComplete, onCancel }: DonationFlowProps) {
  const [step, setStep] = useState<Step>("amount")
  const [donationAmount, setDonationAmount] = useState("100")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleNext = () => {
    if (step === "amount") setStep("payment")
    else if (step === "payment") setStep("confirmation")
    else if (step === "confirmation") onComplete()
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-muted/20">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            {["Amount", "Payment", "Confirmation"].map((label, i) => {
              const steps: Step[] = ["amount", "payment", "confirmation"]
              const current = steps.indexOf(step)
              const stepIndex = i
              const isActive = stepIndex <= current

              return (
                <div key={label} className="flex-1">
                  <div className={`h-2 rounded-full mb-2 ${isActive ? "bg-primary" : "bg-border"}`} />
                  <p className={`text-xs font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Card Content */}
        <Card className="p-8 mb-8">
          {step === "amount" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Choose Donation Amount</h2>
                <p className="text-muted-foreground">How much would you like to donate?</p>
              </div>

              <div className="space-y-3">
                {[50, 100, 250, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount.toString())}
                    className={`w-full p-4 rounded-lg border-2 font-semibold transition ${
                      donationAmount === amount.toString()
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Custom Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
                <p className="text-muted-foreground">Choose how you'd like to pay</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "card", label: "Credit/Debit Card", icon: "💳" },
                  { id: "bank", label: "Bank Transfer", icon: "🏦" },
                  { id: "mobile", label: "Mobile Money", icon: "📱" },
                  { id: "wallet", label: "Digital Wallet", icon: "👛" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-lg border-2 font-semibold transition flex items-center gap-3 ${
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    {method.label}
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === "confirmation" && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-4">Your donation has been received</p>

                <Card className="p-6 mb-6 bg-muted/30 border-0">
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Donation Amount</span>
                    <span className="font-bold text-lg text-primary">${donationAmount}</span>
                  </div>
                  <div className="flex justify-between mb-4 pb-4 border-b border-border">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-bold">
                      {paymentMethod === "card"
                        ? "Credit Card"
                        : paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confirmation #</span>
                    <span className="font-mono font-bold">CF360-2025-001</span>
                  </div>
                </Card>

                <p className="text-sm text-muted-foreground">
                  A receipt has been sent to your email. You can now track this project from your dashboard.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {step !== "confirmation" && (
            <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          )}
          <Button onClick={handleNext} className={step === "confirmation" ? "w-full" : "flex-1"}>
            {step === "confirmation" ? "Go to Dashboard" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  )
}
