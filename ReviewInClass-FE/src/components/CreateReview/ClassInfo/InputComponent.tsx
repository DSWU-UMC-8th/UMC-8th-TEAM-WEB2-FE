import React, { useRef, type InputHTMLAttributes } from "react";
import palette from "../../../styles/theme";

const CustomInput = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", style, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.boxShadow = "0px 0px 4px 0px #6FA235";
      if (props.onFocus) props.onFocus(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.boxShadow = "none";
      if (props.onBlur) props.onBlur(e);
    };

    return (
      <input
        ref={ref || inputRef}
        className={`
          w-full flex-1 text-[17px]
          px-[33px] focus:outline-none focus:ring-2 focus:border-[#6FA235]
          transition-shadow
          ${className}
        `}
        style={{
          color: palette.gray.gray900,
          backgroundColor: palette.white,
          ...style,
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
