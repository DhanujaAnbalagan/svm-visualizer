import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download } from "lucide-react";                        
import { toast } from "sonner";

export const SVMCanvas = ({ kernel }) => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [currentClass, setCurrentClass] = useState("A");
  const [supportVectors, setSupportVectors] = useState([]);
  const [hyperplane, setHyperplane] = useState(null);

  const CANVAS_SIZE = 400;
  const GRID_SIZE = 20;

  useEffect(() => {
    drawCanvas();
  }, [points, hyperplane, supportVectors, kernel]);

  // ----------------- Add Point -----------------
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
      id: `${Date.now()}-${Math.random()}`,
    };

    setPoints((prev) => [...prev, newPoint]);
    toast.success(`Added Class ${currentClass} point`);
  };

  // ----------------- Linear SVM -----------------
  const computeLinearSVM = () => {
    const classA = points.filter((p) => p.class === "A");
    const classB = points.filter((p) => p.class === "B");

    if (!classA.length || !classB.length) return null;

    const norm = (p) => [(p.x - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4), -(p.y - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4)];

    const centroid = (cls) => {
      const acc = cls.reduce((sum, p) => {
        const [x, y] = norm(p);
        sum.x += x;
        sum.y += y;
        return sum;
      }, { x: 0, y: 0 });
      acc.x /= cls.length;
      acc.y /= cls.length;
      return acc;
    };

    const centroidA = centroid(classA);
    const centroidB = centroid(classB);

    const w = [centroidB.x - centroidA.x, centroidB.y - centroidA.y];
    const midpoint = [(centroidA.x + centroidB.x) / 2, (centroidA.y + centroidB.y) / 2];
    const b = -(w[0] * midpoint[0] + w[1] * midpoint[1]);

    // Closest points as support vectors
    const distance = (p) => {
      const [x, y] = norm(p);
      return Math.abs(w[0] * x + w[1] * y + b) / Math.sqrt(w[0] * w[0] + w[1] * w[1]);
    };
    const sv = [...points].sort((a, b) => distance(a) - distance(b)).slice(0, Math.min(4, points.length));
    setSupportVectors(sv);

    return { w, b };
  };

  // ----------------- Polynomial & RBF Decision Regions -----------------
  const drawDecisionRegions = (ctx) => {
    const step = 2; // smaller step → smoother gradient
    for (let i = 0; i < CANVAS_SIZE; i += step) {
      for (let j = 0; j < CANVAS_SIZE; j += step) {
        const x = (i - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4);
        const y = -(j - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4);

        let score = 0;

        if (kernel === "polynomial") {
          const degree = 3;
          points.forEach((p) => {
            const px = (p.x - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4);
            const py = -(p.y - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4);
            const label = p.class === "A" ? 1 : -1;
            score += label * (x * px + y * py + 1) ** degree;
          });
        } else if (kernel === "rbf") {
          const sigma = 0.5;
          points.forEach((p) => {
            const px = (p.x - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4);
            const py = -(p.y - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4);
            const label = p.class === "A" ? 1 : -1;
            const r2 = (x - px) ** 2 + (y - py) ** 2;
            score += label * Math.exp(-r2 / (2 * sigma ** 2));
          });
        }

        // Dull polynomial like RBF
        const alpha = Math.min(0.15, Math.abs(score) / (points.length || 1));
        ctx.fillStyle = score > 0 ? `rgba(255,100,100,${alpha})` : `rgba(100,150,255,${alpha})`;
        ctx.fillRect(i, j, step, step);
      }
    }
  };

  // ----------------- Draw Canvas -----------------
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid
    ctx.strokeStyle = "#e5e7eb";
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

    // Axes
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_SIZE / 2);
    ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(CANVAS_SIZE / 2, 0);
    ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE);
    ctx.stroke();

    // Polynomial / RBF decision regions
    if ((kernel === "polynomial" || kernel === "rbf") && points.length > 0) {
      drawDecisionRegions(ctx);
      setSupportVectors(points.slice(0, Math.min(4, points.length)));
    }

    // Linear hyperplane
    if (kernel === "linear" && points.length > 1) {
      const hp = computeLinearSVM();
      setHyperplane(hp);
      if (hp) {
        const { w, b } = hp;
        ctx.strokeStyle = "hsl(280,60%,50%)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        const x1 = 0;
        const y1 = (-b - w[0] * (x1 - CANVAS_SIZE / 2)) / w[1] + CANVAS_SIZE / 2;
        const x2 = CANVAS_SIZE;
        const y2 = (-b - w[0] * (x2 - CANVAS_SIZE / 2)) / w[1] + CANVAS_SIZE / 2;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    // Draw points
    points.forEach((p) => {
      const isSV = supportVectors.some((sv) => sv.id === p.id);
      ctx.fillStyle = p.class === "A" ? "hsl(350,80%,60%)" : "hsl(210,80%,60%)";
      ctx.strokeStyle = isSV ? "hsl(45,90%,55%)" : "white";
      ctx.lineWidth = isSV ? 4 : 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, isSV ? 8 : 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    });

    ctx.setLineDash([]);
  };

  // ----------------- Calculate -----------------
  const calculateSVM = () => {
    if (points.length < 2) {
      toast.error("Add at least 2 points");
      return;
    }
    if (kernel === "linear") {
      const hp = computeLinearSVM();
      if (!hp) {
        toast.error("Need points from both classes");
        return;
      }
    } else {
      setSupportVectors(points.slice(0, Math.min(4, points.length)));
    }
    toast.success(`SVM calculated (${kernel} kernel)`);
  };

  // ----------------- Clear -----------------
  const clearCanvas = () => {
    setPoints([]);
    setSupportVectors([]);
    setHyperplane(null);
    toast.success("Canvas cleared");
  };

  // ----------------- Export -----------------
  const exportData = () => {
    const data = { points, supportVectors, hyperplane, kernel, timestamp: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `svm-${kernel}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Data exported");
  };

  // ----------------- Render -----------------
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-canvas">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Current Class:</span>
            <Button variant={currentClass === "A" ? "default" : "outline"} onClick={() => setCurrentClass("A")}>Class A</Button>
            <Button variant={currentClass === "B" ? "default" : "outline"} onClick={() => setCurrentClass("B")}>Class B</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={calculateSVM} variant="secondary">Calculate SVM</Button>
            <Button onClick={clearCanvas} variant="outline" size="sm"><Trash2 className="w-4 h-4 mr-2" />Clear</Button>
            <Button onClick={exportData} variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Export</Button>
          </div>
        </div>
      </Card>

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
          Click to add points. Kernel: <Badge variant="secondary">{kernel}</Badge>
        </p>
      </Card>
    </div>
  );
};
