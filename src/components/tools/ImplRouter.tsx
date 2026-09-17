"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Tool } from "@/data/tools";
import {
  Btn,
  Field,
  ImplShell,
  NumRow,
  Panel,
  TextTransform,
  areaCls,
  canvasToBlob,
  downloadBlob,
  downloadText,
  inputCls,
  loadImage,
  useFile,
} from "./Shared";

export function ImplRouter({ tool }: { tool: Tool }) {
  return (
    <ImplShell tool={tool}>
      <ImplBody tool={tool} />
    </ImplShell>
  );
}

function ImplBody({ tool }: { tool: Tool }) {
  switch (tool.impl) {
    case "file-ext":
      return <FileExt />;
    case "file-rename":
      return <FileRename />;
    case "hwp-viewer":
      return <HwpViewer />;
    case "text-file":
      return <TextFileViewer />;
    case "mime":
      return <MimeCheck />;
    case "file-hash":
      return <FileHash />;
    case "csv-json":
      return <CsvJson />;
    case "json-csv":
      return <JsonCsv />;
    case "md-preview":
      return <MdPreview />;
    case "html-text":
      return <TextTransform transform={(s) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()} />;
    case "img-fmt":
      return <ImgFmt target={tool.slug.includes("jpg") ? "image/jpeg" : "image/png"} />;
    case "webp":
      return <WebpTool />;
    case "img-resize":
      return <ImgResize />;
    case "img-compress":
      return <ImgCompress />;
    case "img-rotate":
      return <ImgRotate />;
    case "img-b64":
      return <ImgB64 />;
    case "favicon":
      return <FaviconTool />;
    case "case":
      return <CaseTool />;
    case "spaces":
      return <TextTransform transform={(s) => s.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim()} />;
    case "dedupe":
      return <TextTransform transform={(s) => [...new Set(s.split(/\r?\n/))].join("\n")} />;
    case "sort-lines":
      return <TextTransform transform={(s) => s.split(/\r?\n/).sort((a, b) => a.localeCompare(b, "ko")).join("\n")} />;
    case "find-replace":
      return <FindReplace />;
    case "slugify":
      return <TextTransform transform={(s) => s.trim().toLowerCase().replace(/[^\w가-힣]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")} />;
    case "extract-email":
      return <TextTransform transform={(s) => [...s.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)].map((m) => m[0]).join("\n")} />;
    case "extract-url":
      return <TextTransform transform={(s) => [...s.matchAll(/https?:\/\/[^\s<>"']+/gi)].map((m) => m[0]).join("\n")} />;
    case "reverse":
      return <TextTransform transform={(s) => [...s].reverse().join("")} />;
    case "reading-time":
      return <ReadingTime />;
    case "lorem":
      return <Lorem />;
    case "html-entity":
      return <HtmlEntity />;
    case "num-ko":
      return <NumKo />;
    case "ko-num":
      return <KoNum />;
    case "url-enc":
      return <UrlEnc />;
    case "timestamp":
      return <Timestamp />;
    case "timezone":
      return <Timezone />;
    case "px-rem":
      return <PxRem />;
    case "data-unit":
      return <DataUnit />;
    case "radix":
      return <Radix />;
    case "temp":
      return <Temp />;
    case "contrast":
      return <Contrast />;
    case "hex-rgb":
      return <HexRgb />;
    case "vat":
      return <Vat />;
    case "split":
      return <SplitBill />;
    case "hourly":
      return <Hourly />;
    case "overtime":
      return <Overtime />;
    case "compound":
      return <Compound />;
    case "roi":
      return <Roi />;
    case "bmr":
      return <Bmr />;
    case "bodyfat":
      return <BodyFat />;
    case "pace":
      return <Pace />;
    case "fuel":
      return <Fuel />;
    case "workdays":
      return <Workdays />;
    case "due-date":
      return <DueDate />;
    case "tip":
      return <Tip />;
    case "bizno":
      return <BizNo />;
    case "phone":
      return <PhoneFmt />;
    case "romanize":
      return <Romanize />;
    case "chosung":
      return <TextTransform transform={toChosung} />;
    case "jamo":
      return <TextTransform transform={toJamo} />;
    case "zodiac":
      return <Zodiac />;
    case "regex":
      return <Regex />;
    case "jwt":
      return <Jwt />;
    case "cron":
      return <Cron />;
    case "ua":
      return <Ua />;
    case "pw-strength":
      return <PwStrength />;
    case "barcode":
      return <Barcode />;
    case "morse":
      return <Morse />;
    case "metronome":
      return <Metronome />;
    case "dice":
      return <Dice />;
    case "coin":
      return <Coin />;
    case "rand-num":
      return <RandNum />;
    case "typing":
      return <Typing />;
    case "notepad":
      return <Notepad />;
    case "big-clock":
      return <BigClock />;
    case "aspect":
      return <Aspect />;
    case "pdf-info":
      return <PdfInfo />;
    default:
      return <Panel>이 도구는 준비 중입니다. 다른 인기 도구를 먼저 이용해 주세요.</Panel>;
  }
}

function FileExt() {
  const { file, input } = useFile();
  const [ext, setExt] = useState("pdf");
  return (
    <Panel>
      <Field label="파일 선택">{input}</Field>
      <Field label="새 확장자 (점 없이)">
        <input className={inputCls} value={ext} onChange={(e) => setExt(e.target.value.replace(/^\./, ""))} />
      </Field>
      <Btn
        primary
        onClick={() => {
          if (!file) return;
          const base = file.name.replace(/\.[^.]+$/, "");
          downloadBlob(file, `${base}.${ext || "bin"}`);
        }}
      >
        확장자 바꿔 다운로드
      </Btn>
      <p className="text-xs text-zinc-500">확장자만 변경합니다. PNG↔JPG 등 실제 변환은 이미지 변환 도구를 사용하세요.</p>
    </Panel>
  );
}

function FileRename() {
  const [files, setFiles] = useState<File[]>([]);
  const [prefix, setPrefix] = useState("file_");
  return (
    <Panel>
      <Field label="여러 파일 선택">
        <input type="file" multiple className={inputCls} onChange={(e) => setFiles([...e.target.files ?? []])} />
      </Field>
      <Field label="접두어">
        <input className={inputCls} value={prefix} onChange={(e) => setPrefix(e.target.value)} />
      </Field>
      <Btn
        primary
        onClick={() => {
          files.forEach((f, i) => {
            const ext = f.name.includes(".") ? f.name.slice(f.name.lastIndexOf(".")) : "";
            downloadBlob(f, `${prefix}${String(i + 1).padStart(3, "0")}${ext}`);
          });
        }}
      >
        이름 바꿔 다운로드
      </Btn>
    </Panel>
  );
}

function HwpViewer() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  return (
    <Panel>
      <Field label="HWP 파일 업로드">
        <input
          type="file"
          accept=".hwp,.hwpx,application/x-hwp"
          className={inputCls}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setName(file.name);
            setErr("");
            try {
              const buf = new Uint8Array(await file.arrayBuffer());
              // HWP(CFB) 바이너리에서 읽을 수 있는 한글/영문 문자열을 추출합니다.
              const chunks: string[] = [];
              let cur = "";
              for (let i = 0; i < buf.length - 1; i++) {
                const code = buf[i] | (buf[i + 1] << 8);
                const isHangul = code >= 0xac00 && code <= 0xd7a3;
                const isAscii = code >= 0x20 && code < 0x7f;
                if (isHangul || isAscii) {
                  cur += String.fromCharCode(code);
                  i++;
                } else {
                  if (cur.length >= 2) chunks.push(cur);
                  cur = "";
                }
              }
              if (cur.length >= 2) chunks.push(cur);
              const merged = chunks
                .filter((s) => /[가-힣A-Za-z0-9]/.test(s))
                .join("\n")
                .replace(/\n{3,}/g, "\n\n")
                .trim();
              setText(merged || "(추출된 본문이 없습니다. 이미지·표 위주 문서이거나 암호화/특수 형식일 수 있습니다.)");
            } catch (e) {
              setErr(e instanceof Error ? e.message : "파일을 열 수 없습니다.");
            }
          }}
        />
      </Field>
      {name ? <p className="text-sm text-zinc-400">{name}</p> : null}
      {err ? <p className="text-sm text-rose-400">{err}</p> : null}
      <textarea className={areaCls} rows={16} value={text} readOnly placeholder="HWP를 올리면 텍스트 미리보기가 표시됩니다." />
      <Btn onClick={() => navigator.clipboard.writeText(text)}>텍스트 복사</Btn>
      <p className="text-xs text-zinc-500">
        온라인 미리보기용 텍스트 추출기입니다. 복잡한 서식·도형·암호도 완전 재현되지 않을 수 있습니다.
      </p>
    </Panel>
  );
}

function TextFileViewer() {
  const { file, input } = useFile();
  const [text, setText] = useState("");
  useEffect(() => {
    if (!file) return;
    file.text().then(setText).catch(() => setText("읽기 실패"));
  }, [file]);
  return (
    <Panel>
      <Field label="텍스트 파일">{input}</Field>
      <textarea className={areaCls} rows={14} value={text} readOnly />
    </Panel>
  );
}

function MimeCheck() {
  const { file, input } = useFile();
  return (
    <Panel>
      <Field label="파일">{input}</Field>
      {file ? (
        <ul className="space-y-1 text-sm text-zinc-300">
          <li>이름: {file.name}</li>
          <li>MIME: {file.type || "(비어 있음)"}</li>
          <li>크기: {(file.size / 1024).toFixed(2)} KB</li>
          <li>확장자: {file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "-"}</li>
        </ul>
      ) : null}
    </Panel>
  );
}

function FileHash() {
  const { file, input } = useFile();
  const [hash, setHash] = useState("");
  return (
    <Panel>
      <Field label="파일">{input}</Field>
      <Btn
        primary
        onClick={async () => {
          if (!file) return;
          const buf = await file.arrayBuffer();
          const dig = await crypto.subtle.digest("SHA-256", buf);
          setHash([...new Uint8Array(dig)].map((b) => b.toString(16).padStart(2, "0")).join(""));
        }}
      >
        SHA-256 계산
      </Btn>
      {hash ? <pre className="overflow-auto break-all rounded-xl border border-white/10 bg-black/30 p-3 text-sm">{hash}</pre> : null}
    </Panel>
  );
}

function CsvJson() {
  const [csv, setCsv] = useState("name,age\n민수,20\n지영,22");
  const out = useMemo(() => {
    try {
      const lines = csv.trim().split(/\r?\n/);
      const headers = lines[0].split(",").map((h) => h.trim());
      const rows = lines.slice(1).filter(Boolean).map((line) => {
        const cols = line.split(",");
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => (obj[h] = (cols[i] ?? "").trim()));
        return obj;
      });
      return JSON.stringify(rows, null, 2);
    } catch {
      return "변환 실패";
    }
  }, [csv]);
  return (
    <Panel>
      <textarea className={areaCls} rows={8} value={csv} onChange={(e) => setCsv(e.target.value)} />
      <pre className="overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-sm">{out}</pre>
      <Btn onClick={() => navigator.clipboard.writeText(out)}>복사</Btn>
    </Panel>
  );
}

function JsonCsv() {
  const [json, setJson] = useState('[{"name":"민수","age":20}]');
  const out = useMemo(() => {
    try {
      const data = JSON.parse(json);
      const arr = Array.isArray(data) ? data : [data];
      const headers = [...new Set(arr.flatMap((o) => Object.keys(o)))];
      const lines = [headers.join(",")].concat(
        arr.map((o) => headers.map((h) => String(o[h] ?? "")).join(",")),
      );
      return lines.join("\n");
    } catch {
      return "변환 실패";
    }
  }, [json]);
  return (
    <Panel>
      <textarea className={areaCls} rows={8} value={json} onChange={(e) => setJson(e.target.value)} />
      <textarea className={areaCls} rows={6} value={out} readOnly />
      <Btn onClick={() => downloadText(out, "data.csv", "text/csv")}>CSV 다운로드</Btn>
    </Panel>
  );
}

function MdPreview() {
  const [md, setMd] = useState("# 제목\n\n**굵게**와 *기울임*\n\n- 항목1\n- 항목2");
  const html = useMemo(() => {
    const t = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^- (.*)$/gm, "<li>$1</li>")
      .replace(/\n/g, "<br/>");
    return t;
  }, [md]);
  return (
    <Panel>
      <textarea className={areaCls} rows={8} value={md} onChange={(e) => setMd(e.target.value)} />
      <div className="prose prose-invert max-w-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm" dangerouslySetInnerHTML={{ __html: html }} />
    </Panel>
  );
}

function ImgFmt({ target }: { target: string }) {
  const { file, input } = useFile();
  return (
    <Panel>
      <Field label="이미지">{input}</Field>
      <Btn
        primary
        onClick={async () => {
          if (!file) return;
          const img = await loadImage(file);
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          c.getContext("2d")!.drawImage(img, 0, 0);
          const blob = await canvasToBlob(c, target, 0.92);
          const ext = target.includes("png") ? "png" : "jpg";
          downloadBlob(blob, file.name.replace(/\.[^.]+$/, "") + "." + ext);
        }}
      >
        변환 다운로드
      </Btn>
    </Panel>
  );
}

function WebpTool() {
  const { file, input } = useFile();
  const [mode, setMode] = useState<"webp" | "png" | "jpeg">("webp");
  return (
    <Panel>
      <Field label="이미지">{input}</Field>
      <div className="flex gap-2">
        {(["webp", "png", "jpeg"] as const).map((m) => (
          <Btn key={m} primary={mode === m} onClick={() => setMode(m)}>
            → {m.toUpperCase()}
          </Btn>
        ))}
      </div>
      <Btn
        primary
        onClick={async () => {
          if (!file) return;
          const img = await loadImage(file);
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          c.getContext("2d")!.drawImage(img, 0, 0);
          const type = mode === "jpeg" ? "image/jpeg" : `image/${mode}`;
          const blob = await canvasToBlob(c, type, 0.9);
          downloadBlob(blob, file.name.replace(/\.[^.]+$/, "") + "." + (mode === "jpeg" ? "jpg" : mode));
        }}
      >
        변환
      </Btn>
    </Panel>
  );
}

function ImgResize() {
  const { file, input } = useFile();
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  return (
    <Panel>
      <Field label="이미지">{input}</Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="가로">
          <input type="number" className={inputCls} value={w} onChange={(e) => setW(Number(e.target.value) || 1)} />
        </Field>
        <Field label="세로">
          <input type="number" className={inputCls} value={h} onChange={(e) => setH(Number(e.target.value) || 1)} />
        </Field>
      </div>
      <Btn
        primary
        onClick={async () => {
          if (!file) return;
          const img = await loadImage(file);
          const c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          c.getContext("2d")!.drawImage(img, 0, 0, w, h);
          downloadBlob(await canvasToBlob(c, "image/png"), `resized-${w}x${h}.png`);
        }}
      >
        리사이즈 다운로드
      </Btn>
    </Panel>
  );
}

function ImgCompress() {
  const { file, input } = useFile();
  const [q, setQ] = useState(0.7);
  return (
    <Panel>
      <Field label="이미지">{input}</Field>
      <Field label={`품질 ${Math.round(q * 100)}%`}>
        <input type="range" min={0.1} max={1} step={0.05} value={q} onChange={(e) => setQ(Number(e.target.value))} className="w-full" />
      </Field>
      <Btn
        primary
        onClick={async () => {
          if (!file) return;
          const img = await loadImage(file);
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          c.getContext("2d")!.drawImage(img, 0, 0);
          downloadBlob(await canvasToBlob(c, "image/jpeg", q), file.name.replace(/\.[^.]+$/, "") + "-compressed.jpg");
        }}
      >
        압축 다운로드
      </Btn>
    </Panel>
  );
}

function ImgRotate() {
  const { file, input } = useFile();
  return (
    <Panel>
      <Field label="이미지">{input}</Field>
      <div className="flex flex-wrap gap-2">
        {[90, 180, 270].map((deg) => (
          <Btn
            key={deg}
            primary
            onClick={async () => {
              if (!file) return;
              const img = await loadImage(file);
              const rad = (deg * Math.PI) / 180;
              const c = document.createElement("canvas");
              const swap = deg % 180 !== 0;
              c.width = swap ? img.height : img.width;
              c.height = swap ? img.width : img.height;
              const ctx = c.getContext("2d")!;
              ctx.translate(c.width / 2, c.height / 2);
              ctx.rotate(rad);
              ctx.drawImage(img, -img.width / 2, -img.height / 2);
              downloadBlob(await canvasToBlob(c, "image/png"), `rotated-${deg}.png`);
            }}
          >
            {deg}° 회전
          </Btn>
        ))}
      </div>
    </Panel>
  );
}

function ImgB64() {
  const { file, input } = useFile();
  const [out, setOut] = useState("");
  return (
    <Panel>
      <Field label="이미지">{input}</Field>
      <Btn
        primary
        onClick={() => {
          if (!file) return;
          const r = new FileReader();
          r.onload = () => setOut(String(r.result));
          r.readAsDataURL(file);
        }}
      >
        Base64 변환
      </Btn>
      <textarea className={areaCls} rows={6} value={out} readOnly />
      <Btn onClick={() => navigator.clipboard.writeText(out)}>복사</Btn>
    </Panel>
  );
}

function FaviconTool() {
  const { file, input } = useFile();
  return (
    <Panel>
      <Field label="이미지">{input}</Field>
      <Btn
        primary
        onClick={async () => {
          if (!file) return;
          const img = await loadImage(file);
          for (const size of [16, 32, 48]) {
            const c = document.createElement("canvas");
            c.width = size;
            c.height = size;
            c.getContext("2d")!.drawImage(img, 0, 0, size, size);
            downloadBlob(await canvasToBlob(c, "image/png"), `favicon-${size}.png`);
          }
        }}
      >
        16/32/48 다운로드
      </Btn>
    </Panel>
  );
}

function CaseTool() {
  const [t, setT] = useState("Hello JBM Soft");
  return (
    <Panel>
      <textarea className={areaCls} rows={4} value={t} onChange={(e) => setT(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <Btn onClick={() => setT(t.toUpperCase())}>UPPER</Btn>
        <Btn onClick={() => setT(t.toLowerCase())}>lower</Btn>
        <Btn onClick={() => setT(t.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()))}>Title</Btn>
      </div>
    </Panel>
  );
}

function FindReplace() {
  const [t, setT] = useState("사과 배 사과");
  const [a, setA] = useState("사과");
  const [b, setB] = useState("포도");
  const out = t.split(a).join(b);
  return (
    <Panel>
      <textarea className={areaCls} rows={5} value={t} onChange={(e) => setT(e.target.value)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="찾을 내용"><input className={inputCls} value={a} onChange={(e) => setA(e.target.value)} /></Field>
        <Field label="바꿀 내용"><input className={inputCls} value={b} onChange={(e) => setB(e.target.value)} /></Field>
      </div>
      <textarea className={areaCls} rows={5} value={out} readOnly />
    </Panel>
  );
}

function ReadingTime() {
  const [t, setT] = useState("");
  const words = t.trim() ? t.trim().split(/\s+/).length : 0;
  const min = Math.max(1, Math.ceil(words / 200));
  return (
    <Panel>
      <textarea className={areaCls} rows={8} value={t} onChange={(e) => setT(e.target.value)} placeholder="글을 붙여넣으세요" />
      <div className="text-lg font-bold">약 {min}분 · 단어 {words}개</div>
    </Panel>
  );
}

function Lorem() {
  const ko = "임시 문단입니다. 디자인 시안과 레이아웃 확인용 더미 텍스트를 제공합니다. ";
  const en = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
  const [n, setN] = useState(3);
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const out = Array.from({ length: n }, () => (lang === "ko" ? ko : en).repeat(4)).join("\n\n");
  return (
    <Panel>
      <div className="flex gap-2">
        <Btn primary={lang === "ko"} onClick={() => setLang("ko")}>한국어</Btn>
        <Btn primary={lang === "en"} onClick={() => setLang("en")}>English</Btn>
      </div>
      <Field label="문단 수">
        <input type="number" className={inputCls} value={n} onChange={(e) => setN(Number(e.target.value) || 1)} />
      </Field>
      <textarea className={areaCls} rows={8} value={out} readOnly />
      <Btn onClick={() => navigator.clipboard.writeText(out)}>복사</Btn>
    </Panel>
  );
}

function HtmlEntity() {
  const [t, setT] = useState("<div>JBM & SOFT</div>");
  const [mode, setMode] = useState<"enc" | "dec">("enc");
  const out =
    mode === "enc"
      ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      : t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  return (
    <Panel>
      <div className="flex gap-2">
        <Btn primary={mode === "enc"} onClick={() => setMode("enc")}>인코딩</Btn>
        <Btn primary={mode === "dec"} onClick={() => setMode("dec")}>디코딩</Btn>
      </div>
      <textarea className={areaCls} rows={4} value={t} onChange={(e) => setT(e.target.value)} />
      <textarea className={areaCls} rows={4} value={out} readOnly />
    </Panel>
  );
}

const KO_NUM = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const KO_UNIT = ["", "십", "백", "천"];
const KO_BIG = ["", "만", "억", "조"];

function numberToKorean(n: number): string {
  if (n === 0) return "영원";
  let num = Math.floor(Math.abs(n));
  let res = "";
  let big = 0;
  while (num > 0) {
    const part = num % 10000;
    if (part) {
      let s = "";
      const str = String(part).padStart(4, "0");
      for (let i = 0; i < 4; i++) {
        const d = Number(str[i]);
        if (!d) continue;
        if (!(d === 1 && i < 3)) s += KO_NUM[d];
        s += KO_UNIT[3 - i];
      }
      res = s + KO_BIG[big] + res;
    }
    num = Math.floor(num / 10000);
    big++;
  }
  return (n < 0 ? "마이너스 " : "") + res + "원";
}

function NumKo() {
  const [n, setN] = useState(1234567);
  return (
    <Panel>
      <Field label="숫자">
        <input type="number" className={inputCls} value={n} onChange={(e) => setN(Number(e.target.value) || 0)} />
      </Field>
      <div className="text-xl font-black">{numberToKorean(n)}</div>
    </Panel>
  );
}

function KoNum() {
  const [t, setT] = useState("일금 삼백만원");
  const map: Record<string, string> = { 영: "0", 일: "1", 이: "2", 삼: "3", 사: "4", 오: "5", 육: "6", 칠: "7", 팔: "8", 구: "9" };
  const digits = [...t].map((ch) => map[ch]).filter(Boolean).join("");
  return (
    <Panel>
      <Field label="한글 금액/숫자 텍스트">
        <input className={inputCls} value={t} onChange={(e) => setT(e.target.value)} />
      </Field>
      <div className="text-lg font-bold">추출 숫자 힌트: {digits || "-"}</div>
      <p className="text-xs text-zinc-500">간단 매핑 기반이며 복잡한 수사는 수동 확인이 필요합니다.</p>
    </Panel>
  );
}

function UrlEnc() {
  const [t, setT] = useState("https://jbmsoft.co.kr/?q=한글");
  const [mode, setMode] = useState<"enc" | "dec">("enc");
  let out = "";
  try {
    out = mode === "enc" ? encodeURIComponent(t) : decodeURIComponent(t);
  } catch {
    out = "변환 실패";
  }
  return (
    <Panel>
      <div className="flex gap-2">
        <Btn primary={mode === "enc"} onClick={() => setMode("enc")}>인코딩</Btn>
        <Btn primary={mode === "dec"} onClick={() => setMode("dec")}>디코딩</Btn>
      </div>
      <textarea className={areaCls} rows={4} value={t} onChange={(e) => setT(e.target.value)} />
      <textarea className={areaCls} rows={4} value={out} readOnly />
    </Panel>
  );
}

function Timestamp() {
  const [ts, setTs] = useState(Math.floor(Date.now() / 1000));
  const [iso, setIso] = useState(new Date().toISOString());
  return (
    <Panel>
      <Field label="유닉스 초">
        <input type="number" className={inputCls} value={ts} onChange={(e) => setTs(Number(e.target.value) || 0)} />
      </Field>
      <div className="rounded-xl border border-white/10 p-3">{new Date(ts * 1000).toString()}</div>
      <Field label="ISO 날짜">
        <input className={inputCls} value={iso} onChange={(e) => setIso(e.target.value)} />
      </Field>
      <Btn
        primary
        onClick={() => {
          const d = new Date(iso);
          if (!Number.isNaN(d.getTime())) setTs(Math.floor(d.getTime() / 1000));
        }}
      >
        ISO → 타임스탬프
      </Btn>
    </Panel>
  );
}

function Timezone() {
  const cities = ["Asia/Seoul", "America/New_York", "Europe/London", "Asia/Tokyo", "UTC"];
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <Panel>
      {cities.map((c) => (
        <div key={c} className="flex justify-between border-b border-white/10 py-2 text-sm">
          <span>{c}</span>
          <span className="font-mono">{now.toLocaleString("ko-KR", { timeZone: c })}</span>
        </div>
      ))}
    </Panel>
  );
}

function PxRem() {
  const [root, setRoot] = useState(16);
  const [px, setPx] = useState(24);
  const rem = px / root;
  return (
    <NumRow
      fields={[
        { key: "root", label: "루트 px", value: root, set: setRoot },
        { key: "px", label: "px", value: px, set: setPx },
      ]}
      result={[{ label: "rem", value: `${rem.toFixed(4)}rem` }]}
    />
  );
}

function DataUnit() {
  const [v, setV] = useState(1024);
  const [from, setFrom] = useState("KB");
  const map: Record<string, number> = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
  const bytes = v * (map[from] || 1);
  return (
    <Panel>
      <div className="grid grid-cols-2 gap-3">
        <Field label="값"><input type="number" className={inputCls} value={v} onChange={(e) => setV(Number(e.target.value) || 0)} /></Field>
        <Field label="단위">
          <select className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(map).map((k) => <option key={k}>{k}</option>)}
          </select>
        </Field>
      </div>
      <ul className="text-sm space-y-1">
        {Object.entries(map).map(([k, m]) => (
          <li key={k}>{k}: {(bytes / m).toLocaleString(undefined, { maximumFractionDigits: 6 })}</li>
        ))}
      </ul>
    </Panel>
  );
}

function Radix() {
  const [n, setN] = useState("255");
  const num = parseInt(n, 0) || parseInt(n, 10) || 0;
  return (
    <Panel>
      <Field label="숫자(10진 기본)"><input className={inputCls} value={n} onChange={(e) => setN(e.target.value)} /></Field>
      <ul className="font-mono text-sm space-y-1">
        <li>2진: {num.toString(2)}</li>
        <li>8진: {num.toString(8)}</li>
        <li>10진: {num.toString(10)}</li>
        <li>16진: {num.toString(16)}</li>
      </ul>
    </Panel>
  );
}

function Temp() {
  const [c, setC] = useState(25);
  return (
    <NumRow
      fields={[{ key: "c", label: "섭씨(°C)", value: c, set: setC }]}
      result={[
        { label: "화씨", value: `${((c * 9) / 5 + 32).toFixed(2)} °F` },
        { label: "켈빈", value: `${(c + 273.15).toFixed(2)} K` },
      ]}
    />
  );
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function Contrast() {
  const [a, setA] = useState("#000000");
  const [b, setB] = useState("#ffffff");
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const L1 = luminance(A.r, A.g, A.b);
  const L2 = luminance(B.r, B.g, B.b);
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  return (
    <Panel>
      <div className="grid grid-cols-2 gap-3">
        <Field label="색1"><input type="color" value={a} onChange={(e) => setA(e.target.value)} className="h-12 w-full" /></Field>
        <Field label="색2"><input type="color" value={b} onChange={(e) => setB(e.target.value)} className="h-12 w-full" /></Field>
      </div>
      <div className="text-2xl font-black">{ratio.toFixed(2)} : 1</div>
      <p className="text-sm text-zinc-400">AA 텍스트 권장 4.5 이상 / 큰 텍스트 3 이상</p>
    </Panel>
  );
}

function HexRgb() {
  const [hex, setHex] = useState("#7c6cff");
  const { r, g, b } = hexToRgb(hex);
  return (
    <Panel>
      <Field label="HEX"><input className={inputCls} value={hex} onChange={(e) => setHex(e.target.value)} /></Field>
      <div className="font-mono text-lg">rgb({r}, {g}, {b})</div>
    </Panel>
  );
}

function Vat() {
  const [supply, setSupply] = useState(100000);
  const vat = Math.round(supply * 0.1);
  return (
    <NumRow
      fields={[{ key: "s", label: "공급가액", value: supply, set: setSupply }]}
      result={[
        { label: "부가세(10%)", value: `${vat.toLocaleString()}원` },
        { label: "합계", value: `${(supply + vat).toLocaleString()}원` },
      ]}
      note="일반과세 10% 기준 참고용입니다."
    />
  );
}

function SplitBill() {
  const [total, setTotal] = useState(80000);
  const [n, setN] = useState(4);
  return (
    <NumRow
      fields={[
        { key: "t", label: "총액", value: total, set: setTotal },
        { key: "n", label: "인원", value: n, set: setN },
      ]}
      result={[{ label: "1인당", value: `${Math.ceil(total / Math.max(1, n)).toLocaleString()}원` }]}
    />
  );
}

function Hourly() {
  const [hourly, setHourly] = useState(10000);
  const [hours, setHours] = useState(209);
  return (
    <NumRow
      fields={[
        { key: "h", label: "시급", value: hourly, set: setHourly },
        { key: "hrs", label: "월 근로시간", value: hours, set: setHours },
      ]}
      result={[{ label: "월급 환산", value: `${(hourly * hours).toLocaleString()}원` }]}
    />
  );
}

function Overtime() {
  const [hourly, setHourly] = useState(10000);
  const [ot, setOt] = useState(10);
  const pay = Math.round(hourly * 1.5 * ot);
  return (
    <NumRow
      fields={[
        { key: "h", label: "시급", value: hourly, set: setHourly },
        { key: "ot", label: "연장 시간", value: ot, set: setOt },
      ]}
      result={[{ label: "연장수당(1.5배 가정)", value: `${pay.toLocaleString()}원` }]}
      note="사업장 규정에 따라 다를 수 있습니다."
    />
  );
}

function Compound() {
  const [p, setP] = useState(1000000);
  const [r, setR] = useState(5);
  const [y, setY] = useState(10);
  const fv = p * (1 + r / 100) ** y;
  return (
    <NumRow
      fields={[
        { key: "p", label: "원금", value: p, set: setP },
        { key: "r", label: "연이율(%)", value: r, set: setR },
        { key: "y", label: "기간(년)", value: y, set: setY },
      ]}
      result={[{ label: "만기 예상", value: `${Math.round(fv).toLocaleString()}원` }]}
    />
  );
}

function Roi() {
  const [invest, setInvest] = useState(1000000);
  const [ret, setRet] = useState(1300000);
  const profit = ret - invest;
  const rate = invest ? (profit / invest) * 100 : 0;
  return (
    <NumRow
      fields={[
        { key: "i", label: "투자금", value: invest, set: setInvest },
        { key: "r", label: "회수/평가액", value: ret, set: setRet },
      ]}
      result={[
        { label: "수익", value: `${profit.toLocaleString()}원` },
        { label: "수익률", value: `${rate.toFixed(2)}%` },
      ]}
    />
  );
}

function Bmr() {
  const [sex, setSex] = useState<"m" | "f">("m");
  const [kg, setKg] = useState(70);
  const [cm, setCm] = useState(175);
  const [age, setAge] = useState(30);
  const bmr = sex === "m" ? 10 * kg + 6.25 * cm - 5 * age + 5 : 10 * kg + 6.25 * cm - 5 * age - 161;
  return (
    <Panel>
      <div className="flex gap-2">
        <Btn primary={sex === "m"} onClick={() => setSex("m")}>남성</Btn>
        <Btn primary={sex === "f"} onClick={() => setSex("f")}>여성</Btn>
      </div>
      <NumRow
        fields={[
          { key: "kg", label: "체중(kg)", value: kg, set: setKg },
          { key: "cm", label: "키(cm)", value: cm, set: setCm },
          { key: "age", label: "나이", value: age, set: setAge },
        ]}
        result={[{ label: "BMR(대략)", value: `${Math.round(bmr)} kcal` }]}
        note="Mifflin-St Jeor 참고용입니다."
      />
    </Panel>
  );
}

function BodyFat() {
  const [sex, setSex] = useState<"m" | "f">("m");
  const [bmi, setBmi] = useState(23);
  const [age, setAge] = useState(30);
  const bf = sex === "m" ? 1.2 * bmi + 0.23 * age - 16.2 : 1.2 * bmi + 0.23 * age - 5.4;
  return (
    <Panel>
      <div className="flex gap-2 mb-2">
        <Btn primary={sex === "m"} onClick={() => setSex("m")}>남성</Btn>
        <Btn primary={sex === "f"} onClick={() => setSex("f")}>여성</Btn>
      </div>
      <NumRow
        fields={[
          { key: "bmi", label: "BMI", value: bmi, set: setBmi },
          { key: "age", label: "나이", value: age, set: setAge },
        ]}
        result={[{ label: "추정 체지방률", value: `${bf.toFixed(1)}%` }]}
        note="간단 추정이며 의료 목적이 아닙니다."
      />
    </Panel>
  );
}

function Pace() {
  const [km, setKm] = useState(5);
  const [min, setMin] = useState(30);
  const pace = min / Math.max(0.01, km);
  return (
    <NumRow
      fields={[
        { key: "km", label: "거리(km)", value: km, set: setKm },
        { key: "min", label: "시간(분)", value: min, set: setMin },
      ]}
      result={[{ label: "페이스", value: `${pace.toFixed(2)} 분/km` }]}
    />
  );
}

function Fuel() {
  const [km, setKm] = useState(300);
  const [eff, setEff] = useState(12);
  const [price, setPrice] = useState(1700);
  const cost = (km / Math.max(0.01, eff)) * price;
  return (
    <NumRow
      fields={[
        { key: "km", label: "거리(km)", value: km, set: setKm },
        { key: "eff", label: "연비(km/L)", value: eff, set: setEff },
        { key: "p", label: "유가(원/L)", value: price, set: setPrice },
      ]}
      result={[{ label: "예상 주유비", value: `${Math.round(cost).toLocaleString()}원` }]}
    />
  );
}

function Workdays() {
  const [a, setA] = useState(new Date().toISOString().slice(0, 10));
  const [b, setB] = useState(new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10));
  const days = useMemo(() => {
    let n = 0;
    const start = new Date(a);
    const end = new Date(b);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const w = d.getDay();
      if (w !== 0 && w !== 6) n++;
    }
    return n;
  }, [a, b]);
  return (
    <Panel>
      <div className="grid grid-cols-2 gap-3">
        <Field label="시작"><input type="date" className={inputCls} value={a} onChange={(e) => setA(e.target.value)} /></Field>
        <Field label="종료"><input type="date" className={inputCls} value={b} onChange={(e) => setB(e.target.value)} /></Field>
      </div>
      <div className="text-2xl font-black">영업일 {days}일</div>
      <p className="text-xs text-zinc-500">공휴일은 제외되지 않은 단순 주말 제외 계산입니다.</p>
    </Panel>
  );
}

function DueDate() {
  const [lmp, setLmp] = useState(new Date().toISOString().slice(0, 10));
  const due = useMemo(() => {
    const d = new Date(lmp);
    d.setDate(d.getDate() + 280);
    return d.toISOString().slice(0, 10);
  }, [lmp]);
  return (
    <Panel>
      <Field label="마지막 생리 시작일"><input type="date" className={inputCls} value={lmp} onChange={(e) => setLmp(e.target.value)} /></Field>
      <div className="text-xl font-black">예정일 약 {due}</div>
      <p className="text-xs text-zinc-500">네이글 규칙(280일) 참고용이며 의료 상담이 필요합니다.</p>
    </Panel>
  );
}

function Tip() {
  const [bill, setBill] = useState(50);
  const [pct, setPct] = useState(15);
  const tip = bill * (pct / 100);
  return (
    <NumRow
      fields={[
        { key: "b", label: "금액", value: bill, set: setBill },
        { key: "p", label: "팁(%)", value: pct, set: setPct },
      ]}
      result={[
        { label: "팁", value: tip.toFixed(2) },
        { label: "합계", value: (bill + tip).toFixed(2) },
      ]}
    />
  );
}

function BizNo() {
  const [v, setV] = useState("123-45-67890");
  const digits = v.replace(/\D/g, "");
  const valid = useMemo(() => {
    if (digits.length !== 10) return false;
    const w = [1, 3, 7, 1, 3, 7, 1, 3, 5];
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number(digits[i]) * w[i];
    sum += Math.floor((Number(digits[8]) * 5) / 10);
    const check = (10 - (sum % 10)) % 10;
    return check === Number(digits[9]);
  }, [digits]);
  return (
    <Panel>
      <Field label="사업자등록번호"><input className={inputCls} value={v} onChange={(e) => setV(e.target.value)} /></Field>
      <div className={`text-lg font-bold ${valid ? "text-emerald-400" : "text-rose-400"}`}>
        {digits.length === 10 ? (valid ? "체크섬 유효" : "체크섬 불일치") : "10자리 숫자를 입력하세요"}
      </div>
      <p className="text-xs text-zinc-500">국세청 진위 조회가 아닌 형식(체크섬) 검증입니다.</p>
    </Panel>
  );
}

function PhoneFmt() {
  const [v, setV] = useState("01012345678");
  const d = v.replace(/\D/g, "");
  let out = d;
  if (d.startsWith("02")) {
    out = d.length > 9 ? d.replace(/(02)(\d{4})(\d{4})/, "$1-$2-$3") : d.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3");
  } else if (d.length >= 10) {
    out = d.replace(/(01\d)(\d{3,4})(\d{4})/, "$1-$2-$3");
  }
  return (
    <Panel>
      <Field label="번호"><input className={inputCls} value={v} onChange={(e) => setV(e.target.value)} /></Field>
      <div className="text-xl font-black">{out}</div>
    </Panel>
  );
}

const ROMAN: Record<string, string> = {
  가: "ga", 나: "na", 다: "da", 라: "ra", 마: "ma", 바: "ba", 사: "sa", 아: "a", 자: "ja", 차: "cha", 카: "ka", 타: "ta", 파: "pa", 하: "ha",
  김: "kim", 이: "lee", 박: "park", 최: "choi", 정: "jung", 강: "kang", 조: "cho", 윤: "yoon", 장: "jang", 임: "lim",
};

function Romanize() {
  const [t, setT] = useState("한글 로마자");
  const out = [...t].map((ch) => ROMAN[ch] || ch).join("");
  return (
    <Panel>
      <textarea className={areaCls} rows={3} value={t} onChange={(e) => setT(e.target.value)} />
      <div className="text-lg font-bold">{out}</div>
      <p className="text-xs text-zinc-500">간단 매핑·참고용입니다. 공식 표기와 다를 수 있습니다.</p>
    </Panel>
  );
}

function toChosung(s: string) {
  const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  return [...s].map((ch) => {
    const c = ch.charCodeAt(0);
    if (c < 0xac00 || c > 0xd7a3) return ch;
    return CHO[Math.floor((c - 0xac00) / 588)];
  }).join("");
}

function toJamo(s: string) {
  const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const JUNG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
  const JONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  return [...s].map((ch) => {
    const c = ch.charCodeAt(0);
    if (c < 0xac00 || c > 0xd7a3) return ch;
    const x = c - 0xac00;
    const cho = Math.floor(x / 588);
    const jung = Math.floor((x % 588) / 28);
    const jong = x % 28;
    return CHO[cho] + JUNG[jung] + JONG[jong];
  }).join(" ");
}

function Zodiac() {
  const [d, setD] = useState("1995-05-01");
  const year = Number(d.slice(0, 4));
  const animals = ["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"];
  const animal = animals[year % 12];
  const md = d.slice(5);
  const signs = [
    ["염소자리","01-20"],["물병자리","02-19"],["물고기자리","03-20"],["양자리","04-20"],["황소자리","05-21"],["쌍둥이자리","06-21"],
    ["게자리","07-22"],["사자자리","08-22"],["처녀자리","09-23"],["천칭자리","10-23"],["전갈자리","11-22"],["사수자리","12-24"],["염소자리","12-31"],
  ];
  let sign = "염소자리";
  for (const [name, end] of signs) {
    if (md <= end) {
      sign = name;
      break;
    }
  }
  return (
    <Panel>
      <Field label="생년월일"><input type="date" className={inputCls} value={d} onChange={(e) => setD(e.target.value)} /></Field>
      <div className="text-xl font-black">{animal}띠 · {sign}</div>
    </Panel>
  );
}

function Regex() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("전화 01012345678 나이 20");
  let matches = "";
  try {
    const re = new RegExp(pattern, flags);
    matches = [...text.matchAll(re)].map((m) => m[0]).join("\n") || "(일치 없음)";
  } catch (e) {
    matches = e instanceof Error ? e.message : "정규식 오류";
  }
  return (
    <Panel>
      <div className="grid grid-cols-3 gap-2">
        <Field label="패턴"><input className={inputCls} value={pattern} onChange={(e) => setPattern(e.target.value)} /></Field>
        <Field label="플래그"><input className={inputCls} value={flags} onChange={(e) => setFlags(e.target.value)} /></Field>
      </div>
      <textarea className={areaCls} rows={5} value={text} onChange={(e) => setText(e.target.value)} />
      <pre className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm whitespace-pre-wrap">{matches}</pre>
    </Panel>
  );
}

function Jwt() {
  const [t, setT] = useState("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYm0ifQ.sig");
  let out = "";
  try {
    const parts = t.split(".");
    out = parts.slice(0, 2).map((p, i) => {
      const json = decodeURIComponent(escape(atob(p.replace(/-/g, "+").replace(/_/g, "/"))));
      return `${i === 0 ? "header" : "payload"}:\n${JSON.stringify(JSON.parse(json), null, 2)}`;
    }).join("\n\n");
  } catch {
    out = "디코딩 실패";
  }
  return (
    <Panel>
      <textarea className={areaCls} rows={4} value={t} onChange={(e) => setT(e.target.value)} />
      <pre className="overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-sm">{out}</pre>
      <p className="text-xs text-zinc-500">서명 검증 없이 페이로드만 보여줍니다.</p>
    </Panel>
  );
}

function Cron() {
  const [c, setC] = useState("0 9 * * 1-5");
  const parts = c.trim().split(/\s+/);
  const labels = ["분", "시", "일", "월", "요일"];
  return (
    <Panel>
      <Field label="크론 식"><input className={inputCls} value={c} onChange={(e) => setC(e.target.value)} /></Field>
      <ul className="text-sm space-y-1">
        {parts.slice(0, 5).map((p, i) => (
          <li key={i}>{labels[i]}: {p}</li>
        ))}
      </ul>
      <p className="text-xs text-zinc-500">간단 분해이며 초 필드/특수문법은 환경마다 다를 수 있습니다.</p>
    </Panel>
  );
}

function Ua() {
  const [ua, setUa] = useState("");
  useEffect(() => setUa(navigator.userAgent), []);
  return (
    <Panel>
      <pre className="overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-sm whitespace-pre-wrap">{ua}</pre>
      <div className="text-sm text-zinc-400">언어: {typeof navigator !== "undefined" ? navigator.language : "-"}</div>
      <div className="text-sm text-zinc-400">화면: {typeof window !== "undefined" ? `${window.screen.width}×${window.screen.height}` : "-"}</div>
    </Panel>
  );
}

function PwStrength() {
  const [pw, setPw] = useState("");
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const label = ["매우 약함", "약함", "보통", "강함", "매우 강함", "우수"][score];
  return (
    <Panel>
      <Field label="비밀번호"><input type="password" className={inputCls} value={pw} onChange={(e) => setPw(e.target.value)} /></Field>
      <div className="text-xl font-black">{label} ({score}/5)</div>
    </Panel>
  );
}

function Barcode() {
  const [v, setV] = useState("8801234567890");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width = 400;
    c.height = 120;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#000";
    let x = 20;
    for (const ch of v) {
      const n = ch.charCodeAt(0) % 7 + 1;
      for (let i = 0; i < n; i++) {
        if (i % 2 === 0) ctx.fillRect(x, 10, 2, 80);
        x += 2;
      }
      x += 2;
    }
    ctx.font = "14px monospace";
    ctx.fillText(v, 20, 110);
  }, [v]);
  return (
    <Panel>
      <Field label="값"><input className={inputCls} value={v} onChange={(e) => setV(e.target.value)} /></Field>
      <canvas ref={canvasRef} className="w-full rounded-xl bg-white" />
      <p className="text-xs text-zinc-500">시각적 참고용 패턴이며 산업용 스캐너 호환을 보장하지 않습니다.</p>
    </Panel>
  );
}

const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--",
  N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
};

function Morse() {
  const [t, setT] = useState("JBM SOFT");
  const out = t.toUpperCase().split("").map((ch) => (ch === " " ? "/" : MORSE[ch] || ch)).join(" ");
  return (
    <Panel>
      <textarea className={areaCls} rows={3} value={t} onChange={(e) => setT(e.target.value)} />
      <div className="font-mono text-lg break-all">{out}</div>
    </Panel>
  );
}

function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    const ctx = new AudioContext();
    const id = setInterval(() => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.value = 880;
      g.gain.value = 0.05;
      o.start();
      o.stop(ctx.currentTime + 0.05);
    }, 60000 / bpm);
    return () => {
      clearInterval(id);
      ctx.close();
    };
  }, [on, bpm]);
  return (
    <Panel>
      <Field label={`BPM ${bpm}`}>
        <input type="range" min={40} max={220} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="w-full" />
      </Field>
      <Btn primary onClick={() => setOn((v) => !v)}>{on ? "정지" : "시작"}</Btn>
    </Panel>
  );
}

function Dice() {
  const [n, setN] = useState(6);
  const [v, setV] = useState(1);
  return (
    <Panel>
      <Field label="면 수"><input type="number" className={inputCls} value={n} onChange={(e) => setN(Number(e.target.value) || 6)} /></Field>
      <div className="text-5xl font-black text-center py-6">{v}</div>
      <Btn primary onClick={() => setV(1 + Math.floor(Math.random() * Math.max(1, n)))}>굴리기</Btn>
    </Panel>
  );
}

function Coin() {
  const [v, setV] = useState("앞면");
  return (
    <Panel>
      <div className="text-4xl font-black text-center py-8">{v}</div>
      <Btn primary onClick={() => setV(Math.random() < 0.5 ? "앞면" : "뒷면")}>던지기</Btn>
    </Panel>
  );
}

function RandNum() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [v, setV] = useState(1);
  return (
    <Panel>
      <div className="grid grid-cols-2 gap-3">
        <Field label="최소"><input type="number" className={inputCls} value={min} onChange={(e) => setMin(Number(e.target.value))} /></Field>
        <Field label="최대"><input type="number" className={inputCls} value={max} onChange={(e) => setMax(Number(e.target.value))} /></Field>
      </div>
      <div className="text-4xl font-black text-center py-4">{v}</div>
      <Btn primary onClick={() => {
        const a = Math.min(min, max);
        const b = Math.max(min, max);
        setV(a + Math.floor(Math.random() * (b - a + 1)));
      }}>생성</Btn>
    </Panel>
  );
}

function Typing() {
  const sample = "아이디어만 있어도 완성까지 함께합니다.";
  const [input, setInput] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const done = input === sample;
  const sec = start ? (Date.now() - start) / 1000 : 0;
  const cpm = sec > 0 ? Math.round((input.length / sec) * 60) : 0;
  return (
    <Panel>
      <p className="text-lg font-bold">{sample}</p>
      <textarea
        className={areaCls}
        rows={3}
        value={input}
        onChange={(e) => {
          if (!start) setStart(Date.now());
          setInput(e.target.value);
        }}
      />
      <div className="text-sm">타속 약 {cpm} CPM {done ? "· 완료!" : ""}</div>
    </Panel>
  );
}

function Notepad() {
  const key = "jbmsoft-notepad";
  const [t, setT] = useState("");
  useEffect(() => setT(localStorage.getItem(key) || ""), []);
  return (
    <Panel>
      <textarea
        className={areaCls}
        rows={12}
        value={t}
        onChange={(e) => {
          setT(e.target.value);
          localStorage.setItem(key, e.target.value);
        }}
        placeholder="메모는 이 브라우저에만 저장됩니다."
      />
    </Panel>
  );
}

function BigClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <Panel>
      <div className="py-10 text-center text-6xl font-black tracking-tight md:text-8xl">
        {now.toLocaleTimeString("ko-KR")}
      </div>
    </Panel>
  );
}

function Aspect() {
  const [w, setW] = useState(1920);
  const [h, setH] = useState(1080);
  const g = (a: number, b: number): number => (b === 0 ? a : g(b, a % b));
  const d = g(w, h) || 1;
  return (
    <NumRow
      fields={[
        { key: "w", label: "가로", value: w, set: setW },
        { key: "h", label: "세로", value: h, set: setH },
      ]}
      result={[{ label: "비율", value: `${w / d}:${h / d}` }]}
    />
  );
}

function PdfInfo() {
  const { file, input } = useFile();
  return (
    <Panel>
      <Field label="PDF 선택">{input}</Field>
      {file ? (
        <ul className="text-sm space-y-1">
          <li>이름: {file.name}</li>
          <li>크기: {(file.size / 1024 / 1024).toFixed(2)} MB</li>
          <li>타입: {file.type || "application/pdf"}</li>
        </ul>
      ) : null}
      {file ? (
        <a className="btn-primary inline-flex" href={URL.createObjectURL(file)} target="_blank" rel="noreferrer">
          브라우저에서 PDF 열기
        </a>
      ) : null}
      <p className="text-xs text-zinc-500">페이지 수 정밀 파싱 대신 브라우저 뷰어로 확인하는 방식입니다.</p>
    </Panel>
  );
}
