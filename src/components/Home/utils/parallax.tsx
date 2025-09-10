"use client"
import React, { useEffect, useRef, useState } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Crear estrellas
    const createStars = () => {
      const starArray = [];
      for (let i = 0; i < 200; i++) {
        starArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * 0.02 + 0.005
        });
      }
      setStars(starArray);
    };
    
    // Crear meteoros
    const createMeteors = () => {
      const meteorArray = [];
      for (let i = 0; i < 3; i++) {
        meteorArray.push({
          x: -50,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 2,
          size: Math.random() * 3 + 1,
          trail: [],
          opacity: Math.random() * 0.8 + 0.2,
          resetTime: Math.random() * 5000 + 3000
        });
      }
      setMeteors(meteorArray);
    };
    
    createStars();
    createMeteors();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Crear gradiente de fondo espacial
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animar estrellas
      stars.forEach(star => {
        star.opacity += Math.sin(Date.now() * star.twinkle) * 0.01;
        star.y += star.speed;
        
        if (star.y > canvas.height) {
          star.y = -5;
          star.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, star.opacity))})`;
        ctx.fill();
        
        // Efecto de brillo en estrellas grandes
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(0.1, star.opacity * 0.3))})`;
          ctx.fill();
        }
      });
      
      // Animar meteoros
      meteors.forEach(meteor => {
        meteor.x += meteor.speed;
        meteor.y += meteor.speed * 0.5;
        
        // Agregar posición actual al trail
        meteor.trail.push({ x: meteor.x, y: meteor.y });
        if (meteor.trail.length > 20) {
          meteor.trail.shift();
        }
        
        // Dibujar trail del meteoro
        meteor.trail.forEach((point, index) => {
          const opacity = (index / meteor.trail.length) * meteor.opacity;
          ctx.beginPath();
          ctx.arc(point.x, point.y, meteor.size * (index / meteor.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 95, 191, ${opacity})`;
          ctx.fill();
        });
        
        // Resetear meteoro cuando sale de la pantalla
        if (meteor.x > canvas.width + 50) {
          meteor.x = -50;
          meteor.y = Math.random() * canvas.height;
          meteor.trail = [];
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stars, planets, meteors, mousePosition]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Overlay sutil para mejor legibilidad del contenido */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20"></div>
      
      {/* Partículas flotantes adicionales con CSS */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-400/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Elementos decorativos con movimiento parallax */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"
          style={{
            left: '10%',
            top: '20%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 blur-3xl"
          style={{
            right: '10%',
            bottom: '20%',
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
          }}
        />
      </div>
    </div>
  );
};

export default SpaceBackground;