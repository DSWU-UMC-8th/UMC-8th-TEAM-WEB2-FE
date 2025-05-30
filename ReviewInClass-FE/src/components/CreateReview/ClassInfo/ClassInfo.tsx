import { useEffect, useState } from "react";
import palette from "../../../styles/theme"; 
import ic_pic from "../../../assets/icon-pic-select.svg"
import ic_search from "../../../assets/navbar/icon-navbar-search.svg"
import CustomInput from "./InputComponent";
import SearchButton from "./SearchBtn";
import ImageUploadBox from "./ImageUpload";
import SearchDropdown from "./SearchDropdown";
import SectionTitle from "./SectionTitle";
import FieldLabel from "./FieldLabel";
import TagBadge from "./TagBadge";
import type { Lecture, ReviewLectureInfo } from "../../../types/reviewCreate";
import { searchLectures, searchPlatforms } from "../../../apis/createReview";
import { useSearch } from "../../../hooks/useSearch";

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
    // 강의명 입력 임시 상태 (수동입력용)
    const [pendingLectureName, setPendingLectureName] = useState("");
    const [pendingInstructorName, setPendingInstructorName] = useState("");

    // 강의명 검색
    const {
        query,
        setQuery,
        isOpen,
        setIsOpen,
        searchResults,
        handleInputChange,
        handleSearchClick,
        handleSelect: handleLectureSelect,
    } = useSearch<Lecture>({
        searchFn: searchLectures,
        debounceTime: 500,
        type: 'lecture',
        onSelect: (lecture) => {
            setSelectedLecture(lecture);
            setQuery(""); // 강의명 입력값 초기화
            setManualLecture({
                name: lecture.name,
                instructorName: lecture.instructor,
                platformId: null,
                level: "BEGINNER",
                category: "IT",
            });
            setPlatformQuery(lecture.platform || "");
            setSelectedPlatform(lecture.platform ? { id: 0, name: lecture.platform } : null);
            setPendingInstructorName(""); // 강사명 수동입력값도 초기화
        },
    });

    // 플랫폼 검색
    const {
        query: platformQuery,
        setQuery: setPlatformQuery,
        isOpen: isPlatformOpen,
        setIsOpen: setIsPlatformOpen,
        searchResults: platformSearchResults,
        handleInputChange: handlePlatformInputChange,
        handleSearchClick: handlePlatformSearch,
        handleSelect: handlePlatformSelect,
    } = useSearch<{ id: number; name: string }>({
        searchFn: searchPlatforms,
        debounceTime: 300,
        type: 'platform',
        onSelect: (platform) => {
            setSelectedPlatform(platform);
            setPlatformQuery(platform.name);
            setManualLecture({
                ...manualLecture,
                platformId: platform.id,
            });
        },
    });

    // '원하는 강의가 없으신가요?' 클릭 시 수동입력 모드 진입 핸들러
    const handleManualInput = () => {
        setIsManualInput(true);
        setIsOpen(false);
        setManualLecture({ name: '', instructorName: '', platformId: null, level: 'BEGINNER', category: 'IT' });
        setPlatformQuery('');
        setSelectedPlatform(null);
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
    }, [setIsOpen, setIsPlatformOpen]);

    return (
        <div className="flex flex-col justify-center items-center py-8">
            <div className="w-full max-w-3xl rounded-2xl py-10">
                <h2 className="text-center text-2xl mb-[43px] font-sans text-[40px] font-semibold leading-normal not-italic tracking-[-0.54px]"
                    style={{ color: palette.gray.gray900 }}>
                    강의평 등록
                </h2>

                {/* 필수 항목 */}
                <section className="flex flex-col mb-10">
                    <SectionTitle title="필수 항목" isRequired />
                    
                    {/* 강의명 */}
                    <div className="flex flex-col mb-[48px] relative">
                        <FieldLabel label="강의명" />
                        <div className="flex flex-col gap-[21px]">
                            <div className="flex gap-[25px]">
                                {!isManualInput ? (
                                    <>
                                        <CustomInput
                                            className="rounded-[55px]"
                                            leftIcon={<img src={ic_search} alt="검색아이콘" className="w-full h-full object-contain"/>}
                                            placeholder="강의명 (강의 상세 페이지의 강의를 토대로 자동 입력)"
                                            value={selectedLecture && !isManualInput ? "" : query}
                                            onChange={handleInputChange}
                                            onFocus={() => query && setIsOpen(true)}
                                        />
                                        <SearchButton onClick={handleSearchClick} />
                                    </>
                                ) : (
                                    <div className="relative w-[880px] flex flex-col gap-[14px]">
                                        <CustomInput
                                            className="w-[880px] text-[17px] px-[24px] py-[15px] rounded-[16px] border"
                                            style={{ borderColor: palette.gray.gray300 }}
                                            placeholder="강의명을 입력해 주세요."
                                            value={pendingLectureName}
                                            onChange={e => {
                                                if (e.target.value.length <= 50) {
                                                    setPendingLectureName(e.target.value);
                                                }
                                            }}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && pendingLectureName.trim()) {
                                                    setManualLecture({ ...manualLecture, name: pendingLectureName });
                                                    setPendingLectureName("");
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="text-[17px] text-[#2B2B2B] underline cursor-pointer absolute right-0 bottom-0 top-18"
                                            onClick={() => setIsManualInput(false)}
                                        >
                                            다시 검색하기
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div id="search-dropdown">
                                <SearchDropdown
                                    results={searchResults}
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
                        <FieldLabel label="강사명" />
                        <div className="relative w-[880px]">
                          <CustomInput
                              className="w-full text-[17px] px-[24px] py-[15px] border rounded-[16px] pr-[60px]"
                              style={{ borderColor: palette.gray.gray300 }}
                              placeholder="강사명을 입력해 주세요. (강의명 검색 시 자동 입력됩니다.)"
                              value={isManualInput ? pendingInstructorName : ""}
                              maxLength={10}
                              onChange={isManualInput ? (e => {
                                  if (e.target.value.length <= 10) {
                                      setManualLecture({ ...manualLecture, instructorName: "" });
                                      setPendingInstructorName(e.target.value);
                                  }
                              }) : undefined}
                              onKeyDown={isManualInput ? (e => {
                                  if (e.key === 'Enter' && pendingInstructorName.trim()) {
                                      setManualLecture({ ...manualLecture, instructorName: pendingInstructorName });
                                      setPendingInstructorName("");
                                  }
                              }) : undefined}
                              readOnly={!isManualInput}
                          />
                          {/* 오른쪽 카운터 */}
                          {isManualInput && !manualLecture.instructorName && (
                            <span
                              style={{
                                position: 'absolute',
                                right: '24px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#6D6D6D',
                                fontSize: '15px',
                                fontFamily: 'inherit',
                                pointerEvents: 'none',
                              }}
                            >
                              {pendingInstructorName.length}/10
                            </span>
                          )}
                        </div>
                        {/* input 아래에 태그뱃지 */}
                        {isManualInput
                          ? manualLecture.instructorName && (
                              <div className="flex gap-[5px] items-center justify-start mt-[10px]">
                                <TagBadge
                                  label={manualLecture.instructorName}
                                  onClear={() => setManualLecture({ ...manualLecture, instructorName: "" })}
                                />
                              </div>
                            )
                          : selectedLecture?.instructor && (
                              <div className="flex gap-[5px] items-center justify-start mt-[10px]">
                                <TagBadge
                                  label={selectedLecture.instructor}
                                  onClear={handleClear}
                                />
                              </div>
                            )
                        }
                        <div className="flex justify-end items-center w-[880px] mt-[10px]">
                            <span className="text-[16px] text-[#B5B5B5] shrink-0">
                                (10자 이내)
                            </span>
                        </div>
                    </div>
                    
                    {/* 플랫폼 */}
                    <div className="flex flex-col">
                        <FieldLabel label="플랫폼" />
                        <div className="flex gap-[25px]">
                            <CustomInput
                                className="rounded-[55px]"
                                leftIcon={<img src={ic_search} alt="검색아이콘" className="w-full h-full object-contain"/>}
                                placeholder="플랫폼을 검색해 주세요. (강의명 검색 시 자동 선택됩니다.)"
                                value={selectedPlatform && !isManualInput ? "" : platformQuery}
                                onChange={handlePlatformInputChange}
                                onFocus={() => platformQuery && setIsPlatformOpen(true)}
                            />
                            <SearchButton onClick={handlePlatformSearch} />
                        </div>
                        <div id="platform-dropdown" className="relative">
                            {isPlatformOpen && platformSearchResults.length > 0 && (
                                <ul className="absolute gap-[15px] w-[760px] mt-[15px] bg-white shadow-2xl rounded-[20px] z-50 max-h-60 overflow-y-auto">
                                    {platformSearchResults.map((platform) => (
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
                    <SectionTitle title="선택 항목" isRequired/>
                    <FieldLabel label="강의 사진 등록하기" className="mb-[39px]" />
                    <ImageUploadBox 
                        defaultIcon={ic_pic} 
                        onImageUpload={setImageFile}
                        currentFile={imageFile}
                    />
                </section>
            </div>
        </div>
    );
};

export default ClassInfo;
