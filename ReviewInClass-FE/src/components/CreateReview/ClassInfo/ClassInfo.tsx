import palette from "../../../styles/theme"; 
import ic_pic from "../../../assets/icon-pic-select.svg"
import logo from "../../../assets/icon-logo.svg"
import CustomInput from "./InputComponent";
import SearchButton from "./SearchBtn";

const ClassInfo = () => {
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
                        <div className="flex gap-[25px]">
                            <CustomInput
                                className="rounded-[55px]"
                                placeholder="강의명 (강의 상세 페이지의 강의를 토대로 자동 입력)"
                            />
                            <SearchButton />
                        </div>
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
                        <div className="text-right text-[15px] mt-1" style={{ color: palette.gray.gray700 }}>
                            (10자 이내)
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
                                placeholder="플랫폼을 검색해 주세요. (강의명 검색 시 자동 선택됩니다.)"
                            />
                            <SearchButton />
                        </div>

                        {/* 태그 리스트 */}
                        <div className="flex gap-[15px] mt-[19px]">
                            <span
                                className="rounded-full px-3 py-1 text-[15.3px] font-medium"
                                style={{
                                    backgroundColor: palette.primary.primaryDark,
                                    color: palette.white,
                                }}
                            >
                                뮤소스
                            </span>
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
                    <div
                        className="border-dashed border-2 rounded-xl flex flex-col items-center justify-center h-36 w-36 transition-colors cursor-pointer"
                        style={{
                            borderColor: palette.primary.primary,
                        }}
                    >
                        <span className="text-3xl mb-2" style={{ color: palette.primary.primaryDark }}>
                            <img src={ic_pic} alt="검색" className="w-full h-full object-contain" />
                        </span>
                        <span className="text-sm" style={{ color: palette.gray.gray500 }}>
                            사진 추가
                        </span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClassInfo;
