export type Guide = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  toolSlugs: string[];
  portfolioSlugs: string[];
  sections: { heading: string; body: string }[];
  cta: string;
};

export const guides: Guide[] = [
  {
    slug: "salary-take-home",
    title: "연봉 실수령액 계산기 – 세후 월급 바로 확인",
    description:
      "연봉을 넣으면 대략적인 월 실수령액을 바로 계산합니다. 이직·연봉 협상 전에 참고용으로 확인하세요.",
    keywords: ["연봉 실수령액 계산기", "세후 월급", "실수령액", "연봉 계산"],
    toolSlugs: ["salary", "percent", "loan"],
    portfolioSlugs: ["fintech-app", "hr-tool"],
    sections: [
      {
        heading: "실수령액이란?",
        body: "계약 연봉(세전)에서 국민연금·건강보험·고용보험·소득세·지방소득세 등을 뺀 뒤 실제로 통장에 들어오는 금액입니다. 같은 연봉이라도 부양가족·비과세에 따라 달라질 수 있습니다.",
      },
      {
        heading: "언제 쓰나요?",
        body: "이직 제안 비교, 연봉 협상 준비, 월급 체감액 확인에 유용합니다. 정확한 원천징수는 회사·국세청 기준으로 다를 수 있으니 참고용으로만 사용하세요.",
      },
      {
        heading: "JBM SOFT 관련 제작",
        body: "급여·정산·인사 업무를 엑셀/앱으로 자동화하거나, 가계부·핀테크형 MVP가 필요하면 제작도 함께 진행합니다.",
      },
    ],
    cta: "실수령액 계산기로 바로 확인하기",
  },
  {
    slug: "online-timer",
    title: "무료 온라인 타이머 – 설치 없이 바로 쓰는 웹 타이머",
    description:
      "공부·요리·운동용 무료 온라인 타이머. 알람·분 단위 설정, 포모도로·스톱워치까지 한곳에서.",
    keywords: ["온라인 타이머", "무료 타이머", "웹 타이머", "포모도로"],
    toolSlugs: ["timer", "pomodoro", "stopwatch"],
    portfolioSlugs: ["kids-quiz", "lms-dashboard"],
    sections: [
      {
        heading: "왜 웹 타이머인가",
        body: "앱 설치 없이 브라우저만 있으면 됩니다. 수업·회의·공부 타이머로 바로 공유할 수 있습니다.",
      },
      {
        heading: "함께 쓰면 좋은 도구",
        body: "집중 구간은 포모도로, 랩 기록이 필요하면 스톱워치를 사용하세요. 모두 브라우저에서만 동작합니다.",
      },
      {
        heading: "교육·학습 앱 제작",
        body: "타이머가 들어간 학습 앱, 퀴즈·출결 시스템 제작이 필요하면 상담해 주세요.",
      },
    ],
    cta: "무료 타이머 실행하기",
  },
  {
    slug: "qr-code-generator",
    title: "무료 QR 코드 생성기 – URL·텍스트 QR 만들기",
    description:
      "URL이나 텍스트로 QR 코드를 만들고 바로 저장하세요. 행사·메뉴판·명함용으로 바로 사용 가능합니다.",
    keywords: ["QR 코드 생성기", "QR 만들기", "무료 QR", "QR 코드"],
    toolSlugs: ["qrcode", "password"],
    portfolioSlugs: ["event-booth-game", "stamp-rally", "point-download"],
    sections: [
      {
        heading: "이런 상황에 씁니다",
        body: "행사 부스 안내, 메뉴판 주문 링크, 명함 연락처, 설문/예약 페이지 연결에 자주 쓰입니다.",
      },
      {
        heading: "행사·부스까지 확장",
        body: "단순 QR을 넘어 스탬프랠리·체험 미니게임·경품 추첨까지 필요하면 행사 프로그램으로 제작합니다.",
      },
    ],
    cta: "QR 코드 무료 생성",
  },
  {
    slug: "web-crawling-outsource",
    title: "웹 크롤링 외주 – 가격·공고·리뷰 수집 체크리스트",
    description:
      "경쟁사 가격, 입찰·채용 공고, 리뷰를 주기적으로 모아 시트에 적재하는 크롤링 외주 가이드.",
    keywords: ["웹 크롤링 외주", "가격 모니터링", "데이터 수집", "크롤링 제작"],
    toolSlugs: ["json-formatter", "base64"],
    portfolioSlugs: ["price-crawler", "lead-crawler", "web-crawling", "excel-automation"],
    sections: [
      {
        heading: "외주 전에 정리할 것",
        body: "수집 대상 URL/키워드, 갱신 주기, 저장 형식(엑셀·시트·DB), 알림 조건, 법적·이용약관 확인이 필요합니다.",
      },
      {
        heading: "자주 맡기는 유형",
        body: "가격·재고 모니터링, 채용/입찰 공고 리드 수집, 리뷰 취합, 반복 엑셀 보고 자동화가 많습니다.",
      },
      {
        heading: "진행 방식",
        body: "범위 확정 → 샘플 수집 → 스케줄/알림 → 납품. 실패 로그와 재시도까지 포함해 운영 가능한 형태로 만듭니다.",
      },
    ],
    cta: "크롤링·자동화 상담하기",
  },
  {
    slug: "event-booth-game",
    title: "행사 부스 게임 제작 – 체험·스탬프·미니게임 가이드",
    description:
      "박람회·축제·브랜드 부스용 스탬프·미션·즉석 미니게임 제작 범위와 일정 가이드.",
    keywords: ["행사 부스 게임", "체험 게임 제작", "스탬프랠리", "이벤트 미니게임"],
    toolSlugs: ["random-picker", "qrcode", "timer"],
    portfolioSlugs: ["event-booth-game", "stamp-rally", "casual-promo-game", "event-minigame"],
    sections: [
      {
        heading: "현장에서 필요한 것",
        body: "태블릿/키오스크 UI, 짧은 플레이 타임, 결과·쿠폰 연동, 오프라인 대비, 운영자 관리 화면이 핵심입니다.",
      },
      {
        heading: "제작 예시",
        body: "스탬프랠리, 룰렛·탭 게임, 미션 클리어형 체험, 경품 추첨 연동까지 요청에 맞춰 범위를 잡습니다.",
      },
    ],
    cta: "행사 게임 제작 문의",
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
