import { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
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
        setUsers(result.data.users);
      })
      .catch((error) => {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message
        );
      });
  }, []);
  return (
    <Container className="d-flex flex-column">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Admin Panel</h1>
        </Col>
        <Col md="auto" xs="auto">
          <Form.Text>Hello, Name!</Form.Text> <a href="#">Logout</a>
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
