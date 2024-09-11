'use client'
// import RichTextEditor from "@mantine/rte";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

// import { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

interface BlogFormProps {
  status: string
}
const BlogForm: React.FC<BlogFormProps> = ({ status }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const heading = status === "edit" ? "Edit Blog" : "Create a New Blog";
  const btnStatus = status === "edit" ? "Update Blog" : "Publish Blog";

  const handleSubmit = () => {
    const blogData = {
      title,
      description,
      author,
      content,
    };
    console.log("Submitted Blog Data:", blogData);
    
    alert("Blog submitted successfully! Check console for details.");

    setTitle("")
    setDescription("")
    setAuthor("")
    setContent("")
  };

  // const ImageHandler = () => {
  //   const handleImageUpload = () => {
  //     // Implement image upload logic here
  //   };

  //   Quill.register('modules/imageHandler', {
  //     handleImageUpload
  //   });

  //   return null;
  // };

  return (
    <Box sx={{ p: 4, maxWidth: "800px", margin: "50px auto 0" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          {heading}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Blog Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Blog Content
            </Typography>
            <RichTextEditor
              id="rte"
              controls={[
                ["bold", "italic", "underline", "link", "image"],
                ["unorderedList", "h1", "h2", "h3", "h4", "h5", "h6"],
                ["sup", "sub"],
                ["alignLeft", "alignCenter", "alignRight"],
              ]}
              value={content}
              onChange={setContent}
            />
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="end">
          <Button
            sx={{
              bgcolor: "#222831",
              color: "#f3f3f3",
              fontSize: "16px",
              padding: "10px 30px"
            }}
            disabled={!title || !author || !description || !content}
            onClick={handleSubmit}
          >
           {btnStatus}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BlogForm;
