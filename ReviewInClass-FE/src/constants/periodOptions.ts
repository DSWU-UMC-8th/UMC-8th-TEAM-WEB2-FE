import type { StudyPeriod } from "../enums/StudyPeriod";

export const studyPeriodOptions: { label: string; value: StudyPeriod }[] = [
    { label: "일주일 이내", value: "WITHIN_A_WEEK" },
    { label: "1달 이내", value: "WITHIN_A_MONTH" },
    { label: "3달 이내", value: "WITHIN_THREE_MONTHS" },
    { label: "6달 이내", value: "WITHIN_SIX_MONTHS" },
    { label: "1년 이내", value: "WITHIN_A_YEAR" },
    { label: "수강 미완료", value: "NOT_COMPLETED" },
];