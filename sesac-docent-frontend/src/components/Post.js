export const Post = ({ title, name }) => {
  return (
    <div className="w-full max-w-[1300px]">
      <div>
        <div className="quill-container w-full flex flex-col gap-4">
          <div className="w-full flex gap-2">
            <label
              htmlFor="title"
              className="w-1/12 max-w-[1300px] h-12 px-4 py-2 text-xl font-bold flex justify-center items-center border border-black"
            >
              제목
            </label>
            <p className="border border-black w-11/12 h-12 px-4 py-2 text-xl">
              {title}
            </p>
          </div>
          <div className=""></div>
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
