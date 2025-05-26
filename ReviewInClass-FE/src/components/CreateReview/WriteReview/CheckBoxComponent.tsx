import React from "react";

interface DurationCheckboxGroupProps {
    values: string[];
    onChange: (values: string[]) => void;
}

const options = [
    "일주일 이내",
    "1달 이내",
    "3달 이내",
    "6달 이내",
    "1년 이내",
    "수강 미완료"
];

const DurationCheckboxGroup: React.FC<DurationCheckboxGroupProps> = ({ values, onChange }) => {
    const handleCheck = (option: string, checked: boolean) => {
        if (checked) {
            onChange([...values, option]);
        } else {
            onChange(values.filter(v => v !== option));
        }
    };

    return (
        <div className="bg-white w-[850px] rounded-[16px] border border-[#B5B5B5] px-[16px] py-[20px] flex flex-col gap-[14px]">
            {options.map(option => (
                <label key={option} className="flex items-center gap-[16px] px-[16px] cursor-pointer text-[17px] text-[#2B2B2B]">
                    <input
                        type="checkbox"
                        className="hidden peer"
                        checked={values.includes(option)}
                        onChange={e => handleCheck(option, e.target.checked)}
                    />
                    {/* 커스텀 체크박스 */}
                    <span
                        className={`
                            block size-[20px] rounded-[4px] border border-[#B5B5B5]
                            peer-checked:bg-[#6FA235]
                            transition-colors
                        `}
                    />
                    <p className="text-[18px] font-normal color-[#2B2B2B]">{option}</p>
                </label>
            ))}
        </div>
    );
};

export default DurationCheckboxGroup;
