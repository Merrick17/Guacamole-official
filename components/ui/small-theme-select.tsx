import React from "react";
import Image from "next/image";
const SmallThemeSelect = () => {
  return (
    <div className="flex justify-center items-center gap-1">
      <Image
        src="/images/themes/green.png"
        width={16}
        height={16}
        alt="green"
        className="opacity-30"
      />

      <Image
        src="/images/themes/violet.png"
        width={16}
        height={16}
        alt="light"
        className="opacity-30"
      />

      <Image
        src="/images/themes/orange.png"
        width={16}
        height={16}
        alt="light"
        className="opacity-30"
      />

      <Image
        src="/images/themes/yellow.png"
        width={16}
        height={16}
        alt="light"
        className="opacity-30"
      />

      <Image
        src="/images/themes/white.png"
        width={16}
        height={16}
        alt="light"
        className="opacity-30"
      />

      <Image
        src="/images/themes/red.png"
        width={16}
        height={16}
        alt="light"
        className="opacity-30"
      />
    </div>
  );
};

export default SmallThemeSelect;
