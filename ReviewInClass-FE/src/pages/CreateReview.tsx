import Navbar from "../components/common/Navbar";
import ClassInfo from "../components/CreateReview/ClassInfo/ClassInfo";
import WriteReview from "../components/CreateReview/WriteReview/WriteReview";

const CreateReview = () => {
  return (
    <div>
      <Navbar />
      <ClassInfo />
      <div className="w-full h-[2px] mt-[43px] mb-[56px] border border-[#D9D9D9]"/>
      <WriteReview />

      <div className="flex gap-[16px] justify-center items-center mb-[55.2px]">
        <button 
          className="flex justify-center items-center px-[17px] py-[14px] w-[148px] rounded-[11.9px] h-[50px] 
            text-[22px] text-white font-medium bg-[#B5B5B5] hover:bg-[#6D6D6D] cursor-pointer"
          >
            취소
        </button>
        <button
          className="flex justify-center items-center px-[17px] py-[14px] w-[148px] rounded-[11.9px] h-[50px] align-center
          text-[22px] text-white font-medium bg-[#A5D06D] hover:bg-[#B4D780] cursor-pointer"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default CreateReview;
