import { Container, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";

const Home = () => {
  console.log("Home Component");
  return (
    <>
      <Navbar />
      <Toolbar />
      <Container>
        <h1>Home</h1>
      </Container>
    </>
  );
};

export default Home;
