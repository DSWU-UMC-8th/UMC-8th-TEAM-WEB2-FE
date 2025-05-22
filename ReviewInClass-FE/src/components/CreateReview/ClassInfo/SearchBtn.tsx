import palette from "../../../styles/theme"

const SearchButton = () => {
    return(
        <button
            className="w-[101px] h-[55px] px-[12px] py-[14px] 
                rounded-[9px] text-[25px] font-medium flex-shrink-0
                flex items-center justify-center"
            style={{
                backgroundColor: palette.primary.primary,
                color: palette.white,
                transition: "background 0.2s",
            }}
            >
                검색
        </button>
    )
}

export default SearchButton;