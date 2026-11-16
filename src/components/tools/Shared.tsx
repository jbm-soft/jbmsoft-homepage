"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Tool } from "@/data/tools";

export function Panel({ children }: { children: ReactNode }) {
  return <div className="card space-y-4 p-5 md:p-7">{children}</div>;
}

export function Btn({
  onClick,
  children,
  primary,
}: {
  onClick?: () => void;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className={primary ? "btn-primary" : "btn-ghost"}>
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold text-slate-300">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "mt-1 w-full rounded-xl border border-white/12 bg-[#0a0d14] px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20";
export const areaCls =
  "mt-1 w-full rounded-xl border border-white/12 bg-[#0a0d14] px-3.5 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20";

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(text: string, filename: string, type = "text/plain") {
  downloadBlob(new Blob([text], { type }), filename);
}

export function useFile() {
  const [file, setFile] = useState<File | null>(null);
  const input = (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-[#0a0d14]/70 px-4 py-6 text-center transition hover:border-emerald-400/50 hover:bg-emerald-400/[0.03]">
      <span className="text-sm font-bold text-slate-200">
        {file ? `📎 ${file.name}` : "📁 파일을 선택하거나 클릭해 업로드하세요"}
      </span>
      <span className="mt-1 text-xs text-slate-500">
        {file ? `${(file.size / 1024).toFixed(1)} KB · 브라우저 내부에서만 처리됨` : "서버로 업로드되지 않고 브라우저에서 즉시 처리됩니다"}
      </span>
      <input
        type="file"
        className="sr-only"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
    </label>
  );
  return { file, setFile, input };
}

export function TextTransform({
  transform,
  placeholder = "텍스트를 입력하세요",
}: {
  transform: (s: string) => string;
  placeholder?: string;
}) {
  const [inText, setIn] = useState("");
  const [copied, setCopied] = useState(false);
  const out = useMemo(() => transform(inText), [inText, transform]);

  const handleCopy = async () => {
    if (!out) return;
    await navigator.clipboard.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Panel>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">입력</span>
            <span>{inText.length.toLocaleString()}자</span>
          </div>
          <textarea
            className={areaCls}
            rows={8}
            value={inText}
            onChange={(e) => setIn(e.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-emerald-300">변환 결과</span>
            <span>{out.length.toLocaleString()}자</span>
          </div>
          <textarea
            className={`${areaCls} bg-[#0d131d]`}
            rows={8}
            value={out}
            readOnly
            placeholder="결과가 여기에 즉시 표시됩니다"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Btn primary onClick={handleCopy}>
          {copied ? "✓ 복사 완료!" : "결과 복사"}
        </Btn>
        <Btn onClick={() => setIn("")}>초기화</Btn>
      </div>
    </Panel>
  );
}

export function NumRow(props: {
  fields: { key: string; label: string; value: number; set: (n: number) => void }[];
  result: { label: string; value: string }[];
  note?: string;
}) {
  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        {props.fields.map((f) => (
          <Field key={f.key} label={f.label}>
            <input
              type="number"
              className={inputCls}
              value={f.value}
              onChange={(e) => f.set(Number(e.target.value) || 0)}
            />
          </Field>
        ))}
      </div>
      <div className="grid gap-3 pt-1 sm:grid-cols-2">
        {props.result.map((r) => (
          <div
            key={r.label}
            className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.06] to-sky-500/[0.04] p-4"
          >
            <div className="text-xs font-medium text-slate-400">{r.label}</div>
            <div className="mt-1 text-2xl font-black tracking-tight text-white">{r.value}</div>
          </div>
        ))}
      </div>
      {props.note ? <p className="text-xs text-slate-500">{props.note}</p> : null}
    </Panel>
  );
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("blob"))), type, quality);
  });
}

export function ImplShell({ tool, children }: { tool: Tool; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
        <p className="text-sm text-slate-300">{tool.longDescription}</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
          🔒 100% 브라우저 로컬 처리
        </span>
      </div>
      {children}
    </div>
  );
}
