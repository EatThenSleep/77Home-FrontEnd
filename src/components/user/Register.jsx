import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../../styles/Register.scss";
import { Link } from "react-router-dom";

const schema = yup.object({
  firstName: yup.string().required("Bắt buộc nhập"),
  lastName: yup.string().required("Bắt buộc nhập"),
  email: yup.string().required("Bắt buộc nhập").email("Sai cú pháp email"),
  password: yup
    .string()
    .required("Bắt buộc nhập")
    .test(
      "password-strength",
      "Mật khẩu phải có ít nhất có 8 ký tự, phân biệt chữ thường, chữ hoa",
      (value) =>
        value && value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value)
    ),
  terms: yup.boolean().oneOf([true], "Bắt buộc nhập"),
});

const Register = () => {
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

  const onSubmit = async (data) => {
    console.log("data", data);
  };

  return (
    <div className="container"><div className="d-flex justify-content-center align-items-center vh-100 ">
    <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
      <h3 className="text-center mb-4 fw-bold">Sign up</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="error-message">{errors.firstName?.message}</div>
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
              <div className="error-message">{errors.lastName?.message}</div>
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
          onClick={onSubmit}
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
  </div></div>
    
  );
};

export default Register;
