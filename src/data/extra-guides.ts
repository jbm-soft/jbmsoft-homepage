import type { Guide, GuideBlock } from "@/data/guides";
import { adequateInterestLabel, taxReference } from "@/data/tax-reference";

const evidenceImage = "/images/apps/evidence-og.png";
const carImage = "/images/apps/used-car-og.png";
const familyImage = "/images/apps/family-loan-og.png";

const notTax: GuideBlock = {
  kind: "note",
  text: "이 글은 일반 정보이며 세무 상담이 아닙니다. 금액이 크거나 상황이 복잡하면 세무사와 상의하세요.",
};

function appGuide(
  partial: Omit<Guide, "toolSlugs" | "portfolioSlugs" | "cta" | "ctaHref" | "ctaNote"> & {
    app: string;
    toolSlugs?: string[];
  },
): Guide {
  const { app, toolSlugs = [], ...rest } = partial;
  return {
    ...rest,
    toolSlugs,
    portfolioSlugs: [],
    appSlugs: [app],
    cta: "출시 준비 중인 앱 안내",
    ctaHref: `/apps/${app}`,
    ctaNote: "앱은 출시 예정입니다. 글의 순서는 앱 없이 따라 할 수 있습니다.",
  };
}

export const extraGuides: Guide[] = [
  appGuide({
    app: "evidence",
    slug: "kakao-chat-export",
    title: "카카오톡 대화 내보내기 방법과 파일 저장 위치 (안드로이드·아이폰)",
    description: "채팅방 메뉴의 대화 내용 내보내기로 txt 또는 zip을 받는 순서와, 안드로이드·아이폰에서 파일이 어디에 있는지 확인하는 방법입니다.",
    keywords: ["카카오톡 대화 내보내기", "대화 내보내기 위치", "아이폰 카카오톡 대화 내보내기"],
    image: evidenceImage,
    relatedSlugs: ["kakao-chat-pdf"],
    sections: [
      {
        heading: "내보내기와 백업은 다릅니다",
        blocks: [
          { kind: "p", text: "카카오 고객센터가 안내하는 대화 내용 내보내기는 그 채팅방을 텍스트나 저장 파일로 꺼내는 기능입니다. 비밀번호를 걸어 복원용으로 하는 대화 백업과는 메뉴가 다릅니다." },
          { kind: "links", items: [{ label: "카카오 고객센터 · 대화 내용을 저장하고 싶어요", href: "https://cs.kakao.com/helps_html/1073209354?locale=ko" }] },
        ],
      },
      {
        heading: "안드로이드",
        blocks: [
          { kind: "ol", items: [
            "저장할 채팅방을 엽니다.",
            "오른쪽 위 메뉴와 설정으로 들어갑니다.",
            "대화 내용 내보내기에서 텍스트만 보내거나, 모든 메시지를 내부저장소에 저장합니다.",
            "내부저장소에 저장했다면 내 파일에서 KakaoTalk 또는 Chats를 찾습니다. 기기마다 Download, Documents 아래에 있을 수 있습니다.",
          ] },
        ],
      },
      {
        heading: "아이폰",
        blocks: [
          { kind: "ol", items: [
            "채팅방 메뉴와 설정에서 대화 내용 내보내기를 엽니다.",
            "텍스트만 보내기는 메일 작성으로 이어지는 안내가 많습니다. 본인 메일로 보낸 뒤 첨부를 저장합니다.",
            "모든 메시지 도큐멘트로 저장하기는 파일 앱의 카카오톡 쪽에 zip으로 남는 경우가 많습니다.",
          ] },
          { kind: "note", text: "결과물은 PDF가 아닙니다. 사진까지 필요하면 모든 메시지 저장을 고르고, zip 안의 사진 폴더를 txt와 함께 두세요." },
        ],
      },
      {
        heading: "파일을 못 찾을 때",
        blocks: [
          { kind: "ul", items: [
            "저장한 날짜로 파일 앱을 검색합니다.",
            "공유 창에서 메일을 골랐다면 받은편지함의 첨부를 봅니다.",
            "대화가 길면 txt 여러 개가 zip 하나에 들어 있습니다. 일부만 옮기지 않습니다.",
          ] },
        ],
      },
    ],
  }),
  appGuide({
    app: "evidence",
    slug: "evidence-list-numbering",
    title: "갑 제1호증 표기 방법과 증거목록 쓰는 법 (을호증 포함)",
    description: "갑 제○호증과 을 제○호증은 보기 쉽게 번호를 붙이는 형식입니다. 목록에 무엇을 적는지와, 번호가 기관의 결정이 아닌 이유를 정리합니다.",
    keywords: ["갑 제1호증 기재방법", "증거목록 작성", "을호증"],
    image: evidenceImage,
    relatedSlugs: ["kakao-chat-print", "complaint-evidence-attach"],
    sections: [
      {
        heading: "번호는 정리용입니다",
        blocks: [
          { kind: "p", text: "갑 제1호증처럼 쓰는 번호는 제출하는 쪽에서 자료를 구분하려고 붙이는 형식입니다. 법원이나 수사기관이 그 번호를 부여했다는 뜻이 아닙니다. 원고 쪽 자료는 갑, 피고 쪽 자료는 을로 구분하는 설명이 많지만, 어느 호칭을 쓸지는 제출받는 곳의 안내를 따릅니다." },
          { kind: "note", text: "이 글은 서류 형식을 읽는 일반 정보입니다. 어떤 자료를 낼지는 변호사나 대한법률구조공단에 문의하세요." },
        ],
      },
      {
        heading: "한 줄에 적을 것",
        blocks: [
          { kind: "ol", items: [
            "번호. 예: 갑 제1호증. 다음 자료는 제2호증.",
            "자료의 이름. 예: 대화 정리 PDF, 사진 3장.",
            "만든 날짜와, 대화라면 첫 메시지와 마지막 메시지의 날짜.",
            "원본 파일의 이름과 SHA-256. 정리본과 원본을 같은 칸에 섞지 않습니다.",
          ] },
        ],
      },
      {
        heading: "대화에서 표시한 말만 뽑을 때",
        blocks: [
          { kind: "p", text: "긴 대화 전부를 한 번호로 두고, 그중 표시한 말만 하위 목록으로 둘 수 있습니다. 발췌만 내고 원본 파일을 버리면 나중에 앞뒤 문맥을 보여줄 수 없습니다. 원본 txt·zip은 따로 보관합니다." },
        ],
      },
    ],
  }),
  appGuide({
    app: "evidence",
    slug: "complaint-evidence-attach",
    title: "고소장에 대화·사진 증거 첨부하는 순서",
    description: "고소장에 대화와 사진을 붙일 때 원본, 정리본, 목록을 나누는 순서입니다. 고소 여부나 죄명은 이 글이 정하지 않습니다.",
    keywords: ["고소장 증거 첨부방법", "고소장 증거 제출방법"],
    image: evidenceImage,
    relatedSlugs: ["evidence-list-numbering", "kakao-chat-pdf"],
    sections: [
      {
        heading: "이 글이 하지 않는 일",
        blocks: [
          { kind: "note", text: "고소를 할지, 어떤 죄명으로 쓸지는 변호사나 법률구조공단, 경찰 민원 안내를 따르세요. 아래는 이미 제출하기로 한 대화·사진을 빠뜨리지 않게 묶는 순서입니다." },
        ],
      },
      {
        heading: "순서",
        blocks: [
          { kind: "ol", items: [
            "카카오톡에서 내보낸 원본 txt 또는 zip을 수정하지 않고 복사합니다.",
            "읽을 정리본을 따로 만듭니다. 사진은 파일명만이 아니라 그 말 옆에 있는지 확인합니다.",
            "목록에 번호, 자료 이름, 기간, 원본 해시를 적습니다.",
            "주민등록번호나 계좌처럼 제출 범위 밖인 숫자는 정리본에서만 가리고, 원본은 그대로 둡니다.",
            "제출 방법(방문, 우편, 온라인)은 받는 기관의 안내를 확인합니다.",
          ] },
        ],
      },
    ],
  }),
  appGuide({
    app: "evidence",
    slug: "file-hash-check",
    title: "파일 해시값(SHA-256) 확인하는 방법: 휴대폰·PC",
    description: "SHA-256은 파일이 나중에 바뀌었는지 대조하는 값입니다. 대화가 사실이라는 뜻이 아니며, 휴대폰과 PC에서 같은 파일을 확인하는 순서만 적습니다.",
    keywords: ["해시값 확인 방법", "SHA-256", "해시값 무결성"],
    image: evidenceImage,
    relatedSlugs: ["kakao-chat-pdf"],
    toolSlugs: ["file-hash"],
    sections: [
      {
        heading: "해시가 말해 주는 것",
        blocks: [
          { kind: "p", text: "같은 파일이면 SHA-256도 같습니다. 한 글자만 고쳐도 값이 달라집니다. 대화 내용이 진실한지, 제출에 쓸 수 있는지는 말해 주지 않습니다." },
        ],
      },
      {
        heading: "확인 순서",
        blocks: [
          { kind: "ol", items: [
            "비교할 파일을 복사만 하고 이름 변경 외에는 열어서 저장하지 않습니다. 메모장 저장만으로도 값이 바뀔 수 있습니다.",
            "PC라면 운영체제의 인증서나 certutil, 또는 브라우저의 해시 도구로 SHA-256을 냅니다. 사이트에 있는 파일 해시 도구는 브라우저 안에서만 계산합니다.",
            "휴대폰이라면 파일을 컴퓨터로 그대로 옮긴 뒤 같은 방식으로 계산하는 편이 실수가 적습니다.",
            "정리본 PDF의 해시와 원본 txt·zip의 해시를 한 메모에 구분해 적습니다.",
          ] },
        ],
      },
    ],
  }),
  appGuide({
    app: "used-car-inspect",
    slug: "used-car-checklist",
    title: "중고차 살 때 체크리스트: 현장에서 보는 순서",
    description: "매물을 보러 가서 서류, 외관, 실내, 시운전 순으로 남기는 체크리스트입니다. 정비 진단을 대신하지 않습니다.",
    keywords: ["중고차 살때 체크리스트", "중고차 사기 전 체크"],
    image: carImage,
    relatedSlugs: ["used-car-inspection-record", "used-car-flood-check"],
    sections: [
      {
        heading: "가기 전에",
        blocks: [
          { kind: "ul", items: [
            "자동차365와 보험 사고이력에서 그 차의 공개 이력을 먼저 봅니다. 앱이 대신 조회하지는 않습니다.",
            "성능기록부가 있으면 글자가 읽히게 사진을 찍어 둡니다.",
            "볼 수 없는 항목은 빈칸으로 두지 말고 확인 못 함이라고 적습니다.",
          ] },
        ],
      },
      {
        heading: "현장 순서",
        blocks: [
          { kind: "ol", items: [
            "번호판, 차대번호, 계기판 주행거리를 서류와 나란히 찍습니다.",
            "외관 사방, 유리, 램프, 타이어.",
            "보닛을 연 엔진룸. 누유가 보이면 그 위치.",
            "실내 경고등, 에어컨, 창문, 냄새.",
            "시운전에서 핸들, 브레이크, 변속, 이상음. 부품 이름을 추측해 단정하지 않습니다.",
          ] },
          { kind: "note", text: "하부와 도막, 진단기가 필요하면 정비 점검을 따로 받으세요. 이 순서는 구매자 기록입니다." },
        ],
      },
    ],
  }),
  appGuide({
    app: "used-car-inspect",
    slug: "used-car-flood-check",
    title: "중고차 침수차 확인 방법: 서류 조회와 현장 확인",
    description: "침수 이력은 자동차365 같은 공개 조회와 실차에서 보이는 흔적을 나눠 확인합니다. 조회에 없다고 침수가 아니라는 뜻은 아닙니다.",
    keywords: ["중고차 침수차 확인 방법", "침수 이력"],
    image: carImage,
    relatedSlugs: ["used-car-checklist", "used-car-inspection-record"],
    sections: [
      {
        heading: "서류에서",
        blocks: [
          { kind: "ul", items: [
            "성능기록부의 특별이력 칸에 침수·화재가 어떻게 적혀 있는지 봅니다.",
            "자동차365에서 침수 전손으로 공개된 이력이 있는지 구매자가 직접 조회합니다.",
            "보험 이력과 기록부의 문장이 다르면 그 차이를 한 줄로 적습니다.",
          ] },
          { kind: "links", items: [{ label: "자동차365", href: "https://www.car365.go.kr/" }] },
        ],
      },
      {
        heading: "현장에서 남길 것",
        blocks: [
          { kind: "p", text: "실내 바닥, 안전벨트 뿌리, 트렁크, 전기 커넥터 주변처럼 물이 고이기 쉬운 곳을 넓게 한 장, 가깝게 한 장 찍습니다. 녹, 진흙, 곰팡이 냄새가 있으면 사실만 적고 침수라고 단정하지 않습니다. 판단은 정비 점검과 이력 조회를 같이 봐야 합니다." },
        ],
      },
    ],
  }),
  appGuide({
    app: "used-car-inspect",
    slug: "used-car-record-mismatch",
    title: "성능기록부와 실제 차 상태가 다를 때 먼저 할 일",
    description: "기록부 표기와 지금 보이는 상태가 다를 때, 수리보다 먼저 항목과 사진을 남기는 순서입니다. 보증 접수 절차는 별도 글에서 다룹니다.",
    keywords: ["성능기록부랑 다르면", "성능기록부 허위"],
    image: carImage,
    relatedSlugs: ["used-car-warranty-claim", "used-car-inspection-record"],
    sections: [
      {
        heading: "한 문장으로 차이를 적습니다",
        blocks: [
          { kind: "p", text: "기록부의 칸 이름, 그 칸의 표기, 지금 보이는 상태를 한 줄에 붙입니다. 예: 원동기 오일 누유는 양호. 보닛을 여니 엔진 아래에 기름이 보인다." },
          { kind: "note", text: "이 글은 법률 자문이 아닙니다. 보증 기간과 접수 서류는 보증서와 성능보증보험 안내 글을 보세요." },
        ],
      },
      {
        heading: "먼저 할 일",
        blocks: [
          { kind: "ol", items: [
            "해당 칸이 읽히게 기록부를 찍고, 실차를 넓게·가깝게 찍습니다.",
            "계기판 주행거리와 번호판, 찍힌 날짜가 나중에 연결되게 합니다.",
            "닦거나 수리하기 전에 사진을 남길지 정합니다. 이미 닦았으면 그 사실을 적습니다.",
            "성능점검을 한 사업자와 판매자에게 그 문장과 사진을 보냅니다.",
          ] },
        ],
      },
    ],
  }),
  appGuide({
    app: "family-loan",
    slug: "family-loan-iou",
    title: "부모 자식 차용증 쓰는 법: 꼭 들어갈 항목",
    description: "부모와 자녀 사이 차용증에 당사자, 금액, 이자, 상환일, 작성일을 남기는 방법입니다. 세무 상담이 아니며 신고를 대신하지 않습니다.",
    keywords: ["부모 자식 차용증", "가족간 차용증 양식", "가족간 차용증 쓰는법"],
    image: familyImage,
    relatedSlugs: ["family-loan-interest", "family-loan-date"],
    sections: [
      { heading: "먼저", blocks: [notTax] },
      {
        heading: "꼭 들어갈 항목",
        blocks: [
          { kind: "ul", items: [
            "돈을 빌려주는 사람과 빌리는 사람의 이름",
            "원금",
            "이자율과 이자를 주는 날. 무이자라면 그 사실을 문장으로",
            "원금을 갚는 일정",
            "작성일. 나중에 빈칸을 채워 넣은 것처럼 보이지 않게 그 날짜를 적습니다",
            "계좌처럼 돈을 주고받은 경로. 통장 사본은 차용증과 따로 보관합니다",
          ] },
        ],
      },
      {
        heading: "나중에 쓰면 설명이 어려워지는 이유",
        blocks: [
          { kind: "p", text: "국세청 정책 안내는 차용증을 쓰기만 해서 끝나는 일이 아니고, 약속대로 갚은 금융 기록이 필요하다고 설명합니다. 돈을 이미 보낸 뒤에 서류를 만들면, 작성일과 이체일이 어긋난 이유를 따로 적어야 합니다." },
          { kind: "links", items: [{ label: "정책브리핑 · 가족 간 차용증", href: "https://www.korea.kr/news/policyNewsView.do?newsId=148966673" }] },
        ],
      },
    ],
  }),
  appGuide({
    app: "family-loan",
    slug: "family-loan-interest",
    title: "가족 간 차용 이자율 4.6%와 무이자 한도, 계산 방법",
    description: `${adequateInterestLabel()}를 기준으로 가족 간 차용 이자를 참고 계산하는 방법입니다. 세금이 없다는 뜻이 아닙니다.`,
    keywords: ["부모 자식 차용증 이자율", "가족 차용증 이자율", "차용증 이자 계산"],
    image: familyImage,
    relatedSlugs: ["family-loan-iou", "child-gift-limit"],
    sections: [
      { heading: "일반 정보", blocks: [notTax, { kind: "p", text: adequateInterestLabel() + ". " + taxReference.adequateInterestNote }] },
      {
        heading: "참고 계산",
        blocks: [
          { kind: "ol", items: [
            "원금에 화면의 적정이자율과 기간을 곱해 이자 참고액을 냅니다.",
            "실제로 준 이자가 그 참고액보다 적으면, 차이만큼을 어떻게 볼지는 세무 상담 영역입니다. 이 글은 차이만 계산하는 방법까지입니다.",
            "무이자라고 적었더라도 증여로 보지 않는다는 뜻은 아닙니다. 한도를 숫자 하나로 단정하지 말고 국세청 안내를 확인하세요.",
          ] },
          { kind: "note", text: "이 사이트의 이자율은 한곳의 값만 고치면 가이드와 앱 안내가 같이 바뀌도록 두었습니다. 오늘 기준일은 " + taxReference.verifiedOn + "입니다." },
        ],
      },
    ],
  }),
  appGuide({
    app: "family-loan",
    slug: "family-loan-date",
    title: "차용증 확정일자 받는 곳과 공증 차이",
    description: "확정일자는 그 날짜에 서류가 있었다는 표시를 받는 절차이고, 공증은 다른 절차입니다. 신청을 대신하지 않습니다.",
    keywords: ["차용증 확정일자", "차용증 공증", "확정일자 인터넷"],
    image: familyImage,
    relatedSlugs: ["family-loan-iou"],
    sections: [
      { heading: "일반 정보", blocks: [notTax] },
      {
        heading: "무엇이 다른가",
        blocks: [
          { kind: "ul", items: [
            "확정일자: 서류가 그 날짜에 존재했다는 점을 남기는 절차로 안내됩니다. 등기소, 우체국, 인터넷 등기소 안내를 각각 확인하세요.",
            "공증: 공증 사무소에서 문서의 작성 사실을 확인하는 다른 절차입니다. 수수료는 사무소와 금액에 따라 다릅니다.",
            "둘 다 했다고 세금이 정해지지는 않습니다. 이체 기록과 함께 보관하는 자료입니다.",
          ] },
          { kind: "p", text: "인터넷으로 가능한지는 등기소 안내가 바뀝니다. 이 글은 가능하다고 단정하지 않고, 공식 화면의 메뉴를 확인하라고 안내합니다." },
        ],
      },
    ],
  }),
  appGuide({
    app: "family-loan",
    slug: "marriage-gift-deduction",
    title: "혼인·출산 증여공제: 조건과 신고 때 준비할 서류",
    description: "혼인·출산 증여재산공제는 상속세 및 증여세법의 별도 공제입니다. 조건과 서류는 법령과 국세청 안내를 확인하고, 이 글은 체크리스트만 제공합니다.",
    keywords: ["혼인증여공제", "혼인 증여 공제 신고 서류", "출산 증여 공제"],
    image: familyImage,
    relatedSlugs: ["child-gift-limit", "funding-plan-docs"],
    sections: [
      { heading: "일반 정보", blocks: [notTax] },
      {
        heading: "조건은 조문을 봅니다",
        blocks: [
          { kind: "p", text: "혼인·출산 증여재산공제는 상속세 및 증여세법 제53조의2에서 다룹니다. 누가, 언제까지, 얼마까지인지는 개정될 수 있어 이 페이지에 금액을 단정하지 않습니다. 국세청 상담 자료와 법 조문을 신고 전에 다시 읽으세요." },
          { kind: "links", items: [
            { label: "국세청 상담 Q&A", href: "https://call.nts.go.kr/call/qna/selectQnaInfo.do?ctgId=CTG12222&mi=2787" },
            { label: "제53조의2 조문 안내", href: "https://govbrief.kr/scan/001561/53%EC%9D%982/" },
          ] },
        ],
      },
      {
        heading: "신고 때 챙기기 쉬운 서류",
        blocks: [
          { kind: "ul", items: [
            "혼인 또는 출산 사실을 보여주는 서류",
            "돈을 준 날짜와 금액이 보이는 이체 기록",
            "증여 계약이나 합의 내용",
            "다른 증여와 10년 합산이 있는 경우 그 목록",
          ] },
          { kind: "p", text: "서류 목록은 체크용입니다. 신고서 작성은 직접 하거나 세무사에게 맡기세요." },
        ],
      },
    ],
  }),
  appGuide({
    app: "family-loan",
    slug: "funding-plan-docs",
    title: "자금조달계획서에 부모님 차용금 적는 법과 증빙",
    description: "주택 자금조달계획서에 부모님 차용금을 적을 때 차용증, 이체, 상환 기록을 어떻게 나누는지 설명합니다. 계획서 작성을 대신하지 않습니다.",
    keywords: ["자금조달계획서 차용증", "자금조달계획서 부모님 차용증"],
    image: familyImage,
    relatedSlugs: ["family-loan-iou", "family-loan-interest"],
    sections: [
      { heading: "일반 정보", blocks: [notTax] },
      {
        heading: "칸을 나누어 준비합니다",
        blocks: [
          { kind: "ul", items: [
            "자기 자금, 대출, 증여, 차용은 계획서에서 다른 칸인 경우가 많습니다. 부모에게 받은 돈을 한 칸에 몰아 쓰지 말고 증여분과 차용분을 나눠 적습니다.",
            "차용분이면 차용증의 원금, 이자, 상환일과 이체 기록을 붙입니다.",
            "증여분이면 증여 합의와 그 금액의 이체를 붙입니다.",
            "계획서 양식과 제출처의 작성 요령이 우선입니다. 이 글은 그 양식을 대신 쓰지 않습니다.",
          ] },
        ],
      },
    ],
  }),
  appGuide({
    app: "family-loan",
    slug: "child-gift-limit",
    title: "성인 자녀 증여 한도 5천만 원과 10년 합산",
    description: `성년 자녀 증여재산공제로 자주 안내되는 ${taxReference.adultChildGiftDeductionWonLabel}과 10년 합산을 읽는 방법입니다. 참고 정보이며 신고를 대신하지 않습니다.`,
    keywords: ["자녀 증여 한도", "자녀 증여 한도 10년", "성인자녀 증여한도"],
    image: familyImage,
    relatedSlugs: ["marriage-gift-deduction", "family-loan-interest"],
    sections: [
      { heading: "일반 정보", blocks: [notTax] },
      {
        heading: "5천만 원을 어떻게 읽나",
        blocks: [
          { kind: "p", text: `${taxReference.adultChildGiftDeductionNote} 기준일 ${taxReference.verifiedOn}. 직계존속에게서 받은 증여를 10년 단위로 합산하는 설명이 일반적입니다. 미성년 자녀, 배우자, 혼인·출산 공제는 다른 금액일 수 있습니다.` },
          { kind: "ul", items: [
            "이미 지난 10년 동안 같은 관계에서 받은 증여가 있으면 그 금액을 같이 적습니다.",
            "공제 한도 안의 금액이라고 해서 신고가 필요 없는지는 상황마다 다릅니다.",
            "차용으로 적는 금액은 이 공제와 별도입니다. 이자와 상환 기록이 없으면 증여로 논의될 수 있습니다.",
          ] },
        ],
      },
    ],
  }),
  {
    slug: "app-development-cost",
    title: "앱 개발 외주 비용, 견적이 달라지는 항목 정리",
    description: "안드로이드 앱 개발 외주 견적이 갈리는 이유를 항목으로 정리합니다. JBM SOFT의 고정 단가는 없고, 금액 예시는 표시한 것만 예시입니다.",
    keywords: ["앱 개발 외주 비용", "앱 제작 비용", "안드로이드 앱 개발 비용"],
    toolSlugs: [],
    portfolioSlugs: ["mobile-app-mvp"],
    sections: [
      {
        heading: "금액을 이 글에서 정하지 않는 이유",
        blocks: [
          { kind: "p", text: "JBM SOFT는 화면 수와 연동, 스토어 출시 포함 여부에 따라 견적을 냅니다. 공개된 고정 단가표는 없어, 이 글에 우리 가격을 숫자로 적지 않습니다. 기간 기준은 단순 소개형 1~2주, 기능형 3~6주, 중대형 2~3개월로 안내해 왔습니다." },
        ],
      },
      {
        heading: "견적이 달라지는 항목",
        blocks: [
          { kind: "ul", items: [
            "화면 수와 회원·관리자 계정",
            "로그인, 결제, 푸시, 지도, 외부 API",
            "디자인을 새로 잡는지",
            "안드로이드만인지, 다른 플랫폼도 있는지",
            "스토어 등록정보와 검색어 정리까지 포함할지",
            "서버 비용과 외부 서비스 이용료. 개발비와 따로 나오는 경우가 많습니다",
            "납품 뒤 수정. 14일 안의 단순 오류와 그 이후 기능 변경은 다릅니다",
          ] },
        ],
      },
      {
        heading: "견적서에서 빠지기 쉬운 것",
        blocks: [
          { kind: "ul", items: [
            "스토어 개발자 등록비",
            "푸시·지도·문자처럼 사용량에 따라 나가는 요금",
            "출시 뒤 운영 대응",
            "기획이 바뀌면 추가되는 화면",
          ] },
          { kind: "note", text: "다른 업체의 공개 시작 가격을 우리 가격처럼 적지 않습니다. 비교가 필요하면 받은 견적서의 포함·제외를 같은 항목으로 맞춰 보세요." },
        ],
      },
    ],
    cta: "기간·견적 기준 보기",
    ctaHref: "/pricing",
  },
  {
    slug: "app-quote-checklist",
    title: "앱 개발 견적서 비교 체크리스트",
    description: "앱 개발 외주 견적서를 나란히 볼 때 포함 범위, 일정, 수정, 스토어, 유지보수를 같은 질문으로 확인하는 목록입니다.",
    keywords: ["앱개발견적", "앱 개발 견적서", "앱 개발 외주"],
    toolSlugs: [],
    portfolioSlugs: ["mobile-app-mvp"],
    relatedSlugs: ["app-development-cost"],
    sections: [
      {
        heading: "같은 질문으로 맞춥니다",
        blocks: [
          { kind: "ol", items: [
            "결과물이 설치 파일인지, 스토어 게시까지인지",
            "디자인 시안 횟수와 개발 중간 점검 횟수",
            "안드로이드만인지 다른 기기도 있는지",
            "서버, 관리자, 결제가 포함인지 별도인지",
            "납품 후 오류 수정 기간과, 기능 변경의 단가 기준",
            "소스와 스토어 계정이 누구에게 있는지",
            "일정이 늦어질 때의 범위 조정",
          ] },
        ],
      },
      {
        heading: "숫자만 비교하지 않습니다",
        blocks: [
          { kind: "p", text: "낮은 금액이 같은 범위를 뜻하지 않습니다. JBM SOFT 견적은 상담 뒤에 나오고, 이 목록에 없는 고정 가격은 없습니다. 순위나 매출을 약속하는 항목이 견적서에 있으면 그 문장을 따로 물어 보세요." },
        ],
      },
    ],
    cta: "앱 개발 외주 안내",
    ctaHref: "/services/app-development",
  },
];
