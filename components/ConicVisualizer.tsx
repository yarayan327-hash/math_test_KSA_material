import React, { useState, useEffect, useRef } from 'react';
import { SectionType } from '../types';

interface ConicVisualizerProps {
  section: SectionType;
}

const ConicVisualizer: React.FC<ConicVisualizerProps> = ({ section }) => {
  // Parameters
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [p, setP] = useState(2);
  const [r, setR] = useState(3);
  
  // Canvas settings
  const width = 400;
  const height = 400;
  const scale = 40; // pixels per unit
  const origin = { x: width / 2, y: height / 2 };

  // Convert math coord to svg coord
  const toSVG = (x: number, y: number) => ({
    x: origin.x + x * scale,
    y: origin.y - y * scale
  });

  const renderGrid = () => {
    const lines = [];
    for (let i = -10; i <= 10; i++) {
      const p1 = toSVG(i, -10);
      const p2 = toSVG(i, 10);
      const p3 = toSVG(-10, i);
      const p4 = toSVG(10, i);
      lines.push(
        <React.Fragment key={i}>
          <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#1e293b" strokeWidth="1" />
          <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#1e293b" strokeWidth="1" />
        </React.Fragment>
      );
    }
    return (
      <g>
        {lines}
        {/* Axes */}
        <line x1={0} y1={origin.y} x2={width} y2={origin.y} stroke="#475569" strokeWidth="2" />
        <line x1={origin.x} y1={0} x2={origin.x} y2={height} stroke="#475569" strokeWidth="2" />
      </g>
    );
  };

  const renderCurve = () => {
    let pathData = "";
    let focusPoints: { x: number, y: number }[] = [];
    let color = "#ffffff";

    if (section === SectionType.CIRCLE) {
      color = "#00f3ff"; // neon-blue
      const cx = origin.x;
      const cy = origin.y;
      const rPx = r * scale;
      // Circle SVG command
      pathData = `M ${cx - rPx}, ${cy} A ${rPx},${rPx} 0 1,0 ${cx + rPx},${cy} A ${rPx},${rPx} 0 1,0 ${cx - rPx},${cy}`;
      focusPoints = [{x: 0, y: 0}];
    } 
    else if (section === SectionType.ELLIPSE) {
      color = "#00ff9d"; // neon-green
      // Generate points for ellipse
      const points = [];
      for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
        const x = a * Math.cos(t);
        const y = b * Math.sin(t);
        points.push(toSVG(x, y));
      }
      pathData = `M ${points[0].x} ${points[0].y} ` + points.map(p => `L ${p.x} ${p.y}`).join(" ") + " Z";
      
      const c = Math.sqrt(Math.abs(a*a - b*b));
      if (a >= b) {
        focusPoints = [{x: -c, y: 0}, {x: c, y: 0}];
      } else {
        focusPoints = [{x: 0, y: -c}, {x: 0, y: c}];
      }
    } 
    else if (section === SectionType.HYPERBOLA) {
      color = "#ff00ff"; // neon-pink
      // Left branch
      const leftPoints = [];
      const rightPoints = [];
      // Draw from -80 degrees to +80 degrees to avoid asymptotes
      const limit = 1.3; 
      for (let t = -limit; t <= limit; t += 0.1) {
        const sec = 1 / Math.cos(t);
        const tan = Math.tan(t);
        
        // Right branch
        const xR = a * sec;
        const yR = b * tan;
        rightPoints.push(toSVG(xR, yR));

        // Left branch
        const xL = -a * sec;
        const yL = b * tan; // tan(-t) = -tan(t), but symmetry is handled
        leftPoints.push(toSVG(xL, -yR)); // Logic check: standard hyperbola symm
      }
      
      pathData = `M ${rightPoints[0].x} ${rightPoints[0].y} ` + rightPoints.map(p => `L ${p.x} ${p.y}`).join(" ");
      pathData += ` M ${leftPoints[0].x} ${leftPoints[0].y} ` + leftPoints.map(p => `L ${p.x} ${p.y}`).join(" ");
      
      const c = Math.sqrt(a*a + b*b);
      focusPoints = [{x: -c, y: 0}, {x: c, y: 0}];
    }
    else if (section === SectionType.PARABOLA) {
      color = "#ffcc00"; // neon-yellow
      const points = [];
      // y^2 = 2px => x = y^2 / 2p
      for (let y = -8; y <= 8; y += 0.2) {
        const x = (y * y) / (2 * p);
        if (Math.abs(x) < 6) { // visual limit
             points.push(toSVG(x, y));
        }
      }
      if (points.length > 0) {
           pathData = `M ${points[0].x} ${points[0].y} ` + points.map(p => `L ${p.x} ${p.y}`).join(" ");
      }
      focusPoints = [{x: p/2, y: 0}];
    }
    else if (section === SectionType.ADVANCED) {
       // Just draw a mix for visual flair
       return (
           <g>
               <text x={origin.x} y={origin.y - 50} textAnchor="middle" fill="#a855f7" className="text-sm">离心率 e 决定形状</text>
               <circle cx={origin.x} cy={origin.y} r={3} fill="#a855f7" />
           </g>
       )
    }

    return (
      <g>
        <path d={pathData} stroke={color} strokeWidth="3" fill="none" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        {focusPoints.map((fp, i) => {
            const sp = toSVG(fp.x, fp.y);
            return (
                <g key={i}>
                    <circle cx={sp.x} cy={sp.y} r="4" fill="#ef4444" />
                    <text x={sp.x} y={sp.y + 15} fill="#ef4444" fontSize="10" textAnchor="middle">F{i+1}</text>
                </g>
            )
        })}
      </g>
    );
  };

  if (section === SectionType.HOME) return null;

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700 shadow-xl flex flex-col items-center">
      <h3 className="text-gray-300 mb-2 font-mono text-sm uppercase tracking-wider">Visual Lab</h3>
      <svg width={width} height={height} className="bg-slate-900 rounded-lg shadow-inner border border-slate-800">
        {renderGrid()}
        {renderCurve()}
      </svg>
      
      {/* Controls */}
      <div className="w-full mt-4 grid grid-cols-1 gap-3">
        {section === SectionType.CIRCLE && (
           <div className="flex items-center gap-2 text-neon-blue">
             <span className="w-8 font-mono">r: {r}</span>
             <input type="range" min="1" max="5" step="0.1" value={r} onChange={(e) => setR(parseFloat(e.target.value))} className="w-full accent-cyan-400" />
           </div>
        )}
        {(section === SectionType.ELLIPSE || section === SectionType.HYPERBOLA) && (
            <>
                <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-8 font-mono text-neon-green">a: {a}</span>
                    <input type="range" min="1.5" max="5" step="0.1" value={a} onChange={(e) => setA(parseFloat(e.target.value))} className="w-full accent-green-400" />
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-8 font-mono text-neon-pink">b: {b}</span>
                    <input type="range" min="1.5" max="5" step="0.1" value={b} onChange={(e) => setB(parseFloat(e.target.value))} className="w-full accent-pink-400" />
                </div>
            </>
        )}
        {section === SectionType.PARABOLA && (
             <div className="flex items-center gap-2 text-neon-yellow">
             <span className="w-8 font-mono">p: {p}</span>
             <input type="range" min="0.5" max="4" step="0.1" value={p} onChange={(e) => setP(parseFloat(e.target.value))} className="w-full accent-yellow-400" />
           </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-slate-400 font-mono">
          {section === SectionType.ELLIPSE && `e = ${Math.sqrt(Math.abs(a*a - b*b)/ (a > b ? a*a : b*b)).toFixed(2)}`}
          {section === SectionType.HYPERBOLA && `e = ${Math.sqrt((a*a + b*b)/(a*a)).toFixed(2)}`}
      </div>
    </div>
  );
};

export default ConicVisualizer;