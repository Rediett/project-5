export interface ChartDataPoint {
  time: Date;
  value: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
  height?: number;
  className?: string;
}