"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface FootMeasurements {
  length: string // A - Foot length
  width: string // B - Foot width
  ballCircumference: string // C - Ball circumference
  instepCircumference: string // D - Instep circumference
  ankleCircumference: string // E - Ankle circumference
  lowerCalfCircumference: string // F - Lower calf circumference
  upperCalfCircumference: string // G - Upper calf circumference
}

interface FootMeasurementGuideProps {
  onMeasurementsSubmit?: (measurements: FootMeasurements) => void
  onSizeSelect?: (size: number) => void
}

export function FootMeasurementGuide({
  onMeasurementsSubmit,
  onSizeSelect,
}: FootMeasurementGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showAdvancedMeasurements, setShowAdvancedMeasurements] = useState(false)
  const [measurements, setMeasurements] = useState<FootMeasurements>({
    length: "",
    width: "",
    ballCircumference: "",
    instepCircumference: "",
    ankleCircumference: "",
    lowerCalfCircumference: "",
    upperCalfCircumference: "",
  })

  const handleInputChange = (field: keyof FootMeasurements, value: string) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Calculate recommended size based on foot length (simplified)
    // Standard conversion: US size ≈ (foot length in cm * 1.5) + 1.5
    const lengthCm = parseFloat(measurements.length)
    if (lengthCm > 0) {
      const recommendedSize = Math.round(lengthCm * 1.5 + 1.5)
      // Round to nearest 0.5
      const roundedSize = Math.round(recommendedSize * 2) / 2
      
      if (onSizeSelect) {
        onSizeSelect(roundedSize)
      }
    }

    if (onMeasurementsSubmit) {
      onMeasurementsSubmit(measurements)
    }

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          Customize
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Foot Measurement Guide</DialogTitle>
          <DialogDescription>
            Measure your foot following the guide below to get the perfect custom fit.
            All measurements should be in centimeters (cm).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Visual Guide Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Measure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Top View Measurements - Required */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Top View Measurements (Required)</h3>
                <div className="relative bg-muted rounded-lg p-4 border-2 border-dashed border-muted-foreground/30">
                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">A:</span>
                      <span>Foot Length - Measure from heel to longest toe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">B:</span>
                      <span>Foot Width - Measure at the widest part</span>
                    </div>
                  </div>
                  {/* Use provided diagram image */}
                  <div className="relative w-full h-56 rounded border-2 border-border overflow-hidden bg-background">
                    <Image
                      src="/Mesure1.png"
                      alt="Foot measurement top view showing length (A) and width (B)"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Measurements Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enter Your Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">
                    A - Foot Length (cm) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 26.5"
                    value={measurements.length}
                    onChange={(e) => handleInputChange("length", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">
                    B - Foot Width (cm) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 10.0"
                    value={measurements.width}
                    onChange={(e) => handleInputChange("width", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Optional Advanced Measurements Card */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowAdvancedMeasurements(!showAdvancedMeasurements)}
                  className="w-full border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 hover:border-primary/70 rounded-lg p-4 transition-all duration-200 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {showAdvancedMeasurements ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        Additional Measurements <span className="text-primary">(Optional)</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        For more precise custom fit
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {showAdvancedMeasurements ? "Hide" : "Show"}
                  </div>
                </button>

                {showAdvancedMeasurements && (
                  <Card className="mt-4 border-dashed">
                    <CardHeader>
                      <CardTitle className="text-base">Side Profile Measurements</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        These measurements are optional and help us create a more precise custom fit.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="relative w-full h-56 rounded border-2 border-border overflow-hidden bg-background">
                          <Image
                            src="/Mesure2.png"
                            alt="Foot and leg measurement side view showing A, C, D, E, F, G"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ballCircumference">
                            C - Ball Circumference (cm) <span className="text-xs text-muted-foreground">(Optional)</span>
                          </Label>
                          <Input
                            id="ballCircumference"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 24.0"
                            value={measurements.ballCircumference}
                            onChange={(e) => handleInputChange("ballCircumference", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instepCircumference">
                            D - Instep Circumference (cm) <span className="text-xs text-muted-foreground">(Optional)</span>
                          </Label>
                          <Input
                            id="instepCircumference"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 25.0"
                            value={measurements.instepCircumference}
                            onChange={(e) => handleInputChange("instepCircumference", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ankleCircumference">
                            E - Ankle Circumference (cm) <span className="text-xs text-muted-foreground">(Optional)</span>
                          </Label>
                          <Input
                            id="ankleCircumference"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 22.0"
                            value={measurements.ankleCircumference}
                            onChange={(e) => handleInputChange("ankleCircumference", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lowerCalfCircumference">
                            F - Lower Calf Circumference (cm) <span className="text-xs text-muted-foreground">(Optional)</span>
                          </Label>
                          <Input
                            id="lowerCalfCircumference"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 32.0"
                            value={measurements.lowerCalfCircumference}
                            onChange={(e) => handleInputChange("lowerCalfCircumference", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="upperCalfCircumference">
                            G - Upper Calf Circumference (cm) <span className="text-xs text-muted-foreground">(Optional)</span>
                          </Label>
                          <Input
                            id="upperCalfCircumference"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 38.0"
                            value={measurements.upperCalfCircumference}
                            onChange={(e) => handleInputChange("upperCalfCircumference", e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!measurements.length || !measurements.width}
                >
                  Calculate Size & Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

