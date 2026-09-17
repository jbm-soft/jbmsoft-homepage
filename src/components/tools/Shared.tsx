"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Tool } from "@/data/tools";

export function Panel({ children }: { children: ReactNode }) {
  return <div className="card p-5 md:p-6 space-y-3">{children}</div>;
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
      <span className="mb-1 block text-zinc-400">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-[#7c6cff]";
export const areaCls =
  "mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#7c6cff]";

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
    <input
      type="file"
      className={inputCls}
      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
    />
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
  const out = useMemo(() => transform(inText), [inText, transform]);
  return (
    <Panel>
      <textarea className={areaCls} rows={6} value={inText} onChange={(e) => setIn(e.target.value)} placeholder={placeholder} />
      <textarea className={areaCls} rows={6} value={out} readOnly />
      <div className="flex flex-wrap gap-2">
        <Btn primary onClick={() => navigator.clipboard.writeText(out)}>결과 복사</Btn>
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
      <div className="grid gap-3 sm:grid-cols-2">
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
      <div className="grid gap-3 sm:grid-cols-2">
        {props.result.map((r) => (
          <div key={r.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-xs text-zinc-500">{r.label}</div>
            <div className="text-xl font-black">{r.value}</div>
          </div>
        ))}
      </div>
      {props.note ? <p className="text-xs text-zinc-500">{props.note}</p> : null}
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
    <div>
      <p className="mb-4 text-sm text-zinc-400">{tool.longDescription}</p>
      {children}
    </div>
  );
}
