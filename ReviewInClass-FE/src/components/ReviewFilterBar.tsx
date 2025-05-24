import React, {useState} from "react";

const ReviewFilterBar = ({ onSearch }: { onSearch: (filters: Filters) => void }) => {
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [period, setPeriod] = useState("");

  const handleSearch = () => {
    onSearch({ category, level, period });
  };

  const handleReset = () => {
    setCategory("");
    setLevel("");
    setPeriod("");
    onSearch({ category: "", level: "", period: "" });
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-2 py-1 text-sm text-gray-900 border-none bg-white"
        >
          <option value="" disabled hidden>카테고리</option>
          <option>IT/프로그래밍</option>
          <option>언어</option>
          <option>디자인</option>
          <option>요리</option>
          <option>금융/재테크</option>
          <option>라이프스타일</option>
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border rounded px-2 py-1 text-sm text-gray-900 border-none bg-white"
        >
          <option value="" disabled hidden>난이도</option>
          <option>입문자</option>
          <option>초급자</option>
          <option>중급자</option>
          <option>상급자</option>
        </select>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded px-2 py-1 text-sm text-gray-900 border-none bg-white"
        >
          <option value="" disabled hidden>입문 기간</option>
          <option>일주일 이내</option>
          <option>1달 이내</option>
          <option>3달 이내</option>
          <option>6달 이내</option>
          <option>1년 이내</option>
        </select>
        <button onClick={handleSearch} style={{cursor: "pointer"}} className="border px-3 py-1 rounded text-sm text-gray-700 border-none bg-gray-300">검색</button>
        <button onClick={handleReset} style={{cursor: "pointer"}} className="border px-3 py-1 rounded text-sm text-gray-700 border-none bg-gray-300">초기화</button>
      </div>
    </div>
  );
};

export default ReviewFilterBar;

export type Filters = {
  category: string;
  level: string;
  period: string;
};