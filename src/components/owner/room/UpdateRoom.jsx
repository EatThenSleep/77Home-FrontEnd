import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import "../../../styles/UpdateRoom.scss";
import { toast } from "react-toastify";

const UpdatedRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách nhà từ API
  const fetchHouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/house");
      setHouses(response.data.DT);
      console.log(response.data.DT);
    } catch (err) {
      setError("Không thể tải thông tin nhà. Vui lòng thử lại!");
    }
  };

  // Lấy dữ liệu phòng từ API
  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/room/${id}`);
      setRoom(response.data.DT);
    } catch (err) {
      setError("Không thể tải thông tin phòng. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
    fetchRoomDetails();
  }, [id]);

  // Hàm xử lý khi form thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  // Hàm lưu thông tin phòng
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/room/${id}`, room);
      toast.success("Cập nhật thành công!");
      navigate(`/room`); // Quay lại trang chi tiết
    } catch (err) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5 text-danger">
        <h4>{error}</h4>
      </Container>
    );
  }

  return (
    <Container className="create-new-room-container mt-4">
      <h2 className="text-center mb-4">Chỉnh sửa thông tin phòng</h2>
      <Form onSubmit={handleSave}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Tên phòng</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={room.name|| ""}
                onChange={handleChange}
                placeholder="Nhập tên phòng"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="area">
              <Form.Label>Diện tích</Form.Label>
              <Form.Control
                type="number"
                name="area"
                value={room.area || ""}
                onChange={handleChange}
                placeholder="Nhập diện tích (m²)"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="maxOccupants">
              <Form.Label>Số người tối đa</Form.Label>
              <Form.Control
                type="number"
                name="maxOccupants"
                value={room.maxOccupants || ""}
                onChange={handleChange}
                placeholder="Nhập số người tối đa"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="monthlyRent">
              <Form.Label>Giá thuê</Form.Label>
              <Form.Control
                type="number"
                name="monthlyRent"
                value={room.monthlyRent || ""}
                onChange={handleChange}
                placeholder="Nhập giá thuê (VND)"
              />
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
                name="description"
                value={room.description || ""}
                onChange={handleChange}
                placeholder="Nhập mô tả"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={room.status}
                onChange={handleChange}
              >
                <option value="">Chọn trạng thái</option>
                <option value="0">Còn trống</option>
                <option value="1">Đã thuê</option>
                <option value="2">Bảo trì</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="house_id">
              <Form.Label>Nhà</Form.Label>
              <Form.Control
                as="select"
                name="house_id"
                value={room.house.id ||""}
                onChange={handleChange}
              >
                <option value="">Chọn nhà</option>
                {houses.map((house) => (
                  <option key={house.id} value={house.id}>
                    {house.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12} className="text-center">
            <Button variant="primary" type="submit" className="px-5" style={{height: "38px", textAlign: "center"}}>
              Lưu
            </Button>
            <Button
              variant="secondary"
              className="px-5 ms-3"
              onClick={() => navigate(`/room/${id}`)}
            >
              Hủy
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdatedRoom;
