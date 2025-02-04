import { SignIn } from "@clerk/nextjs";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Page() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignIn />
      </Box>
    </Container>
  );
}
