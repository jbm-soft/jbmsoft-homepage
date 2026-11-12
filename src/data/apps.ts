import { siteConfig } from "@/data/site";

export type AppSlug = "evidence" | "used-car-inspect";

export type FirstPartyApp = {
  slug: AppSlug;
  name: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  applicationCategory: string;
  ogImage: string;
  heroImage: string;
  accent: "violet" | "mint";
  kicker: string;
  headline: string;
  headlineAccent: string;
  lead: string;
  futureAction: string;
  notifySubject: string;
  cardSummary: string;
  cardPoints: string[];
  heroPoints: { label: string; body: string }[];
  steps: { title: string; body: string }[];
  features: { title: string; body: string }[];
  later?: { title: string; body: string }[];
  market?: {
    intro: string;
    items: { name: string; price: string; href: string; note: string }[];
    footnote: string;
  };
  alternatives?: {
    intro: string;
    items: { name: string; body: string; href: string }[];
  };
  disclaimers: string[];
  faqs: { question: string; answer: string }[];
  guideSlugs: string[];
};

export function prelaunchMailto(subject: string) {
  const body = [
    "안녕하세요, JBM SOFT.",
    "",
    `${subject} 안내를 보고 출시 알림을 신청합니다.`,
    "",
    "답장 받을 이메일:",
    "",
  ].join("\n");
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const firstPartyApps: FirstPartyApp[] = [
  {
    slug: "evidence",
    name: "증거정리",
    seoTitle: "증거정리 – 내보낸 대화를 제출용 PDF로",
    description:
      "카카오톡에서 내보낸 대화 파일(txt·zip)을 안드로이드 휴대폰 안에서 제출용 대화 PDF로 정리하는 앱. 사진은 파일명만이 아니라 페이지에 넣고, 날짜·시각·쪽 번호·원본 SHA-256·별표 메시지 목록을 붙입니다. 출시 예정. JBM SOFT 개발. 법적 효력을 만들어 주지 않습니다.",
    keywords: [
      "카톡 대화 PDF",
      "카톡 대화 인쇄",
      "카톡 증거",
      "카카오톡 대화 내보내기",
      "대화 PDF 변환",
      "증거정리",
    ],
    applicationCategory: "UtilitiesApplication",
    ogImage: "/images/apps/evidence-og.png",
    heroImage: "/images/apps/evidence-hero.png",
    accent: "violet",
    kicker: "Android · 형식 변환",
    headline: "내보낸 대화를,",
    headlineAccent: "제출용 PDF로.",
    lead: "카카오톡의 공식 대화 내보내기는 텍스트와 압축 파일까지입니다. 증거정리는 그 파일을 공유받아, 사진이 들어간 대화 PDF와 별표 메시지 목록으로 정리합니다. 대화 PDF는 휴대폰 안에서 만들고, 아직 스토어에 없습니다.",
    futureAction: "내보낸 파일로 PDF 만들기",
    notifySubject: "[출시 알림] 증거정리",
    cardSummary: "내보낸 대화 파일을 사진이 들어간 PDF와 목록으로 정리합니다.",
    cardPoints: ["txt·zip을 공유", "사진은 페이지 안에", "원본 SHA-256"],
    heroPoints: [
      { label: "넣는 파일", body: "공식 내보내기 txt·zip" },
      { label: "만드는 것", body: "대화 PDF와 별표 목록" },
      { label: "처리 위치", body: "휴대폰 안, 서버 없음" },
      { label: "지금 상태", body: "출시 예정" },
    ],
    steps: [
      {
        title: "채팅방에서 대화를 내보냅니다",
        body: "카카오톡 채팅방 메뉴에서 대화 내용 내보내기를 사용합니다. 결과물은 텍스트 파일이거나, 분량이 길거나 사진·파일이 포함되면 압축 파일입니다. 카카오톡이 PDF를 만들어 주지는 않습니다.",
      },
      {
        title: "안드로이드 공유로 앱에 넘깁니다",
        body: "내보내기 직후의 공유 창, 또는 파일 앱에서 증거정리로 보냅니다. 패키지 이름이나 스토어 주소는 아직 없습니다.",
      },
      {
        title: "휴대폰 안에서 PDF가 만들어집니다",
        body: "날짜와 시각, 쪽 번호, 원본 파일의 SHA-256이 붙습니다. 사진은 파일명만 남기지 않고 해당 자리의 페이지에 넣습니다. 이 변환은 서버로 올리지 않습니다.",
      },
      {
        title: "별표한 메시지는 목록으로 모읍니다",
        body: "따로 표시해 둔 메시지는 갑 제○호증 형식의 표로 모읍니다. 번호를 보기 쉽게 붙이는 정리 형식이며, 법원이나 기관이 그 번호를 부여했다는 뜻이 아닙니다.",
      },
    ],
    features: [
      {
        title: "사진이 페이지 안에 들어갑니다",
        body: "내보내기 압축 파일 안의 사진을, 파일명 한 줄로 대체하지 않고 대화 흐름의 자리에 넣습니다.",
      },
      {
        title: "날짜·시각·쪽 번호",
        body: "메시지를 읽을 때 언제의 말인지 보게 하고, 인쇄했을 때 쪽을 찾을 수 있게 번호를 붙입니다.",
      },
      {
        title: "원본 SHA-256",
        body: "변환에 쓴 원본 파일의 SHA-256을 PDF에 남깁니다. 나중에 그 원본과 같은 파일인지 대조하는 용도입니다.",
      },
      {
        title: "별표 메시지 목록",
        body: "긴 대화에서 표시해 둔 말만 표로 뽑습니다. 표의 호증 번호는 정리용입니다.",
      },
      {
        title: "문자·접근성 권한을 쓰지 않습니다",
        body: "대화 PDF는 사용자가 직접 내보낸 파일을 받아 처리합니다. SMS 권한이나 접근성 권한으로 화면을 읽지 않습니다.",
      },
      {
        title: "서버로 파일을 올리지 않습니다",
        body: "대화 PDF를 만드는 과정은 기기 안에서 끝냅니다. 계정 가입을 요구하지 않는 구성입니다.",
      },
    ],
    later: [
      {
        title: "갤럭시 통화 녹음 녹취 초안",
        body: "이후 단계에서 갤럭시 통화 녹음 파일을 받아 녹취 초안을 만드는 기능을 준비합니다. 파일마다 요금을 받는 구성이며, 금액은 아직 정하지 않았습니다.",
      },
      {
        title: "음성 인식은 그 단계의 일입니다",
        body: "지금 안내하는 출시 범위에는 음성 인식이 없습니다. 대화 파일을 PDF로 정리하는 일과 녹취 초안은 나뉘어 있습니다.",
      },
    ],
    alternatives: {
      intro:
        "같은 고민을 다른 환경에서 돕는 서비스도 있습니다. 웹·PC·녹취처럼 쓰는 자리가 다르므로, 아래는 각 안내 페이지에 적힌 사실만 옮깁니다.",
      items: [
        {
          name: "EZPZ File",
          body: "웹에서 내보낸 대화 파일을 PDF로 바꿉니다. 자사 칼럼은 PDF 안의 사진·동영상이 파일명으로만 들어간다고 적고, 사진을 종이에 담으려면 HTML로 저장해 인쇄하는 방법을 따로 안내합니다.",
          href: "https://ezpzfile.com/ko/column/chat-to-pdf-print",
        },
        {
          name: "법짝 증거수집기",
          body: "브라우저와 PC에서 내보낸 대화의 발췌, 증거목록, 녹음·영상 구간과 녹취 정리를 다루는 전문가용 도구입니다.",
          href: "https://bubjjak.com/evidence",
        },
        {
          name: "NoCutoff",
          body: "긴 파일 작업을 대화 전체 5달러부터로 안내합니다. 공개된 한국어 페이지의 대화 도구 목록에는 WhatsApp, Telegram, Messenger, Instagram, 문자, iMessage, Slack, Discord 등이 있고 카카오톡은 보이지 않습니다.",
          href: "https://nocutoff.com/ko/",
        },
        {
          name: "LightOn 녹취록",
          body: "통화 녹음 파일을 녹취록 초안으로 만드는 서비스입니다. 카카오톡 대화 PDF가 본문으로 안내되어 있지는 않습니다.",
          href: "https://law-transcript.lightonpluslab.com/",
        },
      ],
    },
    disclaimers: [
      "증거정리는 파일을 읽기 쉬운 PDF와 목록으로 바꾸는 정리 도구입니다. 출력물에 법적 효력이 생기거나, 증거로 채택된다는 뜻이 아닙니다.",
      "무엇을 낼지, 그 형식을 받을지는 제출받는 곳의 기준입니다. 필요하면 변호사 등 전문가와 상의하세요.",
      "카카오톡은 카카오의 서비스입니다. 증거정리는 카카오의 앱이 아니고, 제휴나 보증 관계가 없습니다. 앱 이름과 아이콘에 카카오를 넣지 않습니다.",
      "공식 대화 내보내기가 PDF를 만들어 주지는 않습니다. 결과물은 텍스트·압축 파일이고, PDF는 이 앱이 따로 만듭니다.",
      "Google Play를 비롯한 스토어에 아직 등록되어 있지 않습니다. 다운로드 수, 이용자 리뷰, 패키지 이름은 없습니다.",
    ],
    faqs: [
      {
        question: "카카오톡에서 PDF로 저장할 수 있나요?",
        answer:
          "공식 안내는 대화 내용 내보내기이며, 결과물은 텍스트 파일 또는 압축 파일입니다. 카카오톡이 제출용 PDF를 만들어 주지는 않습니다.",
      },
      {
        question: "만든 PDF에 법적 효력이 있나요?",
        answer:
          "없습니다. 날짜·시각·사진·쪽 번호·원본 해시를 갖춘 정리 파일일 뿐이며, 채택 여부는 제출받는 곳이 판단합니다.",
      },
      {
        question: "대화 내용이 서버로 올라가나요?",
        answer:
          "대화 PDF를 만드는 과정은 휴대폰 안에서 처리합니다. 서버로 올리지 않고, 문자 권한과 접근성 권한도 쓰지 않습니다.",
      },
      {
        question: "통화 녹음도 지금 변환되나요?",
        answer:
          "아닙니다. 갤럭시 통화 녹음의 녹취 초안과 음성 인식은 이후 단계이며, 파일마다 요금을 받는 쪽으로 준비 중입니다. 금액은 정해지지 않았습니다.",
      },
      {
        question: "어디서 받을 수 있나요?",
        answer:
          "아직 받을 곳이 없습니다. 출시 알림은 문의 페이지 또는 jaewon@jbmsoft.co.kr 로 남겨 주세요.",
      },
    ],
    guideSlugs: ["kakao-chat-pdf", "kakao-chat-print"],
  },
  {
    slug: "used-car-inspect",
    name: "중고차 셀프검수 키트",
    seoTitle: "중고차 셀프검수 키트 – 성능기록부를 쉬운 말로",
    description:
      "중고차 한 대를 볼 때 성능점검기록부를 사진으로 찍어 항목마다 쉬운 말로 읽고, 보험이력·자동차365와 대조할 체크리스트, 현장 사진 순서, 시운전 체크, 매도비·관리비용·취득세 읽기를 돕는 안드로이드 앱. 출시 예정. 정비사를 대신하지 않습니다.",
    keywords: [
      "성능점검기록부 보는 법",
      "중고차 성능기록부",
      "성능보증",
      "중고차 셀프점검",
      "매도비",
      "자동차365",
    ],
    applicationCategory: "LifestyleApplication",
    ogImage: "/images/apps/used-car-og.png",
    heroImage: "/images/apps/used-car-hero.png",
    accent: "mint",
    kicker: "Android · 한 대 구매",
    headline: "성능기록부를",
    headlineAccent: "쉬운 말로.",
    lead: "성능점검기록부를 찍으면 항목마다 무슨 말인지 풀어 줍니다. 보험이력·자동차365와 견줘 볼 체크리스트, 현장에서 찍을 순서, 시운전 때 볼 것, 견적서의 매도비·관리비용·취득세 읽기까지 한 대 구매에 맞춰 둡니다. 정비 진단을 대신하지 않으며, 아직 스토어에 없습니다.",
    futureAction: "내 기록부 사진으로 확인하기",
    notifySubject: "[출시 알림] 중고차 셀프검수 키트",
    cardSummary: "기록부 사진을 항목별로 풀어 읽고, 현장 기록과 견적 항목을 정리합니다.",
    cardPoints: ["기록부를 쉬운 말로", "현장 사진 순서", "카메라 권한"],
    heroPoints: [
      { label: "대상", body: "중고차 한 대" },
      { label: "시작", body: "기록부 사진" },
      { label: "권한", body: "카메라면 충분" },
      { label: "지금 상태", body: "출시 예정" },
    ],
    steps: [
      {
        title: "성능점검기록부를 찍습니다",
        body: "글자가 읽히게 기록부를 촬영합니다. 이 흐름에 쓰는 권한은 카메라입니다.",
      },
      {
        title: "항목을 쉬운 말로 봅니다",
        body: "원동기, 변속기, 누유, 외판처럼 서류에 적힌 단어를 그대로 둔 채, 그 칸이 무슨 뜻인지 풀어 보여 줍니다. 양호라는 표기를 무사고 판정으로 바꾸지 않습니다.",
      },
      {
        title: "보험이력·자동차365와 체크리스트로 대조합니다",
        body: "앱이 두 사이트를 대신 조회하지는 않습니다. 구매자가 직접 확인한 내용과 기록부를 항목별로 나란히 보는 목록을 제공합니다.",
      },
      {
        title: "현장 사진 순서와 시운전 체크를 따라 합니다",
        body: "기록부, 번호판과 주행거리, 외관, 엔진룸, 실내, 시운전 중 이상 순으로 남기게 안내합니다. 리프트 진단이나 고장 판정이 아닙니다.",
      },
      {
        title: "견적서의 비용 이름을 읽습니다",
        body: "매도비, 관리비용, 취득세가 견적에 어떻게 적히는지 구분해 보여 줍니다. 세금액을 확정하거나 깎아 주지는 않습니다.",
      },
      {
        title: "기록부와 실차가 다르면 PDF로 묶습니다",
        body: "다른 부위를 찍은 사진과 기록부를 한 PDF로 모아, 성능보증을 문의할 때 자료를 빠뜨리지 않게 합니다. 문의가 받아들여진다는 뜻은 아닙니다.",
      },
    ],
    features: [
      {
        title: "항목별 쉬운 말",
        body: "미세누유, 교환, 판금처럼 서류의 짧은 표기를 구매자가 읽을 수 있는 문장으로 바꿉니다. 서식 개정으로 단어가 다를 수 있어, 종이의 범례를 함께 보게 합니다.",
      },
      {
        title: "이력 대조 체크리스트",
        body: "보험개발원 보험이력과 자동차365에서 본 사고·침수·검사 기록을, 기록부의 해당 칸 옆에 스스로 적게 합니다.",
      },
      {
        title: "현장 사진 순서",
        body: "나중에 어느 부위 사진인지 헷갈리지 않도록 찍는 순서를 정해 둡니다. 사진에서 손상을 자동으로 판독하지는 않습니다.",
      },
      {
        title: "시운전에서 느낄 것",
        body: "경고등, 핸들, 제동, 변속, 이상음처럼 운전하며 표시해 둘 항목입니다. 정비사의 시승 평가를 대신하지 않습니다.",
      },
      {
        title: "매도비·관리비용·취득세",
        body: "차량 가격과 별도로 붙는 이름을 구분합니다. 취득세 세율과 감면은 당시 과세 기준을 따르므로 앱이 세액을 확정하지 않습니다.",
      },
      {
        title: "다를 때의 사진+기록부 PDF",
        body: "기록부 표기와 실차가 다른 부위를 사진과 서류가 함께 보이게 묶습니다. 성능보증 문의에 쓰는 자료 정리이며, 청구 결과를 보장하지 않습니다.",
      },
    ],
    market: {
      intro:
        "정비사가 함께 보는 동행·방문 점검은 이 앱과 하는 일이 다릅니다. 아래는 각 서비스가 공개한 국산 승용 기준 예시이고, 이 앱의 가격이 아닙니다. 프로모션·차급·지역·출장에 따라 달라집니다.",
      items: [
        {
          name: "카바조",
          price: "국산 132,000원~220,000원",
          href: "https://faq.carvazo.com/expenseguide/service-price",
          note: "가격 FAQ 기준 소형 132,000원, 중형 165,000원, 대형A 198,000원, 대형B 220,000원(VAT 포함). 다른 안내에는 국산 대형이 209,000원까지로 적힌 표도 있습니다.",
        },
        {
          name: "마이마부",
          price: "국산 110,000원~154,000원",
          href: "http://m.maymabu.com/service/accompany.html",
          note: "구매동행 안내의 국산 구간. 경차 110,000원, 소형 121,000원, 준·중형 132,000원, 준대형 143,000원, 대형 154,000원.",
        },
        {
          name: "중검사",
          price: "구매동행 130,000원",
          href: "https://jgss.co.kr/",
          note: "사이트에 구매동행 비용 13만 원으로 안내되어 있습니다. 구매대행은 별도입니다.",
        },
      ],
      footnote:
        "금액은 공개 페이지를 옮긴 시장 맥락입니다. 예약 전에 해당 페이지에서 다시 확인하세요. 셀프검수 키트는 동행 점검을 대신하지 않고, 사고 여부를 판정하지 않습니다.",
    },
    disclaimers: [
      "사고 유무, 침수, 향후 고장을 보장하지 않습니다. 양호로 적힌 칸도 그 시점의 점검 표기일 뿐입니다.",
      "정비사, 리프트, 진단기, 도막 측정기를 대신하지 않습니다. 모르는 소음·누유·경고등은 현장 정비 점검을 받으세요.",
      "법률 자문이나 세무 상담이 아닙니다. 성능보증의 기간·거리·제외 부위와 취득세는 계약 서류와 당시 과세 기준을 확인하세요.",
      "기록부와 실차가 다를 때 만드는 PDF는 문의용 자료 묶음입니다. 보증 청구가 받아들여진다는 뜻이 아닙니다.",
      "Google Play에 아직 없습니다. 출시 알림만 받고 있습니다.",
    ],
    faqs: [
      {
        question: "이 앱만 보면 사고차가 아닌가요?",
        answer:
          "아닙니다. 기록부를 쉬운 말로 읽고 구매자가 확인한 이력·사진과 나란히 두는 도구입니다. 사고 여부를 판정하거나 보장하지 않습니다.",
      },
      {
        question: "정비사 동행 대신 써도 되나요?",
        answer:
          "역할을 나누는 편이 맞습니다. 하부, 누유, 프레임처럼 장비로 보는 항목은 정비 점검이 필요하고, 이 앱은 서류 해석과 셀프 기록을 돕습니다.",
      },
      {
        question: "보험이력과 자동차365를 앱이 조회하나요?",
        answer:
          "대신 조회하지 않습니다. 구매자가 직접 확인한 내용을 기록부와 항목별로 대조하도록 체크리스트를 제공합니다.",
      },
      {
        question: "취득세를 계산해 주나요?",
        answer:
          "세액을 확정하지 않습니다. 견적서에 적힌 취득세·매도비·관리비용이 서로 다른 항목이라는 점을 읽는 데 도움을 줍니다. 세율과 감면은 위택스나 등록 관청 기준으로 확인하세요.",
      },
      {
        question: "내 기록부 사진으로 지금 확인할 수 있나요?",
        answer:
          "아직입니다. 내 기록부 사진으로 확인하는 기능은 출시 예정입니다. 알림은 문의 페이지 또는 jaewon@jbmsoft.co.kr 로 남겨 주세요.",
      },
    ],
    guideSlugs: ["used-car-inspection-record", "used-car-warranty-claim"],
  },
];

export function getApp(slug: string) {
  return firstPartyApps.find((app) => app.slug === slug);
}
