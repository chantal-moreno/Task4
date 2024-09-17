import { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get token from Local Storage
    const token = localStorage.getItem('token');

    const server = 'http://localhost:3000';
    const configuration = {
      method: 'get',
      url: `${server}/admin-panel`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
        // Change lastLogin
        const formattedUsers = result.data.users.map((user) => ({
          ...user,
          lastLogin: new Date(user.lastLogin).toLocaleString(),
        }));
        setUsers(formattedUsers);
      })
      .catch((error) => {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message
        );
      });
  }, []);

  //Logout
  const navigate = useNavigate();
  const handleLogout = () => {
    // Delete token from localStorage
    localStorage.removeItem('token');
    navigate('/sign-in');
  };
  return (
    <Container className="d-flex flex-column mt-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Admin Panel</h1>
        </Col>
        <Col md="auto" xs="auto">
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </Col>
      </Row>
      <div className="d-flex flex-lg-row gap-1">
        <Button variant="secondary" size="sm">
          Block
        </Button>
        <Button variant="success" size="sm">
          Unlock
        </Button>
        <Button variant="danger" size="sm">
          Delete
        </Button>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>
              <Form.Check />
            </th>
            <th>Name</th>
            <th>Position</th>
            <th>E-mail</th>
            <th>Last login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Form.Check />
              </td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.position}</td>
              <td>{user.email}</td>
              <td>{user.lastLogin}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPanel;
