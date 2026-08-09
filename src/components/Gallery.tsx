import { useState, useCallback } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const galleryImages = [
  { src: '/images/gallery/unnamed_(13).jpg', alt: 'Gym training area', span: 'lg:row-span-2' },
  { src: '/images/gallery/unnamed_(17).jpg', alt: 'Gym equipment', span: '' },
  { src: '/images/hero/unnamed_(1).jpg', alt: 'Treadmill area', span: '' },
  { src: '/images/about/unnamed_(4).jpg', alt: 'Studio interior', span: 'lg:row-span-2' },
  { src: '/images/trainers/unnamed_(9).jpg', alt: 'Training session', span: '' },
  { src: '/images/gallery/unnamed_(13).jpg', alt: 'Workout space', span: '' },
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

        <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              data-reveal
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${img.span}`}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
