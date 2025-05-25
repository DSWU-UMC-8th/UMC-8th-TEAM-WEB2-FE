import { useState } from "react";
import palette from "../../../styles/theme"; 
import ic_pic from "../../../assets/icon-pic-select.svg"
import logo from "../../../assets/icon-logo.svg"
import ic_search from "../../../assets/navbar/icon-navbar-search.svg"
import ic_x from "../../../assets/x-icon.svg";
import CustomInput from "./InputComponent";
import SearchButton from "./SearchBtn";
import ImageUploadBox from "./ImageUpload";
import SearchDropdown from "./SearchDropdown";


const LECTURE_RESULTS = [
  {
    title: "협업 툴 완전 정복! Notion, Figma 사용법 초급 강의",
    instructor: "홍길동",
    platform: "인프런",
  },
  {
    title: "협업 시 사용할 툴의 꿀팁 강의",
    instructor: "김철수",
    platform: "패스트캠퍼스",
  },
    {
    title: "협업 시 사용할 툴의 꿀팁 강의",
    instructor: "김철수",
    platform: "패스트캠퍼스",
  },
    {
    title: "협업 시 사용할 툴의 꿀팁 강의",
    instructor: "김철수",
    platform: "패스트캠퍼스",
  },
    {
    title: "협업 시 사용할 툴의 꿀팁 강의",
    instructor: "김철수",
    platform: "패스트캠퍼스",
  },
    {
    title: "협업 시 사용할 툴의 꿀팁 강의",
    instructor: "김철수",
    platform: "패스트캠퍼스",
  },
    {
    title: "협업 시 사용할 툴의 꿀팁 강의",
    instructor: "김철수",
    platform: "패스트캠퍼스",
  },
];

const ClassInfo = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLecture, setSelectedLecture] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsOpen(e.target.value.length > 0);
    };

    const handleClear = () => setSelectedLecture(null);

    return (
        <div className="flex flex-col justify-center items-center py-8">
            <div className="w-full max-w-3xl rounded-2xl py-10">
                {/* 강의평 등록 타이틀 */}
                <h2
                    className="text-center text-2xl mb-[43px] font-sans text-[40px] font-semibold leading-normal not-italic tracking-[-0.54px]"
                    style={{ color: palette.gray.gray900 }}
                >
                    강의평 등록
                </h2>

                {/* 필수 항목 */}
                <section className="flex flex-col mb-10">
                    <div className="flex items-center gap-2 text-center mb-[36px]"
                        style={{ color: palette.gray.gray900 }}>
                        <span className="size-[35px]">
                            <img src={logo} alt="로고" className="w-full h-full object-contain"/>
                        </span>
                        <p className="font-Inter text-[27px] font-semibold leading-normal 
                            not-italic tracking-[-0.54px]">
                            필수 항목
                        </p>
                    </div>
                    
                    {/* 강의명 */}
                    <div className="flex flex-col mb-[48px]">
                        <p className="mb-2 font-medium text-[25px]" style={{ color: palette.gray.gray900 }}>
                            강의명
                        </p>
                        <div className="flrx flex-col gap-[21px]">
                            <div className="flex gap-[25px]">
                                <CustomInput
                                    className="rounded-[55px]"
                                    leftIcon={<img src={ic_search} alt="검색아이콘" className="w-full h-full object-contain"/>}
                                    placeholder="강의명 (강의 상세 페이지의 강의를 토대로 자동 입력)"
                                    value={query}
                                    onChange={handleInputChange}
                                    onFocus={() => query && setIsOpen(true)}
                                />
                                <SearchButton onClick={handleClear} />
                            </div>
                            <SearchDropdown
                                results={LECTURE_RESULTS}
                                onSelect={lecture => console.log(lecture)}
                                isOpen={isOpen}
                                query={query}
                            />
                        </div>

                        {selectedLecture && (
                            <div className="flex gap-[15px] mt-[19px] w-full">
                                <div className="flex gap-[5px] items-center justify-center">
                                    <span
                                        className="flex items-center rounded-full px-3 py-1 text-[15.3px] font-bold"
                                        style={{
                                            backgroundColor: palette.primary.primaryDark,
                                            color: palette.white,
                                        }}
                                    >
                                    {selectedLecture}
                                        <span className="size-[20px] flex items-center justify-center ml-1">
                                            <img src={ic_x} alt="x" className="w-full h-full object-contain"/>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 강사명 */}
                    <div className="mb-[48px]">
                        <p className="mb-2 font-medium text-[25px]" style={{ color: palette.gray.gray900 }}>
                            강사명
                        </p>
                        <CustomInput
                            className="text-[17px] px-[24px] py-[15px] rounded-[16px] border"
                            style={{ borderColor: palette.gray.gray300 }}
                            placeholder="강사명을 입력해 주세요. (강의명 검색 시 자동 입력됩니다.)"
                        />
                        <div className="flex justify-around">
                            <div className="flex gap-[15px] mt-[19px] w-full">
                                <div className="flex gap-[5px] items-center justify-center">
                                    <span
                                        className="flex items-center rounded-full px-3 py-1 text-[15.3px] font-bold"
                                        style={{
                                            backgroundColor: palette.primary.primaryDark,
                                            color: palette.white,
                                        }}
                                    >
                                        홍길동
                                        <span className="size-[20px] flex items-center justify-center ml-1">
                                            <img src={ic_x} alt="x" className="w-full h-full object-contain"/>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            
                            <span className="text-right text-[15px] mt-[19px] shrink-0" style={{ color: palette.gray.gray700 }}>
                                (10자 이내)
                            </span>
                        </div>
                    </div>
                    
                    {/* 플랫폼 */}
                    <div className="flex flex-col">
                        <p className="mb-2 font-medium text-[25px]" style={{ color: palette.gray.gray900 }}>
                            플랫폼
                        </p>
                        <div className="flex gap-[25px]">
                            <CustomInput
                                className="rounded-[55px]"
                                leftIcon={<img src={ic_search} alt="검색아이콘" className="w-full h-full object-contain"/>}
                                placeholder="플랫폼을 검색해 주세요. (강의명 검색 시 자동 선택됩니다.)"
                            />
                            <SearchButton />
                        </div>

                        {/* 태그 리스트 */}
                        <div className="flex gap-[15px] mt-[19px] w-full">
                            <div className="flex gap-[5px] items-center justify-center">
                                <span
                                    className="flex items-center rounded-full px-3 py-1 text-[15.3px] font-bold"
                                    style={{
                                        backgroundColor: palette.primary.primaryDark,
                                        color: palette.white,
                                    }}
                                >
                                뮤소스
                                    <span className="size-[20px] flex items-center justify-center ml-1">
                                        <img src={ic_x} alt="x" className="w-full h-full object-contain"/>
                                    </span>
                                </span>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 선택 항목 */}
                <section className="flex flex-col mt-[82px]">
                    <div className="flex items-center gap-2 text-center mb-[32px] font-sans text-[27px] font-semibold leading-normal not-italic tracking-[-0.54px]"
                        style={{ color: palette.gray.gray900 }}>
                        <span className="size-[35px]">
                            <img src={logo} alt="로고" className="w-full h-full object-contain" />
                        </span>
                        선택 항목
                    </div>

                    {/* 강의 사진 등록 */}
                    <p className="font-medium text-[25px] mb-[39px]" style={{ color: palette.gray.gray900 }}>
                        강의 사진 등록하기
                    </p>
                    <ImageUploadBox defaultIcon={ic_pic} />
                </section>
            </div>
        </div>
    );
};

export default ClassInfo;
