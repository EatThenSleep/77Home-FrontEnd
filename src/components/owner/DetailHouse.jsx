import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import "../../styles/DetailHouse.scss";
import { useNavigate } from "react-router-dom";
const DetailHouse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailHouse, setDetailHouse] = useState([]);
  useEffect(() => {
    fetchHouseById();
  }, []);
  const fetchHouseById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/houses/${id}`);
      if (res && res.data) {
        setDetailHouse(res.data); // Trả về dữ liệu nhà cụ thể
      }
    } catch (error) {
      console.error("Error fetching house by ID:", error);
    }
  };

  return (
    <Container className="p-4">
      <Row className=" p-3 mb-5 bg-white ">
        {/* Hình ảnh */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          {detailHouse.image ? (
            <div>
              <img src={detailHouse.image} className="image-house-detail" />
            </div>
          ) : (
            <div className="">
              <FaImage className="image-house-detail" />
            </div>
          )}
        </Col>

        {/* Chi tiết nhà trọ */}
        <Col md={6}>
          <h4>{detailHouse.name}</h4>
          <p>
            <strong>Địa chỉ:</strong> {detailHouse.street} ,{detailHouse.ward} ,
            {detailHouse.province}
          </p>
          <p>
            <strong>Giá:</strong> {detailHouse.price} đ/tháng
          </p>
          <p>
            <strong>Diện tích:</strong> {detailHouse.area}
          </p>
          <p>
            <strong>Số phòng ngủ:</strong>
            {detailHouse.bedrooms}
          </p>
          <p>
            <strong>Số phòng tắm:</strong> {detailHouse.bathrooms}
          </p>
          <p>
            <strong>Mô tả:</strong> {detailHouse.description}
          </p>
          <p>
            <strong>Thông tin liên lạc:</strong>
            <br />
            Số điện thoại: {detailHouse.phoneNumber}
            <br />
            Email: {detailHouse.email}
          </p>
          <p>
            <strong>Trạng thái:</strong> Còn trống
          </p>

          <Button
            variant="warning"
            onClick={() => navigate("/house/update", { state: detailHouse })}
          >
            Chỉnh sửa
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailHouse;
