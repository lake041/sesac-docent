import { Link } from "react-router-dom";
// import Logo from "../../assets/logo_upscaled.png";
import LogoSvg from "../../assets/logo_horizontal.svg";
import { useEffect, useState } from "react";

export const Header = () => {
  const [height, setHeight] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      requestAnimationFrame(() => {
        if (scrollY <= 50) {
          setHeight(100 - scrollY);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed w-full flex flex-col items-center justify-center bg-white">
        <div className="flex justify-center w-full border-b border-black border-solid">
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
        <nav className="w-full h-16 flex justify-center border-b border-black border-solid">
          <div className="w-full max-w-[1300px] flex justify-between mx-10">
            <div className="flex items-center gap-8 font-semibold xl:text-xl lg:text-lg md:text-base">
              <Link href="#" className="hover:underline">
                공지사항
              </Link>
              <Link href="#" className="hover:underline">
                공간 소개
              </Link>
              <Link href="#" className="hover:underline">
                전시 일정
              </Link>
              <Link href="#" className="hover:underline">
                작품 정보
              </Link>
              <Link href="#" className="hover:underline">
                전문가 칼럼
              </Link>
              <Link href="#" className="hover:underline">
                관람객 후기
              </Link>
              <Link href="#" className="hover:underline">
                1:1 문의
              </Link>
            </div>
            <div className="flex items-center lg:text-lg md:text-sm">
              <p>
                <strong>운영시간: </strong>10:30 am-7:00 pm
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
