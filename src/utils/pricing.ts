export const calculateTierPrice = (currentAttendees: number): number => {
  const tier = Math.floor(currentAttendees / 100);
  return 1 + (tier * 3);
};

export const calculateRideCost = (passengers: number): number => {
  return 10 + (Math.max(0, passengers - 1));
};