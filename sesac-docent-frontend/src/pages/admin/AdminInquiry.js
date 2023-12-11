import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { DUMMY_POST } from "./components/DUMMY_POST";
import { PostsTableTitle } from "./components/PostsTableTitle";
import { Search, Trash2 } from "lucide-react";
import { PostsTableRatio } from "./components/PostsTableRatio";
import { PostsTableHead } from "./components/PostsTableHead";
import { PostsRow } from "./components/PostsTableRow";
import api from "apis/api";
import { cn } from "utils/tailwind-merge";

const pagesPerGroup = 10;
const postsPerPage = 10;
const type = "inquiry";
const title = "1:1 문의 관리";

const AdminInquiry = () => {
  const navigate = useNavigate();
  const params = useParams();
  const inqCateParams = params.inqCate;
  const pageNumberParams = params.pageNumber;

  useEffect(() => {
    if (!pageNumberParams || pageNumberParams < 0) {
      navigate(`/admin/inquiry/new/page/1`);
    }
  }, [navigate, pageNumberParams]);

  const [posts, setPosts] = useState([]);
  const [checkedPosts, setCheckedPosts] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(120);
  const [pageStart, setPageStart] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState([]);

  useEffect(() => {
    setCurrentPage(pageNumberParams);

    const currentPageStart =
      pageNumberParams % pagesPerGroup === 0
        ? pageNumberParams - pagesPerGroup + 1
        : pageNumberParams - (pageNumberParams % pagesPerGroup) + 1;

    const currentPageEnd = Math.min(
      currentPageStart + pagesPerGroup - 1,
      totalPages
    );

    const currentPageGroup = Array.from(
      { length: currentPageEnd - currentPageStart + 1 },
      (_, index) => currentPageStart + index
    );

    setPageStart(currentPageStart);
    setPageGroup(currentPageGroup);

    // console.log("current page: ", pageNumberParams);
    // console.log(currentPageStart, currentPageEnd);
    // console.log(currentPageGroup);
  }, [pageNumberParams, totalPages]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await api.get(
  //       `/admin/inquiry/${inqCate}/page/${pageNumber}`
  //     );
  //     setPosts(response.data.posts);
  //   };
  //   fetchPosts();
  // }, [inqCate, pageNumber]);

  const checkboxClickHandler = (id) => {
    setCheckedPosts(
      checkedPosts.includes(id)
        ? checkedPosts.filter((postId) => postId !== id)
        : [...checkedPosts, id]
    );
  };

  const totalClickHandler = (event) => {
    setAllChecked(event.target.checked);
    setCheckedPosts(event.target.checked ? posts.map((post) => post.id) : []);
  };

  const handleNextPageGroup = () => {
    const newPage = pageStart + pagesPerGroup;
    navigate(`/admin/${type}/${inqCateParams}/page/${newPage}`);
  };

  const handlePrevPageGroup = () => {
    const newPage = pageStart - pagesPerGroup;
    navigate(`/admin/${type}/${inqCateParams}/page/${newPage}`);
  };

  useEffect(() => {
    setPosts(DUMMY_POST);
    setTotalPages(Math.ceil(1210 / postsPerPage));
  }, []);

  useEffect(() => {
    setCurrentPage(pageNumberParams);
  }, [inqCateParams, pageNumberParams]);

  return (
    <div className="w-full h-full flex justify-center items-start p-5">
      <div className="w-full h-full px-10 py-5 rounded-xl bg-white flex flex-col justify-start items-center gap-4">
        <PostsTableTitle title={title} />
        <div className="flex gap-12 text-xl text-zinc-400 font-light">
          <Link
            to="/admin/inquiry/new/page/1"
            className={`p-2 ${
              inqCateParams === "new" && "text-black font-medium"
            }`}
          >
            새로운 문의
          </Link>
          <p className="select-none flex items-center">┃</p>
          <Link
            to="/admin/inquiry/done/page/1"
            className={`p-2 ${
              inqCateParams === "done" && "text-black font-medium"
            }`}
          >
            답변 완료된 문의
          </Link>
          <p className="select-none flex items-center">┃</p>
          <Link
            to="/admin/inquiry/all/page/1"
            className={`p-2 ${
              inqCateParams === "all" && "text-black font-medium"
            }`}
          >
            전체 문의
          </Link>
        </div>
        <div className="w-full flex flex-col relative">
          <div
            className={`absolute z-10 w-full h-14 py-2 px-6 flex justify-between bg-zinc-100 items-center rounded-t-md transition-all ${
              checkedPosts.length >= 1
                ? "opacity-100 min-h-14 -translate-y-full"
                : "opacity-0 min-h-0 translate-y-0 overflow-y-hidden"
            }`}
          >
            <p className="text-indigo-500 text-lg font-semibold">
              {checkedPosts.length >= 1 && `${checkedPosts.length}개 선택`}
            </p>
            <button className="flex gap-1 font-semibold">
              <Trash2 color="rgb(244 63 94)" />
              <p className="text-rose-500 text-lg">삭제하기</p>
            </button>
          </div>
          <table className="w-full relative z-20">
            <colgroup>
              <PostsTableRatio />
            </colgroup>
            <thead>
              <PostsTableHead
                totalClickHandler={totalClickHandler}
                first="번호"
                second="상태"
                third="이름"
                fourth="제목"
                fifth="날짜"
              />
            </thead>
            <tbody>
              {posts.map((post) => (
                <PostsRow
                  key={post.id}
                  id={post.id}
                  status={post.status}
                  name={post.name}
                  title={post.title}
                  date={post.date}
                  checkboxClickHandler={checkboxClickHandler}
                  allChecked={allChecked}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-between items-center gap-4 mt-4 pr-4">
          <div className="h-12 flex justify-center items-center gap-4 p-4">
            <select id="searchType" className="h-10 border border-black p-2">
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="name">글쓴이</option>
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                className="h-10 border-b border-black p-1 px-4"
              />
              <button>
                <Search />
              </button>
            </div>
          </div>
          <div className="flex gap-5 text-xl w-fit">
            {pageStart > 10 && (
              <button onClick={handlePrevPageGroup} className="hover:underline">
                이전
              </button>
            )}
            {pageGroup.map((_, index) => {
              const pageNumber = pageStart + index;
              const isCurrentPage = pageNumber === parseInt(currentPage);

              return (
                <Link
                  key={pageNumber}
                  to={`/admin/inquiry/${inqCateParams}/page/${pageNumber}`}
                  className={cn(
                    "text-xl hover:underline",
                    isCurrentPage && "font-semibold text-teal-600 underline"
                  )}
                >
                  {pageNumber}
                </Link>
              );
            })}
            {pageStart + pagesPerGroup < totalPages && (
              <button onClick={handleNextPageGroup} className="hover:underline">
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiry;
