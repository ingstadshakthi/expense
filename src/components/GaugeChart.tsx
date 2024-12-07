import React from 'react';

type Size = 'sm' | 'md' | 'regular' | 'lg';

interface Props {
  gaugeBgColor?: string;
  filled: number;
  size?: Size;
  children: React.ReactNode;
}

export const GaugeChart = ({ size = 'regular', filled, children }: Props) => {
  const gaugeStyle: Record<string, Record<string, string>> = {
    regular: {
      '--size': '250px',
    },
    lg: {
      '--size': '350px',
    },
    md: {
      '--size': '150px',
    },
    sm: {
      '--size': '100px',
    },
  };

  return (
    <div className='gauge' style={gaugeStyle[size]}>
      <div className='gauge__body'>
        <div
          className='gauge__fill'
          style={{ transform: `rotate(${filled / 200}turn)` }}
        ></div>
        <div className='gauge__cover'>{children}</div>
      </div>
    </div>
  );
};
