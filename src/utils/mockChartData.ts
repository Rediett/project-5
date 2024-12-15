import { ChartDataPoint } from '../types/chart';

export const generateMockRegistrationData = (hours: number = 24): ChartDataPoint[] => {
  const now = new Date();
  return Array.from({ length: hours }, (_, i) => {
    const time = new Date(now.getTime() - (hours - 1 - i) * 60 * 60 * 1000);
    return {
      time,
      value: Math.floor(Math.random() * 20) + 1 // Random value between 1-20
    };
  });
};