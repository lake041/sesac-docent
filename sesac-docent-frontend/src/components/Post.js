import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import sanitize from "dompurify";
import api from "apis/api";
import { DUMMY_REPLY } from "./DUMMY_REPLY";
import { Reply } from "./Reply";
import { useAppSelector } from "store/store";

export const Post = ({ categoryKOR, categoryENG, categoryNUM }) => {
  const [data, setData] = useState();
  const [sortType, setSortType] = useState("popular");
  const [like, setLike] = useState(false);
  const [newReply, setNewReply] = useState("");
  const params = useParams();
  const postId = params.postId;

  const state = useAppSelector((state) => state.authReducer);

  // useEffect(() => {
  //   (async () => {
  //     console.log(`/posts/details/${postId}/${categoryNUM}`);
  //     const response = await api.get(`/posts/details/${postId}/${categoryNUM}`);
  //     setData(response.data);
  //   })();
  // }, [categoryNUM, postId]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(newReply);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 my-20 gap-4">
      {/* title 영역 */}
      <p className="text-4xl font-semibold">{categoryKOR}</p>
      {/* post 영역 */}
      <div className="w-full max-w-[1000px] px-10 py-5 rounded-xl bg-white flex flex-col justify-center items-center gap-6">
        {/* 제목영역 */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-2">
            <label
              htmlFor="title"
              className="w-1/12 max-w-[1300px] h-12 px-4 py-2 text-xl font-bold flex justify-center items-center border border-black"
            >
              제목
            </label>
            <p className="border border-black w-11/12 h-12 px-4 py-2 text-xl">
              {categoryKOR}
            </p>
          </div>
        </div>
        {/* 본문영역 */}
        <div className="w-full border border-black p-5">
          {data?.content && (
            <div
              style={{
                width: "60vw",
                whiteSpace: "normal",
              }}
              dangerouslySetInnerHTML={{
                __html: sanitize(String(data?.content)),
              }}
            />
          )}
        </div>
        {/* 버튼영역 (글쓴이만 볼 수 있도록) */}
        <div className="mt-2 w-full flex justify-end gap-2">
          <button
            style={{ marginTop: "50px" }}
            className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
          >
            수정
          </button>
          <button
            style={{ marginTop: "50px" }}
            className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-rose-500 text-rose-500 hover:text-white transition"
          >
            삭제
          </button>
        </div>
      </div>
      {/* reply 영역 */}
      <div className="w-full max-w-[1000px] flex px-10 flex-col gap-4">
        <div className="flex justify-end items-center w-full">
          <button
            onClick={() => setSortType("popular")}
            className={`p-2  ${
              sortType === "popular"
                ? "text-black font-medium"
                : "text-zinc-400 font-normal"
            }`}
          >
            인기순
          </button>
          <p className="select-none flex items-center">┃</p>
          <button
            onClick={() => setSortType("recent")}
            className={`p-2  ${
              sortType === "recent"
                ? "text-black font-medium"
                : "text-zinc-400 font-normal"
            }`}
          >
            최신순
          </button>
        </div>
        <div className="w-full flex flex-col gap-8">
          {DUMMY_REPLY.map((reply) => (
            <Reply
              key={reply.replyId}
              replyId={reply.replyId}
              username={reply.username}
              content={reply.content}
              date={reply.date}
              like={true}
              likeCountProps={72}
              myLike={true}
            />
          ))}
        </div>
      </div>
      {/* reply write 영역 */}
      <div className="w-full max-w-[1000px] px-10 py-5 flex justify-center">
        <form
          className="w-full max-w-[1000px] p-5 border border-black flex flex-col gap-4"
          onSubmit={submitHandler}
        >
          <div className="flex justify-between items-center">
            <label htmlFor="newReply" className="text-lg font-semibold pl-2">
              새 댓글
            </label>
            <button
              type="submit"
              className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
            >
              입력
            </button>
          </div>
          <textarea
            name="newReply"
            className="w-full p-5 h-40 border border-zinc-300"
            placeholder="댓글을 작성하려면 로그인해주세요."
            value={newReply}
            onChange={(event) => setNewReply(event.target.value)}
          ></textarea>
          <div className="flex justify-end"></div>
        </form>
      </div>
    </div>
  );
};
