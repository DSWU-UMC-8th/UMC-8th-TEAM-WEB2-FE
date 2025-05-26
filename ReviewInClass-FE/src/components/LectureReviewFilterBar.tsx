import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import palette from "../styles/theme";

export type Filters = {
  sort: "" | "latest" | "recommend";
  ratingRange: [number, number] | null;
};

const MIN = 1;
const MAX = 5;

const LectureReviewFilterBar = ({
  onSearch,
  resultCount = 0,
}: {
  onSearch: (filters: Filters) => void;
  resultCount?: number;
}) => {
  const [sort, setSort] = useState<Filters["sort"]>("");
  const [ratingRange, setRatingRange] = useState<[number, number] | null>(null);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [tempRange, setTempRange] = useState<[number, number]>([1, 5]);

  const handleReset = () => {
    setSort("");
    setRatingRange(null);
    setTempRange([1, 5]);
    onSearch({ sort: "latest", ratingRange: null });
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as Filters["sort"];
    setSort(newSort);
    onSearch({ sort: newSort, ratingRange });
  };

  const applyRatingFilter = () => {
    setRatingRange(tempRange);
    onSearch({ sort, ratingRange: tempRange });
    setShowRatingDropdown(false);
  };

  return (
    <div className="flex flex-col px-8 py-4 gap-2">
      <div className="flex items-center gap-4">
        <select
          value={sort}
          onChange={handleChangeSort}
          style={{ color: palette.gray.gray900 }}
          className="border rounded px-2 py-1 text-sm border-none bg-white"
        >
          <option value="" disabled hidden>
            정렬 기준
          </option>
          <option value="latest">최신순</option>
          <option value="recommend">추천순</option>
        </select>

        <div className="relative">
          <button
            onClick={() => setShowRatingDropdown((prev) => !prev)}
            style={{ color: palette.gray.gray900 }}
            className="border rounded px-2 py-1 text-sm border-none bg-white"
          >
            평점
          </button>

          {showRatingDropdown && (
            <div className="absolute z-10 mt-2 w-[300px] bg-white rounded-xl shadow-xl p-4">
              <div
                style={{ color: palette.gray.gray900 }}
                className="flex justify-between text-sm font-medium mb-4"
              >
                <span>평점 {tempRange[0]}</span>
                <span>평점 {tempRange[1]}</span>
              </div>
              <Range
                values={tempRange}
                step={1}
                min={MIN}
                max={MAX}
                onChange={(values) => setTempRange(values as [number, number])}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      background: getTrackBackground({
                        values: tempRange,
                        colors: [
                          palette.primary.primaryLight,
                          palette.primary.primaryDark,
                          palette.primary.primaryLight,
                        ],
                        min: MIN,
                        max: MAX,
                      }),
                      borderRadius: "4px",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    }}
                  />
                )}
              />
              <div className="flex justify-between items-center mt-4">
                <span
                  style={{ color: palette.gray.gray700 }}
                  className="font-semibold text-sm"
                >
                  {resultCount}개 결과 보기
                </span>
                <button
                  onClick={applyRatingFilter}
                  style={{
                    backgroundColor: palette.primary.primaryLight,
                    color: "white",
                  }}
                  className="cursor-pointer rounded-lg px-4 py-1 text-sm font-semibold"
                >
                  수정
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleReset}
          style={{ backgroundColor: palette.gray.gray200 }}
          className="border px-3 py-1 rounded text-sm border-none bg-gray-300 cursor-pointer"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default LectureReviewFilterBar;
