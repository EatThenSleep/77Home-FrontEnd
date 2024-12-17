import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../../styles/Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const schema = yup.object({
  firstName: yup.string().required("Bắt buộc nhập"),
  lastName: yup.string().required("Bắt buộc nhập"),
  email: yup.string().required("Bắt buộc nhập").email("Sai cú pháp email"),
  phoneNumber: yup
    .string()
    .required("Bắt buộc nhập")
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số"),
  citizenNumber: yup
    .string()
    .required("Bắt buộc nhập")
    .matches(/^\d{12}$/, "Số căn cước công dân phải có 12 chữ số"),
  password: yup
    .string()
    .required("Bắt buộc nhập")
    .test(
      "password-strength",
      "Mật khẩu phải có ít nhất có 6 ký tự",
      (value) => value && value.length >= 6
    ),
  terms: yup.boolean().oneOf([true], "Bắt buộc nhập"),
});

// eslint-disable-next-line react/prop-types
const Register = ({ onSubmit }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (data) => {
    // Prepare the data to be sent
    const payload = {
      citizenNumber: data.citizenNumber,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phoneNumber,
      password: data.password,
      dateOfBirth: "",
      gender: "",
    };

    try {
      const res = await axios.post("http://localhost:8080/api/v1/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if registration is successful
      if (res.status === 200) {
        toast.success("Register successfully!");
        
        if (onSubmit) {
          onSubmit(data);  
        }

        navigate("/login"); 
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Register failed!");  
    }
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
          <h3 className="text-center mb-4 fw-bold">Sign up</h3>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* First name and Last name in the same row */}
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Label className="fw-bold">First name</Form.Label>
                  <Form.Control
                    className=" fw-semibold"
                    style={{ fontSize: "0.8rem", backgroundColor: "#F5F5F5" }}
                    type="text"
                    placeholder="First name"
                    {...register("firstName")}
                  />
                </Form.Group>
                {errors.firstName && (
                  <div className="error-message">
                    {errors.firstName?.message}
                  </div>
                )}
              </Col>
              <Col>
                <Form.Group controlId="formLastName">
                  <Form.Label className="fw-bold">Last name</Form.Label>
                  <Form.Control
                    className=" fw-semibold"
                    style={{ fontSize: "0.8rem", backgroundColor: "#F5F5F5" }}
                    type="text"
                    placeholder="Last name"
                    {...register("lastName")}
                  />
                </Form.Group>
                {errors.lastName && (
                  <div className="error-message">
                    {errors.lastName?.message}
                  </div>
                )}
              </Col>
            </Row>
            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                className=" fw-semibold"
                style={{ fontSize: "0.8rem", backgroundColor: "#F5F5F5" }}
                type="text"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <div className="error-message">{errors.email?.message}</div>
              )}
            </Form.Group>
            {/* Phone Number */}
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <Form.Control
                className="fw-semibold"
                style={{ fontSize: "0.8rem", backgroundColor: "#F5F5F5" }}
                type="text"
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <div className="error-message">
                  {errors.phoneNumber?.message}
                </div>
              )}
            </Form.Group>
            {/* Citizen Number */}
            <Form.Group className="mb-3" controlId="formCitizenNumber">
              <Form.Label className="fw-bold">Citizen Number</Form.Label>
              <Form.Control
                className="fw-semibold"
                style={{ fontSize: "0.8rem", backgroundColor: "#F5F5F5" }}
                type="text"
                placeholder="Enter your citizen number"
                {...register("citizenNumber")}
              />
              {errors.citizenNumber && (
                <div className="error-message">
                  {errors.citizenNumber?.message}
                </div>
              )}
            </Form.Group>
            {/* Password with visibility toggle */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <div
                className="d-flex align-items-center border rounded "
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className=" fw-semibold"
                  style={{
                    fontSize: "0.8rem",
                    backgroundColor: "#F5F5F5",
                    border: "none",
                  }}
                  {...register("password")}
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    className="text-muted ms-2"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <AiFillEye
                    className="text-muted ms-2"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>

              {errors.password && (
                <div className="error-message">{errors.password?.message}</div>
              )}
            </Form.Group>
            {/* Terms of Service */}
            <Form.Group className="mb-3" controlId="formTerms">
              <Form.Check
                className="custom-checkbox"
                type="checkbox"
                label={
                  <>
                    By signing up, I agree with the{" "}
                    <a
                      href="#terms"
                      className="fw-bold"
                      style={{ textDecoration: "none", color: "#4A4A4A" }}
                    >
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a
                      href="#privacy"
                      className="fw-bold"
                      style={{ textDecoration: "none", color: "#4A4A4A" }}
                    >
                      Privacy Policy
                    </a>
                  </>
                }
                {...register("terms")}
              />
              {errors.terms && (
                <div className="error-message">{errors.terms?.message}</div>
              )}
            </Form.Group>
            {/* Submit Button */}
            <Button
              style={{ backgroundColor: "#4A4A4A" }}
              type="submit"
              className="w-100 fw-semibold"
            >
              Sign up
            </Button>
          </Form>
          {/* Login Link */}
          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#4A4A4A" }}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
