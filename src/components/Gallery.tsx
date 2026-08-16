import { useState, useCallback, useRef, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  '/images/gallery/18062.webp',
  '/images/gallery/18992.webp',
  '/images/gallery/18993.webp',
  '/images/gallery/19007.webp',
  '/images/gallery/19012.webp',
  '/images/gallery/19025.webp',
  '/images/gallery/19037.webp',
  '/images/gallery/19043.webp',
  '/images/gallery/19052.webp',
  '/images/gallery/19061.webp',
  '/images/gallery/19064.webp',
  '/images/gallery/19070.webp',
  '/images/gallery/19073.webp',
  '/images/gallery/19082.webp',
  '/images/gallery/19088.webp',
  '/images/gallery/19094.webp',
  '/images/gallery/19097.webp',
  '/images/gallery/19106.webp',
  '/images/gallery/19112.webp',
  '/images/gallery/19118.webp',
].map((src, index) => ({
  src,
  alt: `Reborn Fitness gallery photo ${index + 1}`,
}));

export default function Gallery() {
  const galleryGridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [galleryVisible, setGalleryVisible] = useState(false);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Simple Intersection Observer for gallery visibility - NO SCROLL TRACKING
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !galleryVisible) {
          setGalleryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (galleryGridRef.current) {
      observer.observe(galleryGridRef.current);
    }

    return () => observer.disconnect();
  }, [galleryVisible]);

  return (
    <section id="gallery" className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 gallery-header">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block">
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            Inside Our Studio
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            A glimpse into the Reborn Fitness experience.
          </p>
        </div>

        <div
          ref={galleryGridRef}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-[220px] gap-3 md:gap-4 ${
            galleryVisible ? 'gallery-grid-visible' : 'gallery-grid-hidden'
          }`}
        >
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              className="group relative rounded-3xl overflow-hidden cursor-pointer gallery-item"
              onClick={() => setLightbox(img.src)}
              style={{
                contain: 'layout paint',
                contentVisibility: 'auto',
                aspectRatio: '640 / 440',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={640}
                height={440}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-brand-orange/90 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
        </div>
      )}
    </section>
  );
}
