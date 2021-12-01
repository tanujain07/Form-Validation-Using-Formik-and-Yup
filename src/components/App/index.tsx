import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

import FormikField from "../FormikField";
import FormikSelect, { FormikSelectItem } from "../FormikSelect";

import "./App.css";

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordconfirm: string;
  position: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  passwordconfirm: "",
  position: "",
};

const positionItems: FormikSelectItem[] = [
  {
    label: "Front End",
    value: "front_end",
  },
  {
    label: "Back End",
    value: "back_end",
  },
  {
    label: "Dev Ops",
    value: "dev_ops",
  },
  {
    label: "QA",
    value: "qa",
  },
];

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  email: Yup.string()
    .email("Must be a Valid Email")
    .required("Email is Required"),
  password: Yup.string()
  
  .matches(/(?=.*[a-z])/ , 'lowerCase alphabet is requird!')
  .matches(/(?=.*[A-Z])/ , 'atleast one uppercase character is required!!')
  .matches(/(?=.*[0-9])/, 'atleast one numeric character is required!!')
  .matches(/(?=.*[!@#$%^&*])/, "atleast one special character is required!!")
  .min(8, 'Minimum 8 Characters are required!!')
  .required("Password is Required"),
  passwordconfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Password should match")
    .required("Confirm Password is Required"),
  position: Yup.string().required("Required"),
});

const App: React.FC = () => {
  const handleSubmit = (values: FormValues): void => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <FormikField name="name" label="Name" required />
              <FormikField name="email" label="Email" required />
              <FormikField
                name="password"
                label="Password"
                required
                type="password"
              />
              <FormikField
                name="passwordconfirm"
                label="Confirm Password"
                required
                type="password"
              />
              <FormikSelect
                name="position"
                items={positionItems}
                label="Position"
                required
              />

              <Button
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                type="submit"
              >
                Primary
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;
