import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const DeleteHouse = (props) => {
  const { show, handleClose, houseData } = props;
  const confirmDelete = () => {
    // Call API to delete house
    // props.deleteHouse(houseData.id);
    // handleClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa nhà trọ!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Bạn có chắc chắn muốn thực hiện thao tác này không ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={() => confirmDelete()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteHouse;
