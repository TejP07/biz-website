import Image from "next/image";

type ArchImageProps = {
  src: string;
  alt: string;
  /** Aspect ratio class, e.g. "aspect-[16/10]". */
  aspect?: string;
  sizes?: string;
  preload?: boolean;
  /** Shows a small "Placeholder image" label over the image. */
  placeholderLabel?: string | false;
  className?: string;
  imageClassName?: string;
};

/**
 * Image frame used for project and service imagery.
 *
 * All current images are generated placeholder drawings in
 * /public/images/placeholders. To use real photography, point `src` at a JPG
 * or WebP in /public/images; next/image will optimize it automatically.
 */
export function ArchImage({
  src,
  alt,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  preload = false,
  placeholderLabel = "Placeholder image",
  className = "",
  imageClassName = "",
}: ArchImageProps) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${aspect} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={`object-cover ${imageClassName}`}
      />
      {placeholderLabel && (
        <span className="eyebrow pointer-events-none absolute bottom-3 left-3 bg-paper/90 px-2 py-1 text-[0.625rem] text-ink-2 ring-1 ring-ink/10">
          {placeholderLabel}
        </span>
      )}
    </div>
  );
}
