import { Box, Typography } from "@mui/material";
import Link from 'next/link';

const Header = () => {
  return (
    <Box sx={{
      padding: "30px 50px",
      display: "flex",
      justifyContent: "end",
      gap: "30px",
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      width: "100%",
    }}>
      <Link href="/blogs">
        <Typography
          sx={{
            transition: 'all 0.3s ease',
            fontSize: "20px",
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >Blogs</Typography>
      </Link>
      <Link href="/create">
        <Typography
          sx={{
            transition: 'all 0.3s ease',
            fontSize: "20px",
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >Create</Typography>
      </Link>
    </Box>
  );
};

export default Header;
