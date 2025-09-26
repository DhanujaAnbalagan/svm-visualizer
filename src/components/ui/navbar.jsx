import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { Activity, Home, Info } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SVM Visualizer</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              asChild
              className="gap-2"
            >
              <Link to="/">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </Button>
            
            <Button
              variant={isActive("/visualizer") ? "default" : "ghost"}
              asChild
              className="gap-2"
            >
              <Link to="/visualizer">
                <Activity className="w-4 h-4" />
                Visualizer
              </Link>
            </Button>
            
            <Button
              variant={isActive("/about") ? "default" : "ghost"}
              asChild
              className="gap-2"
            >
              <Link to="/about">
                <Info className="w-4 h-4" />
                About
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};