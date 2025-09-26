import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download } from "lucide-react";
import { toast } from "sonner";

export const SVMCanvas = ({ kernel }) => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [currentClass, setCurrentClass] = useState('A');
  const [hyperplane, setHyperplane] = useState(null);
  const [supportVectors, setSupportVectors] = useState([]);

  const CANVAS_SIZE = 400;
  const GRID_SIZE = 20;

  // Initialize canvas
  useEffect(() => {
    drawCanvas();
  }, [points, hyperplane, supportVectors]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_SIZE / 2);
    ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE / 2);
    ctx.stroke();
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(CANVAS_SIZE / 2, 0);
    ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE);
    ctx.stroke();

    // Draw hyperplane if exists
    if (hyperplane && points.length >= 2) {
      const { w, b } = hyperplane;
      if (w[0] !== 0 || w[1] !== 0) {
        ctx.strokeStyle = 'hsl(280, 60%, 50%)';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.beginPath();
        
        // Convert to canvas coordinates and draw line
        const x1 = 0;
        const y1 = (-b - w[0] * (x1 - CANVAS_SIZE/2)) / w[1] + CANVAS_SIZE/2;
        const x2 = CANVAS_SIZE;
        const y2 = (-b - w[0] * (x2 - CANVAS_SIZE/2)) / w[1] + CANVAS_SIZE/2;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Draw margins
        ctx.strokeStyle = 'hsl(280, 60%, 50%)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        const offset = 20; // Margin offset
        const norm = Math.sqrt(w[0] * w[0] + w[1] * w[1]);
        const marginOffset = offset / norm;
        
        // Upper margin
        const y1_upper = (-b - w[0] * (x1 - CANVAS_SIZE/2) + marginOffset) / w[1] + CANVAS_SIZE/2;
        const y2_upper = (-b - w[0] * (x2 - CANVAS_SIZE/2) + marginOffset) / w[1] + CANVAS_SIZE/2;
        ctx.beginPath();
        ctx.moveTo(x1, y1_upper);
        ctx.lineTo(x2, y2_upper);
        ctx.stroke();
        
        // Lower margin
        const y1_lower = (-b - w[0] * (x1 - CANVAS_SIZE/2) - marginOffset) / w[1] + CANVAS_SIZE/2;
        const y2_lower = (-b - w[0] * (x2 - CANVAS_SIZE/2) - marginOffset) / w[1] + CANVAS_SIZE/2;
        ctx.beginPath();
        ctx.moveTo(x1, y1_lower);
        ctx.lineTo(x2, y2_lower);
        ctx.stroke();
      }
    }

    // Draw points
    points.forEach(point => {
      const isSupportVector = supportVectors.some(sv => sv.id === point.id);
      
      ctx.fillStyle = point.class === 'A' ? 'hsl(350, 80%, 60%)' : 'hsl(210, 80%, 60%)';
      ctx.strokeStyle = isSupportVector ? 'hsl(45, 90%, 55%)' : 'white';
      ctx.lineWidth = isSupportVector ? 4 : 2;
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, isSupportVector ? 8 : 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    });

    ctx.setLineDash([]);
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newPoint = {
      x,
      y,
      class: currentClass,
      id: `${Date.now()}-${Math.random()}`
    };

    setPoints(prev => [...prev, newPoint]);
    toast.success(`Added Class ${currentClass} point`);
  };

  const calculateSVM = () => {
    if (points.length < 2) {
      toast.error("Need at least 2 points to calculate SVM");
      return;
    }

    const classAPoints = points.filter(p => p.class === 'A');
    const classBPoints = points.filter(p => p.class === 'B');

    if (classAPoints.length === 0 || classBPoints.length === 0) {
      toast.error("Need points from both classes");
      return;
    }

    // Simple linear SVM implementation for demo
    // Convert canvas coordinates to normalized coordinates
    const normalizedPoints = points.map(p => ({
      ...p,
      x: (p.x - CANVAS_SIZE/2) / (CANVAS_SIZE/4),
      y: -(p.y - CANVAS_SIZE/2) / (CANVAS_SIZE/4), // Flip Y for mathematical coordinates
    }));

    // Calculate centroids
    const centroidA = {
      x: classAPoints.reduce((sum, p) => sum + (p.x - CANVAS_SIZE/2), 0) / classAPoints.length / (CANVAS_SIZE/4),
      y: -classAPoints.reduce((sum, p) => sum + (p.y - CANVAS_SIZE/2), 0) / classAPoints.length / (CANVAS_SIZE/4)
    };

    const centroidB = {
      x: classBPoints.reduce((sum, p) => sum + (p.x - CANVAS_SIZE/2), 0) / classBPoints.length / (CANVAS_SIZE/4),
      y: -classBPoints.reduce((sum, p) => sum + (p.y - CANVAS_SIZE/2), 0) / classBPoints.length / (CANVAS_SIZE/4)
    };

    // Simple hyperplane between centroids
    const w = [centroidB.x - centroidA.x, centroidB.y - centroidA.y];
    const midpoint = [(centroidA.x + centroidB.x) / 2, (centroidA.y + centroidB.y) / 2];
    const b = -(w[0] * midpoint[0] + w[1] * midpoint[1]);

    setHyperplane({ w, b });

    // Find support vectors (closest points to hyperplane)
    const distances = normalizedPoints.map(p => ({
      point: points.find(orig => orig.id === p.id),
      distance: Math.abs(w[0] * p.x + w[1] * p.y + b) / Math.sqrt(w[0] * w[0] + w[1] * w[1])
    }));

    const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
    const newSupportVectors = sortedDistances.slice(0, Math.min(4, sortedDistances.length)).map(d => d.point);
    
    setSupportVectors(newSupportVectors);
    toast.success("SVM calculated successfully!");
  };

  const clearCanvas = () => {
    setPoints([]);
    setHyperplane(null);
    setSupportVectors([]);
    toast.success("Canvas cleared");
  };

  const exportData = () => {
    const data = {
      points,
      hyperplane,
      supportVectors,
      kernel,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `svm-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Data exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="p-6 bg-gradient-canvas">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Current Class:</span>
            <Button
              variant={currentClass === 'A' ? "default" : "outline"}
              onClick={() => setCurrentClass('A')}
              className="h-8"
            >
              <div className="w-3 h-3 bg-class-a rounded-full mr-2" />
              Class A
            </Button>
            <Button
              variant={currentClass === 'B' ? "default" : "outline"}
              onClick={() => setCurrentClass('B')}
              className="h-8"
            >
              <div className="w-3 h-3 bg-class-b rounded-full mr-2" />
              Class B
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={calculateSVM} variant="secondary">
              Calculate SVM
            </Button>
            <Button onClick={clearCanvas} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Canvas */}
      <Card className="p-6 bg-gradient-canvas">
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onClick={handleCanvasClick}
            className="border border-border rounded-lg cursor-crosshair shadow-canvas bg-card"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Click on the canvas to add data points. Current kernel: <Badge variant="secondary">{kernel}</Badge>
        </p>
      </Card>

      {/* Statistics */}
      {points.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-class-a">{points.filter(p => p.class === 'A').length}</div>
              <div className="text-sm text-muted-foreground">Class A Points</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-class-b">{points.filter(p => p.class === 'B').length}</div>
              <div className="text-sm text-muted-foreground">Class B Points</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-support-vector">{supportVectors.length}</div>
              <div className="text-sm text-muted-foreground">Support Vectors</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{hyperplane ? "Yes" : "No"}</div>
              <div className="text-sm text-muted-foreground">Hyperplane</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};