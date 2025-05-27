import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import palette from "../../../styles/theme"; 
import ic_pic from "../../../assets/icon-pic-select.svg"
import logo from "../../../assets/icon-logo.svg"
import ic_search from "../../../assets/navbar/icon-navbar-search.svg"
import CustomInput from "./InputComponent";
import SearchButton from "./SearchBtn";
import ImageUploadBox from "./ImageUpload";
import SearchDropdown from "./SearchDropdown";
import type { Lecture, ReviewLectureInfo } from "../../../types/reviewCreate";
import { searchLectures, searchPlatforms } from "../../../apis/createReview";
import TagBadge from "./TagBadge";

interface ClassInfoProps {
  selectedLecture: Lecture | null;
  setSelectedLecture: (lecture: Lecture | null) => void;
  isManualInput: boolean;
  setIsManualInput: (v: boolean) => void;
  manualLecture: ReviewLectureInfo;
  setManualLecture: (v: ReviewLectureInfo) => void;
  selectedPlatform: { id: number; name: string } | null;
  setSelectedPlatform: (v: { id: number; name: string } | null) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
}

const ClassInfo = ({
  selectedLecture,
  setSelectedLecture,
  isManualInput,
  setIsManualInput,
  manualLecture,
  setManualLecture,
  selectedPlatform,
  setSelectedPlatform,
  imageFile,
  setImageFile,
}: ClassInfoProps) => {
    // 강의명 검색 쿼리
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // 플랫폼 검색 쿼리
    const [platformQuery, setPlatformQuery] = useState('');
    const [isPlatformOpen, setIsPlatformOpen] = useState(false);
    const platformTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 강의명 검색 API
    const { data: searchResults, refetch: searchLecturesQuery } = useQuery({
        queryKey: ['lectures', query],
        queryFn: async () => {
            if (!query) return { result: [] };
            try {
                const data = await searchLectures(query);
                return { result: Array.isArray(data.result) ? data.result : [] };
            } catch {
                return { result: [] };
            }
        },
        enabled: false,
    });

    // 플랫폼 검색 API
    const { data: platformSearchResults, refetch: refetchPlatformSearch } = useQuery({
        queryKey: ['platforms', platformQuery],
        queryFn: async () => {
            if (!platformQuery) return { result: [] };
            try {
                const data = await searchPlatforms(platformQuery);
                return { result: Array.isArray(data.result) ? data.result : [] };
            } catch {
                return { result: [] };
            }
        },
        enabled: false,
    });

    // 강의명 검색 input 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        if (value.length > 0) {
            searchTimeoutRef.current = setTimeout(() => {
                searchLecturesQuery();
                setIsOpen(true);
            }, 500);
        } else {
            setIsOpen(false);
        }
    };

    // 강의명 검색 버튼 클릭 핸들러
    const handleSearchClick = () => {
        if (query.length > 0) {
            searchLecturesQuery();
            setIsOpen(true);
        }
    };

    // 강의 선택 시 자동완성 핸들러
    const handleLectureSelect = (lecture: Lecture) => {
        setSelectedLecture(lecture);
        setQuery(lecture.name);
        setIsOpen(false);
        setManualLecture({
            name: lecture.name,
            instructorName: lecture.instructor,
            platformId: null,
            level: "BEGINNER",
            category: "IT",
        });
        setPlatformQuery(lecture.platform || "");
        setSelectedPlatform(lecture.platform ? { id: 0, name: lecture.platform } : null);
    };

    // '원하는 강의가 없으신가요?' 클릭 시 수동입력 모드 진입 핸들러
    const handleManualInput = () => {
        setIsManualInput(true);
        setIsOpen(false);
        setManualLecture({ name: '', instructorName: '', platformId: null, level: 'BEGINNER', category: 'IT' });
        setPlatformQuery('');
        setSelectedPlatform(null);
    };

    // 플랫폼 검색 input 변경 핸들러
    const handlePlatformInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPlatformQuery(value);
        if (platformTimeoutRef.current) clearTimeout(platformTimeoutRef.current);
        if (value.length > 0) {
            platformTimeoutRef.current = setTimeout(() => {
                refetchPlatformSearch();
                setIsPlatformOpen(true);
            }, 300);
        } else {
            setIsPlatformOpen(false);
            setSelectedPlatform(null);
        }
    };

    // 플랫폼 검색 버튼 클릭 핸들러
    const handlePlatformSearch = () => {
        if (platformQuery.length > 0) {
            refetchPlatformSearch();
            setIsPlatformOpen(true);
        }
    };

    // 플랫폼 선택 핸들러
    const handlePlatformSelect = (platform: { id: number; name: string }) => {
        setSelectedPlatform(platform);
        setPlatformQuery(platform.name);
        setManualLecture({
            ...manualLecture,
            platformId: platform.id,
        });
        setIsPlatformOpen(false);
    };

    // 플랫폼 클리어 핸들러
    const handlePlatformClear = () => {
        setSelectedPlatform(null);
        setPlatformQuery('');
        setManualLecture({
            ...manualLecture,
            platformId: null,
        });
        setIsPlatformOpen(false);
    };

    // 이미지 업로드 핸들러
    const handleImageUpload = (file: File | null) => {
        setImageFile(file);
    };

    // 강의 선택 해제 및 입력값 초기화 핸들러
    const handleClear = () => {
        setSelectedLecture(null);
        setQuery('');
        setIsOpen(false);
        setIsManualInput(false);
        setManualLecture({ name: '', instructorName: '', platformId: null, level: 'BEGINNER', category: 'IT' });
        setPlatformQuery('');
        setSelectedPlatform(null);
    };

    // 드롭다운 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById('search-dropdown');
            const platformDropdown = document.getElementById('platform-dropdown');
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setIsOpen(false);
            }
            if (platformDropdown && !platformDropdown.contains(event.target as Node)) {
                setIsPlatformOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                        <div className="flex flex-col gap-[21px]">
                            <div className="flex gap-[25px]">
                                {!isManualInput ? (
                                    <>
                                        <CustomInput
                                            className="rounded-[55px]"
                                            leftIcon={<img src={ic_search} alt="검색아이콘" className="w-full h-full object-contain"/>}
                                            placeholder="강의명 (강의 상세 페이지의 강의를 토대로 자동 입력)"
                                            value={query}
                                            onChange={handleInputChange}
                                            onFocus={() => query && setIsOpen(true)}
                                        />
                                        <SearchButton onClick={handleSearchClick} />
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-2 w-full">
                                        <CustomInput
                                            className="w-[880px] text-[17px] px-[24px] py-[15px] rounded-[16px] border"
                                            style={{ borderColor: palette.gray.gray300 }}
                                            placeholder="강의명을 입력해 주세요."
                                            value={manualLecture.name}
                                            onChange={e => setManualLecture({ ...manualLecture, name: e.target.value })}
                                        />
                                        <CustomInput
                                            className="w-[880px] text-[17px] px-[24px] py-[15px] rounded-[16px] border"
                                            style={{ borderColor: palette.gray.gray300 }}
                                            placeholder="강사명을 입력해 주세요."
                                            value={manualLecture.instructorName}
                                            onChange={e => setManualLecture({ ...manualLecture, instructorName: e.target.value })}
                                        />
                                    </div>
                                )}
                            </div>
                            <div id="search-dropdown">
                                <SearchDropdown
                                    results={searchResults?.result || []}
                                    onSelect={handleLectureSelect}
                                    isOpen={isOpen}
                                    onManualInput={handleManualInput}
                                />
                            </div>
                        </div>
                        {selectedLecture && !isManualInput && (
                            <div className="flex gap-[15px] w-full">
                                <div className="flex gap-[5px] items-center justify-center">
                                    <TagBadge label={selectedLecture.name} onClear={handleClear} />
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
                            className="w-[880px] text-[17px] px-[24px] py-[15px] rounded-[16px] border"
                            style={{ borderColor: palette.gray.gray300 }}
                            placeholder="강사명을 입력해 주세요. (강의명 검색 시 자동 입력됩니다.)"
                            value={isManualInput ? manualLecture.instructorName : (selectedLecture?.instructor || '')}
                            onChange={isManualInput ? (e => setManualLecture({ ...manualLecture, instructorName: e.target.value })) : undefined}
                            readOnly={!isManualInput}
                        />
                        <div className="flex items-center w-[880px]">
                            {(selectedLecture?.instructor && !isManualInput) && (
                                <div className="flex gap-[15px] mt-[19px] w-full">
                                    <div className="flex gap-[5px] items-center justify-center">
                                        <TagBadge label={selectedLecture.instructor} onClear={handleClear} />
                                    </div>
                                </div>
                            )}
                            <div className="flex-1" />
                            <span className="text-[15px] shrink-0" style={{ color: palette.gray.gray700 }}>
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
                                value={platformQuery}
                                onChange={handlePlatformInputChange}
                                onFocus={() => platformQuery && setIsPlatformOpen(true)}
                            />
                            <SearchButton onClick={handlePlatformSearch} />
                        </div>
                        <div id="platform-dropdown" className="relative">
                            {isPlatformOpen && platformSearchResults?.result && platformSearchResults.result.length > 0 && (
                                <ul className="absolute gap-[15px] w-[760px] mt-[15px] bg-white shadow-2xl rounded-[20px] z-50 max-h-60 overflow-y-auto">
                                    {platformSearchResults.result.map((platform: { id: number; name: string }) => (
                                        <li
                                            key={platform.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handlePlatformSelect(platform)}
                                        >
                                            {platform.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {/* 선택된 플랫폼 뱃지 */}
                        {selectedPlatform && (
                            <div className="flex gap-[15px] mt-[19px] w-full">
                                <div className="flex gap-[5px] items-center justify-center">
                                    <TagBadge label={selectedPlatform.name} onClear={handlePlatformClear} />
                                </div>
                            </div>
                        )}
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
                    <ImageUploadBox 
                        defaultIcon={ic_pic} 
                        onImageUpload={handleImageUpload}
                        currentFile={imageFile}
                    />
                </section>
            </div>
        </div>
    );
};

export default ClassInfo;
