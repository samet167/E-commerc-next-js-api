interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const imageSrc = src.startsWith("http")
    ? src
    : `https://placehold.co/600x400?text=${encodeURIComponent(alt)}`;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`object-cover w-full h-full ${className}`}
      loading="lazy"
    />
  );
}
