import { useEffect, useState } from "react";
import { Form, Row, Col, Container, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../../styles/UpdateHouse.scss";
import { getAllWard } from "../../../service/apiService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
  houseName: yup.string().required("Tên nhà trọ không được để trống!"),
  houseDescription: yup.string().required("Mô tả không được để trống!"),
  ward: yup.string().required("Phường/Xã không được để trống!"),
  streetAddress: yup
    .string()
    .required("Số nhà, Tên đường không được để trống!"),
  rentPrice: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Giá thuê không được để trống!")
    .positive("Giá thuê phải là số dương!"),
  area: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Diện tích không được để trống!")
    .positive("Diện tích phải là số dương!"),
  bedrooms: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Số phòng ngủ không được để trống!")
    .integer("Số phòng ngủ phải là số nguyên!")
    .positive("Số phòng ngủ phải là số dương!"),
  bathrooms: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
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
    .required("Vui lòng chọn hình ảnh nhà trọ!")
    .test("fileType", "Vui lòng chọn ảnh PNG hoặc JPG!", (value) => {
      return (
        value && value[0] && ["image/png", "image/jpeg"].includes(value[0].type)
      );
    })
    .test("fileSize", "Dung lượng ảnh phải nhỏ hơn 5MB!", (value) => {
      return value && value[0] && value[0].size <= 5 * 1024 * 1024;
    }),
  ownershipDocument: yup
    .mixed()
    .required("Vui lòng chọn giấy tờ chính chủ!")
    .test("fileType", "Vui lòng chọn ảnh PNG hoặc JPG!", (value) => {
      return (
        value && value[0] && ["image/png", "image/jpeg"].includes(value[0].type)
      );
    })
    .test("fileSize", "Dung lượng ảnh phải nhỏ hơn 5MB!", (value) => {
      return value && value[0] && value[0].size <= 5 * 1024 * 1024;
    }),
});

const UpdateHouse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const houseDetails = location.state || {};
  console.log("houseDetails", houseDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [wardList, setWardList] = useState([]);
  const [propertyImagePreview, setPropertyImagePreview] = useState(null);
  const [ownershipDocumentPreview, setOwnershipDocumentPreview] =
    useState(null);

  useEffect(() => {
    // Điền dữ liệu vào form khi component được render
    console.log("price", houseDetails.price);
    if (houseDetails) {
      setValue("houseName", houseDetails.name);
      setValue("houseDescription", houseDetails.description);
      setValue("ward", houseDetails.ward);
      setValue("streetAddress", houseDetails.street);
      setValue("rentPrice", houseDetails.price);
      setValue("area", houseDetails.area);
      setValue("bedrooms", houseDetails.bedrooms);
      setValue("bathrooms", houseDetails.bathrooms);
      setValue("phoneNumber", houseDetails.phoneNumber);
      setValue("email", houseDetails.email);
      // Thêm các field khác nếu cần
    }
  }, [houseDetails, setValue]);

  useEffect(() => {
    fetchAllWard();
  }, []);
  const fetchAllWard = async () => {
    const res = await getAllWard();

    if (res && res.data && res.data.data) {
      setWardList(res.data.data);
    }
  };

  const handleImageChange = async (event, type) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "propertyImage") {
          setPropertyImagePreview(reader.result);
        } else if (type === "ownershipDocument") {
          setOwnershipDocumentPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (type === "propertyImage") {
        setPropertyImagePreview(null);
      } else if (type === "ownershipDocument") {
        setOwnershipDocumentPreview(null);
      }
    }
  };

  const onSubmit = async (data) => {
    console.log("data", data);
  };
  return (
    <Container className="content-container">
      <h1 className="text-center mb-3">Chỉnh sửa nhà trọ</h1>
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
                  isInvalid={errors.houseName}
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
                  isInvalid={errors.houseDescription}
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
                isInvalid={errors.ward}
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
                isInvalid={errors.streetAddress}
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
                isInvalid={errors.rentPrice}
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
                isInvalid={errors.area}
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
                isInvalid={errors.bedrooms}
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
                isInvalid={errors.bathrooms}
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
                type="number"
                placeholder="Nhập số điện thoại"
                {...register("phoneNumber")}
                isInvalid={errors.phoneNumber}
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
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>{" "}
          </Col>
        </Row>{" "}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="propertyImage">
              <Form.Label>Hình ảnh nhà trọ</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                {...register("propertyImage")}
                onChange={(e) => handleImageChange(e, "propertyImage")}
                isInvalid={errors.propertyImage}
              />
              {propertyImagePreview && (
                <div className="image-preview mt-2">
                  <img
                    src={propertyImagePreview}
                    alt="Property preview"
                    width="300px"
                    height="auto"
                  />
                </div>
              )}
              <Form.Control.Feedback type="invalid">
                {errors.propertyImage?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="ownershipDocument">
              <Form.Label>Giấy tờ chính chủ</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                {...register("ownershipDocument")}
                onChange={(e) => handleImageChange(e, "ownershipDocument")}
                isInvalid={errors.ownershipDocument}
              />
              {ownershipDocumentPreview && (
                <div className="image-preview mt-2">
                  <img
                    src={ownershipDocumentPreview}
                    alt="Ownership preview"
                    width="300px"
                    height="auto"
                  />
                </div>
              )}
              <Form.Control.Feedback type="invalid">
                {errors.ownershipDocument?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="mt-3 d-flex justify-content-end">
          <Button
            variant="light"
            className="mx-3"
            type="submit"
            onClick={() => navigate("/house")}
          >
            Hủy
          </Button>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Gửi thông tin
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default UpdateHouse;
