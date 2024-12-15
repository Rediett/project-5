export const calculateChartDimensions = (data: number[]) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  return {
    maxValue,
    minValue,
    range,
    normalizedValues: data.map(value => ((value - minValue) / range) * 100)
  };
};

export const formatChartLabel = (hour: number): string => {
  const formattedHour = hour < 0 ? 24 + hour : hour;
  return `${formattedHour}h`;
};