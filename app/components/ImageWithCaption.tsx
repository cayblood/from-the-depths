interface ImageWithCaptionProps {
  src: string;
  alt?: string;
  caption: string;
  /** When set, the figure floats so text wraps around it. Use "left" and "right" alternately for a single-column layout. */
  float?: "left" | "right";
  /** Slightly pull the figure up to align with the top of adjacent text (e.g. first image at top of paragraph). */
  alignTop?: boolean;
}

export function ImageWithCaption({ src, alt, caption, float, alignTop }: ImageWithCaptionProps) {
  /* Floated size: 1/2 of 28rem below lg, 3/4 of 28rem at lg+ (28rem = max-w-md) */
  /* clear-left/clear-right so the next float on the same side goes below, but the opposite side can sit beside (same row) */
  const floatClasses =
    float === "left"
      ? "float-left clear-left mr-4 mb-4 max-w-[14rem] lg:max-w-[21rem]"
      : float === "right"
        ? "float-right clear-right ml-4 mb-4 max-w-[14rem] lg:max-w-[21rem]"
        : "";

  const marginClasses = float ? (alignTop ? "mb-4 align-top" : "my-4") : "my-6";

  return (
    <figure className={float ? `w-max ${marginClasses} ${floatClasses}` : "my-6"}>
      <img
        src={src}
        alt={alt ?? caption}
        className={`max-w-full h-auto rounded-lg ${float ? "block" : "w-full"}`}
      />
      <figcaption className="mt-2 text-sm text-[#d8bbbe] opacity-85 italic text-center font-[Inter] w-full max-w-full text-balance">
        {caption}
      </figcaption>
    </figure>
  );
}
