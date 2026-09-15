export type ToolCategory =
  | "productivity"
  | "calculator"
  | "fun"
  | "utility"
  | "developer";

export type Tool = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  keywords: string[];
  related: string[];
  featured?: boolean;
};

export const toolCategories: { id: ToolCategory | "all"; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "productivity", label: "생산성" },
  { id: "calculator", label: "계산기" },
  { id: "utility", label: "유틸" },
  { id: "developer", label: "개발자" },
  { id: "fun", label: "재미" },
];

export const tools: Tool[] = [
  {
    slug: "timer",
    name: "무료 온라인 타이머",
    shortName: "타이머",
    description:
      "분·초 단위로 설정하고 알람까지 되는 무료 온라인 타이머입니다.",
    longDescription:
      "공부·요리·운동에 바로 쓰는 웹 타이머입니다. +1/+5/+10분 버튼과 알람을 지원하며 설치 없이 브라우저에서 바로 실행됩니다.",
    category: "productivity",
    keywords: ["온라인 타이머", "무료 타이머", "웹 타이머", "알람 타이머"],
    related: ["stopwatch", "pomodoro", "dday"],
    featured: true,
  },
  {
    slug: "stopwatch",
    name: "무료 온라인 스톱워치",
    shortName: "스톱워치",
    description: "랩 타임 기록이 되는 무료 온라인 스톱워치입니다.",
    longDescription:
      "시작·정지·랩·리셋이 가능한 웹 스톱워치입니다. 운동·실험·공부 시간 측정에 적합합니다.",
    category: "productivity",
    keywords: ["온라인 스톱워치", "랩 타임", "무료 스톱워치"],
    related: ["timer", "pomodoro"],
    featured: true,
  },
  {
    slug: "pomodoro",
    name: "포모도로 타이머",
    shortName: "포모도로",
    description: "25분 집중 + 휴식 사이클을 관리하는 포모도로 타이머입니다.",
    longDescription:
      "집중 25분·짧은 휴식 5분·긴 휴식 15분 사이클을 한 화면에서 관리합니다. 공부·재택근무 집중력에 최적화되어 있습니다.",
    category: "productivity",
    keywords: ["포모도로", "집중 타이머", "공부 타이머", "pomodoro"],
    related: ["timer", "stopwatch", "word-counter"],
    featured: true,
  },
  {
    slug: "qrcode",
    name: "무료 QR 코드 생성기",
    shortName: "QR 생성기",
    description: "URL·텍스트로 QR 코드를 만들고 바로 다운로드하세요.",
    longDescription:
      "링크나 문구를 입력하면 QR 코드를 즉시 생성합니다. PNG 다운로드를 지원하며 명함·포스터·매장 안내용으로 활용할 수 있습니다.",
    category: "utility",
    keywords: ["QR 코드", "QR 생성기", "무료 QR", "QR 만들기"],
    related: ["password", "base64"],
    featured: true,
  },
  {
    slug: "bmi",
    name: "BMI 계산기",
    shortName: "BMI",
    description: "키와 몸무게로 BMI와 체중 구간을 바로 확인합니다.",
    longDescription:
      "신장·체중을 입력하면 BMI 수치와 저체중/정상/과체중/비만 구간을 안내합니다.",
    category: "calculator",
    keywords: ["BMI 계산기", "체질량지수", "비만도 계산"],
    related: ["age", "unit-converter"],
  },
  {
    slug: "unit-converter",
    name: "단위 변환기",
    shortName: "단위 변환",
    description: "길이·무게·온도 단위를 빠르게 변환합니다.",
    longDescription:
      "cm/m/inch, kg/lb, ℃/℉ 등 자주 쓰는 단위를 한 화면에서 변환합니다.",
    category: "calculator",
    keywords: ["단위 변환기", "길이 변환", "무게 변환", "온도 변환"],
    related: ["bmi", "age"],
  },
  {
    slug: "password",
    name: "비밀번호 생성기",
    shortName: "비밀번호",
    description: "안전한 랜덤 비밀번호를 길이·옵션에 맞게 생성합니다.",
    longDescription:
      "길이, 숫자·기호 포함 여부를 선택해 강력한 비밀번호를 만듭니다. 생성된 값은 브라우저에서만 처리됩니다.",
    category: "utility",
    keywords: ["비밀번호 생성기", "랜덤 비밀번호", "보안 비밀번호"],
    related: ["qrcode", "base64"],
    featured: true,
  },
  {
    slug: "word-counter",
    name: "글자수 계산기",
    shortName: "글자수",
    description: "공백 포함/제외 글자수·단어수·바이트를 즉시 계산합니다.",
    longDescription:
      "자소서·블로그·SNS 작성 시 필요한 글자수, 단어수, UTF-8 바이트를 실시간으로 보여줍니다.",
    category: "productivity",
    keywords: ["글자수 계산기", "자소서 글자수", "바이트 계산"],
    related: ["pomodoro", "dday"],
    featured: true,
  },
  {
    slug: "dday",
    name: "디데이 계산기",
    shortName: "D-Day",
    description: "목표일까지 남은 일수(D-Day)를 계산합니다.",
    longDescription:
      "시험·입대·결혼식·프로젝트 마감일까지 남은 날짜를 계산하고 경과 일수도 함께 확인합니다.",
    category: "calculator",
    keywords: ["디데이 계산기", "D-Day", "남은 날짜"],
    related: ["age", "timer"],
  },
  {
    slug: "age",
    name: "만나이·나이 계산기",
    shortName: "나이 계산",
    description: "생년월일로 만나이와 한국식 나이를 계산합니다.",
    longDescription:
      "생년월일을 입력하면 만나이, 세는나이(참고), 올해 생일 여부를 안내합니다.",
    category: "calculator",
    keywords: ["나이 계산기", "만나이", "생일 계산"],
    related: ["dday", "bmi"],
  },
  {
    slug: "lotto",
    name: "로또 번호 추첨기",
    shortName: "로또",
    description: "1~45 중 랜덤 로또 번호 6개를 추첨합니다.",
    longDescription:
      "재미용 로또 번호 생성기입니다. 실제 당첨을 보장하지 않으며 오락 목적으로만 사용하세요.",
    category: "fun",
    keywords: ["로또 번호", "로또 추첨", "랜덤 번호"],
    related: ["fortune", "rps"],
  },
  {
    slug: "fortune",
    name: "오늘의 운세",
    shortName: "운세",
    description: "오늘 하루 간단한 운세 메시지를 뽑아 봅니다.",
    longDescription:
      "가벼운 오늘의 운세 뽑기입니다. 오락용이며 점술·상담을 대체하지 않습니다.",
    category: "fun",
    keywords: ["오늘의 운세", "무료 운세", "운세 뽑기"],
    related: ["lotto", "quotes"],
  },
  {
    slug: "quotes",
    name: "랜덤 명언",
    shortName: "명언",
    description: "동기부여가 되는 명언을 랜덤으로 보여줍니다.",
    longDescription:
      "공부·업무·일상에서 바로 쓸 수 있는 짧은 명언을 랜덤 출력하고 복사할 수 있습니다.",
    category: "fun",
    keywords: ["랜덤 명언", "동기부여 명언", "명언 모음"],
    related: ["fortune", "word-counter"],
  },
  {
    slug: "rps",
    name: "가위바위보 게임",
    shortName: "가위바위보",
    description: "컴퓨터와 가위바위보로 승부를 겨뤄보세요.",
    longDescription:
      "간단 가위바위보 미니게임입니다. 연승을 기록하며 짧게 즐기기 좋습니다.",
    category: "fun",
    keywords: ["가위바위보", "미니게임", "무료 게임"],
    related: ["lotto", "fortune"],
  },
  {
    slug: "engname",
    name: "영어 이름 변환기",
    shortName: "영문 이름",
    description: "한글 이름을 영문 표기 후보로 변환합니다.",
    longDescription:
      "여권·명함용으로 자주 쓰는 한글 이름 로마자 표기 후보를 제안합니다. 공식 여권 표기는 본인 확인이 필요합니다.",
    category: "utility",
    keywords: ["영어 이름", "로마자 표기", "이름 변환"],
    related: ["word-counter", "password"],
  },
  {
    slug: "base64",
    name: "Base64 인코더/디코더",
    shortName: "Base64",
    description: "텍스트를 Base64로 인코딩하거나 디코딩합니다.",
    category: "developer",
    longDescription:
      "개발·디버깅용 Base64 변환기입니다. 입력값은 서버로 전송되지 않고 브라우저에서만 처리됩니다.",
    keywords: ["Base64", "인코더", "디코더", "개발 도구"],
    related: ["json-formatter", "password"],
  },
  {
    slug: "json-formatter",
    name: "JSON 포맷터",
    shortName: "JSON",
    description: "JSON을 보기 좋게 정렬하고 유효성을 검사합니다.",
    longDescription:
      "붙여넣은 JSON을 들여쓰기 정렬하고 문법 오류를 바로 확인합니다.",
    category: "developer",
    keywords: ["JSON 포맷터", "JSON 정렬", "JSON 검증"],
    related: ["base64", "color-picker"],
    featured: true,
  },
  {
    slug: "color-picker",
    name: "색상 피커 (HEX/RGB)",
    shortName: "색상 피커",
    description: "색을 고르고 HEX·RGB 코드를 복사합니다.",
    longDescription:
      "디자인·개발용 색상 피커입니다. HEX와 RGB 값을 즉시 확인하고 복사할 수 있습니다.",
    category: "developer",
    keywords: ["색상 피커", "HEX", "RGB", "컬러 피커"],
    related: ["json-formatter", "qrcode"],
  },
  {
    slug: "salary",
    name: "연봉 실수령액 계산기",
    shortName: "실수령액",
    description: "연봉·월급 기준으로 대략적인 실수령액을 계산합니다.",
    longDescription:
      "국민연금·건강보험·고용보험·소득세 등을 단순 추정한 실수령액 참고 계산기입니다. 실제 원천징수와 다를 수 있으니 참고용으로만 사용하세요.",
    category: "calculator",
    keywords: ["실수령액 계산기", "연봉 실수령액", "월급 실수령액", "세후 연봉"],
    related: ["percent", "loan"],
    featured: true,
  },
  {
    slug: "percent",
    name: "퍼센트 계산기",
    shortName: "퍼센트",
    description: "비율·증가율·할인 전후 금액을 바로 계산합니다.",
    longDescription:
      "A의 B%, 몇 % 증가/감소, 전체 대비 비율 등 자주 쓰는 퍼센트 계산을 한 곳에서 처리합니다.",
    category: "calculator",
    keywords: ["퍼센트 계산기", "비율 계산", "증가율 계산"],
    related: ["discount", "salary"],
    featured: true,
  },
  {
    slug: "discount",
    name: "할인율·세일 가격 계산기",
    shortName: "할인 계산",
    description: "정가와 할인율로 할인가·절약 금액을 계산합니다.",
    longDescription:
      "정가·할인율 또는 할인가를 입력해 최종 결제 예상 금액과 절약액을 확인합니다. 쇼핑·견적 비교에 유용합니다.",
    category: "calculator",
    keywords: ["할인율 계산기", "세일 가격", "할인가 계산"],
    related: ["percent", "salary"],
    featured: true,
  },
  {
    slug: "loan",
    name: "대출 이자·월 상환액 계산기",
    shortName: "대출 계산",
    description: "원리금균등 기준으로 월 상환액과 이자를 추정합니다.",
    longDescription:
      "대출원금·연이율·기간을 입력하면 월 상환액과 총이자를 대략 계산합니다. 금융사 실제 조건과 다를 수 있는 참고용입니다.",
    category: "calculator",
    keywords: ["대출 이자 계산기", "원리금균등", "월 상환액"],
    related: ["salary", "percent"],
  },
  {
    slug: "date-calc",
    name: "날짜 계산기",
    shortName: "날짜 계산",
    description: "날짜 더하기·빼기, 두 날짜 사이 일수를 계산합니다.",
    longDescription:
      "특정 날짜로부터 N일 후/전, 두 날짜 사이의 일수 계산을 지원합니다. 일정·마감 관리에 활용하세요.",
    category: "calculator",
    keywords: ["날짜 계산기", "일수 계산", "날짜 더하기"],
    related: ["dday", "age"],
    featured: true,
  },
  {
    slug: "random-picker",
    name: "제비뽑기·랜덤 추첨기",
    shortName: "제비뽑기",
    description: "이름·항목을 넣고 공정하게 한 명을 뽑습니다.",
    longDescription:
      "쉼표 또는 줄바꿈으로 항목을 입력하면 랜덤으로 하나를 추첨합니다. 팀 뽑기·경품 추첨·발표자 선정에 적합합니다.",
    category: "fun",
    keywords: ["제비뽑기", "랜덤 추첨", "사다리타기 대안", "이름 뽑기"],
    related: ["lotto", "rps"],
    featured: true,
  },
  {
    slug: "uuid",
    name: "UUID 생성기",
    shortName: "UUID",
    description: "UUID v4를 한 번에 여러 개 생성합니다.",
    longDescription:
      "개발·테스트용 UUID(v4)를 브라우저에서 즉시 생성합니다. 복사하기 쉽게 목록으로 보여줍니다.",
    category: "developer",
    keywords: ["UUID 생성기", "UUID v4", "고유 ID"],
    related: ["password", "json-formatter"],
  },
  {
    slug: "hash",
    name: "텍스트 해시 생성기",
    shortName: "해시",
    description: "텍스트의 SHA-256 해시를 바로 만듭니다.",
    longDescription:
      "입력한 문자열의 SHA-256 해시값을 생성합니다. 무결성 확인·간단한 체크용으로 사용할 수 있습니다.",
    category: "developer",
    keywords: ["해시 생성기", "SHA-256", "checksum"],
    related: ["base64", "uuid"],
  },
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slug: string) {
  const tool = getTool(slug);
  if (!tool) return [];
  return tool.related
    .map((relatedSlug) => getTool(relatedSlug))
    .filter(Boolean) as Tool[];
}

export function getToolsByCategory(category: ToolCategory | "all") {
  if (category === "all") return tools;
  return tools.filter((tool) => tool.category === category);
}
