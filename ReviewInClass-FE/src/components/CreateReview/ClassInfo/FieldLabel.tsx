import React from 'react';
import palette from '../../../styles/theme';

interface FieldLabelProps {
  label: string;
  className?: string;
}

const FieldLabel = ({ label, className = '' }: FieldLabelProps) => {
  return (
    <p className={`mb-2 font-medium text-[25px] ${className}`} 
      style={{ color: palette.gray.gray900 }}>
      {label}
    </p>
  );
};

export default FieldLabel; 