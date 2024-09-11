"use client";
// next/react imports
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

// third party imports
import { createBlog, uploadImage } from "@/app/_api/apiService";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

// local imports
import AppLoader from "../loader/AppLoader";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

interface BlogFormProps {
  status: string;
}

interface BlogFormData {
  title: string;
  description: string;
  author: string;
  category: string;
  content: string;
  coverImage: File | null;
}

const BlogForm: React.FC<BlogFormProps> = ({ status }) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      title: "",
      description: "",
      author: "",
      category: "",
      content: "",
      coverImage: null,
    },
  });

  const heading = status === "edit" ? "Edit Blog" : "Create a New Blog";
  const btnStatus = status === "edit" ? "Update Blog" : "Publish Blog";

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Ref for file input to reset its value after form submission
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("coverImage", file); // Update form value with selected file
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    if (!data.coverImage) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", data.coverImage);

    setLoading(true); // Start loading
    try {
      const coverImage = await uploadImage(formData);
      const blogData = {
        title: data.title,
        briefContent: data.description,
        author: data.author,
        content: data.content,
        coverImage,
        category: data.category,
      };
      await createBlog(blogData);
      toast.success("Blog created successfully!");
      reset(); // Reset form after successful submission
      setSelectedFile(null); // Clear selected file state
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input value
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error creating blog. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <AppLoader loading={loading}>
      <Box sx={{ p: 4, maxWidth: "800px", margin: "50px auto 0" }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            {heading}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required." }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Blog Title"
                      variant="outlined"
                      error={!!errors.title}
                      helperText={errors.title ? errors.title.message : ""}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required." }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Description"
                      variant="outlined"
                      error={!!errors.description}
                      helperText={
                        errors.description ? errors.description.message : ""
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="author"
                  control={control}
                  rules={{ required: "Author is required." }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Author"
                      variant="outlined"
                      error={!!errors.author}
                      helperText={errors.author ? errors.author.message : ""}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required." }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Category"
                      variant="outlined"
                      error={!!errors.category}
                      helperText={
                        errors.category ? errors.category.message : ""
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Blog Content
                </Typography>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "Content is required." }}
                  render={({ field }) => (
                    <>
                      <RichTextEditor
                        id="rte"
                        controls={[
                          ["bold", "italic", "underline", "link"],
                          ["unorderedList", "h1", "h2", "h3", "h4", "h5", "h6"],
                          ["sup", "sub"],
                          ["alignLeft", "alignCenter", "alignRight"],
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {errors.content && (
                        <Typography color="error" variant="body2">
                          {errors.content.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleFileChange}
                  inputRef={fileInputRef} // Attach ref here
                  error={!!errors.coverImage}
                  helperText={
                    errors.coverImage ? "Please select a valid image file." : ""
                  }
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
                  padding: "10px 30px",
                }}
                type="submit"
              >
                {btnStatus}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </AppLoader>
  );
};

export default BlogForm;
