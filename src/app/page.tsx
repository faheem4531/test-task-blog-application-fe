import { Box } from "@mui/material";

import Blogs from "./(pages)/blogs/page";
import Header from "./_components/header/Header";

const Home = () => {
  return (
    < Box>
      <Header />
      <Blogs />
    </Box>
  );
};

export default Home;
