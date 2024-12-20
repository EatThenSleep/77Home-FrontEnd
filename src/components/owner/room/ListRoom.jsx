import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../../../styles/ListRoom.scss";
import DeleteRoom from "./DeleteRoom";
const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State để lưu từ khóa tìm kiếm
  const [statusFilter, setStatusFilter] = useState("");
  const [houses, setHouses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [houseFilter, setHouseFilter] = useState("");
  const itemsPerPage = 6; // Số phòng hiển thị trên mỗi trang
  const navigate = useNavigate();

  // Hàm lấy dữ liệu từ API
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/room");
      setRooms(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phòng:", error);
    }
  };

  const fetchHouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/house");
      setHouses(response.data.DT); // Lưu danh sách nhà vào state
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu nhà:", error);
    }
  };
  useEffect(() => {
    fetchRooms();
    fetchHouses();
  }, []);

  // Xử lý khi nhấn nút "Chi tiết phòng"
  const handleViewDetails = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const handleDeleteRoom = (room) => {
    setSelectedRoom(room); // Lưu phòng vào state để xóa
    setShowDeleteModal(true); // Mở modal xác nhận xóa
  };

  // Lọc phòng theo tên và trạng thái
  const filteredRooms = rooms
    .filter(room => room.name.toLowerCase().includes(searchQuery.toLowerCase())) // Lọc theo tên phòng
    .filter(room => {
      // Lọc theo trạng thái (chuyển đổi statusFilter thành số nếu có giá trị)
      return statusFilter ? room.status === parseInt(statusFilter) : true;
    })
    .filter(room => {
      // Lọc theo nhà (so sánh với houseFilter, nếu có giá trị)
      return houseFilter ? room.house.id === parseInt(houseFilter) : true;
    });
  // Tính toán số trang
  const pageCount = Math.ceil(filteredRooms.length / itemsPerPage);

  // Xử lý khi thay đổi trang
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Tính toán danh sách phòng hiện tại theo trang
  const offset = currentPage * itemsPerPage;
  const currentRooms = filteredRooms.slice(offset, offset + itemsPerPage);

  const statusMapping = {
    0: "Còn trống",
    1: "Đã thuê",
    2: "Bảo trì"
  };

  // Cập nhật lại danh sách phòng khi thay đổi bộ lọc tìm kiếm hoặc trạng thái
  useEffect(() => {
    setCurrentPage(0); // Reset về trang 1 khi thay đổi bộ lọc
  }, [searchQuery, statusFilter, houseFilter]);

  // Hàm callback sau khi xóa thành công
  const handleDeleteSuccess = (roomId) => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    setRooms(updatedRooms); // Cập nhật lại danh sách phòng gốc
    setCurrentPage(0); // Đặt lại trang hiện tại về trang đầu tiên
    setShowDeleteModal(false); // Đóng modal xác nhận xóa
  };
  return (
    <Container className="list-room-container mt-4">
      <Button
        className="btn-room-new"
        variant="primary"
        onClick={() => navigate("/room/create")}
      >
        Thêm phòng
      </Button>
      <h1 className="text-center mb-4">Danh sách các phòng</h1>

      {/* Thêm input tìm kiếm */}
      <Row className="mb-3">
        <Col md={4}> {/* 6 cột để chiếm nửa chiều rộng */}
          <Form.Group controlId="search" className="mb-4">
            <Form.Control
              type="text"
              placeholder="Nhập tên phòng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa tìm kiếm
            />
          </Form.Group>
        </Col>

        <Col md={4}> {/* 6 cột còn lại */}
          <Form.Group controlId="statusFilter">
            <Form.Control
              as="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="0">Còn trống</option>
              <option value="1">Đã thuê</option>
              <option value="2">Bảo trì</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="houseFilter">
            <Form.Control
              as="select"
              value={houseFilter}
              onChange={(e) => setHouseFilter(e.target.value)} // Lọc theo nhà
            >
              <option value="">Tất cả nhà</option>
              {houses.map((house) => (
                <option key={house.id} value={house.id}>
                  {house.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-5">
        {currentRooms && currentRooms.length > 0 ? (
          currentRooms.map((room) => (
            <Col key={room.id} md={4} className="mb-4">
              <Card className="p-3 room-card" onClick={() => handleViewDetails(room.id)} 
                style={{ cursor: "pointer" }} 
              >
                <Card.Body>
                  <Card.Title className="room-title">{room.name}</Card.Title>
                  <Card.Text className="room-info">
                    <b>Diện tích: </b> {room.area} m² <br />
                    <b>Số người tối đa: </b> {room.maxOccupants} <br />
                    <b>Giá thuê: </b> {room.monthlyRent.toLocaleString()} VND / tháng <br />
                    <b>Trạng thái: </b> {statusMapping[room.status]} <br />
                    <b>Mô tả: </b> <span>{room.description}</span>
                    <b>Nhà: </b> {room.house.name}
                  </Card.Text>
                  <Button
                    variant="danger"
                    className="px-4 mt-2 btn-danger btn-a"
                    onClick={() => handleDeleteRoom(room)}
                  >
                    Xóa
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center fs-5 fw-bold">
            Không có phòng phù hợp!
          </div>
        )}
      </Row>

      {/* Modal Xóa */}
      <DeleteRoom
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        roomData={selectedRoom}
        onDeleteSuccess={handleDeleteSuccess}
      />
      <Row>
        <Col md={12}>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ListRoom;
