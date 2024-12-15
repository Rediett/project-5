interface Dot {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  color: string;
}

export function generateDotPattern(count: number): Dot[] {
  const dots: Dot[] = [];
  const colors = ['#E2E8F0', '#CBD5E1'];

  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 4, // 4-8px
      opacity: Math.random() * 0.2 + 0.6, // 0.6-0.8
      delay: Math.random() * 2000, // 0-2000ms delay
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  return dots;
}