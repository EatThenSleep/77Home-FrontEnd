import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalHouse = (props) => {
  // State to control the modal visibility

  // Functions to handle opening and closing the modal

  const { isShow, handleClose } = props;

  return (
    <>
      <Modal show={isShow} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhà trọ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="propertyName">
                    <Form.Label>Tên nhà trọ</Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên nhà trọ" />
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group controlId="description">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      placeholder="Mô tả nhà trọ của bạn"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="city">
                    <Form.Label>Tỉnh/Thành phố</Form.Label>
                    <Form.Select>
                      <option>Chọn tỉnh/thành phố</option>
                      {/* Add options here */}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="district">
                    <Form.Label>Quận/Huyện</Form.Label>
                    <Form.Select>
                      <option>Chọn quận/huyện</option>
                      {/* Add options here */}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="ward">
                    <Form.Label>Phường/Xã</Form.Label>
                    <Form.Select>
                      <option>Chọn phường/xã</option>
                      {/* Add options here */}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="streetAddress">
                    <Form.Label>Số nhà, Tên đường</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số nhà, tên đường"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="rentPrice">
                    <Form.Label>Giá thuê</Form.Label>
                    <Form.Control type="text" placeholder="Nhập giá thuê" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="area">
                    <Form.Label>Diện tích (m²)</Form.Label>
                    <Form.Control type="text" placeholder="Nhập diện tích" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="bedrooms">
                    <Form.Label>Số phòng ngủ</Form.Label>
                    <Form.Control type="text" placeholder="Nhập số phòng ngủ" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="bathrooms">
                    <Form.Label>Số phòng tắm</Form.Label>
                    <Form.Control type="text" placeholder="Nhập số phòng tắm" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Nhập email" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="propertyImage">
                    <Form.Label>Hình ảnh nhà trọ</Form.Label>
                    <Form.Control type="file" accept="image/png, image/jpeg" />
                    <Form.Text className="text-muted">
                      Supported format: PNG, JPG
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="ownershipDocument">
                    <Form.Label>Giấy tờ chính chủ</Form.Label>
                    <Form.Control type="file" accept="image/png, image/jpeg" />
                    <Form.Text className="text-muted">
                      Supported format: PNG, JPG
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Gửi thông tin
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalHouse;
