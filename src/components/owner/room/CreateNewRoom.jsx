import { useEffect, useState } from "react";
import { Form, Row, Col, Container, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../../styles/CreateNewRoom.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateNewRoom = () => {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]); // Danh sách nhà

  // Schema xác thực
  const schema = yup.object().shape({
    name: yup.string().required("Tên phòng không được để trống"),
    area: yup
      .number()
      .typeError("Diện tích không được để trống")
      .min(1, "Diện tích phải là số dương")
      .required("Diện tích không được để trống"),
    maxOccupants: yup
      .number()
      .typeError("Số người tối đa không được để trống")
      .min(1, "Số người tối đa phải là số dương")
      .required("Số người tối đa không được để trống"),
    monthlyRent: yup
      .number()
      .typeError("Giá thuê không được để trống")
      .min(1, "Giá thuê phải là số dương")
      .required("Giá thuê không được để trống"),
    description: yup.string().required("Mô tả không được để trống"),
    status: yup.string().required("Trạng thái không được để trống"),
    house_id: yup.string().required("Vui lòng chọn nhà"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Hàm lấy danh sách nhà
  const fetchHouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/house");
      setHouses(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhà:", error);
    }
  };

  useEffect(() => {
    fetchHouses(); // Lấy danh sách nhà khi component mount
  }, []);

  // Hàm xử lý gửi dữ liệu
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8080/api/v1/room", data);
      toast.success("Thêm phòng mới thành công!");
      reset(); // Reset form
      navigate("/room"); // Điều hướng về trang danh sách phòng
    } catch (error) {
      console.error("Lỗi khi thêm phòng:", error);
      toast.error("Thêm phòng thất bại!");
    }
  };

  return (
    <Container className="create-new-room-container mt-4"  style={{}}>
      <h2 className="text-center mb-4">Thêm phòng mới</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Tên phòng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên phòng"
                {...register("name")}
              />
              <p className="text-danger">{errors.name?.message}</p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="area">
              <Form.Label>Diện tích</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập diện tích (m²)"
                {...register("area")}
              />
              <p className="text-danger">{errors.area?.message}</p>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="maxOccupants">
              <Form.Label>Số người tối đa</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số người tối đa"
                {...register("maxOccupants")}
              />
              <p className="text-danger">{errors.maxOccupants?.message}</p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="monthlyRent">
              <Form.Label>Giá thuê</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá thuê (VND)"
                {...register("monthlyRent")}
              />
              <p className="text-danger">{errors.monthlyRent?.message}</p>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="description">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập mô tả"
                {...register("description")}
              />
              <p className="text-danger">{errors.description?.message}</p>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control as="select" {...register("status")}>
                <option value="">Chọn trạng thái</option>
                <option value="0">Còn trống</option>
                <option value="1">Đã thuê</option>
                <option value="2">Bảo trì</option>
              </Form.Control>
              <p className="text-danger">{errors.status?.message}</p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="house_id">
              <Form.Label>Nhà</Form.Label>
              <Form.Control as="select" {...register("house_id")}>
                <option value="">Chọn nhà</option>
                {houses.map((house) => (
                  <option key={house.id} value={house.id}>
                    {house.name}
                  </option>
                ))}
              </Form.Control>
              <p className="text-danger">{errors.house_id?.message}</p>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12} className="text-center">
            <Button variant="primary" type="submit" className="px-5">
              Thêm phòng
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateNewRoom;
