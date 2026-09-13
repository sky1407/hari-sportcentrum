import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoGallery({ photos, alt }) {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (openIndex === null) return undefined;
    function onKey(e) {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i - 1 + photos.length) % photos.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex, photos.length]);

  if (!photos.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group aspect-4/3 cursor-pointer overflow-hidden rounded-xl border border-white/10"
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setOpenIndex(null)}>
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Zavrieť"
          >
            <X className="h-6 w-6" />
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i - 1 + photos.length) % photos.length);
              }}
              className="absolute left-2 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
              aria-label="Predchádzajúca fotka"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          <img
            src={photos[openIndex]}
            alt={`${alt} ${openIndex + 1}`}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i + 1) % photos.length);
              }}
              className="absolute right-2 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
              aria-label="Ďalšia fotka"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
