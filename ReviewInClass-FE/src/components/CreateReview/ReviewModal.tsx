/**
 * 강의 등록 페이지에서 등록 버튼을 눌렀을 때 사용되는 컴포넌트 입니다.
 * 등록 성공 및 실패에 따라 다른 텍스트를 넘기면 됩니다.
 *
 * @param {string} title -- 등록 성공 / 등록 실패 / 정말 나가시겠습니까? 중 하나 넘겨주시면 됩니다.
 * @param {string} content -- 강의평 등록에 성공했습니다! / 필수 항목을 모두 입력해 주세요. / 작성 중인 내용은 저장되지 않습니다. 중 하나 넘겨주시면 됩니다.
 * @param {string} confirmText -- 확인 버튼에 들어갈 text
 * @param {function} onClickConfirm -- 모달의 확인 버튼을 눌렀을 때 동작할 함수 넘겨주시면 됩니다.
 * 
 * @param {boolean} isCancle -- 리뷰 작성 페이지에서 취소 버튼 누를 때 나타나는 모달입니다.
 *                              값을 넘기지 않는 경우 기본값 false입니다. 취소 버튼 누를 때에만 true로 넘겨주시면 됩니다.
 * @param {string} cancleText -- 취소 버튼에 들어갈 text / 취소 버튼 누를 때에만 값 넘겨주시면 됩니다. 
 * @param {function} onClickCancle -- 모달의 취소 버튼을 눌렀을 때 동작할 함수 / 취소 버튼 누를 때에만 값 넘겨주시면 됩니다. 
 *
 * 예시>
 *<ReviewModal
    title="등록 성공"
    content="강의평 등록에 성공했습니다!"
    confirmText="확인"
    onClickConfirm={() => console.log("등록 성공 모달")}
  /> 

  <ReviewModal
    title="등록 실패"
    content="필수 항목을 모두 입력해 주세요."
    confirmText="확인"
    onClickConfirm={() => console.log("등록 실패 모달")}
  /> 

  <ReviewModal
    title="정말 나가시겠습니까?"
    content="작성 중인 내용은 저장되지 않습니다."
    confirmText="확인"
    onClickConfirm={() => console.log("리뷰 작성 취소 - 확인")}
    isCancle={true}
    cancleText="취소"
    onClickCancle={() => console.log("리뷰 작성 취소 - 취소")}
  /> 
 *  **/

import palette from "../../styles/theme";

interface ReviewModakProps {
  title: string;
  content: string;
  confirmText: string;
  onClickConfirm: () => void;
  isCancle?: boolean;
  cancleText?: string;
  onClickCancle?: () => void;
}

const ReviewModal = ({
  title,
  content,
  confirmText,
  onClickConfirm,
  isCancle = false,
  cancleText,
  onClickCancle,
}: ReviewModakProps) => {
  return (
    <div className="w-full h-[100dvh] fixed top-0 z-1001 bg-black/20 flex items-center justify-center">
      <div
        className="w-[305px] h-[195px] rounded-[15.25px] pt-[38.13px] pr-[19.06px] pb-[38.13px] pl-[19.06px] bg-white flex flex-col gap-[22.88px] border items-center"
        style={{
          boxShadow: "1.91px 3.81px 11.44px 0px rgba(0, 0, 0, 0.08)",
          border: `1px solid ${palette["neutral-bg"]}`,
        }}
      >
        <p className="font-bold text-[20px] leading-[100%]" style={{ color: palette.gray.gray900 }}>
          {title}
        </p>
        <p
          className="font-medium text-[14.3px] leading-[100%] tracking-[-0.03em]"
          style={{ color: palette.gray.gray900 }}
        >
          {content}
        </p>

        {/* 등록 성공 및 실패 모달 */}
        {!isCancle && (
          <button
            onClick={onClickConfirm}
            className="w-[95.31px] h-[32.41px] rounded-[7.63px] text-white font-medium text-[14.3px] leading-[100%] tracking-[-0.03em] outline-none cursor-pointer"
            style={{ background: palette.primary.primaryDark }}
          >
            {confirmText}
          </button>
        )}

        {/* 리뷰 작성 취소 모달 */}
        {isCancle && (
          <div className="flex gap-[10.51px]">
            <button
              onClick={onClickCancle}
              className="w-[95.31px] h-[32.41px] rounded-[7.63px] text-white font-medium text-[14.3px] leading-[100%] tracking-[-0.03em] outline-none cursor-pointer"
              style={{ background: palette.gray.gray500 }}
            >
              {cancleText}
            </button>
            <button
              onClick={onClickConfirm}
              className="w-[95.31px] h-[32.41px] rounded-[7.63px] text-white font-medium text-[14.3px] leading-[100%] tracking-[-0.03em] outline-none cursor-pointer"
              style={{ background: palette.primary.primaryDark }}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
