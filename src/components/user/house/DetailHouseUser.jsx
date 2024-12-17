import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../styles/DetailHouseUser.scss";
import OwnerModal from "./OwnerModal";
function DetailHouseUser() {
  const [house, setHouse] = useState(null);
  const { id } = useParams(); // Lấy id từ URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewOwnerClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/v1/house/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setHouse(data.DT);
          console.log(data.DT);
        })
        .catch((error) => console.error("Error fetching house details:", error));
    }
  }, [id]); // Thêm id vào dependency array

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-house-container">
      <div className="detail-house">
        <header className="name">
          <h1><b>{house.name}</b></h1>
        </header>

        <div className="images-section">
          <img
            src={house.avatar || "https://vanangroup.com.vn/wp-content/uploads/2024/05/Hinh-anh-phong-ngu-khach-san-binh-dan-vua-dep-vua-tiet-kiem.jpg"}
            alt="Main"
            className="main-image"
          />
        </div>

        <div className="main-content">
          <div className="left-section">
            <div className="info-section">
              <div className="a">
                <h4>Tổng quan</h4>
                <h4 className={`house-type ${house.status === 1 ? "available" : house.status === 2 ? "repairing" : "inactive"}`}>{house.status === 1 ? "Đang hoạt động" : house.status === 2 ? "Đang sửa chữa" : "Ngừng hoạt động"}</h4>
              </div>
              <div className="buttons">
                <button className="btn-gray" onClick={handleViewOwnerClick}>View Owner</button>
                {/* Hiển thị modal khi isModalOpen là true */}
                {isModalOpen && <OwnerModal isOpen={isModalOpen} onClose={handleCloseModal} owner={house.owner} />}
                <button className="btn-green">Renter a house</button>
              </div>

              <ul className="rowww">
                <li>
                  <i className="fas fa-home"></i>
                  <span>{house.numberRooms} Phòng</span>
                </li>
                <li>
                  <i className="fas fa-building"></i>
                  <span>{house.numberOfFloors} Tầng</span>
                </li>
              </ul>

              <p>
                <i className="fas fa-map-marker-alt" style={{ marginRight: "8px", color: "#FF5733" }}></i>
                {house.address}, {house.ward.name}
              </p>
              <p>{house.description}</p>
              <ul className="roww">
                <li>
                  <i className="fas fa-ruler"></i><span>Diện tích: {house.area} m²</span>
                </li>
                <li>
                  <i className="fas fa-calendar-alt"></i> <span> Năm xây dựng: {house.yearBuilt}</span>
                </li>
              </ul>

              <hr />
              <h3>Tiện ích</h3>

              <div className="amenity-row">
                <div className="amenity-item">
                  <i className="fas fa-location-arrow"></i> <span>Vị trí: {house.position}</span>
                </div>
                <div className="amenity-item">
                  <i className="fas fa-snowflake"></i> <span>Điều hòa</span>
                </div>
              </div>
              <div className="amenity-row">
                <div className="amenity-item">
                  <i className="fas fa-utensils"></i> <span>Bếp</span>
                </div>
                <div className="amenity-item">
                  <i className="fas fa-medkit"></i> <span>Hộp cứu thương</span>
                </div>
              </div>
              <div className="amenity-row">
                <div className="amenity-item">
                  <i className="fas fa-tv"></i> <span>TV</span>
                </div>
                <div className="amenity-item">
                  <i className="fas fa-coffee"></i> <span>Đồ uống miễn phí</span>
                </div>
              </div>
              <div className="amenity-row">
                <div className="amenity-item">
                  <i className="fas fa-wifi"></i> <span>Wifi</span>
                </div>
                <div className="amenity-item">
                  <i className="fas fa-thermometer-half"></i> <span>Sưởi ấm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="booking-section">
            <h3>Make an Appointment</h3>
            <form>
              <label>
                Name:
                <input type="text" placeholder="Nhập tên của bạn" />
              </label>
              <label>
                Time:
                <input type="date" />
              </label>
              <label>
                Contact phone number:
                <input type="text" placeholder="Nhập số điện thoại" />
              </label>
              <label>
                Message:
                <textarea placeholder="Nhập nội dung"></textarea>
              </label>
              <hr />
              <button type="submit" className="btn">
                Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailHouseUser;
