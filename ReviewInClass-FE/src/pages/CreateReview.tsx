import Navbar from "../components/common/Navbar";
import ClassInfo from "../components/CreateReview/ClassInfo/ClassInfo";
import WriteReview from "../components/CreateReview/WriteReview/WriteReview";
import ReviewModal from "../components/CreateReview/ReviewModal";
import { postReview } from "../apis/createReview";
import { useReviewForm } from "../hooks/useReviewForm";
import { useModal } from "../hooks/useModal";

// HTML 태그 제거 함수
function stripHtml(html: string) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

const CreateReview = () => {
  const {
    // ClassInfo
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

    // WriteReview
    rating,
    setRating,
    content,
    setContent,
    studyPeriod,
    setStudyPeriod,

    // Form 전송
    getReviewRequest,
  } = useReviewForm();

  const {
    modal,
    showSuccessModal,
    showErrorModal,
    showCancelModal,
    hideModal,
  } = useModal();

  // 등록 버튼 클릭
  const handleSubmit = async () => {
    try {
      const plainContent = stripHtml(content);
      const response = await postReview({ ...getReviewRequest(), content: plainContent }, imageFile ?? undefined);
      console.log('리뷰 등록 성공:', response);
      showSuccessModal();
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      showErrorModal();
    }
  };

  // 취소 버튼 클릭
  const handleCancel = () => {
    showCancelModal();
  };

  // 모달 확인/취소 핸들러
  const handleModalConfirm = () => {
    if (modal === 'success') {
      window.location.replace("/");
    } else {
      hideModal();
    }
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
          onClickCancle={hideModal}
        />
      )}
    </div>
  );
};

export default CreateReview;
