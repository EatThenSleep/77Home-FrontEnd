import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../../../styles/DetailHouse.scss";

const DetailBuilding = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailBuilding, setDetailBuilding] = useState({}); // Chuyển sang object

  useEffect(() => {
    fetchBuildingById();
  }, []);

  const fetchBuildingById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/building/${id}`);
      if (res && res.data) {
        setDetailBuilding(res.data); // Lưu dữ liệu nhà cụ thể
      }
    } catch (error) {
      console.error("Error fetching building by ID:", error);
    }
  };

  return (
    <Container className="p-4">
      <Row className="p-3 mb-5 bg-white">

           {/* Hình ảnh */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          {detailBuilding.avatar ?  (
            <div>
              <img src={detailBuilding.avatar} className="image-house-detail" />
            </div>
          ) : (
            <div className="">
              <FaImage className="image-house-detail" />
            </div>
          )}
        </Col>

        {/* Chi tiết nhà */}
        <Col md={6}>
          <h4>{detailBuilding.name || "Không có tên"}</h4>
          <p>
            <strong>Địa chỉ:</strong> {detailBuilding.address || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Khu vực:</strong> {detailBuilding.region || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Diện tích:</strong> {detailBuilding.area || "Không có dữ liệu"} m
            <sup>2</sup>
          </p>
          <p>
            <strong>Số tầng:</strong> {detailBuilding.numberOfFloors || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Năm xây dựng:</strong> {detailBuilding.yearBuilt || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Mô tả:</strong> {detailBuilding.description || "Không có mô tả"}
          </p>
          <p>
            <strong>Tọa độ:</strong> Kinh độ: {detailBuilding.longitude || "Không có dữ liệu"}, Vĩ độ: {detailBuilding.latitude || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Người đại diện:</strong> {detailBuilding.ownerRepresent || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Trạng thái:</strong> {detailBuilding.status || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Thời gian tạo:</strong> {new Date(detailBuilding.createdAt).toLocaleString() || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Thời gian cập nhật:</strong> {new Date(detailBuilding.updatedAt).toLocaleString() || "Không có dữ liệu"}
          </p>
          <p>
            <strong>Người tạo:</strong> {detailBuilding.createdBy || "Không có dữ liệu"}
          </p>

          <Button
            variant="warning"
            onClick={() =>
              navigate("/building/update", { state: detailBuilding })
            }
          >
            Chỉnh sửa
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailBuilding;
