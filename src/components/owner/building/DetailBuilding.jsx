import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../../../styles/DetailBuilding.scss";
import { getBuildingDetail } from "../../../service/buildingService";
const DetailBuilding = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailBuilding, setDetailBuilding] = useState({}); // Chuyển sang object

  useEffect(() => {
    fetchBuildingById();
  }, []);

  const fetchBuildingById = async () => {
    try {
      const res = await getBuildingDetail(id);
      if (res && res.DT) {
        setDetailBuilding(res.DT);
      }
    } catch (error) {
      console.error("Error fetching building by ID:", error);
    }
  };
  const statusMapping = {
    1: "Đang hoạt động",
    2: "Đang sửa chữa",
    3: "Ngừng hoạt động",
  };
  const regionMapping = {
    1: "Khu dân cư",
    2: "Khu công nghiệp",
    3: "Khu quy hoạch",
  };

  return (
    <Container className="p-4">
      <Row className="p-3 mb-5 bg-white rounded shadow-sm">
        {/* Hình ảnh */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center mb-4 mb-md-0"
        >
          {detailBuilding.avatar ? (
            <img
              src={detailBuilding.avatar}
              className="image-house-detail img-fluid rounded"
              alt="Building avatar"
            />
          ) : (
            <FaImage className="image-building-detail" size={200} />
          )}
        </Col>

        {/* Chi tiết nhà */}
        <Col md={6}>
          <h3 className="mb-4">{detailBuilding.name || "Chưa cập nhật"}</h3>

          <Row>
            <Col xs={6} className="mb-2">
              <strong>Địa chỉ:</strong> {detailBuilding.address || "N/A"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Khu vực:</strong>{" "}
              {regionMapping[detailBuilding.region] || "Không có dữ liệu"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Diện tích:</strong>{" "}
              {detailBuilding.area || "Không có dữ liệu"} m<sup>2</sup>
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Số tầng:</strong>{" "}
              {detailBuilding.numberOfFloors || "Không có dữ liệu"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Năm xây dựng:</strong>{" "}
              {detailBuilding.yearBuilt || "Không có dữ liệu"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Mô tả:</strong>{" "}
              {detailBuilding.description || "Không có mô tả"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Tọa độ:</strong> Kinh độ:
              {detailBuilding.longitude || "Không có dữ liệu"}, Vĩ độ:
              {detailBuilding.latitude || "Không có dữ liệu"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Người đại diện:</strong>{" "}
              {detailBuilding.ownerRepresent || "Không có dữ liệu"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Trạng thái:</strong>{" "}
              {statusMapping[detailBuilding.status] || "Không có dữ liệu"}
            </Col>
            <Col xs={6} className="mb-2">
              <strong>Người tạo:</strong>{" "}
              {detailBuilding?.createdBy_user?.fullName || "Không có dữ liệu"}
            </Col>
          </Row>

          {/* Nút Chỉnh sửa */}
          <Button
            variant="warning"
            className="mt-2"
            onClick={() => navigate("/house/update", { state: detailBuilding })}
          >
            Chỉnh sửa
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailBuilding;
