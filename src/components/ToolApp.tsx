"use client";

import { useEffect, useMemo, useState } from "react";

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="card p-5 md:p-6">{children}</div>;
}

function ActionButton({
  onClick,
  children,
  primary,
}: {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={primary ? "btn-primary" : "btn-ghost"}
    >
      {children}
    </button>
  );
}

export function ToolApp({ slug }: { slug: string }) {
  if (slug === "timer") return <TimerTool />;
  if (slug === "stopwatch") return <StopwatchTool />;
  if (slug === "pomodoro") return <PomodoroTool />;
  if (slug === "qrcode") return <QrTool />;
  if (slug === "bmi") return <BmiTool />;
  if (slug === "unit-converter") return <UnitTool />;
  if (slug === "password") return <PasswordTool />;
  if (slug === "word-counter") return <WordCounterTool />;
  if (slug === "dday") return <DdayTool />;
  if (slug === "age") return <AgeTool />;
  if (slug === "lotto") return <LottoTool />;
  if (slug === "fortune") return <FortuneTool />;
  if (slug === "quotes") return <QuotesTool />;
  if (slug === "rps") return <RpsTool />;
  if (slug === "engname") return <EngNameTool />;
  if (slug === "base64") return <Base64Tool />;
  if (slug === "json-formatter") return <JsonTool />;
  if (slug === "color-picker") return <ColorTool />;
  if (slug === "salary") return <SalaryTool />;
  if (slug === "percent") return <PercentTool />;
  if (slug === "discount") return <DiscountTool />;
  if (slug === "loan") return <LoanTool />;
  if (slug === "date-calc") return <DateCalcTool />;
  if (slug === "random-picker") return <RandomPickerTool />;
  if (slug === "uuid") return <UuidTool />;
  if (slug === "hash") return <HashTool />;
  return <Panel>준비 중인 도구입니다.</Panel>;
}

function TimerTool() {
  const [seconds, setSeconds] = useState(300);
  const [left, setLeft] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (left <= 0) {
      setRunning(false);
      if (typeof window !== "undefined") window.alert("타이머 종료!");
      return;
    }
    const id = window.setInterval(() => setLeft((v) => v - 1), 1000);
    return () => window.clearInterval(id);
  }, [running, left]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <Panel>
      <div className="mb-6 text-center text-6xl font-black tracking-tight">
        {mm}:{ss}
      </div>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {[60, 300, 600, 900].map((v) => (
          <ActionButton
            key={v}
            onClick={() => {
              setSeconds(v);
              setLeft(v);
              setRunning(false);
            }}
          >
            +{v / 60}분
          </ActionButton>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <ActionButton primary onClick={() => setRunning(true)}>시작</ActionButton>
        <ActionButton onClick={() => setRunning(false)}>일시정지</ActionButton>
        <ActionButton
          onClick={() => {
            setRunning(false);
            setLeft(seconds);
          }}
        >
          리셋
        </ActionButton>
      </div>
    </Panel>
  );
}

function StopwatchTool() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setMs((v) => v + 10), 10);
    return () => window.clearInterval(id);
  }, [running]);

  const display = useMemo(() => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const c = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(c).padStart(2, "0")}`;
  }, [ms]);

  return (
    <Panel>
      <div className="mb-6 text-center text-5xl font-black tracking-tight">{display}</div>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        <ActionButton primary onClick={() => setRunning(true)}>시작</ActionButton>
        <ActionButton onClick={() => setRunning(false)}>정지</ActionButton>
        <ActionButton onClick={() => setLaps((prev) => [ms, ...prev].slice(0, 20))}>랩</ActionButton>
        <ActionButton
          onClick={() => {
            setRunning(false);
            setMs(0);
            setLaps([]);
          }}
        >
          리셋
        </ActionButton>
      </div>
      <ul className="space-y-1 text-sm text-zinc-400">
        {laps.map((lap, i) => (
          <li key={`${lap}-${i}`}>#{laps.length - i} · {(lap / 1000).toFixed(2)}s</li>
        ))}
      </ul>
    </Panel>
  );
}

function PomodoroTool() {
  const modes = [
    { label: "집중", sec: 25 * 60 },
    { label: "짧은 휴식", sec: 5 * 60 },
    { label: "긴 휴식", sec: 15 * 60 },
  ];
  const [mode, setMode] = useState(0);
  const [left, setLeft] = useState(modes[0].sec);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (left <= 0) {
      setRunning(false);
      return;
    }
    const id = window.setInterval(() => setLeft((v) => v - 1), 1000);
    return () => window.clearInterval(id);
  }, [running, left]);

  return (
    <Panel>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {modes.map((m, i) => (
          <ActionButton
            key={m.label}
            primary={i === mode}
            onClick={() => {
              setMode(i);
              setLeft(m.sec);
              setRunning(false);
            }}
          >
            {m.label}
          </ActionButton>
        ))}
      </div>
      <div className="mb-6 text-center text-6xl font-black">
        {String(Math.floor(left / 60)).padStart(2, "0")}:{String(left % 60).padStart(2, "0")}
      </div>
      <div className="flex justify-center gap-2">
        <ActionButton primary onClick={() => setRunning(true)}>시작</ActionButton>
        <ActionButton onClick={() => setRunning(false)}>정지</ActionButton>
      </div>
    </Panel>
  );
}

function QrTool() {
  const [text, setText] = useState("https://jbmsoft.co.kr");
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(text || " ")}`;
  return (
    <Panel>
      <label className="mb-2 block text-sm text-zinc-400">URL 또는 텍스트</label>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-4 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#7c6cff]"
      />
      <div className="flex justify-center rounded-xl bg-white p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="생성된 QR 코드" width={240} height={240} />
      </div>
      <a href={src} download="qrcode.png" className="btn-primary mt-4 w-full">
        PNG 다운로드
      </a>
    </Panel>
  );
}

function BmiTool() {
  const [cm, setCm] = useState(170);
  const [kg, setKg] = useState(65);
  const bmi = kg / ((cm / 100) * (cm / 100));
  const label =
    bmi < 18.5 ? "저체중" : bmi < 23 ? "정상" : bmi < 25 ? "과체중" : "비만";
  return (
    <Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">키(cm)
          <input type="number" value={cm} onChange={(e) => setCm(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
        <label className="text-sm">몸무게(kg)
          <input type="number" value={kg} onChange={(e) => setKg(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
      </div>
      <div className="mt-6 text-center">
        <div className="text-4xl font-black">{bmi.toFixed(1)}</div>
        <div className="mt-1 text-zinc-400">{label}</div>
      </div>
    </Panel>
  );
}

function UnitTool() {
  const [cm, setCm] = useState(100);
  return (
    <Panel>
      <label className="text-sm">길이 (cm)
        <input type="number" value={cm} onChange={(e) => setCm(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </label>
      <ul className="mt-4 space-y-2 text-sm text-zinc-300">
        <li>m: {(cm / 100).toFixed(3)}</li>
        <li>inch: {(cm / 2.54).toFixed(3)}</li>
        <li>ft: {(cm / 30.48).toFixed(3)}</li>
      </ul>
    </Panel>
  );
}

function PasswordTool() {
  const [len, setLen] = useState(16);
  const [symbols, setSymbols] = useState(true);
  const [value, setValue] = useState("");

  function generate() {
    const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${symbols ? "!@#$%^&*()_+-=[]{}" : ""}`;
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    setValue(Array.from(arr, (n) => chars[n % chars.length]).join(""));
  }

  return (
    <Panel>
      <label className="text-sm">길이: {len}
        <input type="range" min={8} max={64} value={len} onChange={(e) => setLen(Number(e.target.value))} className="mt-2 w-full" />
      </label>
      <label className="mt-3 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
        기호 포함
      </label>
      <div className="mt-4 break-all rounded-xl border border-white/10 bg-black/30 px-3 py-3 font-mono text-sm">
        {value || "생성 버튼을 눌러주세요"}
      </div>
      <div className="mt-3 flex gap-2">
        <ActionButton primary onClick={generate}>생성</ActionButton>
        <ActionButton onClick={() => value && navigator.clipboard.writeText(value)}>복사</ActionButton>
      </div>
    </Panel>
  );
}

function WordCounterTool() {
  const [text, setText] = useState("");
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const bytes = new TextEncoder().encode(text).length;
  return (
    <Panel>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="텍스트를 붙여넣으세요"
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#7c6cff]"
      />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["글자(공백포함)", chars],
          ["글자(공백제외)", charsNoSpace],
          ["단어", words],
          ["UTF-8 바이트", bytes],
        ].map(([k, v]) => (
          <div key={k as string} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <div className="text-xl font-black">{v as number}</div>
            <div className="text-[11px] text-zinc-400">{k as string}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DdayTool() {
  const [date, setDate] = useState("");
  const diff = date
    ? Math.ceil((new Date(date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000)
    : null;
  return (
    <Panel>
      <label className="text-sm">목표일
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </label>
      <div className="mt-6 text-center text-4xl font-black">
        {diff === null ? "날짜를 선택하세요" : diff === 0 ? "D-Day" : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`}
      </div>
    </Panel>
  );
}

function AgeTool() {
  const [birth, setBirth] = useState("2000-01-01");
  const today = new Date();
  const b = new Date(birth);
  let age = today.getFullYear() - b.getFullYear();
  const m = today.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age -= 1;
  return (
    <Panel>
      <label className="text-sm">생년월일
        <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </label>
      <div className="mt-6 text-center text-4xl font-black">만나이 {age}세</div>
    </Panel>
  );
}

function LottoTool() {
  const [nums, setNums] = useState<number[]>([]);
  function draw() {
    const set = new Set<number>();
    while (set.size < 6) set.add(1 + Math.floor(Math.random() * 45));
    setNums([...set].sort((a, b) => a - b));
  }
  return (
    <Panel>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {nums.length
          ? nums.map((n) => (
              <span key={n} className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#7c6cff] to-[#ff4d9a] font-bold">
                {n}
              </span>
            ))
          : <span className="text-zinc-400">추첨 버튼을 눌러주세요</span>}
      </div>
      <ActionButton primary onClick={draw}>번호 추첨</ActionButton>
      <p className="mt-3 text-xs text-zinc-500">오락용이며 당첨을 보장하지 않습니다.</p>
    </Panel>
  );
}

function FortuneTool() {
  const list = [
    "오늘은 작은 시도가 큰 기회로 이어집니다.",
    "집중력이 좋은 날입니다. 미뤄둔 일을 끝마치세요.",
    "주변 사람의 조언이 도움이 됩니다.",
    "휴식도 전략입니다. 무리하지 마세요.",
    "새로운 연락이 반가운 소식을 가져옵니다.",
  ];
  const [msg, setMsg] = useState(list[0]);
  return (
    <Panel>
      <p className="mb-4 text-center text-lg font-bold leading-relaxed">{msg}</p>
      <ActionButton primary onClick={() => setMsg(list[Math.floor(Math.random() * list.length)])}>
        다시 뽑기
      </ActionButton>
    </Panel>
  );
}

function QuotesTool() {
  const list = [
    "시작이 반이다.",
    "완벽한 때란 없다. 지금이 가장 빠르다.",
    "작은 진전이 쌓여 큰 결과가 된다.",
    "할 수 있다고 믿으면 이미 halfway다.",
    "오늘의 노력이 내일의 여유를 만든다.",
  ];
  const [msg, setMsg] = useState(list[0]);
  return (
    <Panel>
      <p className="mb-4 text-center text-xl font-black leading-relaxed">“{msg}”</p>
      <div className="flex gap-2">
        <ActionButton primary onClick={() => setMsg(list[Math.floor(Math.random() * list.length)])}>다른 명언</ActionButton>
        <ActionButton onClick={() => navigator.clipboard.writeText(msg)}>복사</ActionButton>
      </div>
    </Panel>
  );
}

function RpsTool() {
  const choices = ["가위", "바위", "보"] as const;
  const [result, setResult] = useState("선택하세요");
  function play(user: (typeof choices)[number]) {
    const cpu = choices[Math.floor(Math.random() * 3)];
    if (user === cpu) setResult(`무승부! 상대도 ${cpu}`);
    else if (
      (user === "가위" && cpu === "보") ||
      (user === "바위" && cpu === "가위") ||
      (user === "보" && cpu === "바위")
    )
      setResult(`승리! 상대는 ${cpu}`);
    else setResult(`패배… 상대는 ${cpu}`);
  }
  return (
    <Panel>
      <div className="mb-4 text-center text-lg font-bold">{result}</div>
      <div className="flex justify-center gap-2">
        {choices.map((c) => (
          <ActionButton key={c} primary onClick={() => play(c)}>{c}</ActionButton>
        ))}
      </div>
    </Panel>
  );
}

function EngNameTool() {
  const map: Record<string, string> = {
    김: "Kim", 이: "Lee", 박: "Park", 최: "Choi", 정: "Jung", 강: "Kang",
    조: "Cho", 윤: "Yoon", 장: "Jang", 임: "Lim", 한: "Han", 오: "Oh",
    서: "Seo", 신: "Shin", 권: "Kwon", 황: "Hwang", 안: "Ahn", 송: "Song",
    홍: "Hong", 유: "Yoo",
  };
  const [name, setName] = useState("김민수");
  const roman = [...name].map((ch) => map[ch] || ch).join(" ");
  return (
    <Panel>
      <label className="text-sm">한글 이름
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </label>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-xl font-bold">{roman}</div>
      <p className="mt-2 text-xs text-zinc-500">참고용 추정 표기입니다. 여권 공식 표기는 별도 확인이 필요합니다.</p>
    </Panel>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("JBMSOFT");
  const [mode, setMode] = useState<"enc" | "dec">("enc");
  const [out, setOut] = useState("");
  function run() {
    try {
      setOut(mode === "enc" ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input))));
    } catch {
      setOut("변환 실패: 입력을 확인하세요");
    }
  }
  return (
    <Panel>
      <div className="mb-3 flex gap-2">
        <ActionButton primary={mode === "enc"} onClick={() => setMode("enc")}>인코딩</ActionButton>
        <ActionButton primary={mode === "dec"} onClick={() => setMode("dec")}>디코딩</ActionButton>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm" />
      <ActionButton primary onClick={run}>변환</ActionButton>
      <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-sm">{out}</pre>
    </Panel>
  );
}

function JsonTool() {
  const [input, setInput] = useState('{"hello":"jbmsoft"}');
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  function format() {
    try {
      setOut(JSON.stringify(JSON.parse(input), null, 2));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "JSON 오류");
      setOut("");
    }
  }
  return (
    <Panel>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 font-mono text-sm" />
      <ActionButton primary onClick={format}>포맷/검증</ActionButton>
      {error ? <p className="mt-2 text-sm text-rose-400">{error}</p> : null}
      {out ? <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-sm">{out}</pre> : null}
    </Panel>
  );
}

function ColorTool() {
  const [color, setColor] = useState("#7c6cff");
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return (
    <Panel>
      <div className="mb-4 flex items-center gap-4">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-16 w-16 cursor-pointer rounded-xl border-0 bg-transparent" />
        <div>
          <div className="font-mono text-lg font-bold">{color.toUpperCase()}</div>
          <div className="text-sm text-zinc-400">rgb({r}, {g}, {b})</div>
        </div>
      </div>
      <ActionButton onClick={() => navigator.clipboard.writeText(color.toUpperCase())}>HEX 복사</ActionButton>
    </Panel>
  );
}

function SalaryTool() {
  const [annual, setAnnual] = useState(50000000);
  const monthly = annual / 12;
  // 단순 추정: 4대보험+소득세 약 18~22% 가정
  const taxRate = annual >= 80000000 ? 0.22 : annual >= 45000000 ? 0.19 : 0.16;
  const netMonthly = Math.round(monthly * (1 - taxRate));
  const netAnnual = netMonthly * 12;
  return (
    <Panel>
      <label className="text-sm">연봉(세전, 원)
        <input
          type="number"
          value={annual}
          onChange={(e) => setAnnual(Number(e.target.value) || 0)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
        />
      </label>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-zinc-500">예상 월 실수령</div>
          <div className="text-2xl font-black">{netMonthly.toLocaleString()}원</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-zinc-500">예상 연 실수령</div>
          <div className="text-2xl font-black">{netAnnual.toLocaleString()}원</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-zinc-500">참고용 단순 추정입니다. 부양가족·비과세·회사 정책에 따라 달라집니다.</p>
    </Panel>
  );
}

function PercentTool() {
  const [base, setBase] = useState(200);
  const [pct, setPct] = useState(15);
  const [from, setFrom] = useState(100);
  const [to, setTo] = useState(130);
  const part = (base * pct) / 100;
  const change = from === 0 ? 0 : ((to - from) / from) * 100;
  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">기준값
          <input type="number" value={base} onChange={(e) => setBase(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
        <label className="text-sm">퍼센트(%)
          <input type="number" value={pct} onChange={(e) => setPct(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-lg font-bold">
        {base}의 {pct}% = {part.toLocaleString()}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">이전 값
          <input type="number" value={from} onChange={(e) => setFrom(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
        <label className="text-sm">이후 값
          <input type="number" value={to} onChange={(e) => setTo(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-lg font-bold">
        변화율 {change.toFixed(2)}%
      </div>
    </Panel>
  );
}

function DiscountTool() {
  const [price, setPrice] = useState(39000);
  const [rate, setRate] = useState(20);
  const sale = Math.round(price * (1 - rate / 100));
  const saved = price - sale;
  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">정가(원)
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
        <label className="text-sm">할인율(%)
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-zinc-500">할인가</div>
          <div className="text-2xl font-black">{sale.toLocaleString()}원</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-zinc-500">절약액</div>
          <div className="text-2xl font-black">{saved.toLocaleString()}원</div>
        </div>
      </div>
    </Panel>
  );
}

function LoanTool() {
  const [principal, setPrincipal] = useState(300000000);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(30);
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  const payment =
    monthlyRate === 0
      ? principal / n
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const total = payment * n;
  const interest = total - principal;
  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm">원금(원)
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
        <label className="text-sm">연이율(%)
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
        <label className="text-sm">기간(년)
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-zinc-500">월 상환액</div>
          <div className="text-xl font-black">{Math.round(payment).toLocaleString()}원</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-zinc-500">총 이자</div>
          <div className="text-xl font-black">{Math.round(interest).toLocaleString()}원</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-zinc-500">총 상환액</div>
          <div className="text-xl font-black">{Math.round(total).toLocaleString()}원</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-zinc-500">원리금균등 상환 기준 참고용입니다.</p>
    </Panel>
  );
}

function DateCalcTool() {
  const today = new Date().toISOString().slice(0, 10);
  const [base, setBase] = useState(today);
  const [days, setDays] = useState(30);
  const [end, setEnd] = useState(today);
  const resultDate = useMemo(() => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }, [base, days]);
  const diffDays = useMemo(() => {
    const a = new Date(base);
    const b = new Date(end);
    return Math.round((b.getTime() - a.getTime()) / 86400000);
  }, [base, end]);
  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">기준 날짜
          <input type="date" value={base} onChange={(e) => setBase(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
        <label className="text-sm">더할/뺄 일수
          <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
        </label>
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-lg font-bold">
        결과 날짜: {resultDate}
      </div>
      <label className="mt-4 block text-sm">비교 날짜
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </label>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-lg font-bold">
        두 날짜 사이: {diffDays}일
      </div>
    </Panel>
  );
}

function RandomPickerTool() {
  const [text, setText] = useState("민수\n지영\n현우\n서연");
  const [picked, setPicked] = useState("");
  function pick() {
    const items = text
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!items.length) {
      setPicked("항목을 입력하세요");
      return;
    }
    setPicked(items[Math.floor(Math.random() * items.length)]);
  }
  return (
    <Panel>
      <label className="text-sm">이름/항목 (줄바꿈 또는 쉼표)
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm" />
      </label>
      <ActionButton primary onClick={pick}>추첨하기</ActionButton>
      {picked ? <div className="mt-4 rounded-xl border border-[#35e0c3]/30 bg-[#35e0c3]/10 p-5 text-center text-2xl font-black">{picked}</div> : null}
    </Panel>
  );
}

function UuidTool() {
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);
  function gen() {
    const next = Array.from({ length: Math.min(50, Math.max(1, count)) }, () =>
      crypto.randomUUID(),
    );
    setList(next);
  }
  return (
    <Panel>
      <label className="text-sm">생성 개수
        <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value) || 1)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2" />
      </label>
      <div className="mt-3 flex gap-2">
        <ActionButton primary onClick={gen}>생성</ActionButton>
        <ActionButton onClick={() => navigator.clipboard.writeText(list.join("\n"))}>전체 복사</ActionButton>
      </div>
      {list.length ? (
        <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-sm">{list.join("\n")}</pre>
      ) : null}
    </Panel>
  );
}

function HashTool() {
  const [input, setInput] = useState("jbmsoft");
  const [hash, setHash] = useState("");
  async function run() {
    const data = new TextEncoder().encode(input);
    const buf = await crypto.subtle.digest("SHA-256", data);
    const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hex);
  }
  return (
    <Panel>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm" />
      <ActionButton primary onClick={run}>SHA-256 생성</ActionButton>
      {hash ? (
        <div className="mt-3">
          <pre className="overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-sm break-all whitespace-pre-wrap">{hash}</pre>
          <ActionButton onClick={() => navigator.clipboard.writeText(hash)}>복사</ActionButton>
        </div>
      ) : null}
    </Panel>
  );
}
