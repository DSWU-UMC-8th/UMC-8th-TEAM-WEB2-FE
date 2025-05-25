import React from 'react';

type Lecture = {
    title: string;
    instructor: string;
    platform: string;
};

type SearchDropdownProps = {
    results: Lecture[];
    onSelect: (value: Lecture) => void;
    isOpen: boolean;
    query: string;
};

const SearchDropdown: React.FC<SearchDropdownProps> = ({
    results,
    onSelect,
    isOpen,
    query,
}) => {
    if (!isOpen || results.length === 0) return null;

    return (
        <section className="absolute w-[760px] mt-[15px] bg-white shadow-2xl rounded-[20px] 
            z-50 py-[26px] pr-[10px]
        "
        >
            <div className='custom-scrollbar overflow-y-auto max-h-[500px]'>
                <ul className="pl-[35px] pr-[15px] w-full">
                    {results.map((result, idx) => (
                        <li key={idx}>
                            <button
                                className={`flex flex-col w-full px-[5px] py-[14px] text-left hover:bg-gray-100 focus:bg-gray-100 outline-none
                                    ${result.title.includes(query) ? 'font-medium' : ''}
                                `}
                                style={{
                                    borderBottom: idx === results.length - 1 ? 'none' : '1px solid #B5B5B5',
                                }}
                                onClick={() => onSelect(result)}
                                type="button"
                            >
                                <span className="text-[17px] text-[#2B2B2B] mb-[13px]">{result.title}</span>

                                <span className="inline-flex items-center text-[14px] text-[#6D6D6D] bg-[#CAE3A5]
                                    rounded-[8px] px-[8px] py-[4px] gap-[7px]
                                    whitespace-nowrap self-start
                                ">
                                    <span>{result.instructor}</span>
                                    <span>|</span>
                                    <span>{result.platform}</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>

                <span className="flex items-center text-[17px] text-[#2B2B2B] underline
                    justify-end mt-[5px] mr-[30px]
                ">
                    선택지에 원하는 강의가 없나요?
                </span>
            </div>
        </section>
    );
};

export default SearchDropdown;