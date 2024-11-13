import ListHouse from "./ListHouse";
import { Button } from "react-bootstrap";
import ModalHouse from "./ModalHouse";
import { useState } from "react";
const ManageHouse = () => {
  const [isShow, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Button style={{position: "absolute", left: "6%", top: "5%"}} variant="primary" onClick={() => setShow(true)}>
        Thêm nhà trọ
      </Button>

      <ListHouse />

      <ModalHouse isShow={isShow} handleClose={handleClose} />
    </div>
  );
};

export default ManageHouse;
