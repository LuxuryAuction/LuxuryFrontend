import { useRef, useState } from "react";

export const ImageUpload = ({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = [...files, ...Array.from(incoming)].slice(0, 8);
    onChange(next);
  };

  const remove = (i: number) => onChange(files.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 py-10 px-6 group
          ${dragging
            ? "border-brand-primary bg-[#F0A50012] scale-[1.01]"
            : "border-border-primary bg-surface-primary hover:border-[#F0A50040] hover:bg-[#F0A5000a]"
          }`}
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F0A50010] border border-[#F0A50025] group-hover:bg-[#F0A50018] transition-colors">
          <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-content-primary text-sm font-medium">
            Drop images here or <span className="text-brand-primary">browse</span>
          </p>
          <p className="text-content-tertiary text-xs mt-1 font-mono">
            PNG, JPG, WEBP · max 8 photos · up to 10 MB each
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {files.map((f, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-border-primary">
              <img
                src={URL.createObjectURL(f)}
                alt={f.name}
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[9px] font-mono uppercase tracking-wider bg-brand-primary text-black px-1.5 py-0.5 rounded-md">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-state-danger"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
