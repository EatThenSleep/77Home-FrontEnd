import { Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../../../styles/DetailHouse.scss";
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
      console.log("data", res.DT);
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
    <Card className="">
      <Row className="g-0">
        <Col
          md={4}
          className="d-flex justify-content-center align-items-center px-2"
        >
          {detailBuilding.avatar ? (
            <Card.Img
              variant="top"
              src={detailBuilding.avatar}
              alt="Building avatar"
              className="img-fluid rounded"
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <FaImage className="image-house-detail" />
            </div>
          )}
        </Col>
        <Col md={8}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item className="">
                <strong>Tên:</strong>{" "}
                {detailBuilding.name || "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Địa chỉ:</strong> {detailBuilding.address},
                <span> phường {detailBuilding?.ward?.name || ""}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Khu vực:</strong>{" "}
                {regionMapping[detailBuilding.region] || "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Diện tích:</strong>{" "}
                {detailBuilding.area || "Không có dữ liệu"} m<sup>2</sup>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Số tầng:</strong>{" "}
                {detailBuilding.numberOfFloors || "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Năm xây dựng:</strong>{" "}
                {detailBuilding.yearBuilt || "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Mô tả:</strong>{" "}
                {detailBuilding.description || "Không có mô tả"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Tọa độ:</strong> Kinh độ:
                {detailBuilding.longitude || "Không có dữ liệu"}, Vĩ độ:
                {detailBuilding.latitude || "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Người đại diện:</strong>{" "}
                {detailBuilding.ownerRepresent || "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Trạng thái:</strong>{" "}
                {statusMapping[detailBuilding.status] || "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Thời gian tạo:</strong>{" "}
                {new Date(detailBuilding.createdAt).toLocaleString() ||
                  "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Thời gian cập nhật:</strong>{" "}
                {new Date(detailBuilding.updatedAt).toLocaleString() ||
                  "Không có dữ liệu"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Người tạo:</strong>{" "}
                {detailBuilding.createdBy || "Không có dữ liệu"}
              </ListGroup.Item>
            </ListGroup>
            <div className="mt-4 mx-2">
              <Button
                variant="secondary"
                className="mx-2"
                onClick={() => navigate("/building")}
              >
                Quay lại
              </Button>
              <Button
                variant="warning"
                onClick={() =>
                  navigate(`/building/update/${detailBuilding.id}`, {
                    state: detailBuilding,
                  })
                }
              >
                Chỉnh sửa
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DetailBuilding;
