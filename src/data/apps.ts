import { siteConfig } from "@/data/site";

export type AppSlug = "evidence" | "used-car-inspect" | "family-loan";

export type FirstPartyApp = {
  slug: AppSlug;
  name: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  applicationCategory: string;
  ogImage: string;
  heroImage: string;
  accent: "sky" | "green" | "orange";
  subtitle: string;
  oneLiner: string;
  fixedNotice: string;
  alternateName: string;
  guideEndCta: string;
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
    name: "대화모아",
    seoTitle: "대화모아 – 내보낸 대화를 사진 포함 PDF·증거목록으로",
    description:
      "카카오톡에서 내보낸 대화(txt·zip)를 휴대폰에서 사진이 들어간 PDF로 만들고, 표시한 메시지로 갑 제○호증 형식의 목록을 만듭니다. 원본 파일의 SHA-256 값도 함께 적습니다.",
    keywords: [
      "카톡 대화 PDF",
      "카톡 대화 인쇄",
      "카톡 증거",
      "카카오톡 대화 내보내기",
      "대화 PDF 변환",
      "대화모아",
    ],
    applicationCategory: "UtilitiesApplication",
    ogImage: "/images/apps/evidence-og.png",
    heroImage: "/images/apps/evidence-hero.png",
    accent: "sky",
    subtitle: "내보낸 대화를 사진이 들어간 PDF와 증거목록으로",
    oneLiner: "카카오톡에서 내보낸 txt·zip 파일을 휴대폰에서 바로 정리합니다.",
    fixedNotice: "카카오와 관계없는 독립 앱입니다. 증거 채택 여부는 수사기관·법원이 판단합니다.",
    alternateName: "대화모아 - 대화 내보내기 PDF·증거목록 정리",
    guideEndCta: "이 과정을 휴대폰에서 한 번에 하고 싶다면, JBM SOFT가 만드는 대화모아(출시 준비 중)을 확인해 보세요.",
    lead: "카카오톡의 공식 대화 내보내기는 텍스트와 압축 파일까지입니다. 대화모아는 그 파일을 공유받아, 사진이 들어간 대화 PDF와 표시한 메시지 목록으로 정리합니다. 대화 PDF는 휴대폰 안에서 만들고, 아직 스토어에 없습니다.",
    futureAction: "내보낸 파일로 PDF 만들기",
    notifySubject: "대화모아 출시 알림",
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
        body: "내보내기 직후의 공유 창, 또는 파일 앱에서 대화모아로 보냅니다. 스토어 주소는 아직 없습니다.",
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
      "대화모아는 파일을 읽기 쉬운 PDF와 목록으로 바꾸는 정리 도구입니다. 채택 여부는 제출받는 곳이 판단합니다.",
      "무엇을 낼지, 그 형식을 받을지는 제출받는 곳의 기준입니다. 필요하면 변호사 등 전문가와 상의하세요.",
      "카카오톡은 카카오의 서비스입니다. 대화모아는 카카오와 관계없는 독립 앱이며, 제휴나 보증이 없습니다. 앱 이름과 아이콘에 카카오를 넣지 않습니다.",
      "공식 대화 내보내기가 PDF를 만들어 주지는 않습니다. 결과물은 텍스트·압축 파일이고, PDF는 이 앱이 따로 만듭니다.",
      "Google Play를 비롯한 스토어에 아직 등록되어 있지 않습니다. 다운로드 수, 이용자 리뷰, 패키지 이름은 없습니다.",
    ],
    faqs: [
      {
        question: "카톡 대화를 PDF로 저장할 때 사진도 들어가나요?",
        answer:
          "공식 내보내기 자체는 PDF가 아닙니다. 사진이 들어 있는 txt·zip을 대화모아에 넘기면, 사진을 파일명만 남기지 않고 페이지 안에 넣도록 준비하고 있습니다. 텍스트만 내보내면 붙일 사진이 없습니다.",
      },
      {
        question: "대화 내보내기를 하면 상대방에게 알림이 가나요?",
        answer:
          "카카오 고객센터의 대화 저장 안내는 기기에 텍스트를 보내거나 내부저장소·도큐멘트에 저장하는 방법만 적고, 상대방 알림은 설명하지 않습니다. 화면이 다를 수 있으니 그 안내를 함께 확인하세요.",
      },
      {
        question: "아이폰에서 내보낸 파일도 되나요?",
        answer:
          "아이폰 공식 내보내기도 텍스트 또는 압축 파일입니다. 그 파일을 안드로이드로 옮긴 뒤 공유하는 흐름을 준비 중입니다. 앱 자체는 안드로이드용입니다.",
      },
      {
        question: "갑 제1호증은 어떻게 적나요? 피고 쪽이면요?",
        answer:
          "표시해 둔 메시지를 갑 제○호증 또는 을 제○호증 형식의 표로 모읍니다. 번호를 보기 쉽게 붙이는 정리이고, 법원이나 기관이 번호를 준 것이 아닙니다. 어느 쪽 호칭을 쓸지는 제출받는 곳의 안내를 따릅니다.",
      },
      {
        question: "해시값은 왜 적나요?",
        answer:
          "변환에 쓴 원본 파일의 SHA-256을 PDF에 남깁니다. 나중에 그 파일과 같은지 대조하는 용도입니다. 대화 내용이 사실이라는 뜻은 아닙니다.",
      },
      {
        question: "이 PDF를 내면 증거로 받아들여지나요?",
        answer:
          "앱은 형식을 정리할 뿐이며, 증거로 받아들일지는 수사기관·법원이 판단합니다. 사건에 맞는 제출 방법은 변호사나 대한법률구조공단에 문의하세요.",
      },
    ],
    guideSlugs: [
      "kakao-chat-pdf",
      "kakao-chat-print",
      "kakao-chat-export",
      "evidence-list-numbering",
      "complaint-evidence-attach",
      "file-hash-check",
    ],
  },
  {
    slug: "used-car-inspect",
    name: "차보는날",
    seoTitle: "차보는날 – 중고차 성능기록부 보는법·현장 체크리스트",
    description:
      "중고차 성능·상태점검기록부를 항목별 쉬운 말로 풀고, 현장에서 볼 순서와 날짜가 찍힌 사진을 남깁니다. 기록부와 다를 때 성능보증보험 접수용 자료를 PDF로 묶습니다. 정비사 점검을 대신하지 않습니다.",
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
    accent: "green",
    subtitle: "성능기록부를 쉬운 말로, 현장 점검은 순서대로",
    oneLiner: "중고차 한 대를 보러 가는 날, 기록부와 현장 사진을 한곳에 남깁니다.",
    fixedNotice: "차 상태를 판정하지 않으며 정비사 점검을 대신하지 않습니다.",
    alternateName: "차보는날 - 중고차 성능기록부·체크리스트",
    guideEndCta: "기록부 풀이와 현장 사진 기록을 한 폴더에 모으는 앱, 차보는날을 준비하고 있습니다.",
    lead: "성능점검기록부를 찍으면 항목마다 무슨 말인지 풀어 줍니다. 보험이력·자동차365와 견줘 볼 체크리스트, 현장에서 찍을 순서, 시운전 때 볼 것, 견적서의 매도비·관리비용·취득세 읽기까지 한 대에 맞춰 둡니다. 정비 진단을 대신하지 않으며, 아직 스토어에 없습니다.",
    futureAction: "내 기록부 사진으로 확인하기",
    notifySubject: "차보는날 출시 알림",
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
        "금액은 공개 페이지를 옮긴 시장 맥락입니다. 예약 전에 해당 페이지에서 다시 확인하세요. 차보는날은 동행 점검을 대신하지 않고, 차 상태를 판정하지 않습니다.",
    },
    disclaimers: [
      "사고 여부, 침수, 앞으로의 고장을 판정하지 않습니다. 양호로 적힌 칸도 그 시점의 점검 표기일 뿐입니다.",
      "정비사, 리프트, 진단기, 도막 측정기를 대신하지 않습니다. 모르는 소음·누유·경고등은 현장 정비 점검을 받으세요.",
      "법률 자문이나 세무 상담이 아닙니다. 성능보증의 기간·거리·제외 부위와 취득세는 계약 서류와 당시 과세 기준을 확인하세요.",
      "기록부와 실차가 다를 때 만드는 PDF는 문의용 자료 묶음입니다. 보증 청구가 받아들여진다는 뜻이 아닙니다.",
      "Google Play에 아직 없습니다. 출시 알림만 받고 있습니다.",
    ],
    faqs: [
      {
        question: "이 앱으로 사고차인지 알 수 있나요?",
        answer:
          "앱은 기록부를 읽는 법과 확인 순서를 안내하고 기록을 남길 뿐, 차 상태를 판정하지 않습니다. 정비소·전문 점검을 함께 받으세요.",
      },
      {
        question: "성능기록부 유효기간은 얼마인가요?",
        answer:
          "일수를 이 페이지에서 단정하지 않습니다. 점검일, 매매 계약, 자동차365 안내가 서로 다를 수 있어 받은 서류의 날짜를 기준으로 확인하세요.",
      },
      {
        question: "성능기록부에서 사고와 단순수리는 어떻게 다른가요?",
        answer:
          "서류의 범례가 우선입니다. 흔히 단순수리는 외판 수준의 수리 표기로, 골격이 적힌 사고 표기와 구분해서 설명합니다. 그 차의 칸에 적힌 단어를 그대로 읽고, 앱이 사고 여부를 판정하지는 않습니다.",
      },
      {
        question: "기록부와 다르면 수리부터 해도 되나요?",
        answer:
          "차이를 사진과 글로 남기기 전에 고치면, 나중에 무엇을 봤는지 설명하기 어려워집니다. 수리 시점은 계약과 보증서에 따라 다릅니다.",
      },
      {
        question: "개인 직거래도 성능보증보험이 되나요?",
        answer:
          "모든 개인 거래에 성능보증보험이 붙는 것은 아닙니다. 기록부와 계약서에 보증 주체와 기간이 있는지를 확인하세요.",
      },
    ],
    guideSlugs: [
      "used-car-inspection-record",
      "used-car-warranty-claim",
      "used-car-checklist",
      "used-car-flood-check",
      "used-car-record-mismatch",
    ],
  },
  {
    slug: "family-loan",
    name: "가족차용노트",
    seoTitle: "가족차용노트 – 부모 자식 차용증·이자 상환 기록",
    description:
      "증여분과 차용분을 나눠 계산해 보고, 차용증 PDF를 만들고, 이자·원금 이체일 알림과 이체 화면 사진을 회차별로 남깁니다. 세무 상담·신고 대행이 아닌 기록·계산 도구입니다.",
    keywords: ["부모 자식 차용증", "가족간 차용증", "차용증 이자", "가족차용노트"],
    applicationCategory: "FinanceApplication",
    ogImage: "/images/apps/family-loan-og.png",
    heroImage: "/images/apps/family-loan-hero.png",
    accent: "orange",
    subtitle: "부모 자식 사이 차용증부터 상환 기록까지, 여러 해를 한곳에",
    oneLiner: "한 번 계산으로 끝내지 않고, 이자·원금 이체 기록을 회차마다 남기는 안드로이드 앱입니다.",
    fixedNotice: "세무 상담·신고 대행이 아닙니다. 계산은 참고용이며 기준일을 함께 표시합니다.",
    alternateName: "가족차용노트 - 부모 자식 차용증·이자 기록",
    guideEndCta: "차용증과 몇 년치 상환 기록을 한곳에 남기는 앱, 가족차용노트를 준비하고 있습니다.",
    lead: "자녀 주택자금처럼 큰돈을 가족 사이에 오갈 때, 증여분과 차용분을 참고로 나눠 보고 차용증 PDF와 이체 기록을 여러 해 동안 모아 둡니다. 세무사가 하는 상담이나 신고를 대신하지 않으며, 아직 스토어에 없습니다.",
    futureAction: "차용증과 상환 기록을 한곳에 남기기",
    notifySubject: "가족차용노트 출시 알림",
    cardSummary: "차용증 PDF와 여러 해의 이자·원금 이체 기록을 한 폴더에 모읍니다.",
    cardPoints: ["증여·차용 참고 계산", "차용증 PDF", "회차별 이체 기록"],
    heroPoints: [
      { label: "대상", body: "부모·자녀의 금전 기록" },
      { label: "계산", body: "참고용, 기준일 표시" },
      { label: "남기는 것", body: "차용증과 이체 사진" },
      { label: "지금 상태", body: "출시 예정" },
    ],
    steps: [
      {
        title: "지원 금액을 증여분과 차용분으로 나눠 봅니다",
        body: "성년 자녀 증여재산공제로 자주 안내되는 금액과, 화면에 적힌 적정이자율을 기준으로 참고 계산을 보여 줍니다. 세액을 확정하지 않습니다.",
      },
      {
        title: "차용증 PDF를 만듭니다",
        body: "당사자, 금액, 이자, 상환 일정, 작성일을 넣어 보관용 PDF를 만듭니다. 작성일은 있는 그대로 남깁니다.",
      },
      {
        title: "확정일자·공증은 방법만 안내합니다",
        body: "어디서 날짜를 남기는지 순서를 보여 줍니다. 등기소나 공증 사무소를 대신 방문하지 않습니다.",
      },
      {
        title: "이체일을 알리고 화면을 회차에 붙입니다",
        body: "이자·원금 이체일을 여러 해 알려 두고, 사용자가 직접 남긴 이체 화면 사진을 그 회차에 붙입니다. 은행 계좌를 자동으로 조회하지 않습니다.",
      },
      {
        title: "차용증·이체·계산 요약을 한 PDF로 묶습니다",
        body: "자료를 한곳에 모으는 용도입니다. 신고서를 작성하거나 제출하지 않습니다.",
      },
    ],
    features: [
      { title: "참고 계산", body: "공제와 이자율은 화면의 기준일과 함께 보여 줍니다. 법령이 바뀌면 그 값을 갱신합니다. 결과는 참고입니다." },
      { title: "차용증 PDF", body: "금액과 일정, 작성일이 있는 문서입니다. 세무서 서식이라고 적지 않습니다." },
      { title: "날짜를 남기는 방법", body: "확정일자와 공증의 차이를 안내합니다. 대행은 하지 않습니다." },
      { title: "상환 알림", body: "약속한 이체일을 알려 줍니다. 알림이 이체 완료를 뜻하지는 않습니다." },
      { title: "이체 화면 사진", body: "사용자가 남긴 화면을 회차에 붙입니다. 사진 속 금액을 사실로 확정하지는 않습니다." },
      { title: "묶음 PDF", body: "차용증, 이체 기록, 계산 요약을 한 파일로 보냅니다." },
    ],
    disclaimers: [
      "세무 상담이 아니고 신고를 대신하지 않습니다. 금액이 크거나 상황이 복잡하면 세무사와 상의하세요.",
      "계산 결과는 참고입니다. 세금이 없다는 뜻이 아니며, 과세 판단을 대신하지 않습니다.",
      "적정이자율과 증여 공제 한도는 기준일과 함께 표시합니다.",
      "확정일자와 공증은 안내만 합니다.",
      "Google Play에 아직 없습니다.",
    ],
    faqs: [
      {
        question: "부모님께 무이자로 빌려도 되나요?",
        answer:
          "가능하다고 단정하지 않습니다. 이자를 받지 않는 가족 간 대여는 증여로 볼 여지가 있어, 국세청 안내와 세무사 상담이 필요합니다. 앱은 화면에 적힌 적정이자율로 참고 이자만 계산합니다.",
      },
      {
        question: "차용증은 언제 써야 하나요? 나중에 써도 되나요?",
        answer:
          "돈을 빌리는 시점에 당사자, 금액, 이자, 갚는 날, 작성일을 남기는 편이 기록을 설명하기 쉽습니다. 국세청 정책 안내는 나중에 만든 서류만으로는 부족하고 실제 상환 기록이 필요하다고 설명합니다.",
      },
      {
        question: "확정일자는 어디서 받나요? 인터넷으로도 되나요?",
        answer:
          "확정일자는 공증과 다른 절차입니다. 등기소, 우체국, 인터넷 등기소의 공식 안내를 따르세요. 앱은 준비물만 알려 주고 신청을 대신하지 않습니다.",
      },
      {
        question: "자녀가 부모에게 이자를 주면 세금이 있나요?",
        answer:
          "이자에 대한 세금은 금액과 상황에 따라 다릅니다. 앱은 이자를 기록할 뿐 세액을 확정하지 않습니다. 필요하면 세무사와 상의하세요.",
      },
      {
        question: "적정이자율이 바뀌면 앱도 바뀌나요?",
        answer:
          "바뀝니다. 화면에 기준일을 같이 보여주고, 법령·고시가 바뀌면 그 값과 날짜를 갱신합니다. 저장해 둔 계산에는 그때의 기준일을 남깁니다.",
      },
      {
        question: "이 앱이 세금 신고를 해 주나요?",
        answer: "아니요. 기록과 계산만 돕습니다. 신고는 직접 하거나 세무사에게 맡기세요.",
      },
    ],
    guideSlugs: [
      "family-loan-iou",
      "family-loan-interest",
      "family-loan-date",
      "marriage-gift-deduction",
      "funding-plan-docs",
      "child-gift-limit",
    ],
  },
];

export function getApp(slug: string) {
  return firstPartyApps.find((app) => app.slug === slug);
}
