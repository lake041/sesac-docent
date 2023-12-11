import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  validateEmail,
  validatePassword,
  validateConfirm,
  validateNickname,
} from "utils/validate-input";
import { useInput } from "hooks/use-input";
import api from "apis/api";

import { SignError } from "pages/auth/components/SignError";
import { SignInput } from "pages/auth/components/SignInput";
import LoginImage from "assets/i_am_ground_wide.jpeg";
import { useAppSelector } from "store/store";

const MyInfo = () => {
  const navigate = useNavigate();
  const email = useInput(validateEmail);
  const oldPassword = useInput(validatePassword);
  const newPassword = useInput(validatePassword);
  const newConfirm = useInput((value) =>
    validateConfirm(value, newPassword.value)
  );
  const userName = useInput(validateNickname);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const state = useAppSelector((state) => state.authReducer);

  const submitHandler = async (event) => {
    event.preventDefault();
    const valid =
      oldPassword.isValid && newPassword.isValid && newConfirm.isValid;
    setHasError(valid);
    setErrorMessage("비밀번호 형식이 올바르지 않습니다.");
    if (!valid) {
      return;
    }

    const duplicated = oldPassword.value === newPassword.value;
    setHasError(duplicated);
    setErrorMessage("바꾸려는 비밀번호가 기존 비밀번호와 같습니다.");
    if (duplicated) {
      return;
    }

    const response = await api.post("/user/update", {
      email: state.email,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
    if (response.data.message === "Success") {
      navigate("/login");
    } else {
      setHasError(true);
      setErrorMessage(response.data.message);
    }
  };

  return (
    <div className="flex justify-center mt-24 mb-16">
      <div className="max-w-[1300px] flex justify-between">
        <div className="w-fit py-16 flex flex-col justify-center gap-8 mx-10">
          <p className="w-fit text-7xl font-bold">마이페이지</p>
          <form className="flex flex-col gap-4 w-fit sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[560px] border border-black p-4">
            <SignInput
              type="email"
              label="이메일 *"
              inputState={email}
              errorMessage="이메일 형식이 올바르지 않습니다."
              placeholder={state.email}
              readOnly={true}
            />
            <SignInput
              type="password"
              label="기존 비밀번호 *"
              inputState={oldPassword}
              errorMessage="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
            />
            <SignInput
              type="password"
              label="새 비밀번호 *"
              inputState={newPassword}
              errorMessage="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
            />
            <SignInput
              type="password"
              label="새 비밀번호 확인 *"
              inputState={newConfirm}
              errorMessage="비밀번호가 일치하지 않습니다."
            />
            <SignInput
              type="text"
              label="이름 *"
              inputState={userName}
              errorMessage="2~16자의 한글을 올바르게 입력해 주세요."
              placeholder={state.name}
              readOnly={true}
            />
            {hasError && <SignError message={errorMessage} />}
            <div className="flex gap-4 justify-end">
              <button
                onClick={submitHandler}
                className="w-fit h-fit px-4 py-2 border border-black text-lg font-bold hover:bg-black hover:text-white transition"
              >
                수정
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <div className="ml-24" style={{ aspectRatio: "20/13" }}>
            <img
              src={LoginImage}
              alt="I am Ground, ALT.1"
              className="h-auto object-cover w-[850px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
