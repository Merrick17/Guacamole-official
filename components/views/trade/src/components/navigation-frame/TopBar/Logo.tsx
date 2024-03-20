import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex flex-row items-center shrink-0">
      <Image width={45} height={45} alt="logo" src={"/images/logo.png"} />
    </div>
  );
};
