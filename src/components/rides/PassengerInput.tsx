import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface PassengerInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

export const PassengerInput: React.FC<PassengerInputProps> = ({
  value,
  onChange,
  isValid
}) => {
  return (
    <div className="flex-1 relative">
      <input
        type="email"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Passenger email address"
        className={`w-full pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          value ? (isValid ? 'border-green-300' : 'border-red-300') : 'border-gray-300'
        }`}
      />
      {value && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isValid ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
      )}
    </div>
  );
};