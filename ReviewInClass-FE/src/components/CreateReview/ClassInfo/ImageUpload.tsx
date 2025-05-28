import React, { useRef, useEffect, useState } from 'react';

interface ImageUploadBoxProps {
    defaultIcon: string;
    className?: string;
    onImageUpload: (file: File | null) => void;
    currentFile: File | null;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
    defaultIcon,
    className = '',
    onImageUpload,
    currentFile
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (currentFile) {
            const url = URL.createObjectURL(currentFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [currentFile]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onImageUpload(file);
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <div
                onClick={handleClick}
                className="relative border-dashed border-2 rounded-[10px] 
                    flex flex-col items-center justify-center 
                    h-[134px] w-[181px] cursor-pointer border-[#00AC49]
                    hover:bg-gray-50 transition-colors"
            >
            
                <span className="
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    flex items-center justify-center size-[48px] rounded-full
                    bg-[#4DB35FCC] z-20
                ">
                    <img src={defaultIcon} alt="사진 업로드"/>
                </span>
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="미리보기"
                        className="w-full h-full object-cover rounded-[10px]"
                    />
                )}
            </div>
        </div>
    );
};

export default ImageUploadBox;
