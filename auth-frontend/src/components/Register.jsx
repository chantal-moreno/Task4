import { useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import InputField from './InputField';
function Register() {
  // Status for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    password: '',
  });

  // Status for validation errors
  const [errors, setErrors] = useState({});

  // Handling changes in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form
  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName.trim()) {
      formErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Last Name is required';
    }
    if (!formData.position) {
      formErrors.position = 'Position is required';
    }
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    }
    return formErrors;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted', formData);
      // Send to server!
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <h1 className="mb-5">Create an Account</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputField
              label="First Name"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName}
            />
          </Col>
          <Col>
            <InputField
              label="Last Name"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName}
            />
          </Col>
        </Row>

        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Position
          </InputGroup.Text>
          <Form.Select
            name="position"
            className={`form-select ${errors.position ? 'is-invalid' : ''}`}
            aria-label="Default select example"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="">Select position</option>
            <option value="1">Manager</option>
            <option value="2">Developer</option>
            <option value="3">Designer</option>
            <option value="4">QA</option>
            <option value="5">Other</option>
          </Form.Select>
          {errors.position && (
            <div className="invalid-feedback">{errors.position}</div>
          )}
        </InputGroup>

        <InputField
          label="Email"
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />

        <Button className="w-50 mb-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Form.Text className="mb-3">Already have an account? </Form.Text>
      <a href="#">Sign In</a>
    </>
  );
}

export default Register;
