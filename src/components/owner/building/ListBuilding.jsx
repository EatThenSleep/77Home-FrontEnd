import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Dropdown,
} from "react-bootstrap";
import { getAllWard } from "../../../service/apiService";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import { Range } from "react-range";
import "../../../styles/ListHouse.scss";
import { useNavigate } from "react-router-dom";
import DeleteHouse from "../house/DeleteHouse";
import DatePicker from "react-datepicker";
const ListBuilding = () => {
  const navigate = useNavigate();
  const [wardList, setWardList] = useState([]);
  const [ListBuilding, setListBuilding] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredbuildings, setFilteredbuildings] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  const [areaSizeRange, setAreaSizeRange] = useState([0, 10000]);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [buildingData, setbuildingData] = useState([]);
  const itemsPerPage = 3;

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredbuildings.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    fetchAllWard();
    fetchAllListBuilding();
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const fetchAllWard = async () => {
    const res = await getAllWard();

    if (res && res.data && res.data.data) {
      setWardList(res.data.data);
    }
  };

  const fetchAllListBuilding = async () => {
    const res = await axios.get("http://localhost:3000/building");
    if (res && res.data) {
      setListBuilding(res.data);
      setFilteredbuildings(res.data);
    }
  };
  const statusMapping = {
    "Đã thuê": "rented",
    "Còn trống": "available",
  };
  const extractWard = (address) => {
    const wardRegex = /Phường\s+([^\d,]+)/i;
    const match = address.match(wardRegex);
    return match ? match[1].trim() : "";
  };
  const filterBuildings = () => {
    return ListBuilding.filter((building) => {
      const buildingName = building.name.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      const nameMatch = !searchTerm || buildingName.includes(searchTermLower);

      const areaSize =
        typeof building.area === "string"
          ? parseInt(building.area.replace(/\D/g, ""), 10)
          : building.area;
      const areaSizeMatch =
        areaSize >= areaSizeRange[0] && areaSize <= areaSizeRange[1];

      const yearBuilt = building.yearBuilt;
      const yearMatch =
        !selectedYear || yearBuilt === selectedYear || yearBuilt === null;

      const statusMatch =
        selectedStatus === "" ||
        statusMapping[building.status] === selectedStatus;

      const buildingWard = extractWard(building.address).toLowerCase();

      const selectedWardLower = selectedWard.toLowerCase();

      const wardMatch =
        selectedWard === "" || buildingWard.includes(selectedWardLower);
      return (
        nameMatch && areaSizeMatch && statusMatch && yearMatch && wardMatch
      );
    });
  };

  const handleSearch = () => {
    const filteredbuildings = filterBuildings();
    console.log("filteredbuildings", filteredbuildings);
    setFilteredbuildings(filteredbuildings);
    setCurrentPage(0);
  };

  const handleViewDetail = (buildingId) => {
    navigate(`/building/${buildingId}`);
  };

  const handleTongleModalConfirm = () => {
    setOpenModalDelete(!isOpenModalDelete);
  };
  const handleDeletebuilding = (building) => {
    handleTongleModalConfirm(isOpenModalDelete);
    setbuildingData(building);
  };

  return (
    <Container className="mt-4">
      <Button
        className="btn-create-new"
        variant="primary"
        onClick={() => navigate("/building/create")}
      >
        Thêm tòa nhà
      </Button>
      {/* Tiêu đề */}
      <h1 className="text-center mb-4">Danh sách tòa nhà</h1>

      {/* Thanh tìm kiếm */}

      <Row className="mb-3 ">
        <Col md={2}>
          <Form.Control
            type="text"
            className="custom-form-control"
            placeholder="Tòa nhà"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Dropdown className="border rounded">
            <Dropdown.Toggle variant="none" className="custom-dropdown-toggle">
              Chọn diện tích
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu">
              <h5 className="fw-bold">Diện tích</h5>
              <Row>
                <Col md={6}>
                  <span className="fw-bold px-1">
                    Từ: {areaSizeRange[0]} m<sup>2</sup>
                  </span>
                  <Form.Control
                    className="mt-2"
                    type="number"
                    value={areaSizeRange[0]}
                    readOnly
                  />
                </Col>
                <Col md={6}>
                  <span className="fw-bold px-1">
                    Đến: {areaSizeRange[1]} m<sup>2</sup>
                  </span>
                  <Form.Control
                    className="mt-2"
                    type="number"
                    value={areaSizeRange[1]}
                    readOnly
                  />
                </Col>
              </Row>
              <div className="slider-container mt-4">
                <Range
                  step={1}
                  min={0}
                  max={10000}
                  values={areaSizeRange}
                  onChange={(values) => setAreaSizeRange(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "20px",
                        width: "20px",
                        backgroundColor: "#007bff",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    />
                  )}
                />
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2}>
          <Dropdown className="border rounded">
            <Dropdown.Toggle variant="none" className="custom-dropdown-toggle">
              Chọn năm xây dựng
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu">
              <h5 className="fw-bold">Năm xây dựng</h5>
              <Row>
                <Col md={12}>
                  <DatePicker
                    selected={
                      selectedYear ? new Date(selectedYear, 0, 1) : null
                    }
                    onChange={(date) =>
                      setSelectedYear(date ? date.getFullYear() : null)
                    }
                    showYearPicker
                    dateFormat="yyyy"
                    className="form-control mt-2"
                    placeholderText="Chọn năm xây dựng"
                  />
                </Col>
              </Row>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={2}>
          <Form.Select
            className="custom-form-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Chọn trạng thái</option>
            <option value="available">Còn trống</option>
            <option value="rented">Đã thuê</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            className="no-scrollbar custom-form-select"
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
          currentItems.map((building, index) => (
            <Col md={12} key={building.id} className="mb-3">
              <Card className="p-3">
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={building.avatar}
                      alt={`Hình ảnh của ${building.name}`}
                      className="image-building"
                      onClick={() => handleViewDetail(building.id)}
                    />
                  </Col>
                  <Col md={8} className="text-start">
                    <Card.Body>
                      <Card.Title>{building.name}</Card.Title>
                      <Card.Text>
                        <b>Mô tả:</b> {truncateText(building.description, 85)}
                        <br />
                        <span>
                          <b>Địa chỉ:</b> {building.address}
                        </span>
                        <br />
                        <span>
                          <b>Diện tích:</b> {building.area} m<sup>2</sup>
                        </span>
                        <br />
                        <span>
                          <b>Năm xây dựng:</b> {building.yearBuilt}
                        </span>
                        <br />
                        <span>
                          <b>Trạng thái:</b> {building.status}
                        </span>
                      </Card.Text>
                      <Button
                        variant="danger"
                        className="px-4 mt-2"
                        onClick={() => handleDeletebuilding(building)}
                      >
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
        pageCount={Math.ceil(filteredbuildings.length / itemsPerPage)}
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
      />

      <DeleteHouse
        show={isOpenModalDelete}
        handleClose={handleTongleModalConfirm}
        buildingData={buildingData}
      />
    </Container>
  );
};

export default ListBuilding;
