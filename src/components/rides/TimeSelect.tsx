import React from 'react';

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange }) => {
  // Generate time slots from 6:00 PM to 7:30 PM in 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date();
    start.setHours(18, 0, 0); // 6:00 PM
    const end = new Date();
    end.setHours(19, 30, 0); // 7:30 PM

    while (start <= end) {
      slots.push(start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
      start.setMinutes(start.getMinutes() + 15);
    }
    return slots;
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">Select pickup time</option>
      {generateTimeSlots().map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};