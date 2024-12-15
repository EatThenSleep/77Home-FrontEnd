/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  deleteBuilding,
  getAllBuilding,
} from "../../../service/buildingService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const DeleteBuilding = (props) => {
  const { show, handleClose, buildingData } = props;
  const [listBuilding, setListBuilding] = useState([]);

  // useEffect chỉ chạy khi `refreshList` thay đổi
  useEffect(() => {
    fetchAllListBuilding();
  }, []);

  // Gọi API để xóa tòa nhà
  const confirmDelete = async () => {
    const res = await deleteBuilding(buildingData?.id);
    console.log("res", res);
    if (res && res.EC === 0) {
      toast.success("Xóa tòa nhà thành công");
      fetchAllListBuilding();
      handleClose();
    } else {
      toast.error("Xóa tòa nhà thất bại");
    }
  };

  // Gọi API để lấy danh sách tòa nhà
  const fetchAllListBuilding = async () => {
    try {
      const res = await getAllBuilding();
      console.log("res", res);
      if (res && res.EC === 0) {
        setListBuilding(res.DT);
      } else {
        console.error("Error fetching buildings:", res.EM);
      }
    } catch (error) {
      console.error("Error fetching buildings:", error);
    }
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
          <Modal.Title>Xác nhận xóa tòa nhà!</Modal.Title>
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

export default DeleteBuilding;
