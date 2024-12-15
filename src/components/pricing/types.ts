import { PricingTier } from '../../types/event';

export interface PricingDisplayProps {
  currentTier?: PricingTier;
  onRSVP: () => void;
}