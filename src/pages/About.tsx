import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Zap, Target, BookOpen, Users } from "lucide-react";

const About = () => {
  const technologies = [
    "React", "TypeScript", "Tailwind CSS", "Canvas API", "Vite"
  ];

  const features = [
    {
      icon: Target,
      title: "Interactive Data Input",
      description: "Click-based point placement system with real-time visual feedback and class selection."
    },
    {
      icon: Brain,
      title: "Real-time SVM Calculation",
      description: "Immediate hyperplane computation with margin visualization and support vector identification."
    },
    {
      icon: Zap,
      title: "Multiple Kernel Support",
      description: "Linear, Polynomial, and RBF kernels for different data separation scenarios."
    },
    {
      icon: Code,
      title: "Mathematical Precision",
      description: "Accurate SVM implementation with proper coordinate transformations and calculations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-canvas py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-hero rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-glow">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">About SVM Visualizer</h1>
          <p className="text-lg text-muted-foreground">
            An educational tool for understanding Support Vector Machines through interactive visualization
          </p>
        </div>

        {/* Use Case */}
        <Card className="p-8 mb-8 bg-gradient-canvas animate-scale-in">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">About the Use Case</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Support Vector Machines (SVMs) are powerful machine learning algorithms used for classification and regression tasks. 
              However, understanding how SVMs work can be challenging due to their mathematical complexity.
            </p>
            <p>
              This interactive visualizer bridges the gap between theory and practice by allowing users to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Visually understand how hyperplanes separate different classes of data</li>
              <li>Explore the concept of support vectors and their importance</li>
              <li>Experience how different kernels handle linear and non-linear data</li>
              <li>See real-time updates as datasets change</li>
            </ul>
            <p>
              Perfect for students, educators, and professionals learning machine learning concepts.
            </p>
          </div>
        </Card>

        {/* Technology Used */}
        <Card className="p-8 mb-8 bg-gradient-canvas animate-scale-in">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Technology Stack</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Built with modern web technologies for optimal performance and user experience:
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  React with TypeScript for type safety, Tailwind CSS for responsive design, 
                  and Canvas API for interactive graphics.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Algorithms</h3>
                <p className="text-sm text-muted-foreground">
                  Custom SVM implementation with linear kernel support and plans for 
                  polynomial and RBF kernel extensions.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Differences from Existing Work */}
        <Card className="p-8 mb-8 bg-gradient-canvas animate-scale-in">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">What Makes This Different</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Unlike static educational materials or complex research tools, this visualizer offers:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">User-Centric Design</h3>
                <ul className="text-sm space-y-1">
                  <li>• Intuitive click-to-add interface</li>
                  <li>• Real-time visual feedback</li>
                  <li>• Clean, distraction-free UI</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Educational Focus</h3>
                <ul className="text-sm space-y-1">
                  <li>• Step-by-step concept introduction</li>
                  <li>• Clear visual distinctions</li>
                  <li>• Immediate result feedback</li>
                  <li>• Export functionality for learning</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Functionalities Implemented */}
        <Card className="p-8 bg-gradient-canvas animate-scale-in">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Implemented Features</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-semibold text-foreground mb-4">Current Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">Kernel Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">∞</div>
                <div className="text-sm text-muted-foreground">Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">JSON</div>
                <div className="text-sm text-muted-foreground">Export Format</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;