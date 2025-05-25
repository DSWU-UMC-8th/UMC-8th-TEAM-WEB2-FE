import palette from "../../../styles/theme"; 
import logo from "../../../assets/icon-logo.svg"
import { useState } from "react";
import ReactQuillEditor from "./TextEditor";
import RatingSlider from "./RatingSlider";
import DurationCheckboxGroup from "./CheckBoxComponent";

const WriteReview = () => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [checkbox, setCheckbox] = useState<string[]>([]);

        const handleEditorChange = (value: string) => {
        setContent(value); // 상태 업데이트
        };

    return (
        <div className="flex flex-col justify-center items-center mb-[98px]">
            <div className="w-full max-w-3xl rounded-2xl">
                <section className="flex flex-col">
                    <div className="flex items-center gap-2 text-center mb-[36px]"
                        style={{ color: palette.gray.gray900 }}>
                        <span className="size-[35px]">
                            <img src={logo} alt="로고" className="w-full h-full object-contain"/>
                        </span>
                        <p className="font-Inter text-[27px] font-semibold leading-normal 
                            not-italic tracking-[-0.54px]">
                            리뷰 작성 
                        </p>
                    </div>

                    <div className="flex flex-col mb-[60px] gap-[28px]">
                        <RatingSlider value={rating} onChange={setRating} />
                    </div>
                    
                    <div className="flex flex-col mb-[69px] gap-[20px]">
                        <p className="font-medium text-[25px]" style={{ color: palette.gray.gray900 }}>
                            강의평
                        </p>
                        <ReactQuillEditor
                            value={content}
                            onChange={handleEditorChange} 
                            style={{ width: '850px', height: '260px' }}
                        />
                    </div>

                    <div className="flex flex-col mb-[69px] gap-[20px]">
                        <p className="font-medium text-[25px]" style={{ color: palette.gray.gray900 }}>
                            강의를 다 듣는데 얼마나 걸렸나요?
                        </p>
                        <DurationCheckboxGroup values={checkbox} onChange={setCheckbox} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WriteReview;
