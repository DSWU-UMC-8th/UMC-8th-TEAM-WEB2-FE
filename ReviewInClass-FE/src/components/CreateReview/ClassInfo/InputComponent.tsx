import React, { useRef, type InputHTMLAttributes } from "react";
import palette from "../../../styles/theme";
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode; 
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className = "", style, leftIcon, ...props }, ref) => {
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
      <div className="relative w-full">
        {leftIcon && (
          <span className="absolute left-[33px] top-1/2 -translate-y-1/2 size-[26px] flex items-center text-gray-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref || inputRef}
          className={`
            w-full flex-1 text-[17px]
            ${leftIcon ? "px-[70px]" : "px-[16px]"}
            py-[15px] focus:outline-none focus:ring-2 focus:border-[#6FA235]
            transition-shadow
            rounded-[55px]
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
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
