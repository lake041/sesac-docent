import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LogoSvg from "../../assets/logo_horizontal.svg";

export const Header = () => {
  const [height, setHeight] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      requestAnimationFrame(() => {
        if (scrollY <= 50) {
          setHeight(100 - scrollY);
          window.scrollTo(0, scrollY);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white border-b border-black border-solid">
      <div className="w-full max-w-[1300px] flex justify-between items-center mx-10">
        <Link to="/" className="flex items-center my-4">
          <img style={{ height }} src={LogoSvg} alt="The Hyundai Logo" />
        </Link>
        <div className="flex justify-between gap-4">
          <Link
            to="#"
            className="flex justify-center items-center w-[168px] h-[55px] border border-black border-solid bg-yellow-200 hover:bg-black text-2xl font-bold text-black hover:text-white transition"
            style={{}}
          >
            전시 일정
          </Link>
          <Link
            to="/login"
            className="flex justify-center items-center w-[168px] h-[55px] border border-black border-solid bg-white hover:bg-black text-2xl font-bold text-black hover:text-white transition"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};
