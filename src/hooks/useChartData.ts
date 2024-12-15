import { useState, useEffect } from 'react';
import { ChartDataPoint } from '../types/chart';

export function useChartData(fetchData: () => Promise<ChartDataPoint[]>) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateData = async () => {
      setIsLoading(true);
      try {
        const newData = await fetchData();
        setData(newData);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    updateData();
    const interval = setInterval(updateData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, lastUpdate, isLoading };
}