import React from "react";
import type { StudyPeriod } from "../../../enums/StudyPeriod";
import { studyPeriodOptions } from "../../../constants/periodOptions";

interface DurationCheckboxGroupProps {
    value?: StudyPeriod;
    onChange: (value: StudyPeriod) => void;
}

const DurationCheckboxGroup: React.FC<DurationCheckboxGroupProps> = ({ value, onChange }) => {

    return (
        <div className="bg-white w-[850px] rounded-[16px] border border-[#B5B5B5] px-[16px] py-[20px] flex flex-col gap-[14px]">
            {studyPeriodOptions.map(option => (
                <label key={option.value} className="flex items-center gap-[16px] px-[16px] cursor-pointer text-[17px] text-[#2B2B2B]">
                    <input
                        type="radio"
                        className="hidden"
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                    />
                    <span
                        className={`
                            block size-[20px] rounded-[4px] border border-[#B5B5B5]
                            ${value === option.value ? "bg-[#6FA235]" : ""}
                            transition-colors
                        `}
                    />
                    <p className="text-[18px] font-normal color-[#2B2B2B]">{option.label}</p>
                </label>
            ))}
        </div>
    );
};

export default DurationCheckboxGroup;
