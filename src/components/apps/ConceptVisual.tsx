import type { ReactNode } from "react";

type Props = {
  variant: "evidence" | "used-car-inspect" | "family-loan";
};

export function ConceptVisual({ variant }: Props) {
  if (variant === "evidence") return <EvidenceConcept />;
  if (variant === "family-loan") return <FamilyLoanConcept />;
  return <UsedCarConcept />;
}

function Device({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="rounded-[2rem] border border-white/15 bg-gradient-to-b from-[#1a1a24] to-[#0c0c12] p-3 shadow-[0_30px_80px_rgba(0,0,0,.45)]">
        <div className="mb-3 flex items-center justify-between px-2">
          <span className="text-[11px] font-bold tracking-[0.14em] text-zinc-500">구성 예시</span>
          <span className="rounded-full bg-[#35e0c3]/15 px-2.5 py-1 text-[10px] font-extrabold text-[#35e0c3]">
            출시 전 화면 아님
          </span>
        </div>
        <div className="rounded-[1.35rem] border border-white/10 bg-[#07070a] p-4">{children}</div>
      </div>
    </div>
  );
}

function EvidenceConcept() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(124,108,255,.28),transparent_62%)]" />
      <Device>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold text-[#7ec8ff]">대화모아</div>
            <div className="text-base font-extrabold tracking-tight">대화 정리</div>
          </div>
          <div className="text-xs font-bold text-[#35e0c3]">3 / 12</div>
        </div>
        <div className="space-y-2 text-xs">
          <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-zinc-300">
            <div className="mb-1 text-[10px] font-bold text-zinc-500">2024.03.02 14:21 · 보낸 사람</div>
            내일 오후 3시에 만나기로 했습니다.
            <span className="mt-1 block text-[10px] text-zinc-500">예시 문장</span>
          </div>
          <div className="rounded-xl border border-white/10 p-2">
            <div className="mb-2 text-[10px] font-bold text-zinc-500">받은 사람 · 사진이 있던 자리</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex h-16 items-end rounded-lg bg-gradient-to-br from-[#7c6cff] to-[#2a2448] p-2 text-[10px] font-bold">
                사진
              </div>
              <div className="flex h-16 items-end rounded-lg bg-gradient-to-br from-[#35e0c3] to-[#12352f] p-2 text-[10px] font-bold text-[#06221c]">
                사진
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
              파일명만 적지 않고 페이지 안에 넣습니다.
            </p>
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-white/10 bg-[#101016] p-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#35e0c3]">원본 SHA-256</div>
          <p className="mt-1 break-all font-mono text-[10px] leading-relaxed text-zinc-400">
            변환에 쓴 파일의 해시가 이 자리에 붙습니다
          </p>
        </div>
      </Device>
      <div className="card relative z-10 -mt-8 ml-6 p-4 sm:ml-10">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-sm font-extrabold">별표 메시지 목록</h3>
          <span className="text-[10px] font-bold text-zinc-500">정리용 번호</span>
        </div>
        <table className="w-full text-left text-xs">
          <caption className="sr-only">별표한 메시지를 모은 목록의 구성 예시</caption>
          <thead className="text-zinc-500">
            <tr>
              <th className="py-1 font-semibold">표시</th>
              <th className="py-1 font-semibold">내용</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            <tr className="border-t border-white/10">
              <td className="py-2 pr-3 font-bold text-white">갑 제1호증</td>
              <td className="py-2">별표한 메시지</td>
            </tr>
            <tr className="border-t border-white/10">
              <td className="py-2 pr-3 font-bold text-white">갑 제2호증</td>
              <td className="py-2">별표한 메시지</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
          보기 쉽게 붙인 형식입니다. 법원이나 기관이 번호를 부여했다는 뜻이 아닙니다.
        </p>
      </div>
      <p className="mx-auto mt-3 max-w-[440px] text-center text-xs leading-relaxed text-zinc-500">
        제출용으로 읽기 쉽게 정리한 PDF 구성입니다. 법적 효력을 표시한 화면이 아닙니다.
      </p>
    </div>
  );
}

function UsedCarConcept() {
  const rows = [
    ["원동기 · 오일 누유", "미세누유", "기름이 조금 배어 있다고 적힌 칸입니다."],
    ["변속기", "양호", "점검 당시 이상 표기가 없다는 뜻입니다."],
    ["주행거리", "대조", "계기판 숫자와 나란히 봅니다."],
  ] as const;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(53,224,195,.2),transparent_62%)]" />
      <Device>
        <div className="mb-3">
          <div className="text-[11px] font-bold text-[#3dd68c]">차보는날</div>
          <div className="text-base font-extrabold tracking-tight">성능점검기록부</div>
        </div>
        <ul className="space-y-2">
          {rows.map(([name, tag, plain]) => (
            <li key={name} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-xs font-bold">{name}</span>
                <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-[#35e0c3]">
                  {tag}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400">{plain}</p>
            </li>
          ))}
        </ul>
      </Device>
      <div className="card relative z-10 -mt-8 ml-6 p-4 sm:ml-10">
        <h3 className="text-sm font-extrabold">현장 사진 순서</h3>
        <p className="mt-1 text-[11px] text-zinc-500">셀프 기록용 · 정비 진단이 아닙니다</p>
        <ol className="mt-3 space-y-2 text-xs text-zinc-300">
          {[
            "기록부 전체",
            "번호판 · 주행거리",
            "외관 사방",
            "엔진룸",
            "시운전 중 경고등",
          ].map((item, index) => (
            <li key={item} className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#35e0c3]/15 text-[11px] font-extrabold text-[#35e0c3]">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>
      <p className="mx-auto mt-3 max-w-[440px] text-center text-xs leading-relaxed text-zinc-500">
        기록부를 쉬운 말로 읽는 구성입니다. 사고 여부를 판정하는 화면이 아닙니다.
      </p>
    </div>
  );
}

function FamilyLoanConcept() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(255,154,74,.22),transparent_62%)]" />
      <Device>
        <div className="mb-3">
          <div className="text-[11px] font-bold text-[#ff9a4a]">가족차용노트</div>
          <div className="text-base font-extrabold tracking-tight">상환 기록</div>
        </div>
        <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl border border-white/10 p-3">
            <div className="text-[10px] font-bold text-zinc-500">증여분 · 참고</div>
            <div className="mt-1 font-extrabold">화면에서 나눔</div>
          </div>
          <div className="rounded-xl border border-[#ff9a4a]/30 bg-[#ff9a4a]/10 p-3">
            <div className="text-[10px] font-bold text-[#ff9a4a]">차용분 · 참고</div>
            <div className="mt-1 font-extrabold">이자 일정</div>
          </div>
        </div>
        <ul className="space-y-2 text-xs text-zinc-300">
          {["1회 · 이자 이체 화면", "2회 · 이자 이체 화면", "원금 · 아직 기록 전"].map((row) => (
            <li key={row} className="rounded-xl border border-white/10 px-3 py-2">
              {row}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">기준일은 계산 옆에 표시합니다. 신고 화면이 아닙니다.</p>
      </Device>
      <div className="card relative z-10 -mt-8 ml-6 p-4 sm:ml-10">
        <h3 className="text-sm font-extrabold">차용증에 남길 것</h3>
        <ul className="mt-2 space-y-1 text-xs text-zinc-300">
          <li>당사자</li>
          <li>금액 · 이자 · 갚는 날</li>
          <li>작성일</li>
        </ul>
      </div>
      <p className="mx-auto mt-3 max-w-[440px] text-center text-xs leading-relaxed text-zinc-500">
        기록을 모으는 구성입니다. 세무 상담 화면이 아닙니다.
      </p>
    </div>
  );
}
