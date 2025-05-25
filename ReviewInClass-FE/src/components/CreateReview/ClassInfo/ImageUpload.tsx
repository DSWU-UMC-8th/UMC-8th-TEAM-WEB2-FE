import React, { useRef, useState } from "react";

const ImageUploadBox = ({
        defaultIcon,
        className = "",
    }: {
        defaultIcon: string; // 아이콘 src
        className?: string;
    }) => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 미리보기
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };
    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`
                relative border-dashed border-2 rounded-[10px] 
                flex flex-col items-center justify-center 
                h-[134px] w-[181px] cursor-pointer border-[#00AC49]
                ${className}
            `}
            onClick={handleBoxClick}
        >

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            {/* 미리보기 or 기본 아이콘 */}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="미리보기"
                    className="w-full h-full object-cover rounded-[10px]"
                />
            )} 
            <span
                className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                flex items-center justify-center size-[48px] rounded-full
                bg-[#4DB35FCC] z-10
                "
            >
                <img src={defaultIcon} alt="사진 업로드"/>
            </span>
        </div>
    );
};

export default ImageUploadBox;
