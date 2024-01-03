//@ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FallbackImage = ({ src, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      unoptimized
      loading="lazy"
      {...rest}
      src={imgSrc ? imgSrc : "/images/No_Logo_Found_Guacamole-min.png"}
      onError={() => {
        setImgSrc("/images/No_Logo_Found_Guacamole-min.png");
      }}
    />
  );
};
export default FallbackImage;
