import { Toolbar, Container } from "@mui/material";

import Navbar from "./Navbar";

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
