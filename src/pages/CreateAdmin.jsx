import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled, { keyframes, css } from "styled-components";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaKey, FaSpinner } from "react-icons/fa";
import AuthLayout from './AuthLayout';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(-30px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const FormWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    0 0 0 1px rgba(255, 255, 255, 0.18);
  padding: 40px;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

// Chỉnh sửa FormContainer để đảm bảo responsive tốt hơn
const FormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%; // Thêm width 100%
  box-sizing: border-box; // Thêm box-sizing

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 20px;
  }
`;

// Chỉnh sửa InputGroup
const InputGroup = styled.div`
  position: relative;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  width: 100%; // Thêm width 100%

  svg {
    position: absolute;
    left: 16px;
    // Thay đổi cách tính vị trí của icon
    top: calc(50% + 12px); // 12px là nửa chiều cao của label
    transform: translateY(-50%); // Sửa lại transform để căn giữa icon
    color: #3498db;
    font-size: 18px;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    
    svg {
      font-size: 16px;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px; // Slightly reduced from 10px
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95em;
  line-height: 1.2; // Thêm line-height để kiểm soát chiều cao

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const inputFocus = css`
  border-color: #3498db;
  box-shadow: 
    0 0 0 4px rgba(52, 152, 219, 0.2),
    0 0 20px rgba(52, 152, 219, 0.1);
  transform: translateY(-2px);
`;

// Chỉnh sửa Input
const Input = styled.input`
  width: 100%;
  height: 55px;
  padding: 0 45px; // Giữ nguyên padding để tránh text đè lên icon
  border: 2px solid ${props => props.error ? '#e74c3c' : 'transparent'};
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; // Thêm box-sizing
  line-height: 55px; // Thêm line-height bằng với height

  &:focus {
    outline: none; // Thêm outline none
    border-color: #3498db;
    box-shadow: 
      0 0 0 4px rgba(52, 152, 219, 0.2),
      0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
  }
`;

const ErrorText = styled.span`
  position: absolute;
  bottom: -20px;
  left: 0;
  color: #e74c3c;
  font-size: 0.8em;
  margin-top: 4px;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  height: 55px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
    background: linear-gradient(135deg, #2980b9, #2c3e50);
  }

  &:disabled {
    background: linear-gradient(135deg, #95a5a6, #7f8c8d);
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    height: 48px;
    font-size: 16px;
    padding: 0 15px;
  }
`;

const AdminContainer = styled.div`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const AdminWrapper = styled.div`
  /* background: rgba(255, 255, 255, 0.05); */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  color: #fff;

  h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    background:  #fff;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1em;
  }
`;

const CreateAdmin = () => {
  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    clubName: "",
    securityKey: "",
  });
  const [ errors, setErrors ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (formData.password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (!formData.clubName.trim()) newErrors.clubName = "Vui lòng nhập tên câu lạc bộ";
    if (!formData.securityKey.trim()) newErrors.securityKey = "Vui lòng nhập mã bảo mật";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [ name ]: value }));
    if (errors[ name ]) {
      setErrors(prev => ({ ...prev, [ name ]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/super/createAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Club Admin Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate("/login"),
      });

    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout wide>
      <AdminWrapper>
        <PageHeader>
          <h1>Tạo Tài Khoản Quản Trị CLB</h1>
          <p>Thiết lập tài khoản quản trị mới cho câu lạc bộ của bạn</p>
        </PageHeader>
        <FormGrid>
          <FormContainer onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Tên Trưởng CLB</Label>
              <FaUser />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Nhập tên trưởng CLB"
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <Label>Địa Chỉ Email</Label>
              <FaEnvelope />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Nhập địa chỉ email"
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <Label>Mật Khẩu</Label>
              <FaLock />
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <Label>Tên Câu Lạc Bộ</Label>
              <FaBuilding />
              <Input
                type="text"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
                error={errors.clubName}
                placeholder="Nhập tên câu lạc bộ"
              />
              {errors.clubName && <ErrorText>{errors.clubName}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <Label>Mã Bảo Mật</Label>
              <FaKey />
              <Input
                type="text"
                name="securityKey"
                value={formData.securityKey}
                onChange={handleChange}
                error={errors.securityKey}
                placeholder="Nhập mã bảo mật"
              />
              {errors.securityKey && <ErrorText>{errors.securityKey}</ErrorText>}
            </InputGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <FaSpinner className="spinner" /> Đang tạo tài khoản...
                </>
              ) : (
                'Tạo Tài Khoản'
              )}
            </SubmitButton>
          </FormContainer>
        </FormGrid>
      </AdminWrapper>
    </AuthLayout>
  );
};

export default CreateAdmin;