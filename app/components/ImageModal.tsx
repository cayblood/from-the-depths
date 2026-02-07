import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  src: string;
  alt: string;
  caption: string;
  onClose: () => void;
}

export function ImageModal({ src, alt, caption, onClose }: ImageModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [handleEscape]);

  const overlay = (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Image full size view"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-[#d8bbbe] hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f5e6e7]"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <title>Close</title>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <button
        type="button"
        className="flex flex-1 flex-col items-center justify-center p-4 pt-14 text-left focus:outline-none focus:ring-0"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        aria-label="Close overlay"
      >
        <img
          src={src}
          alt={alt}
          className="max-h-dvh max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          draggable={false}
        />
        {caption && (
          <figcaption className="mt-4 max-w-2xl text-center text-sm text-[#d8bbbe] opacity-90 italic">
            {caption}
          </figcaption>
        )}
      </button>
    </div>
  );

  return createPortal(overlay, document.body);
}
