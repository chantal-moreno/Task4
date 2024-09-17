import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import InputField from './InputField';

function SignIn() {
  // Status for form fields
  const [formData, setFormData] = useState({
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
      <h1 className="mb-5">Sign In</h1>
      <Form onSubmit={handleSubmit}>
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
      <Form.Text className="mb-3">Don&apos;t have an account? </Form.Text>
      <a href="#">Create your account</a>
    </>
  );
}

export default SignIn;
