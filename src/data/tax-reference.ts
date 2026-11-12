/** Single source for figures shown on family-loan pages. Update the value and the date together. */
export const taxReference = {
  verifiedOn: "2026-11-12",
  adequateInterestRatePercent: 4.6,
  adequateInterestBasis: "법인세법 시행규칙 제43조 제2항",
  adequateInterestNote:
    "가족 간 금전 대여의 적정이자율로 자주 인용되는 값입니다. 고시와 시행규칙이 바뀌면 이 숫자만 고치고, 화면의 기준일도 같이 바꿉니다.",
  adultChildGiftDeductionWonLabel: "5천만 원",
  adultChildGiftDeductionNote:
    "성년 자녀의 증여재산공제로 널리 안내되는 금액이며, 10년 합산입니다. 미성년·배우자 등 다른 공제와 혼인·출산 공제는 별도 조문입니다.",
} as const;

export function adequateInterestLabel() {
  return `적정이자율 ${taxReference.adequateInterestRatePercent}%(${taxReference.adequateInterestBasis} 기준, ${taxReference.verifiedOn} 확인)`;
}
