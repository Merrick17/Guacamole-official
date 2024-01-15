// //@ts-nocheck
"use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// const FallbackImage = ({ src, ...rest }) => {
//   const [imgSrc, setImgSrc] = useState(src);

//   useEffect(() => {
//     setImgSrc(src);
//   }, [src]);

//   return (
//     <Image
//       unoptimized
//       loading="lazy"
//       {...rest}
//       src={imgSrc ? imgSrc : "/images/No_Logo_Found_Guacamole-min.png"}
//       onError={() => {
//         setImgSrc("/images/No_Logo_Found_Guacamole-min.png");
//       }}
//     />
//   );
// };
//export default FallbackImage;

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const FallbackImage = ({ src, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const notFoundImage = "/images/No_Logo_Found_Guacamole-min.png"; // Path to your "image not found" asset

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     try {
  //       await axios.get(src, {
  //         responseType: "blob", // Ensures the request is sent for the actual image
  //       });
  //       setImgSrc(src); // Image is available, set it as the source
  //     } catch (error) {
  //       if ([401, 403, 404, 500].includes(error.response?.status)) {
  //         setImgSrc(notFoundImage); // Error status, set the not found image
  //       }
  //     }
  //   };

  //   fetchImage();
  // }, [src]);
  useEffect(() => {
    setImgSrc(src);
    // const fetchImage = async () => {
    //   try {
    //     await axios.get(src, {
    //       responseType: "blob", // Ensures the request is sent for the actual image
    //     });
    //     setImgSrc(src); // Image is available, set it as the source
    //   } catch (error) {
    //     if ([401, 403, 404, 500].includes(error.response?.status)) {
    //       setImgSrc(notFoundImage); // Error status, set the not found image
    //     }
    //   }
    // };

    // fetchImage();
  }, [src]);
  return (
    <Image
      alt="guac"
      unoptimized
      loading="lazy"
      {...rest}
      src={imgSrc || notFoundImage}
      onError={() => setImgSrc(notFoundImage)}
    />
  );
};

export default FallbackImage;
