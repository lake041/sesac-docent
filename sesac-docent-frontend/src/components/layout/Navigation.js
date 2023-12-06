import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
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
  );
};
