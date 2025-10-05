import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SVMCanvas } from "@/components/svm/SVMCanvas";
import { Brain, Settings, Target, GitBranch, Zap } from "lucide-react";

const Visualizer = () => {
  const [selectedKernel, setSelectedKernel] = useState("linear");

  const kernelOptions = [
    {
      key: "linear",
      title: "Linear Kernel",
      icon: Target,
      description:
        "Best for linearly separable data. Creates straight decision boundaries.",
      color: "text-blue-400",
      bgColor: "bg-blue-50/50",
      borderColor: "border-blue-200/50",
    },
    {
      key: "polynomial",
      title: "Polynomial Kernel",
      icon: GitBranch,
      description:
        "Handles curved boundaries. Good for moderately complex patterns.",
      color: "text-green-400",
      bgColor: "bg-green-50/50",
      borderColor: "border-green-200/50",
    },
    {
      key: "rbf",
      title: "RBF Kernel",
      icon: Zap,
      description:
        "Radial Basis Function. Excellent for complex, non-linear patterns.",
      color: "text-purple-400",
      bgColor: "bg-purple-50/50",
      borderColor: "border-purple-200/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-canvas py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-hero rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-glow">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            SVM Visualizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive Support Vector Machine visualization tool. Add data
            points and watch the algorithm work in real-time.
          </p>
        </div>

        {/* Kernel Selection */}
        <Card className="p-8 mb-8 bg-gradient-canvas animate-scale-in border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Kernel Selection
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {kernelOptions.map((kernel) => {
              const IconComponent = kernel.icon;
              const isSelected = selectedKernel === kernel.key;

              return (
                <div
                  key={kernel.key}
                  className={`relative group cursor-pointer rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? `${kernel.borderColor} bg-gradient-to-br from-background to-${kernel.bgColor} shadow-lg`
                      : "border-border/30 bg-background/50 hover:border-border/60"
                  }`}
                  onClick={() => setSelectedKernel(kernel.key)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${kernel.bgColor} ${kernel.borderColor} border`}
                        >
                          <IconComponent className={`w-5 h-5 ${kernel.color}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {kernel.title}
                        </h3>
                      </div>
                      {isSelected && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          Active
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {kernel.description}
                    </p>

                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2 text-xs text-primary font-medium">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          Currently Active
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Main Canvas */}
        <div className="animate-scale-in">
          <SVMCanvas kernel={selectedKernel} />
        </div>

        {/* Help Section */}
        <Card className="p-6 mt-8 bg-card/50 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            How to Use
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Adding Data Points:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Select Class A (red) or Class B (blue)</li>
                <li>• Click anywhere on the canvas to add points</li>
                <li>• Add points from both classes for best results</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">
                Understanding the Visualization:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Purple line: Decision boundary (hyperplane)</li>
                <li>• Dashed lines: Margin boundaries</li>
                <li>• Gold rings: Support vectors (key points)</li>
                <li>• Grid: Coordinate system for reference</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Visualizer;
