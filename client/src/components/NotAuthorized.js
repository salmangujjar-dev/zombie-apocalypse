import Navbar from "./Navbar";
import { Toolbar, Container } from "@mui/material";

const NotAuthorized = () => {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Container>
        <h1>You are not authorized to view this page.</h1>
      </Container>
    </>
  );
};

export default NotAuthorized;
