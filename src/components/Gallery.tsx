import { useState, useCallback } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const galleryImages = [
  '/images/gallery/18051.jpg',
  '/images/gallery/18062.jpg',
  '/images/gallery/18992.jpg',
  '/images/gallery/18993.jpg',
  '/images/gallery/18995.jpg',
  '/images/gallery/19007.jpg',
  '/images/gallery/19012.jpg',
  '/images/gallery/19013.jpg',
  '/images/gallery/19025.jpg',
  '/images/gallery/19031.jpg',
  '/images/gallery/19034.jpg',
  '/images/gallery/19037.jpg',
  '/images/gallery/19043.jpg',
  '/images/gallery/19049.jpg',
  '/images/gallery/19052.jpg',
  '/images/gallery/19061.jpg',
  '/images/gallery/19064.jpg',
  '/images/gallery/19070.jpg',
  '/images/gallery/19073.jpg',
  '/images/gallery/19076.jpg',
  '/images/gallery/19082.jpg',
  '/images/gallery/19088.jpg',
  '/images/gallery/19094.jpg',
  '/images/gallery/19097.jpg',
  '/images/gallery/19106.jpg',
  '/images/gallery/19109.jpg',
  '/images/gallery/19112.jpg',
  '/images/gallery/19115.jpg',
  '/images/gallery/19118.jpg',
].map((src, index) => ({
  src,
  alt: `Reborn Fitness gallery photo ${index + 1}`,
}));

const spanClasses = [
  '',
  'lg:row-span-2',
  'lg:col-span-2',
  'lg:row-span-2 lg:col-span-2',
  '',
  'lg:row-span-2',
  'lg:col-span-2',
  '',
];

export default function Gallery() {
  const ref = useReveal<HTMLDivElement>();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section id="gallery" className="relative py-28 lg:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4 block" data-reveal>
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" data-reveal>
            Inside Our Studio
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto" data-reveal>
            A glimpse into the Reborn Fitness experience.
          </p>
        </div>

        <div data-reveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${spanClasses[i % spanClasses.length]}`}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={640}
                height={440}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ willChange: 'transform' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
