import Link from "next/link";
import { Button } from "../ui/button";
import { FC } from "react";
import Image from "next/image";
type ExploreCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  buttonTxt?: string;
  disabled?: boolean;
};
const ExploreCard: FC<ExploreCardProps> = ({
  description,
  href,
  image,
  title,
  buttonTxt = "Explore",
  disabled,
}) => {
  return (
    <div className="rounded-lg max-w-xs  border border-transparent  hover:border-primary transition-all duration-500 ease-in-out">
      <a href="# ">
        <img className="rounded-t-lg w-full" src={image} alt={title} />
      </a>
      <div className="p-5 flex flex-col gap-5 bg-foreground">
        <a href="#">
          <h5 className=" text-2xl font-medium tracking-tight ">{title}</h5>
        </a>
        <p className=" text-lg text-muted-foreground">{description}</p>
        <Link href={href} >
          <Button disabled={disabled}>
            {buttonTxt}
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ExploreCard;
