import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import sanitize from "dompurify";
import api from "apis/api";

export const Post = () => {
  const [data, setData] = useState();
  const params = useParams();
  const postId = params.postId;
  const location = useLocation();
  const categoryENG = location.state && location.state.categoryENG;
  const categoryKOR = location.state && location.state.categoryKOR;

  // useEffect(() => {
  //   (async () => {
  //     const response = await api.get(`/${categoryENG}/posts/${postId}`);
  //     setData(response.data);
  //   })();
  // }, [categoryENG, postId]);

  return (
    <div className="w-full h-full flex justify-center items-start p-5 my-20">
      <div className="w-full max-w-[1300px] h-full px-10 py-5 rounded-xl bg-white flex flex-col justify-start items-center gap-6">
        <div className="quill-container w-full flex flex-col gap-4">
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
        <div className="mt-2 max-w-[1300px] w-full flex justify-end gap-2">
          <button
            style={{ marginTop: "50px" }}
            className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
          >
            취소
          </button>
          <button
            style={{ marginTop: "50px" }}
            className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
