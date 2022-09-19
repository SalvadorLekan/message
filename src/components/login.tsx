import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { broadCastChannel } from "context/store";
import { Formik } from "formik";
import { useAppDispatch } from "hooks/store";
import { useCallback } from "react";
import { login } from "store/slices/user";
import { object, string } from "yup";

const initialValues = {
  name: "",
};

const validationSchema = object({
  name: string().required("Name is required"),
});

export default function Login() {
  const dispatch = useAppDispatch();

  const logIn = useCallback(
    (user: User) => {
      dispatch(login(user));
    },
    [dispatch]
  );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          values.name = values.name.toLocaleLowerCase().trim();
          if (!values.name) {
            setFieldError("name", "Name is required");
          } else {
            broadCastChannel.postMessage({
              id: (Date.now() * Math.random()).toString(36),
              sender: values.name,
              text: "Joined",
              time: Date.now(),
              type: "join",
            } as Message);
            logIn(values);
          }
        }}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Box
            sx={{
              width: "100%",
              mx: "auto",
              maxWidth: "400px",
            }}
            component="form"
            onSubmit={handleSubmit}>
            <Typography variant="h5" component="h1">
              Login
            </Typography>
            <TextField
              size="small"
              label="Username"
              name="name"
              margin="normal"
              fullWidth
              helperText={touched.name && errors.name}
              error={touched.name && Boolean(errors.name)}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Login
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
}
