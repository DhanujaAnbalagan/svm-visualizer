import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Zap, Target } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-canvas">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="w-20 h-20 bg-gradient-hero rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-glow">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Interactive
            <span className="bg-gradient-hero bg-clip-text text-transparent"> SVM </span>
            Visualizer
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore Support Vector Machines through interactive visualization. 
            Add data points, select kernels, and watch hyperplanes form in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-base shadow-scientific">
              <Link to="/visualizer">
                <Activity className="w-5 h-5 mr-2" />
                Start Visualizing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Powerful Features for SVM Learning
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-scientific transition-all duration-300 animate-scale-in bg-gradient-canvas border-border/50">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Interactive Data Input</h3>
              <p className="text-muted-foreground leading-relaxed">
                Click to add Class A and Class B points directly on the canvas. 
                Watch as your dataset grows and shapes the SVM decision boundary.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-scientific transition-all duration-300 animate-scale-in bg-gradient-canvas border-border/50">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Real-time Visualization</h3>
              <p className="text-muted-foreground leading-relaxed">
                See hyperplanes, margins, and support vectors update instantly. 
                Animated transitions make complex concepts easy to understand.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-scientific transition-all duration-300 animate-scale-in bg-gradient-canvas border-border/50">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Multiple Kernels</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experiment with Linear, Polynomial, and RBF kernels. 
                Perfect for understanding non-linear data separation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="container mx-auto px-6 py-16 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Quick Start Guide</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-semibold">
                1
              </div>
              <h3 className="font-semibold text-foreground">Select Class</h3>
              <p className="text-sm text-muted-foreground">Choose between Class A or Class B</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-semibold">
                2
              </div>
              <h3 className="font-semibold text-foreground">Add Points</h3>
              <p className="text-sm text-muted-foreground">Click on canvas to place data points</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-semibold">
                3
              </div>
              <h3 className="font-semibold text-foreground">Calculate SVM</h3>
              <p className="text-sm text-muted-foreground">Click to generate the hyperplane</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-semibold">
                4
              </div>
              <h3 className="font-semibold text-foreground">Explore</h3>
              <p className="text-sm text-muted-foreground">Try different kernels and datasets</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;