import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, resetRequest, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import useAuth from "@/hooks/useAuth";

export interface SignupProps {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const {showAlert} = useAlert();
  const { userResetRequest, userResetPaswword, resetRequested } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    resetRequested ? userResetPaswword(data) : userResetRequest(data);
}



  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요</p>
            )}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                inputType="password"
                placeholder="비밀번호"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="error-text">비밀번호를 입력해주세요</p>
              )}
            </fieldset>
          )}
          <fieldset>
            <Button size="medium" scheme="primary">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
        </form>
      </SignupStyle>
    </>
  );
};

export default ResetPassword;
