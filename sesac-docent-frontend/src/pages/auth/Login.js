import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInput } from "../../components/auth/SignInput";
import { validateEmail, validatePassword } from "../../utils/validate-input";
import { useInput } from "../../hooks/use-input";
import SignError from "../../components/auth/SignError";
import api from "../../apis/api";

const Login = () => {
  const navigate = useNavigate();
  const email = useInput(validateEmail);
  const password = useInput(validatePassword);
  const [isValid, setIsValid] = useState(true);

  const submitHandler = async (event) => {
    event.preventDefault();
    const valid = email.isValid && password.isValid;
    setIsValid(valid);

    if (!valid) {
      return;
    }
    const response = await api.post("/auth/login", { email, password });
    if (!response?.error) {
      navigate.push("/");
    } else {
      console.log("Login Failed.");
      setIsValid(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[1300px] py-16 flex flex-col gap-8 mx-10">
        <p className="text-7xl font-bold">로그인</p>
        <p className="text-xl">
          더 현대 전시관을 방문해주셔서 감사합니다.
          <br />
          로그인하시면 홈페이지를 보다 편리하게 이용하실 수 있습니다.
        </p>
        <form className="flex flex-col gap-4 w-fit sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[560px]">
          <SignInput
            type="email"
            label="이메일"
            inputState={email}
            errorMessage="이메일 형식이 올바르지 않습니다."
          />
          <SignInput
            type="password"
            label="비밀번호"
            inputState={password}
            errorMessage="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
          />
          {!isValid && (
            <SignError message="아이디 또는 비밀번호를 다시 입력해주세요." />
          )}
          <div className="mt-3 w-full flex gap-4">
            <Link to="#" className="hover:underline">
              아이디 찾기
            </Link>
            <Link to="#" className="hover:underline">
              비밀번호 찾기
            </Link>
          </div>
          <div className="flex gap-4">
            <button
              onClick={submitHandler}
              className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold"
            >
              로그인
            </button>
            <Link
              to="/register"
              className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
