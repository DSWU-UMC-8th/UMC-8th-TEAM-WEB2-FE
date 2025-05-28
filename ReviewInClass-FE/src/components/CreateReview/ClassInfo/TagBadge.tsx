import ic_x from "../../../assets/x-icon.svg";
import palette from "../../../styles/theme";

const TagBadge = ({ label, onClear }: { label: string; onClear?: () => void }) => (
    <span
        className="flex items-center rounded-full px-3 py-1 text-[15.3px] font-bold"
        style={{
            backgroundColor: palette.primary.primaryDark,
            color: palette.white,
        }}
    >
        {label}
        {onClear && (
            <span
                className="size-[20px] flex items-center justify-center ml-1 cursor-pointer"
                onClick={onClear}
            >
                <img src={ic_x} alt="x" className="w-full h-full object-contain" />
            </span>
        )}
    </span>
);

export default TagBadge;