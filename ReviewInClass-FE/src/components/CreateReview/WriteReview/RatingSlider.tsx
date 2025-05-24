import React from "react";
import palette from "../../../styles/theme";
import "./SilderStyle.css";

interface GradeBarProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
}

const RatingSlider: React.FC<GradeBarProps> = ({
    value,
    min = 0,
    max = 5,
    onChange,
}) => {
    const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-[324px]">
            <div className="flex items-center justify-between mb-2">
                <span className="mb-2 font-medium text-[25px]" 
                    style={{ color: palette.gray.gray900 }}>
                    별점
                </span>
                <span className="font-medium text-[17px]" 
                    style={{ color: palette.gray.gray700 }}>
                    {value}/5
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={1}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="w-full custom-slider"
                style={{
                    background: `linear-gradient(to right, #c3df92 0%, #c3df92 ${percent}%, #B5B5B5 ${percent}%, #B5B5B5 100%)`
                }}
            />
    </div>
    )
};

export default RatingSlider;
