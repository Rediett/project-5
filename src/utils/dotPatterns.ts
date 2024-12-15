interface Dot {
  x: number;
  y: number;
  scale: number;
  delay: number;
}

export function generateDots(count: number): Dot[] {
  const dots: Dot[] = [];
  
  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.8 + Math.random() * 0.4, // Random initial scale between 0.8 and 1.2
      delay: Math.random() * 2000 // Random delay between 0-2000ms
    });
  }
  
  return dots;
}