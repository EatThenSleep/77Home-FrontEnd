import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Lấy ID từ URL
import { Container, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import "../../../styles/DetailRoom.scss";
import { useNavigate } from "react-router-dom";
const DetailRoom = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [room, setRoom] = useState(null); // Dữ liệu phòng
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi
    const navigate = useNavigate();
    // Lấy dữ liệu từ API
    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/room/${id}`);
            setRoom(response.data.DT); // Lưu dữ liệu vào state
        } catch (err) {
            setError("Không thể tải thông tin phòng. Vui lòng thử lại!"); // Xử lý lỗi
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    useEffect(() => {
        fetchRoomDetails();
    }, [id]);

    // Hiển thị trạng thái
    const statusMapping = {
        0: "Còn trống",
        1: "Đã thuê",
        2: "Bảo trì",
    };

    // Render khi đang tải
    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    // Render khi có lỗi
    if (error) {
        return (
            <Container className="text-center mt-5 text-danger">
                <h4>{error}</h4>
            </Container>
        );
    }

    // Render chi tiết phòng
    return (
        <Container className="detail-room-container mt-5"  style={{marginTop : "300px"}}>
            <Card className="p-4 shadow">
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        <h2>{room.name}</h2>
                    </Card.Title>
                    <Card.Text>
                        <b>Diện tích:</b> {room.area} m² <br />
                        <b>Số người tối đa:</b> {room.maxOccupants} <br />
                        <b>Giá thuê:</b> {room.monthlyRent.toLocaleString()} VND / tháng <br />
                        <b>Trạng thái:</b> {statusMapping[room.status]} <br />
                        <b>Mô tả:</b> {room.description} <br />
                        <b>Nhà:</b> {room.house.name} <br />
                    </Card.Text>
                    <div className="text-center mt-4">
                        <Button variant="secondary" className="btn-back" onClick={() => navigate(`/room`)}>
                            Quay lại
                        </Button>
                        <Button
                            variant="warning"
                            className="btn-edit-room"
                            onClick={() =>
                                navigate(`/room/update/${room.id}`, { state: room })
                            }
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetailRoom;
