import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  velocity: number;
}

export const CyberConfetti = ({ active }: { active: boolean }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const newParticles: Particle[] = Array.from({ length: 40 }).map((_, i) => ({
        id: Date.now() + i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? '#22D3EE' : '#0EA5E9',
        angle: Math.random() * Math.PI * 2,
        velocity: Math.random() * 15 + 10,
      }));
      setParticles(newParticles);
      const timer = setTimeout(() => setParticles([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[300]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: p.x, 
              y: p.y, 
              opacity: 1, 
              scale: 1 
            }}
            animate={{ 
              x: p.x + Math.cos(p.angle) * p.velocity * 40,
              y: p.y + Math.sin(p.angle) * p.velocity * 40 + 200, // 增加重力感
              opacity: 0,
              scale: 0,
              rotate: 360
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            style={{ 
              width: p.size, 
              height: p.size, 
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
