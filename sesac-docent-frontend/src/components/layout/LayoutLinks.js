import { Link } from "react-router-dom";
import { IoMdPlay } from "react-icons/io";
import { cn } from "../../utils/tailwind-merge";

export const UpperHeaderLink = ({ link, text }) => {
  return (
    <Link
      to={`${link}`}
      className="flex justify-center items-center gap-1 w-fit"
    >
      <IoMdPlay size={12} />
      {text}
    </Link>
  );
};

export const LinkBox = ({ link, text, color }) => {
  return (
    <Link
      to={`${link}`}
      className={cn(
        "flex justify-center items-center w-[168px] h-[55px] border border-black border-solid ",
        "hover:bg-black text-2xl font-bold text-black hover:text-white transition",
        color === "yellow" && "bg-yellow-200",
        color === "white" && "bg-white"
      )}
    >
      {text}
    </Link>
  );
};

export const LowerHeaderLink = ({ link, text }) => {
  return (
    <Link
      to={`${link}`}
      className="hover:underline font-semibold xl:text-xl lg:text-lg md:text-base"
    >
      {text}
    </Link>
  );
};

export const FooterLink = ({ link, text }) => {
  return (
    <Link to={`${link}`} className="text-stone-100 text-lg font-semibold">
      {text}
    </Link>
  );
};
