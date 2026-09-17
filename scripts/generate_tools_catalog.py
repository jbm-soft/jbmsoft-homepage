# -*- coding: utf-8 -*-
"""Generate src/data/tools.ts with ~100 SEO tools."""
from pathlib import Path

# (slug, name, short, desc, long, category, keywords, related, featured, impl)
# impl drives ToolApp registry

RAW = [
# === existing core (keep slugs) ===
("timer","무료 온라인 타이머","타이머","분·초 설정과 알람이 되는 무료 온라인 타이머입니다.","공부·요리·운동용 웹 타이머. 설치 없이 바로 실행됩니다.","productivity",["온라인 타이머","무료 타이머","웹 타이머"],["stopwatch","pomodoro","dday"],True,"timer"),
("stopwatch","무료 온라인 스톱워치","스톱워치","랩 타임 기록이 되는 무료 온라인 스톱워치입니다.","시작·정지·랩·리셋 지원.","productivity",["온라인 스톱워치","랩 타임"],["timer","pomodoro"],True,"stopwatch"),
("pomodoro","포모도로 타이머","포모도로","25분 집중 + 휴식 사이클 포모도로 타이머입니다.","집중·휴식 사이클을 한 화면에서 관리합니다.","productivity",["포모도로","공부 타이머"],["timer","stopwatch"],True,"pomodoro"),
("qrcode","무료 QR 코드 생성기","QR 생성기","URL·텍스트로 QR 코드를 만들고 다운로드하세요.","명함·포스터·매장 안내용 QR을 즉시 생성합니다.","utility",["QR 코드 생성기","무료 QR"],["barcode-generator","password"],True,"qrcode"),
("bmi","BMI 계산기","BMI","키·몸무게로 BMI와 체중 상태를 확인합니다.","비만도 참고용 BMI 계산기입니다.","calculator",["BMI 계산기","체질량지수"],["bmr-calculator","body-fat"],True,"bmi"),
("unit-converter","단위 변환기","단위 변환","길이·무게·온도 등 단위를 변환합니다.","자주 쓰는 단위를 빠르게 변환합니다.","converter",["단위 변환기","길이 변환"],["px-to-rem","data-unit"],False,"unit"),
("password","비밀번호 생성기","비밀번호","안전한 랜덤 비밀번호를 생성합니다.","길이·옵션을 지정해 강력한 비밀번호를 만듭니다.","utility",["비밀번호 생성기","랜덤 비밀번호"],["password-strength","uuid"],True,"password"),
("word-counter","글자수 계산기","글자수","공백 포함/제외 글자수·단어수를 계산합니다.","자기소개서·과제용 글자수 계산기.","text",["글자수 계산기","공백 제외 글자수"],["reading-time","remove-spaces"],True,"word-counter"),
("dday","디데이 계산기","디데이","목표일까지 남은 일수를 계산합니다.","시험·여행·기념일 D-Day.","calculator",["디데이 계산기","D-Day"],["date-calc","working-days"],True,"dday"),
("age","만나이 계산기","만나이","생년월일로 만나이를 계산합니다.","한국식 만나이 기준 참고 계산.","calculator",["만나이 계산기","나이 계산"],["dday","zodiac"],False,"age"),
("lotto","로또 번호 생성기","로또","랜덤 로또 번호를 추첨합니다.","재미용 번호 생성기.","fun",["로또 번호 생성기","로또 추첨"],["random-picker","dice"],False,"lotto"),
("fortune","오늘의 운세","운세","가벼운 오늘의 운세 문구를 뽑습니다.","재미용 운세 뽑기.","fun",["오늘의 운세","운세 보기"],["zodiac","quotes"],False,"fortune"),
("quotes","명언 생성기","명언","랜덤 명언을 보여줍니다.","동기부여 명언 카드.","fun",["명언","동기부여 명언"],["fortune","quotes"],False,"quotes"),
("rps","가위바위보","가위바위보","컴퓨터와 가위바위보를 합니다.","간단 미니게임.","fun",["가위바위보","랜덤 게임"],["dice","coin-flip"],False,"rps"),
("engname","영어 이름 변환기","영어이름","한글 이름을 로마자로 추정 변환합니다.","참고용 로마자 표기.","korean",["영어 이름 변환","로마자 표기"],["romanize-korean","phone-format"],False,"engname"),
("base64","Base64 인코더/디코더","Base64","텍스트 Base64 인코딩·디코딩.","개발·디버깅용.","developer",["Base64","인코더"],["url-encode","hash"],False,"base64"),
("json-formatter","JSON 포맷터","JSON","JSON 정렬·검증.","들여쓰기와 문법 검사.","developer",["JSON 포맷터","JSON 정렬"],["json-to-csv","csv-to-json"],True,"json"),
("color-picker","색상 피커 (HEX/RGB)","색상 피커","HEX·RGB 색상 코드를 복사합니다.","디자인·개발용.","developer",["색상 피커","HEX"],["color-contrast","image-color"],False,"color"),
("salary","연봉 실수령액 계산기","실수령액","연봉 기준 대략 실수령액을 계산합니다.","참고용 세후 월급 추정.","calculator",["실수령액 계산기","연봉 실수령액"],["vat-calculator","hourly-wage"],True,"salary"),
("percent","퍼센트 계산기","퍼센트","비율·증가율·할인율을 계산합니다.","일상 비율 계산.","calculator",["퍼센트 계산기","증가율"],["discount","vat-calculator"],True,"percent"),
("discount","할인율·세일 가격 계산기","할인 계산","정가·할인율로 할인가를 계산합니다.","쇼핑·견적용.","calculator",["할인율 계산기","세일 가격"],["percent","split-bill"],True,"discount"),
("loan","대출 이자·월 상환액 계산기","대출 계산","원리금균등 월 상환액을 추정합니다.","참고용 대출 계산.","calculator",["대출 이자 계산기","월 상환액"],["compound-interest","salary"],False,"loan"),
("date-calc","날짜 계산기","날짜 계산","날짜 더하기·빼기, 일수 계산.","일정·마감 관리.","calculator",["날짜 계산기","일수 계산"],["dday","working-days"],True,"date-calc"),
("random-picker","제비뽑기·랜덤 추첨기","제비뽑기","이름 목록에서 하나를 뽑습니다.","팀 추첨·경품용.","fun",["제비뽑기","랜덤 추첨"],["lotto","dice"],True,"random-picker"),
("uuid","UUID 생성기","UUID","UUID v4를 여러 개 생성합니다.","개발·테스트용.","developer",["UUID 생성기","UUID v4"],["password","hash"],False,"uuid"),
("hash","텍스트 해시 생성기","해시","SHA-256 해시를 생성합니다.","체크용 해시.","developer",["해시 생성기","SHA-256"],["file-hash","base64"],False,"hash"),

# === FILE / DOC (high KR search) ===
("file-extension","파일 확장자 변경기","확장자 변경","업로드한 파일의 확장자를 바꿔 다시 저장합니다.","확장자만 변경해 다운로드합니다. 실제 포맷 변환이 필요한 경우 아래 변환 도구를 사용하세요.","file",["파일 확장자 변경","확장자 바꾸기","파일명 확장자"],["mime-checker","file-rename"],True,"file-ext"),
("file-rename","파일명 일괄 변경기","파일명 변경","여러 파일 이름을 규칙에 따라 바꿔 다운로드합니다.","접두어·접미어·번호 붙이기.","file",["파일명 변경","일괄 파일명"],["file-extension","slugify"],False,"file-rename"),
("hwp-viewer","한글 HWP 뷰어 (온라인)","HWP 뷰어","HWP 파일을 브라우저에서 열어 내용을 확인합니다.","설치 없이 HWP를 업로드해 미리보기합니다. 복잡한 서식은 일부만 표시될 수 있습니다.","file",["HWP 뷰어","한글 파일 보기","온라인 HWP"],["txt-viewer","pdf-text-extract"],True,"hwp-viewer"),
("txt-viewer","텍스트 파일 뷰어","TXT 뷰어","txt·log·md 파일을 바로 열어봅니다.","인코딩 추정과 미리보기.","file",["텍스트 파일 뷰어","txt 열기"],["hwp-viewer","markdown-preview"],False,"text-file"),
("mime-checker","파일 MIME/확장자 확인기","MIME 확인","파일의 추정 MIME과 확장자를 확인합니다.","업로드만으로 타입 힌트를 봅니다.","file",["MIME 타입","파일 형식 확인"],["file-extension","file-hash"],False,"mime"),
("file-hash","파일 해시 계산기","파일 해시","파일 SHA-256 해시를 계산합니다.","무결성 확인용.","file",["파일 해시","SHA-256 파일"],["hash","file-extension"],False,"file-hash"),
("file-split-name","파일 용량 단위 변환","용량 변환","B·KB·MB·GB를 서로 변환합니다.","용량 계산기.","converter",["용량 변환","MB GB 변환"],["data-unit","percent"],False,"data-unit"),
("csv-to-json","CSV → JSON 변환기","CSV→JSON","CSV를 JSON 배열로 변환합니다.","헤더 기준 객체 변환.","converter",["CSV JSON 변환","CSV to JSON"],["json-to-csv","json-formatter"],True,"csv-json"),
("json-to-csv","JSON → CSV 변환기","JSON→CSV","JSON 배열을 CSV로 변환합니다.","스프레드시트용 내보내기.","converter",["JSON CSV 변환","JSON to CSV"],["csv-to-json","json-formatter"],True,"json-csv"),
("markdown-preview","마크다운 미리보기","MD 미리보기","마크다운을 HTML로 미리봅니다.","간단 MD 렌더러.","text",["마크다운 미리보기","markdown preview"],["html-to-text","word-counter"],False,"md-preview"),
("html-to-text","HTML → 텍스트 변환","HTML→텍스트","HTML에서 텍스트만 추출합니다.","태그 제거.","text",["HTML 텍스트 추출","태그 제거"],["html-entity","markdown-preview"],False,"html-text"),

# === IMAGE ===
("png-to-jpg","PNG → JPG 변환기","PNG→JPG","PNG 이미지를 JPG로 변환합니다.","브라우저에서 즉시 변환·다운로드.","image",["PNG JPG 변환","PNG to JPG"],["jpg-to-png","webp-converter"],True,"img-fmt"),
("jpg-to-png","JPG → PNG 변환기","JPG→PNG","JPG 이미지를 PNG로 변환합니다.","투명 배경이 필요하면 PNG로.","image",["JPG PNG 변환","JPG to PNG"],["png-to-jpg","image-resize"],True,"img-fmt"),
("webp-converter","WebP 변환기","WebP 변환","이미지를 WebP로 변환하거나 WebP를 PNG/JPG로 바꿉니다.","용량 최적화용.","image",["WebP 변환","WebP PNG"],["png-to-jpg","image-compress"],True,"webp"),
("image-resize","이미지 리사이즈","리사이즈","가로·세로 크기를 바꿔 저장합니다.","썸네일·업로드용.","image",["이미지 리사이즈","사진 크기 변경"],["image-compress","image-crop"],True,"img-resize"),
("image-compress","이미지 용량 줄이기","이미지 압축","품질을 조절해 이미지 용량을 줄입니다.","JPG 품질 압축.","image",["이미지 압축","사진 용량 줄이기"],["image-resize","webp-converter"],True,"img-compress"),
("image-rotate","이미지 회전·뒤집기","이미지 회전","90도 회전·좌우/상하 반전.","간단한 사진 보정.","image",["이미지 회전","사진 뒤집기"],["image-resize","png-to-jpg"],False,"img-rotate"),
("image-to-base64","이미지 → Base64","이미지 Base64","이미지를 Base64 문자열로 변환합니다.","CSS·JSON 삽입용.","image",["이미지 Base64","Base64 이미지"],["base64","png-to-jpg"],False,"img-b64"),
("favicon-generator","파비콘 만들기","파비콘","이미지를 16·32·48px 파비콘용으로 자릅니다.","사이트 아이콘용.","image",["파비콘 만들기","favicon 생성"],["image-resize","png-to-jpg"],False,"favicon"),

# === TEXT ===
("case-converter","대소문자 변환기","대소문자","대문자·소문자·타이틀 케이스로 변환합니다.","영문 텍스트 변환.","text",["대소문자 변환","소문자 변환"],["slugify","remove-spaces"],False,"case"),
("remove-spaces","공백·줄바꿈 제거기","공백 제거","불필요한 공백·빈 줄을 정리합니다.","복붙 텍스트 정리.","text",["공백 제거","줄바꿈 제거"],["word-counter","duplicate-lines"],True,"spaces"),
("duplicate-lines","중복 줄 제거기","중복 제거","중복된 줄을 제거합니다.","목록 정리용.","text",["중복 줄 제거","중복 제거"],["sort-lines","remove-spaces"],False,"dedupe"),
("sort-lines","줄 정렬기","줄 정렬","가나다/ABC순으로 줄을 정렬합니다.","목록 정렬.","text",["텍스트 정렬","줄 정렬"],["duplicate-lines","random-picker"],False,"sort-lines"),
("find-replace","찾아 바꾸기","찾아바꾸기","텍스트에서 찾아 일괄 교체합니다.","간단 치환 도구.","text",["찾아 바꾸기","텍스트 치환"],["remove-spaces","regex-tester"],False,"find-replace"),
("slugify","슬러그·URL 만들기","슬러그","제목을 URL 슬러그로 변환합니다.","블로그·SEO용.","text",["슬러그 생성","URL 슬러그"],["url-encode","case-converter"],False,"slugify"),
("extract-emails","이메일 추출기","이메일 추출","텍스트에서 이메일만 뽑습니다.","명단 정리.","text",["이메일 추출","메일 주소 추출"],["extract-urls","duplicate-lines"],False,"extract-email"),
("extract-urls","URL 링크 추출기","URL 추출","텍스트에서 URL만 추출합니다.","링크 목록화.","text",["URL 추출","링크 추출"],["extract-emails","url-encode"],False,"extract-url"),
("text-reverse","텍스트 뒤집기","텍스트 뒤집기","문자열을 거꾸로 뒤집습니다.","재미·검사용.","text",["텍스트 뒤집기","문자열 역순"],["case-converter","morse"],False,"reverse"),
("reading-time","읽기 시간 계산기","읽기 시간","글 분량으로 예상 읽기 시간을 계산합니다.","블로그·원고용.","text",["읽기 시간 계산","독서 시간"],["word-counter","lorem-ipsum"],False,"reading-time"),
("lorem-ipsum","로렘 입숨·더미 텍스트","더미 텍스트","한국어/영문 더미 문단을 생성합니다.","디자인 시안용.","text",["로렘 입숨","더미 텍스트","채우기 텍스트"],["word-counter","quotes"],False,"lorem"),
("html-entity","HTML 엔티티 변환","HTML 엔티티","특수문자를 HTML 엔티티로 변환/복원합니다.","웹 문서용.","developer",["HTML 엔티티","특수문자 변환"],["html-to-text","url-encode"],False,"html-entity"),
("number-korean","숫자 → 한글 금액","한글 금액","숫자를 한글 금액 표기로 바꿉니다.","계약서·세금계산서 참고용.","korean",["숫자 한글","금액 한글 표기"],["korean-number","vat-calculator"],True,"num-ko"),
("korean-number","한글 → 숫자","한글숫자","한글 수사/금액을 숫자로 추정 변환합니다.","간단 파서.","korean",["한글 숫자 변환","금액 숫자"],["number-korean","salary"],False,"ko-num"),

# === CONVERT / ENCODE ===
("url-encode","URL 인코더/디코더","URL 인코딩","URL 인코딩·디코딩을 합니다.","쿼리스트링 처리.","developer",["URL 인코딩","URL 디코딩"],["base64","html-entity"],True,"url-enc"),
("timestamp","유닉스 타임스탬프 변환","타임스탬프","타임스탬프 ↔ 날짜를 변환합니다.","개발·로그 분석용.","developer",["타임스탬프 변환","유닉스 시간"],["date-calc","timezone"],True,"timestamp"),
("timezone","세계 시간·시차 계산","세계시간","주요 도시 현재 시각을 봅니다.","시차 참고.","utility",["세계 시간","시차 계산"],["timestamp","date-calc"],False,"timezone"),
("px-to-rem","px ↔ rem 변환기","px rem","CSS px와 rem을 변환합니다.","루트 글자 크기 기준.","developer",["px rem 변환","CSS rem"],["unit-converter","color-picker"],False,"px-rem"),
("data-unit","데이터 단위 변환기","데이터 단위","bit·Byte·KB·MB·GB 변환.","네트워크·저장장치.","converter",["데이터 단위 변환","KB MB"],["file-split-name","percent"],False,"data-unit"),
("binary-converter","진법 변환기","진법 변환","2·8·10·16진수를 변환합니다.","개발 학습용.","developer",["진법 변환","16진수 변환"],["hash","uuid"],False,"radix"),
("temperature","온도 변환기","온도 변환","섭씨·화씨·켈빈 변환.","생활·과학용.","converter",["온도 변환","섭씨 화씨"],["unit-converter","bmi"],False,"temp"),
("color-contrast","색 대비(접근성) 검사","색 대비","두 색의 대비율을 검사합니다.","WCAG 참고.","developer",["색 대비","WCAG 대비율"],["color-picker","hex-rgb"],False,"contrast"),
("hex-rgb","HEX ↔ RGB 변환","HEX RGB","HEX와 RGB를 서로 변환합니다.","디자인 협업용.","developer",["HEX RGB","컬러 변환"],["color-picker","color-contrast"],False,"hex-rgb"),

# === CALCULATORS KR ===
("vat-calculator","부가세 계산기","부가세","공급가·부가세·합계를 계산합니다.","세금계산서 참고용.","calculator",["부가세 계산기","VAT 계산"],["salary","discount"],True,"vat"),
("split-bill","더치페이·더치페이 계산기","더치페이","인원수로 금액을 나눕니다.","모임 정산.","calculator",["더치페이 계산기","더치페이"],["discount","percent"],True,"split"),
("hourly-wage","시급·월급 환산 계산기","시급 환산","시급↔월급을 환산합니다.","알바·급여 참고.","calculator",["시급 계산기","월급 환산"],["salary","overtime-pay"],True,"hourly"),
("overtime-pay","연장근로 수당 계산기","연장수당","연장·야간 수당을 대략 계산합니다.","참고용.","calculator",["연장근로 수당","야간수당 계산"],["hourly-wage","salary"],False,"overtime"),
("compound-interest","복리 계산기","복리","원금·이율·기간으로 복리를 계산합니다.","저축·투자 참고.","calculator",["복리 계산기","이자 계산"],["loan","investment-return"],True,"compound"),
("investment-return","수익률 계산기","수익률","투자 수익·수익률을 계산합니다.","간단 ROI.","calculator",["수익률 계산기","ROI 계산"],["compound-interest","percent"],False,"roi"),
("bmr-calculator","기초대사량(BMR) 계산기","BMR","기초대사량을 추정합니다.","건강 참고용.","calculator",["BMR 계산기","기초대사량"],["bmi","body-fat"],False,"bmr"),
("body-fat","체지방률 추정 계산기","체지방","간단 공식으로 체지방을 추정합니다.","참고용.","calculator",["체지방률 계산","체지방"],["bmi","bmr-calculator"],False,"bodyfat"),
("pace-calculator","페이스·러닝 계산기","러닝 페이스","거리·시간으로 페이스를 계산합니다.","러닝·걷기.","calculator",["페이스 계산기","러닝 페이스"],["unit-converter","bmi"],False,"pace"),
("fuel-cost","주유비·연비 계산기","주유비","거리·연비·단가로 주유비를 계산합니다.","여행 경비.","calculator",["주유비 계산기","연비 계산"],["split-bill","percent"],False,"fuel"),
("working-days","영업일·근무일수 계산기","영업일수","기간 중 주말 제외 일수를 계산합니다.","프로젝트 일정.","calculator",["영업일 계산","근무일수"],["date-calc","dday"],True,"workdays"),
("pregnancy-due","출산 예정일 계산기","출산예정일","마지막 생리일 기준 예정일을 계산합니다.","참고용.","calculator",["출산 예정일 계산기","임신주수"],["dday","date-calc"],False,"due-date"),
("tip-calculator","팁·봉사료 계산기","팁 계산","팁 비율과 1인당 금액을 계산합니다.","해외여행용.","calculator",["팁 계산기","봉사료"],["split-bill","percent"],False,"tip"),

# === KOREAN LIFE ===
("business-no-check","사업자등록번호 진위(체크섬)","사업자번호","사업자번호 체크섬을 검증합니다.","형식 검증(국세청 조회 아님).","korean",["사업자등록번호 확인","사업자번호 검증"],["phone-format","vat-calculator"],True,"bizno"),
("phone-format","전화번호 하이픈 넣기","전화 형식","휴대폰·지역번호를 보기 좋게 포맷합니다.","010-xxxx-xxxx.","korean",["전화번호 하이픈","휴대폰 번호 형식"],["business-no-check","engname"],False,"phone"),
("romanize-korean","한글 로마자 변환기","로마자","한글을 로마자로 변환합니다.","매핑 기반 참고용.","korean",["한글 로마자","로마자 변환"],["engname","slugify"],False,"romanize"),
("chosung","초성 추출기","초성","한글 초성만 추출합니다.","검색·퀴즈용.","korean",["초성 추출","한글 초성"],["romanize-korean","hangul-disassemble"],False,"chosung"),
("hangul-disassemble","한글 자모 분리","자모 분리","한글을 초·중·종성으로 분리합니다.","학습·개발용.","korean",["한글 자모 분리","자모 분해"],["chosung","romanize-korean"],False,"jamo"),
("zodiac","띠·별자리 보기","띠 별자리","생년월일로 띠·별자리를 봅니다.","재미용.","fun",["띠 확인","별자리"],["age","fortune"],False,"zodiac"),

# === DEV / FUN extras ===
("regex-tester","정규식 테스트기","정규식","정규식 매치를 바로 테스트합니다.","개발용.","developer",["정규식 테스트","regex"],["find-replace","extract-urls"],True,"regex"),
("jwt-decoder","JWT 디코더","JWT","JWT 헤더·페이로드를 디코딩합니다.","서명 검증 없음(참고용).","developer",["JWT 디코더","JWT 해석"],["base64","json-formatter"],True,"jwt"),
("cron-explain","크론 표현식 설명","Cron","크론 식을 한글로 풀어 설명합니다.","간단 해석기.","developer",["크론 표현식","cron 설명"],["timestamp","timezone"],False,"cron"),
("user-agent","내 브라우저 정보","브라우저 정보","User-Agent 등 환경을 표시합니다.","디버깅용.","developer",["User-Agent","브라우저 정보"],["uuid","hash"],False,"ua"),
("password-strength","비밀번호 강도 검사","비밀번호 강도","비밀번호 강도를 평가합니다.","보안 습관용.","utility",["비밀번호 강도","비밀번호 보안"],["password","hash"],False,"pw-strength"),
("barcode-generator","바코드 생성기","바코드","숫자로 Code128 스타일 바코드를 그립니다.","간단 바코드(참고용).","utility",["바코드 생성기","Code128"],["qrcode","random-picker"],False,"barcode"),
("morse","모스 부호 변환기","모스 부호","텍스트↔모스 부호 변환.","재미·학습용.","fun",["모스 부호","모스 변환"],["text-reverse","binary-converter"],False,"morse"),
("metronome","온라인 메트로놈","메트로놈","BPM 메트로놈입니다.","연습용.","utility",["메트로놈","BPM"],["timer","pomodoro"],False,"metronome"),
("dice","주사위 굴리기","주사위","주사위를 굴립니다.","보드게임용.","fun",["주사위","랜덤 주사위"],["coin-flip","random-picker"],False,"dice"),
("coin-flip","동전 던지기","동전","앞뒤 동전 던지기.","간단 결정.","fun",["동전 던지기","앞면 뒷면"],["dice","random-picker"],False,"coin"),
("random-number","난수·랜덤 숫자 생성기","난수","범위 안 난수를 생성합니다.","추첨·샘플용.","utility",["난수 생성기","랜덤 숫자"],["random-picker","uuid"],False,"rand-num"),
("typing-test","타자 연습(간단)","타자 연습","짧은 문장으로 타속을 잽니다.","재미·연습용.","productivity",["타자 연습","타속 측정"],["word-counter","timer"],False,"typing"),
("note-pad","온라인 메모장","메모장","브라우저에만 저장되는 간단 메모장.","임시 메모.","productivity",["온라인 메모장","웹 메모장"],["word-counter","find-replace"],False,"notepad"),
("fullscreen-clock","전체화면 시계","전체화면 시계","발표·시험용 큰 시계.","집중용.","productivity",["전체화면 시계","큰 시계"],["timer","stopwatch"],False,"big-clock"),
("aspect-ratio","화면비·비율 계산기","화면비","가로·세로로 비율을 계산합니다.","영상·디자인용.","converter",["화면비 계산","비율 계산"],["image-resize","percent"],False,"aspect"),
("pdf-meta-note","PDF 페이지수 안내·체크","PDF 안내","PDF는 브라우저로 열고, 페이지/용량 힌트를 봅니다.","업로드 파일 정보 표시(완전 파싱 제한).","file",["PDF 페이지","PDF 정보"],["hwp-viewer","file-hash"],False,"pdf-info"),
]

assert len(RAW) >= 100, len(RAW)
# trim or keep all
print("count", len(RAW))

def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')

cats = sorted({r[5] for r in RAW})
cat_labels = {
    "productivity":"생산성","calculator":"계산기","fun":"재미","utility":"유틸",
    "developer":"개발자","file":"문서·파일","image":"이미지","text":"텍스트",
    "converter":"변환","korean":"생활·한글",
}

lines = []
lines.append('export type ToolCategory =')
for i,c in enumerate(cats):
    lines.append(f'  | "{c}"' + (';' if i==len(cats)-1 else ''))
lines.append('')
lines.append('export type Tool = {')
lines.append('  slug: string;')
lines.append('  name: string;')
lines.append('  shortName: string;')
lines.append('  description: string;')
lines.append('  longDescription: string;')
lines.append('  category: ToolCategory;')
lines.append('  keywords: string[];')
lines.append('  related: string[];')
lines.append('  featured?: boolean;')
lines.append('  impl: string;')
lines.append('};')
lines.append('')
lines.append('export const toolCategories: { id: ToolCategory | "all"; label: string }[] = [')
lines.append('  { id: "all", label: "전체" },')
for c in cats:
    lines.append(f'  {{ id: "{c}", label: "{cat_labels.get(c,c)}" }},')
lines.append('];')
lines.append('')
lines.append('export const tools: Tool[] = [')
for slug,name,short,desc,long,cat,kws,rel,feat,impl in RAW:
    feat_s = 'true' if feat else 'false'
    kw = ', '.join(f'"{esc(k)}"' for k in kws)
    rl = ', '.join(f'"{r}"' for r in rel if any(x[0]==r for x in RAW))
    # filter related to existing
    rel_f = [r for r in rel if any(x[0]==r for x in RAW)]
    rl = ', '.join(f'"{r}"' for r in rel_f)
    lines.append('  {')
    lines.append(f'    slug: "{slug}",')
    lines.append(f'    name: "{esc(name)}",')
    lines.append(f'    shortName: "{esc(short)}",')
    lines.append(f'    description: "{esc(desc)}",')
    lines.append(f'    longDescription: "{esc(long)}",')
    lines.append(f'    category: "{cat}",')
    lines.append(f'    keywords: [{kw}],')
    lines.append(f'    related: [{rl}],')
    if feat:
        lines.append('    featured: true,')
    lines.append(f'    impl: "{impl}",')
    lines.append('  },')
lines.append('];')
lines.append('')
lines.append('export function getTool(slug: string) {')
lines.append('  return tools.find((tool) => tool.slug === slug);')
lines.append('}')
lines.append('')
lines.append('export function getRelatedTools(slug: string) {')
lines.append('  const tool = getTool(slug);')
lines.append('  if (!tool) return [];')
lines.append('  return tool.related.map((s) => getTool(s)).filter(Boolean) as Tool[];')
lines.append('}')
lines.append('')
lines.append('export function getToolsByCategory(category: ToolCategory | "all") {')
lines.append('  if (category === "all") return tools;')
lines.append('  return tools.filter((tool) => tool.category === category);')
lines.append('}')
lines.append('')

Path('src/data/tools.ts').write_text('\n'.join(lines)+'\n', encoding='utf-8')
print('wrote', len(RAW), 'tools')
