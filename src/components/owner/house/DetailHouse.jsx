import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import "../../../styles/DetailHouse.scss";

const DetailHouse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailHouse, setDetailHouse] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [wardName, setWardName] = useState("");

  useEffect(() => {
    fetchHouseById();
  }, [id]);

  const fetchHouseById = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/house/${id}`);
      if (res && res.data) {
        setDetailHouse(res.data);
      }
      // Lấy tên của chủ nhà
      const ownerRes = await axios.get(`http://localhost:8080/api/v1/user/${res.data.DT.owner_id}`);
      if (ownerRes && ownerRes.data) {
        setOwnerName(ownerRes.data.fullname);
      }

      // Lấy tên của ward từ API
      const wardRes = await axios.get(`http://localhost:8080/api/v1/ward/${res.data.DT.ward_id}`);
      if (wardRes && wardRes.data) {
        setWardName(wardRes.data.name); // Lưu tên ward vào state
      }
    } catch (error) {
      console.error("Error fetching house by ID:", error);
    }
  };

  if (!detailHouse) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="p-4">
      <Row className="p-3 mb-5 bg-white rounded shadow-sm">
        {/* Hình ảnh */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center mb-4 mb-md-0"
        >
          {detailHouse.DT.avatar ? (
            <img
              src={detailHouse.DT.avatar}
              className="image-house-detail img-fluid rounded"
              alt={`Hình ảnh của ${detailHouse.DT.name}`}
            />
          ) : (
            <FaImage className="image-house-detail" size={200} />
          )}
        </Col>

        {/* Chi tiết nhà */}
        <Col md={6}>
          <h3 className="mb-4">{detailHouse.DT.name || "Chưa cập nhật"}</h3>

          <Row>
            <Col xs={6} className="mb-2">
              <strong>Địa chỉ:</strong> {detailHouse.DT.address || "N/A"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Diện tích:</strong> {detailHouse.DT.area || "N/A"} m²
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Số phòng:</strong> {detailHouse.DT.numberRooms || "N/A"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Số tầng:</strong> {detailHouse.DT.numberOfFloors || "N/A"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Năm xây dựng:</strong> {detailHouse.DT.yearBuilt || "N/A"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Vị trí:</strong> {detailHouse.DT.position || "N/A"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Kinh độ:</strong> {detailHouse.DT.longitude || "N/A"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Vĩ độ:</strong> {detailHouse.DT.latitude || "N/A"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Region:</strong> {
                detailHouse.DT.region === 0 ? "Khu công nghiệp" :
                  detailHouse.DT.region === 1 ? "Khu dân cư" :
                    detailHouse.DT.region === 2 ? "Khu quy hoạch" :
                      "N/A"
              }
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Phường :</strong> {detailHouse.DT.ward_id || "N/A"}
            </Col>
            <Col xs={12} className="mb-2">
              <strong>Mô tả:</strong> {detailHouse.DT.description || "Chưa có mô tả"}
            </Col>
            <Col xs={12} className="mb-3">
              <strong>Trạng thái:</strong>{ 
              detailHouse.DT.status === 1 ? "Còn trống" :
                  detailHouse.DT.status === 2 ? "Đã thuê" :
                    detailHouse.DT.status === 3 ? "Bảo trì" :
                      "N/A"}
            </Col>
          </Row>

          {/* Thông tin liên hệ */}
          <div className="mb-3">
            <strong>Thông tin liên lạc:</strong>
            <p className="mb-1">
              Tên chủ trọ : {detailHouse.DT.owner_id || "Chưa cập nhật"}
            </p>
            <p>Email: Chưa có dữ liệu</p>
          </div>

          {/* Nút Chỉnh sửa */}
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
