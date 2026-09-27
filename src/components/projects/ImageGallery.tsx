"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/content/projects";
import { ChevronLeft, ChevronRight, CloseIcon, ExpandIcon } from "@/components/ui/icons";

/**
 * Image gallery with an accessible lightbox built on the native <dialog>
 * element (focus trapping, Escape to close). Arrow keys move between images.
 */
export function ImageGallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 && images.length % 2 === 1 ? "sm:col-span-2" : ""}>
            <figure>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full overflow-hidden border border-line bg-paper-2"
                aria-label={`View larger: ${img.caption ?? img.alt}`}
              >
                <span className="relative block aspect-[16/10]">
                  <Image
                    src={withBasePath(img.src)}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-paper/90 text-ink opacity-0 ring-1 ring-ink/10 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ExpandIcon size={16} />
                </span>
              </button>
              {img.caption && <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title}: image viewer`}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-navy/90 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {current && index !== null && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between px-4 py-3 text-on-navy sm:px-6">
              <p className="eyebrow text-on-navy-muted" aria-live="polite">
                {index + 1} / {images.length}
                {current.caption && <span className="ml-3 normal-case tracking-normal">{current.caption}</span>}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center hover:bg-on-navy/10"
                aria-label="Close image viewer"
                autoFocus
              >
                <CloseIcon size={22} />
              </button>
            </div>
            <div className="relative flex-1 px-4 pb-6 sm:px-16">
              <div className="relative h-full w-full">
                <Image src={withBasePath(current.src)} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </div>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-navy/70 text-on-navy hover:bg-navy sm:left-4"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-navy/70 text-on-navy hover:bg-navy sm:right-4"
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
