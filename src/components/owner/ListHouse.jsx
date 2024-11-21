import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { getAllWard } from "../../service/apiService";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../../styles/ListHouse.scss";
import { useNavigate } from "react-router-dom";
import DeleteHouse from "./DeleteHouse";
const ListHouse = () => {
  const [wardList, setWardList] = useState([]);
  const [listHouse, setListHouse] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedAreaSize, setSelectedAreaSize] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpenModalDelete , setOpenModalDelete] = useState(false);
  const [houseData , setHouseData] = useState([]);
  const itemsPerPage = 3;

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredHouses.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    fetchAllWard();
    fetchAllListHouse();
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredHouses.length;
    setCurrentPage(event.selected);
  };
  const fetchAllWard = async () => {
    const res = await getAllWard();

    if (res && res.data && res.data.data) {
      setWardList(res.data.data);
    }
  };
  
  const fetchAllListHouse = async () => {
    const res = await axios.get("http://localhost:3000/houses");
    if (res && res.data) {
      setListHouse(res.data);
      setFilteredHouses(res.data);
    }
  };
  const statusMapping = {
    "Đã thuê": "rented",
    "Còn trống": "available",
  };
  const filterHouses = () => {
    return listHouse.filter((house) => {
      const nameMatch =
        !searchTerm ||
        house.name.toLowerCase().includes(searchTerm.toLowerCase());

      const wardMatch =
        selectedWard === "" ||
        house.ward
          .toLowerCase()
          .replace("phường ", "")
          .includes(selectedWard.toLowerCase());

      // Price filter logic
      const priceMatch =
        selectedPriceRange === "" ||
        (selectedPriceRange === "1-3" &&
          parseInt(house.price.replace(/\D/g, "")) >= 1000000 &&
          parseInt(house.price.replace(/\D/g, "")) <= 3000000) ||
        (selectedPriceRange === "3-5" &&
          parseInt(house.price.replace(/\D/g, "")) >= 3000000 &&
          parseInt(house.price.replace(/\D/g, "")) <= 5000000) ||
        (selectedPriceRange === "5-7" &&
          parseInt(house.price.replace(/\D/g, "")) >= 5000000 &&
          parseInt(house.price.replace(/\D/g, "")) <= 7000000) ||
        (selectedPriceRange === "7-10" &&
          parseInt(house.price.replace(/\D/g, "")) >= 7000000 &&
          parseInt(house.price.replace(/\D/g, "")) <= 10000000);

      // Area size filter logic
      console.log("selected area size: " + selectedAreaSize);
      const areaSizeMatch =
        selectedAreaSize === "" ||
        (selectedAreaSize === "20-40" &&
          parseInt(house.area.replace(/\D/g, "")) >= 20 &&
          parseInt(house.area.replace(/\D/g, "")) <= 40) ||
        (selectedAreaSize === "40-60" &&
          parseInt(house.area.replace(/\D/g, "")) >= 40 &&
          parseInt(house.area.replace(/\D/g, "")) <= 60) ||
        (selectedAreaSize === "60-80" &&
          parseInt(house.area.replace(/\D/g, "")) >= 60 &&
          parseInt(house.area.replace(/\D/g, "")) <= 80) ||
        (selectedAreaSize === "80-100" &&
          parseInt(house.area.replace(/\D/g, "")) >= 80 &&
          parseInt(house.area.replace(/\D/g, "")) <= 100);

      const statusMatch =
        selectedStatus === "" || statusMapping[house.status] === selectedStatus;

      return (
        nameMatch && wardMatch && priceMatch && areaSizeMatch && statusMatch
      );
    });
  };

  const handleSearch = () => {
    const filteredHouses = filterHouses();
    setFilteredHouses(filteredHouses);
    setCurrentPage(0);
  };

    const handleTongleModalConfirm = () => {
    setOpenModalDelete(!isOpenModalDelete);
  };
   const handleDeleteHouse = (house) => {
    handleTongleModalConfirm(isOpenModalDelete);
   setHouseData(house)
  };
  return (
    <Container className="mt-4">
      {/* Tiêu đề */}
      <h1 className="text-center mb-4">Danh sách nhà trọ</h1>

      {/* Thanh tìm kiếm */}

      <Row className="mb-3 ">
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Nhà trọ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select
            value={selectedAreaSize}
            onChange={(e) => setSelectedAreaSize(e.target.value)}
          >
            <option value="">Chọn diện tích</option>
            <option value="20-40">20m² - 40m2</option>
            <option value="40-60">40m² - 60m²</option>
            <option value="60-80">60m² - 80m²</option>
            <option value="80-100">80m² - 100m²</option>
            {/* Thêm các tùy chọn khác nếu cần */}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          >
            <option value="">Chọn giá thuê</option>
            <option value="1-3">1 triệu - 3 triệu</option>
            <option value="3-5">3 triệu - 5 triệu</option>
            <option value="5-7">5 triệu - 7 triệu</option>
            <option value="7-10">7 triệu - 10 triệu</option>
            {/* Thêm các tùy chọn khác nếu cần */}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Chọn trạng thái</option>
            <option value="available">Còn trống</option>
            <option value="rented">Đã thuê</option>
            {/* Thêm các trạng thái khác nếu cần */}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            className="no-scrollbar"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
          >
            <option value="">Chọn phường</option>
            {wardList.map((ward) => (
              <option key={ward.id} value={ward.name}>
                {ward.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2} className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Col>
      </Row>

      {/* Danh sách nhà trọ */}
      <Row className="mt-5">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((house, index) => (
            <Col md={12} key={house.id} className="mb-3">
              <Card className="p-3">
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={house.image}
                      alt={`Hình ảnh của ${house.name}`}
                      className="image-house"
                    />
                  </Col>
                  <Col md={8} className="text-start">
                    <Card.Body>
                      <Card.Title>{house.name}</Card.Title>
                      <Card.Text>
                        <strong>{house.price}</strong> <br />
                        <b>Mô tả:</b> {truncateText(house.description, 85)}
                        <br />
                        <span>
                          <b>Địa chỉ:</b> {house.street} , {house.ward} ,{" "}
                          {house.district} , {house.province}
                        </span>
                        <br />
                        <span>
                          <b>Diện tích:</b> {house.area}
                        </span>
                        <br />
                        <span>
                          <b>Trạng thái:</b> {house.status}
                        </span>
                      </Card.Text>
                      <Button variant="danger" className="px-4 mt-2" onClick={() =>handleDeleteHouse(house)}>
                        Xóa
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center fs-5  fw-bold">
            Không có nhà trọ phù hợp!
          </div>
        )}
      </Row>
      <ReactPaginate
        previousLabel="Trước"
        nextLabel="Sau"
        onPageChange={handlePageClick}
        pageCount={Math.ceil(filteredHouses.length / itemsPerPage)}
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
      />

      <DeleteHouse
      show={isOpenModalDelete}
      handleClose={handleTongleModalConfirm}
      houseData={houseData}
      />
    </Container>
  );
};

export default ListHouse;
