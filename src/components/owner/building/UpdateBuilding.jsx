import { useEffect, useState } from "react";
import { Form, Row, Col, Container, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../../styles/CreateNewHouse.scss";
import { getAllWard } from "../../../service/wardService";
import { useLocation, useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Tên toà nhà không được để trống!"),
  description: yup.string().required("Mô tả không được để trống!"),
  ward: yup.string().required("Phường/Xã không được để trống!"),
  streetAddress: yup
    .string()
    .required("Số nhà, Tên đường không được để trống!"),
  yearBuilt: yup
    .number()
    .typeError("Năm xây dựng không được để trống!")
    .integer("Năm xây dựng phải là số nguyên!")
    .positive("Năm xây dựng phải là số dương!"),
  numberOfFloors: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Số tầng không được để trống!")
    .integer("Số tầng phải là số nguyên!")
    .positive("Số tầng phải là số dương!"),
  area: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Diện tích không được để trống!")
    .positive("Diện tích phải là số dương!"),
  longitude: yup.number().typeError("Kinh độ không được để trống!"),
  latitude: yup.number().typeError("Vĩ độ không được để trống!"),
  status: yup.string().required("Trạng thái không được để trống!"),
  ownerRepresent: yup.string().required("Chủ sỡ hữu không được để trống!"),
  avatar: yup
    .mixed()
    .required("Vui lòng chọn hình ảnh toà nhà!")
    .test("fileType", "Vui lòng chọn ảnh PNG hoặc JPG!", (value) => {
      return (
        value && value[0] && ["image/png", "image/jpeg"].includes(value[0].type)
      );
    })
    .test("fileSize", "Dung lượng ảnh phải nhỏ hơn 5MB!", (value) => {
      return value && value[0] && value[0].size <= 5 * 1024 * 1024;
    }),
});

const UpdateBuilding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buildingDetails = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [wardList, setWardList] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (buildingDetails) {
      setValue("name", buildingDetails.name);
      setValue("description", buildingDetails.description);
      setValue("ward", buildingDetails.ward);
      setValue("streetAddress", buildingDetails.address);
      setValue("yearBuilt", buildingDetails.yearBuilt);
      setValue("numberOfFloors", buildingDetails.numberOfFloors);
      setValue("area", buildingDetails.area);
      setValue("longitude", buildingDetails.longitude);
      setValue("latitude", buildingDetails.latitude);
      setValue("status", buildingDetails.status);
      setValue("ownerRepresent", buildingDetails.ownerRepresent);
      setValue("avatar", buildingDetails.avatar);
      // Thêm các trường khác nếu cần
    }
  }, [buildingDetails, setValue]);

  useEffect(() => {
    fetchAllWard();
  }, []);

  const fetchAllWard = async () => {
    const res = await getAllWard();

    if (res && res.data && res.data.data) {
      setWardList(res.data.data);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  const onSubmit = async (data) => {
    console.log("data", data);
  };
  return (
    <Container className="content-container">
      <h1 className="text-center mb-3">Chỉnh sửa toà nhà</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="name">
              <Form.Label>Tên toà nhà</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên toà nhà"
                  {...register("name")}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
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
                  placeholder="Mô tả toà nhà của bạn"
                  {...register("description")}
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
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
            <Form.Group controlId="yearBuilt">
              <Form.Label>Năm xây dựng</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập năm xây dựng"
                {...register("yearBuilt")}
                isInvalid={errors.yearBuilt}
              />
              <Form.Control.Feedback type="invalid">
                {errors.yearBuilt?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="numberOfFloors">
              <Form.Label>Số tầng</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số tầng"
                {...register("numberOfFloors")}
                defaultValue={0}
                isInvalid={errors.numberOfFloors}
              />
              <Form.Control.Feedback type="invalid">
                {errors.numberOfFloors?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
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
          <Col md={4}>
            <Form.Group controlId="longitude">
              <Form.Label>Kinh độ</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập kinh độ"
                {...register("longitude")}
                isInvalid={errors.longitude}
              />
              <Form.Control.Feedback type="invalid">
                {errors.longitude?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="latitude">
              <Form.Label>Vĩ độ</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập vĩ độ"
                {...register("latitude")}
                isInvalid={errors.latitude}
              />
              <Form.Control.Feedback type="invalid">
                {errors.latitude?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control
                as="select"
                {...register("status")}
                isInvalid={errors.status}
              >
                <option value="">Chọn trạng thái</option>
                <option value="Đã thuê">Đã thuê</option>
                <option value="Chưa thuê">Chưa thuê</option>
                <option value="Bảo trì">Bảo trì</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.status?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="ownerRepresent">
              <Form.Label>Chủ sỡ hữu</Form.Label>
              <Form.Control
                as="select"
                {...register("ownerRepresent")}
                isInvalid={errors.ownerRepresent}
              >
                <option value="">Chọn tên chủ sở hữu</option>
                <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                <option value="Thanh Lịch">Thanh Lịch</option>
                <option value="Minh Quang">Minh Quang</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>{" "}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="avatar">
              <Form.Label>Hình ảnh toà nhà</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                {...register("avatar")}
                onChange={(e) => handleAvatarChange(e)}
                isInvalid={errors.avatar}
              />
              {avatarPreview && (
                <div className="image-preview mt-2">
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    width="200px"
                    height="auto"
                  />
                </div>
              )}
              <Form.Control.Feedback type="invalid">
                {errors.avatar?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="mt-3 d-flex justify-content-end">
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Gửi thông tin
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default UpdateBuilding;
