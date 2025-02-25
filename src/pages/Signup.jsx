import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import AuthLayout from './AuthLayout';

const SignupWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  min-height: 600px;

  @media (max-width: 968px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const WelcomeSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(244, 63, 94, 0.1));
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  h1 {
    color: #fff;
    font-size: 2.5em;
    margin-bottom: 20px;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1em;
    line-height: 1.6;
    max-width: 400px;
  }

  @media (max-width: 968px) {
    text-align: center;
    padding: 30px;

    p {
      margin: 0 auto;
    }
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 40px;
  background: rgba(255, 255, 255, 0.02);

  @media (max-width: 968px) {
    padding: 30px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    border-radius: 3px;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2em;
  margin: 0;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #6a11cb;
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 50px;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:focus {
    border-color: #6a11cb;
    box-shadow: 0 0 0 4px rgba(106, 17, 203, 0.15);
    outline: none;
    transform: translateY(-2px);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(106, 17, 203, 0.3);
  }
`;

const Links = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 8px 16px;
    border-radius: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Signup = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        toast.success("SignUp Successfully");
        navigate("/");
      } else {
        toast.warning(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <AuthLayout wide>
      <SignupWrapper>
        <WelcomeSection>
          <h1>Tham Gia Cộng Đồng</h1>
          <p>
            Tạo tài khoản để tham gia hoạt động câu lạc bộ,
            tham dự sự kiện và kết nối với các thành viên khác.
          </p>
        </WelcomeSection>

        <FormSection>
          <Header>
            <Title>Tạo Tài Khoản</Title>
            <Subtitle>Điền thông tin để bắt đầu</Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <FaUser />
              <Input
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <FaEnvelope />
              <Input
                type="email"
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <FaLock />
              <Input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>

            <Button type="submit">Đăng Ký</Button>
          </Form>

          <Links>
            <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
          </Links>
        </FormSection>
      </SignupWrapper>
    </AuthLayout>
  );
};

export default Signup;
