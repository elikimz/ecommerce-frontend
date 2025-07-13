import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const Image = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  width,
  height,
  fallbackSrc = "/placeholder-image.jpg",
  onLoad,
  onError,
}: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleLoad = () => {
    setImageLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setImageError(true);
    }
    setImageLoading(false);
    onError?.();
  };

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${imageLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />
    </div>
  );
};

export default Image;
