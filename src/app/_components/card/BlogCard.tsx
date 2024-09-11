import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  author: string;
}
const BlogCard: React.FC<BlogCardProps> = ({ image, title, description, date, author }) => {
  return (
    <Box
      sx={{
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: "8px",
        minWidth: "300px",
        m: "0 auto"
      }}
    >
      <Card>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="space-between" width="100%" px={2} pb={2}>
            <Typography variant="body2" color="text.secondary">
              {author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BlogCard;
