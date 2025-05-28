import type { Lecture } from "../../../types/reviewCreate";

interface SearchDropdownProps {
    results: Lecture[];
    onSelect: (lecture: Lecture) => void;
    isOpen: boolean;
    onManualInput: () => void;
}

const SearchDropdown = ({ results = [], onSelect, isOpen, onManualInput }: SearchDropdownProps) => {
    if (!isOpen) return null;

    return (
        <div className="absolute w-[760px] mt-[15px] bg-white shadow-2xl rounded-[20px] z-50 py-[26px] pr-[10px]">
            <div className="custom-scrollbar overflow-y-auto max-h-[450px] pl-[35px] pr-[20px]">
                <ul className="w-full">
                    {Array.isArray(results) && results.map((lecture) => (
                        <li
                            key={lecture.id}
                            className="py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => onSelect(lecture)}
                        >
                            <div className="font-medium mb-[13px]">{lecture.name}</div>
                            <span className="inline-flex items-center text-[14px] text-[#6D6D6D] bg-[#CAE3A5]
                                    rounded-[8px] px-[8px] py-[4px] gap-[7px]
                                    whitespace-nowrap self-start
                                ">
                                    <span>{lecture.instructor}</span>
                                    <span>|</span>
                                    <span>{lecture.platform}</span>
                                </span>
                                <div className="w-full bg-[#B5B5B5] mt-[13px] h-[0.5px]"/>
                        </li>
                    ))}
                    <li className="px-4 py-2 flex justify-end">
                        <button
                            onClick={onManualInput}
                            className="text-[17px] text-[#2B2B2B] underline mt-[5px]">
                            선택지에 원하는 강의가 없나요?
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SearchDropdown;