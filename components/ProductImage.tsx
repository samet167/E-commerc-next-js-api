interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  // ចំណាំ៖ ដោយសារ API ផ្ញើមកតែឈ្មោះឯកសារ (iphone15.jpg) 
  // បើ backend មាន folder ផ្ទុករូបភាព សូមប្តូរទៅតាមនោះ (ឧ. http://127.0.0.1:8000/images/${src})
  const imageSrc = src.startsWith("http") ? src : `https://placehold.co/600x400?text=${encodeURIComponent(alt)}`;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`object-cover w-full h-full ${className}`}
      loading="lazy"
    />
  );
}