import Navbar from "../components/common/Navbar";
import ClassInfo from "../components/CreateReview/ClassInfo/ClassInfo";
import WriteReview from "../components/CreateReview/WriteReview/WriteReview";
import ReviewModal from "../components/CreateReview/ReviewModal";
import { useState } from "react";
import { postReview } from "../apis/createReview";
import type { StudyPeriod } from "../enums/StudyPeriod";
import type { Lecture, ReviewLectureInfo, ReviewRequest } from "../types/reviewCreate";


const CreateReview = () => {
  // ClassInfo
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualLecture, setManualLecture] = useState<ReviewLectureInfo>({
    name: "",
    instructorName: "",
    platformId: null,
    level: "BEGINNER",
    category: "IT"
  });
  const [selectedPlatform, setSelectedPlatform] = useState<{ id: number; name: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // WriteReview
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [studyPeriod, setStudyPeriod] = useState<StudyPeriod>("WITHIN_A_WEEK");

  // 모달 상태
  const [modal, setModal] = useState<null | 'success' | 'error' | 'cancel'>(null);

  // 등록 버튼 클릭
  const handleSubmit = async () => {
    const body: ReviewRequest = isManualInput
      ? {
          lectureId: null,
          lecture: manualLecture,
          platformIds: [null],
          rating,
          content,
          studyPeriod,
        }
      : {
          lectureId: selectedLecture?.id ?? null,
          lecture: {
            name: selectedLecture?.name ?? "",
            instructorName: selectedLecture?.instructor ?? "",
            platformId: selectedPlatform?.id ?? null,
            level: "BEGINNER",
            category: "IT"
          },
          platformIds: selectedPlatform ? [selectedPlatform.id] : [null],
          rating,
          content,
          studyPeriod,
        };

    try {
      const response = await postReview(body, imageFile ?? undefined);
      console.log('리뷰 등록 성공:', response);
      setModal('success');
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      setModal('error');
    }
  };

  // 취소 버튼 클릭
  const handleCancel = () => {
    setModal('cancel');
  };

  // 모달 확인/취소 핸들러
  const handleModalConfirm = () => {
    if (modal === 'success') {
      window.location.replace("/");
    } else {
      setModal(null);
    }
  };
  const handleModalCancel = () => {
    setModal(null);
  };

  return (
    <div>
      <Navbar />
      <ClassInfo
        selectedLecture={selectedLecture}
        setSelectedLecture={setSelectedLecture}
        isManualInput={isManualInput}
        setIsManualInput={setIsManualInput}
        manualLecture={manualLecture}
        setManualLecture={setManualLecture}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
      <div className="w-full h-[2px] mt-[43px] mb-[56px] border border-[#D9D9D9]"/>
      <WriteReview
        rating={rating}
        setRating={setRating}
        content={content}
        setContent={setContent}
        studyPeriod={studyPeriod}
        setStudyPeriod={setStudyPeriod}
      />
      <div className="flex gap-[16px] justify-center items-center mb-[55.2px]">
        <button className="create-review-button bg-[#B5B5B5] hover:bg-[#6D6D6D]" onClick={handleCancel}>
          취소
        </button>
        <button className="create-review-button bg-[#A5D06D] hover:bg-[#B4D780]" 
        onClick={handleSubmit}
        >
          등록
        </button>
      </div>
      {modal === 'success' && (
        <ReviewModal
          title="등록 성공"
          content="강의평 등록에 성공했습니다!"
          confirmText="확인"
          onClickConfirm={handleModalConfirm}
        />
      )}
      {modal === 'error' && (
        <ReviewModal
          title="등록 실패"
          content="필수 항목을 모두 입력해 주세요."
          confirmText="확인"
          onClickConfirm={handleModalConfirm}
        />
      )}
      {modal === 'cancel' && (
        <ReviewModal
          title="정말 나가시겠습니까?"
          content="작성 중인 내용은 저장되지 않습니다."
          confirmText="확인"
          onClickConfirm={handleModalConfirm}
          isCancle={true}
          cancleText="취소"
          onClickCancle={handleModalCancel}
        />
      )}
    </div>
  );
};

export default CreateReview;
