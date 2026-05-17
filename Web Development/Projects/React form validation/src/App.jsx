import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";

function App() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username...",
      errorMessages:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email...",
      errorMessages: "It should be a valid email address",
      label: "Email",
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday...",
      errorMessages: "",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password...",
      errorMessages:
        "Password should be 8-20 characters and iclude at least 1 letter, 1 number and 1 special character",
      label: "Password",
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "ConfirmPassword...",
      errorMessages: "Passwords don't match",
      label: "ConfirmPassword",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (values) {
    console.log(values);
  }

  return (
    <>
      <div className="app">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            );
          })}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
