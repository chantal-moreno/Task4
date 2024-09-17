import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';

function AdminPanel() {
  // const server = 'http://localhost:3000';
  // const configuration = {
  //   method: 'get',
  //   url: `${server}/admin-panel`,
  // };
  // axios(configuration)
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.error(
  //       'Error:',
  //       error.response ? error.response.data : error.message
  //     );
  //   });
  return (
    <Container>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Admin Panel</h1>
        </Col>
        <Col md="auto" xs="auto">
          <Form.Text>Hello, Name!</Form.Text> <a href="#">Logout</a>
        </Col>
      </Row>
      <Button variant="secondary" size="sm">
        Block
      </Button>{' '}
      <Button variant="success" size="sm">
        Unlock
      </Button>{' '}
      <Button variant="danger" size="sm">
        Delete
      </Button>
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@mdo</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>@mdo</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPanel;
