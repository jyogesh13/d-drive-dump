import { useState, useRef } from "react";
import { Download, Trash2, Upload, ImageIcon, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useImageStore } from "./store/useImageStore";
import "./index.css";

const REQ_SIZE = 3 * 1024 * 1024;

interface ImageType {
  id: string;
  name: string;
  size: number;
  binary: string | ArrayBuffer | null;
  createdAt: number;
}

const App = () => {
  const { images, setImage, deleteImage } = useImageStore();
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<ImageType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return toast.error("Please choose an image file");
    }
    if (file.size > REQ_SIZE) {
      return toast.error("Please upload a file less than 3 MB");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = () => {
      toast.error("Failed to read the file");
    };
    reader.onload = () => {
      setImage({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        binary: reader.result,
        createdAt: Date.now(),
      });
      toast.success("Image uploaded successfully");
    };
  };

  const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDownload = (item: ImageType) => {
    if (typeof item.binary !== "string") {
      toast.error("Unable to download image");
      return;
    }
    const a = document.createElement("a");
    a.href = item.binary;
    a.download = item.name;
    a.click();
    a.remove();
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <>
      <div
        className="min-h-screen bg-[#0a0a0f] text-[#f0f0f8] antialiased"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-24">
          {/* ── Header ── */}
          <div className="flex flex-col items-center gap-3 mb-14 text-center">
            <span className="inline-block text-[11px] font-medium tracking-[0.18em] uppercase text-violet-400 bg-violet-500/10 border border-violet-500/25 rounded-full px-4 py-1">
              Personal Vault
            </span>

            <h1 className="font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight gradient-text">
              Image Storage
            </h1>

            <p className="text-[#7a7a9a] text-sm sm:text-[15px] font-light max-w-xs leading-relaxed">
              Upload, preview, and manage your images in one place.
            </p>
          </div>

          {/* ── Upload zone ── */}
          <label
            htmlFor="image-input"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={[
              "upload-glow relative block rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden mb-12 transition-all duration-200",
              dragging
                ? "border-violet-500 bg-violet-500/[0.07] -translate-y-0.5"
                : "border-white/10 bg-[#16161f] hover:border-violet-500 hover:bg-violet-500/6 hover:-translate-y-0.5",
            ].join(" ")}
          >
            <div className="flex flex-col items-center gap-4 py-14 sm:py-16 px-6">
              {/* Gradient icon */}
              <div className="w-18 h-18 rounded-[20px] bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-[0_8px_32px_rgba(124,110,247,0.4)]">
                <Upload size={28} color="#fff" />
              </div>

              <p className="font-syne font-semibold text-lg text-[#f0f0f8]">
                Drop or click to upload
              </p>
              <p className="text-sm text-[#45455f] font-light -mt-1">
                Drag &amp; drop an image here
              </p>

              <span className="mt-1 text-[11px] tracking-wide text-[#7a7a9a] bg-white/5 border border-white/[0.07] rounded-full px-3 py-1">
                PNG · JPG · WEBP · GIF · max 3 MB
              </span>
            </div>
          </label>

          <input
            ref={inputRef}
            type="file"
            id="image-input"
            accept="image/*"
            hidden
            onChange={chooseFile}
          />

          {/* ── Gallery section header ── */}
          {images.length > 0 && (
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-syne font-bold text-xl text-[#f0f0f8]">
                Gallery
              </span>
              <span className="text-xs font-medium bg-violet-500/15 text-violet-400 border border-violet-500/25 rounded-full px-3 py-0.5">
                {images.length} image{images.length > 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* ── Empty state ── */}
          {images.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <div className="w-18 h-18 rounded-[20px] bg-[#16161f] border border-white/[0.07] flex items-center justify-center">
                <ImageIcon size={28} color="#45455f" />
              </div>
              <h3 className="font-syne font-bold text-xl text-[#7a7a9a]">
                No images yet
              </h3>
              <p className="text-sm text-[#45455f] font-light max-w-70 leading-relaxed">
                Upload your first image above and it will appear here.
              </p>
            </div>
          ) : (
            /* ── Image grid ── */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {images.map((image: ImageType) => (
                <div
                  key={image.id}
                  className="thumb-card bg-[#16161f] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-200 hover:border-white/16 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                >
                  {/* Thumbnail */}
                  <div className="relative h-36 sm:h-44 overflow-hidden bg-[#0d0d14]">
                    <img
                      src={image.binary as string}
                      alt={image.name}
                      className="thumb-img w-full h-full object-cover transition-transform duration-300"
                    />
                    {/* Hover overlay */}
                    <div className="img-overlay absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-200 flex items-end p-3">
                      <button
                        onClick={() => setPreview(image)}
                        className="text-[11px] font-medium tracking-widest uppercase bg-white/10 border border-white/20 backdrop-blur-sm text-white rounded-lg px-3 py-1.5 hover:bg-white/20 transition-colors duration-150"
                      >
                        Preview
                      </button>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-3 sm:p-4">
                    <p className="font-syne font-semibold text-[13px] sm:text-sm text-[#f0f0f8] truncate mb-1">
                      {image.name}
                    </p>
                    <div className="flex gap-1.5 text-[11px] text-[#45455f] font-light mb-3">
                      <span>{formatSize(image.size)}</span>
                      <span>·</span>
                      <span>{formatDate(new Date(image.createdAt))}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(image)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl py-2 hover:opacity-75 active:scale-95 transition-all duration-150"
                      >
                        <Download size={13} />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl py-2 hover:opacity-75 active:scale-95 transition-all duration-150"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setPreview(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

          {/* Modal */}
          <div
            className="relative z-10 w-full max-w-3xl bg-[#16161f] border border-white/[0.14] rounded-2xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-xl bg-white/8 border border-white/10 text-white flex items-center justify-center hover:bg-white/15 transition-colors duration-150"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <img
              src={preview.binary as string}
              alt={preview.name}
              className="w-full max-h-[68vh] object-contain bg-[#0d0d14]"
            />

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-syne font-semibold text-[15px] text-[#f0f0f8]">
                  {preview.name}
                </p>
                <p className="text-xs text-[#45455f] font-light mt-0.5">
                  {formatSize(preview.size)} · {formatDate(new Date(preview.createdAt))}
                </p>
              </div>
              <button
                onClick={() => handleDownload(preview)}
                className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 hover:opacity-75 transition-opacity duration-150"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        toastStyle={{
          background: "#16161f",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#f0f0f8",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          borderRadius: "12px",
        }}
      />
    </>
  );
};

export default App;
