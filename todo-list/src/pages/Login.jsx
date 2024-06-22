import React from "react";
import styled from "styled-components";
import Join from "./Join";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import {
  LoginWrapper,
  LogoWrapper,
  InputWrapper,
  StyledForm,
  Logo,
  Description,
  Input,
  SubmitButton,
} from "../styles/styledComponents";

const Login = () => {
  // 특정 action이 발생했을 때 어떤 주소로 이동할 수 있게 해준다.

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const checkValidJoin = () => {
    if (id && pw) return true;
    else return false;
  };

  return (
    <LoginWrapper>
      <LogoWrapper>
        <Logo src="../public/logo/logo.png" alt="logo"></Logo>
        <Description>당신의 할 일을 기록해보세요</Description>
      </LogoWrapper>
      <InputWrapper>
        <StyledForm>
          <Input
            name="id"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              e.currentTarget.focus();
            }}
            type="text"
            placeholder="아이디"
          ></Input>
          <Input
            name="pw"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            type="password"
            placeholder="비밀번호"
          ></Input>
          <SubmitButton
            type="submit"
            onClick={(e) => {
              e.preventDefault(); //폼 제출을 방지한다
              console.log(id + pw);
              checkValidJoin()
                ? navigate(`/home/:${id}`)
                : window.alert("id와 pw를 기입해주세요");
            }}
          >
            로그인
          </SubmitButton>
        </StyledForm>
        <JoinWrapper>
          <NotMem>아직 회원이 아니신가요?</NotMem>
          <GoJoin
            onClick={() => {
              navigate("/join");
            }}
          >
            회원가입 하러가기
          </GoJoin>
        </JoinWrapper>
      </InputWrapper>
    </LoginWrapper>
  );
};

const JoinWrapper = styled.form`
  width: auto;
  min-width: 15rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const NotMem = styled.div`
  width: auto;
  color: #909090;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: transparent;
`;

const GoJoin = styled.div`
  width: auto;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-decoration-line: underline;
  background: transparent;
  cursor: pointer;
`;

export default Login;
