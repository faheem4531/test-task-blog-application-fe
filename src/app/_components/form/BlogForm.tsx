'use client'

import { createBlog, uploadImage } from '@/app/_api/apiService';
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const heading = status === "edit" ? "Edit Blog" : "Create a New Blog";
  const btnStatus = status === "edit" ? "Update Blog" : "Publish Blog";

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const coverImage = await uploadImage(formData)
      const blogData = {
        title,
        briefContent: description,
        author,
        content,
        coverImage,
        category
      };
      await createBlog(blogData);
      toast.success("Blog created successfully!");
      setTitle("")
      setDescription("")
      setAuthor("")
      setContent("")
      setCategory("")
      setSelectedFile(null)
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


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
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
                ["bold", "italic", "underline", "link"],
                ["unorderedList", "h1", "h2", "h3", "h4", "h5", "h6"],
                ["sup", "sub"],
                ["alignLeft", "alignCenter", "alignRight"],
              ]}
              value={content}
              onChange={setContent}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <Typography mt={2}>
                Selected file: {selectedFile.name}
              </Typography>
            )}
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
