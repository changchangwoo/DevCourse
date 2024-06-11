import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { LoginProps } from "@/pages/Login";
import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  // 상태
  const { storeLogin, storeLogout, isloggedIn } = useAuthStore();

  // 메소드
  const userSignup = (data : SignupProps) => {
    signup(data).then((req) => {
        showAlert("회원가입이 완료되었습니다")
        navigate("/login")
    })
  }
  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token);
        showAlert("로그인 완료되었습니다.");
        navigate("/");
      },
      (error) => {
        showAlert("로그인 실패했습니다.");
      }
    );
  };

  const userResetPaswword = (data : SignupProps) => {
    resetPassword(data).then(()=>{
        showAlert("비밀번호가 초기화 되었습니다");
        navigate("/login");
    })  
  }
  const [resetRequested, setResetRequested] = useState(false)
  const userResetRequest = (data : SignupProps) => {
    resetRequest(data).then(()=>{
        setResetRequested(true);
    })
    setResetRequested(true);
  }
  return { userLogin, userSignup, userResetPaswword, userResetRequest, resetRequested, setResetRequested}
};

export default useAuth;
