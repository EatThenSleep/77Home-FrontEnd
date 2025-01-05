import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Spinner,
  Form,
  Pagination,
} from "react-bootstrap";
import { getAllUsers } from "../../../service/userService";
import SidebarAdmin from "./SideBarAdmin";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Thêm state cho search và pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.DT);
      setLoading(false);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  // Xử lý tìm kiếm
  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.citizenNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Xử lý chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Component phân trang
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="justify-content-center mt-3">
        <Pagination.Item
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </Pagination.Item>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          // Chỉ hiển thị trang hiện tại và trang kế tiếp
          if (pageNumber === currentPage || pageNumber === currentPage + 1) {
            return (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          }
          return null;
        })}

        <Pagination.Item
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </Pagination.Item>
      </Pagination>
    );
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className={`${styles["d-flex"]} m-2`}>
      <SidebarAdmin />
      <div className={styles["main-content"]}>
        <Container fluid>
          {/* Search Bar */}
          <Card className="mb-4">
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Search by email, name, or citizen number..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset về trang 1 khi search
                    }}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Users Table */}
          <Card className={styles.card}>
            <Card.Header className={styles["card-header"]}>
              <h5 className="mb-0">Users List</h5>
              <Button variant="primary" size="sm">
                Add New User
              </Button>
            </Card.Header>
            <Card.Body className={styles["card-body"]}>
              <Table responsive hover className={styles.table}>
                <thead>
                  <tr>
                    <th>Citizen Number</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.citizenNumber}>
                      <td>{user.citizenNumber}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge
                          bg={
                            user.user_roles?.[0]?.role?.name === "Admin"
                              ? "primary"
                              : user.user_roles?.[0]?.role?.name === "Owner"
                              ? "success"
                              : "info"
                          }
                          className={styles.badge}
                        >
                          {user.user_roles?.[0]?.role?.name || "N/A"}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="primary"
                          className={`${styles["btn-sm"]} me-2`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          className={styles["btn-sm"]}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination */}
              {renderPagination()}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
