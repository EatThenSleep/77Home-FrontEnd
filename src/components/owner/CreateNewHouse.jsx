import { useEffect, useState } from "react";
import { Form, Row, Col, Container, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../styles/CreateNewHouse.scss";
import { getAllWard } from "../../service/apiService";
import LightBox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
const schema = yup.object({
  houseName: yup.string().required("Tên nhà trọ không được để trống!"),
  houseDescription: yup.string().required("Mô tả không được để trống!"),
  ward: yup.string().required("Phường/Xã không được để trống!"),
  streetAddress: yup
    .string()
    .required("Số nhà, Tên đường không được để trống!"),
  rentPrice: yup
    .number()
    .required("Giá thuê không được để trống!")
    .positive("Giá thuê phải là số dương!"),

  area: yup
    .number()
    .required("Diện tích không được để trống!")
    .positive("Diện tích phải là số dương!"),
  bedrooms: yup
    .number()
    .required("Số phòng ngủ không được để trống!")
    .integer("Số phòng ngủ phải là số nguyên!")
    .positive("Số phòng ngủ phải là số dương!"),
  bathrooms: yup
    .number()
    .required("Số phòng tắm không được để trống!")
    .integer("Số phòng tắm phải là số nguyên!")
    .positive("Số phòng tắm phải là số dương!"),
  phoneNumber: yup
    .string()
    .required("Số điện thoại không được để trống!")
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số!"),
  email: yup
    .string()
    .required("Email không được để trống!")
    .email("Email không đúng định dạng!"),
  propertyImage: yup
    .mixed()
    .test("required", "Vui lòng chọn hình ảnh nhà trọ!", (value) => {
      return value && value.length > 0; // Kiểm tra length của FileList
    })
    .test("type", "Vui lòng chọn ảnh có định dạng hợp lệ!", (value) => {
      return (
        value &&
        value.length > 0 &&
        (value[0].type === "image/png" || value[0].type === "image/jpeg")
      );
    }),
  ownershipDocument: yup
    .mixed()
    .test("required", "Vui lòng chọn giấy tờ chính chủ!", (value) => {
      return value && value.length > 0; // Kiểm tra length của FileList
    })
    .test("type", "Vui lòng chọn ảnh có định dạng hợp lệ!", (value) => {
      return (
        value &&
        value.length > 0 &&
        (value[0].type === "image/png" || value[0].type === "image/jpeg")
      );
    }),
});

const CreateNewHouse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [propertyImagePreview, setPropertyImagePreview] = useState(null);
  const [ownershipDocumentPreview, setOwnershipDocumentPreview] =
    useState(null);
  const [isPropertyImageLightboxOpen, setIsPropertyImageLightboxOpen] =
    useState(false);
  const [isOwnershipDocumentLightboxOpen, setIsOwnershipDocumentLightboxOpen] =
    useState(false);
  const [wardList, setWardList] = useState([]);

  useEffect(() => {
    fetchAllWard();
  }, []);
  const fetchAllWard = async () => {
    const res = await getAllWard();

    if (res && res.data && res.data.data) {
      setWardList(res.data.data);
    }
  };

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "propertyImage") {
          setPropertyImagePreview(reader.result);
          setValue("propertyImage", event.target.files[0]); // Di chuyển setValue vào đây
        } else if (type === "ownershipDocument") {
          setOwnershipDocumentPreview(reader.result);
          setValue("ownershipDocument", event.target.files); // Di chuyển setValue vào đây
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    await trigger();
    console.log("data", data);
  };
  return (
    <Container className="content-container">
      <h1 className="text-center mb-3">Thêm nhà trọ</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="houseName">
              <Form.Label>Tên nhà trọ</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên nhà trọ"
                  {...register("houseName")}
                  isInvalid={!!errors.houseName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.houseName?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={8}>
            <Form.Group controlId="description">
              <Form.Label>Mô tả</Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Mô tả nhà trọ của bạn"
                  {...register("houseDescription")}
                  isInvalid={!!errors.houseDescription}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.houseDescription?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="ward">
              <Form.Label>Phường/Xã</Form.Label>
              <Form.Select
                className="no-scrollbar"
                {...register("ward")}
                isInvalid={!!errors.ward}
                // value={selectedWard}
                // onChange={(e) => setSelectedWard(e.target.value)}
              >
                <option value="">Chọn phường/Xã</option>
                {wardList.map((ward) => (
                  <option key={ward.id} value={ward.name}>
                    {ward.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.ward?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="streetAddress">
              <Form.Label>Số nhà, Tên đường</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số nhà, tên đường"
                {...register("streetAddress")}
                isInvalid={!!errors.streetAddress}
              />
              <Form.Control.Feedback type="invalid">
                {errors.streetAddress?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="rentPrice">
              <Form.Label>Giá thuê</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá thuê"
                {...register("rentPrice")}
                defaultValue={0}
                isInvalid={!!errors.rentPrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.rentPrice?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="area">
              <Form.Label>Diện tích (m²)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập diện tích"
                {...register("area")}
                defaultValue={0}
                isInvalid={!!errors.area}
              />
              <Form.Control.Feedback type="invalid">
                {errors.area?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="bedrooms">
              <Form.Label>Số phòng ngủ</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số phòng ngủ"
                {...register("bedrooms")}
                defaultValue={0}
                isInvalid={!!errors.bedrooms}
              />
              <Form.Control.Feedback type="invalid">
                {errors.bedrooms?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="bathrooms">
              <Form.Label>Số phòng tắm</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số phòng tắm"
                {...register("bathrooms")}
                defaultValue={0}
                isInvalid={!!errors.bathrooms}
              />
              <Form.Control.Feedback type="invalid">
                {errors.bathrooms?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                {...register("phoneNumber")}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber?.message}
              </Form.Control.Feedback>
            </Form.Group>{" "}
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                {...register("email")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>{" "}
          </Col>
        </Row>{" "}
        <Row>
          <Col md={6}>
            <Form.Group controlId="propertyImage">
              <Form.Label>Hình ảnh nhà trọ</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                {...register("propertyImage")}
                isInvalid={!!errors.propertyImage}
                onChange={(e) => handleImageChange(e, "propertyImage")}
              />
              <Form.Text className="text-muted">
                Supported format: PNG, JPG
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.propertyImage?.message}
              </Form.Control.Feedback>
              {propertyImagePreview && (
                <div
                  onClick={() => setIsPropertyImageLightboxOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={propertyImagePreview}
                    alt="Property preview"
                    style={{ width: "250px", height: "auto" }}
                  />
                </div>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="ownershipDocument">
              <Form.Label>Giấy tờ chính chủ</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                {...register("ownershipDocument")}
                isInvalid={!!errors.ownershipDocument}
                onChange={(e) => handleImageChange(e, "ownershipDocument")}
              />
              <Form.Text className="text-muted">
                Supported format: PNG, JPG
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.ownershipDocument?.message}
              </Form.Control.Feedback>
              {ownershipDocumentPreview && (
                <div
                  onClick={() => setIsOwnershipDocumentLightboxOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={ownershipDocumentPreview}
                    alt="Document preview"
                    style={{ width: "250px", height: "auto" }}
                  />
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>
        {/* Lightbox for property image */}
        {isPropertyImageLightboxOpen && (
          <LightBox
            image={propertyImagePreview}
            title="Hình ảnh nhà trọ"
            onClose={() => setIsPropertyImageLightboxOpen(false)}
          />
        )}
        {/* Lightbox for ownership document */}
        {isOwnershipDocumentLightboxOpen && (
          <LightBox
            image={ownershipDocumentPreview}
            title="Giấy tờ chính chủ"
            onClose={() => setIsOwnershipDocumentLightboxOpen(false)}
          />
        )}
        <div className="mt-3 d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Gửi thông tin
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default CreateNewHouse;
