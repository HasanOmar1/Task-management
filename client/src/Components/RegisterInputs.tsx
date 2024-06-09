import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useCreateUserMutation } from "../api/usersApi";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setShowModal } from "../redux/loginModal";

export default function RegisterInputs() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [createUser, { error, isSuccess }] = useCreateUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess]);

  const handleCloseModal = () => {
    dispatch(setShowModal());
  };

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser({
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    });
  };

  return (
    <>
      {error && <p id="err">User already Exists</p>}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleCreateUser}
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          id="submit-btn"
          type="submit"
        >
          Sign up
        </Button>
      </Box>
    </>
  );
}
