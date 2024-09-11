"use client";

import CreateBlog from '@/app/(pages)/create/page';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, CardMedia, Container, Divider, Typography } from '@mui/material';

// react/next imports
import { useParams } from "next/navigation";

const BelogsDetails = () => {
  const { id } = useParams();

  return (
<>
<CreateBlog status="edit"/>
</>
  );
};

export default BelogsDetails;
