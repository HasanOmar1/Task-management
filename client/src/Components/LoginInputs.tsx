import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "40ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="email" label="Email" variant="outlined" />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
      />
    </Box>
  );
}
