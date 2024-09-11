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
import {
  FormErrors,
  ButtonStatus,
  FormHeading,
  EditorControls,
  Modes,
} from "@/app/_enums/blogEnums";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

interface BlogFormProps {
  mode: "edit" | "create";
}

interface BlogFormData {
  title: string;
  description: string;
  author: string;
  category: string;
  content: string;
  coverImage: File | null;
}

const BlogForm: React.FC<BlogFormProps> = ({ mode }) => {
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

  const heading = mode === Modes.EDIT ? FormHeading.EDIT : FormHeading.CREATE;
  const btnStatus =
    mode === Modes.EDIT ? ButtonStatus.EDIT : ButtonStatus.CREATE;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("coverImage", file);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    if (!data.coverImage) {
      toast.error(FormErrors.COVER_IMAGE_REQUIRED);
      return;
    }

    const formData = new FormData();
    formData.append("file", data.coverImage);

    setLoading(true); // Start loading
    try {
      const coverImage = await uploadImage(formData);
      const blogData: IBlogPayload = {
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
                  rules={{ required: FormErrors.TITLE_REQUIRED }}
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
                  rules={{ required: FormErrors.DESCRIPTION_REQUIRED }}
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
                  rules={{ required: FormErrors.AUTHOR_REQUIRED }}
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
                  rules={{ required: FormErrors.CATEGORY_REQUIRED }}
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
                  rules={{ required: FormErrors.CONTENT_REQUIRED }}
                  render={({ field }) => (
                    <>
                      <RichTextEditor
                        id="rte"
                        controls={[
                          [
                            EditorControls.BOLD,
                            EditorControls.ITALIC,
                            EditorControls.UNDERLINE,
                            EditorControls.LINK,
                          ],
                          [
                            EditorControls.UNORDERED_LIST,
                            EditorControls.H1,
                            EditorControls.H2,
                            EditorControls.H3,
                            EditorControls.H4,
                            EditorControls.H5,
                            EditorControls.H6,
                          ],
                          [EditorControls.SUP, EditorControls.SUB],
                          [
                            EditorControls.ALIGN_LEFT,
                            EditorControls.ALIGN_CENTER,
                            EditorControls.ALIGN_RIGHT,
                          ],
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
                    errors.coverImage ? FormErrors.COVER_IMAGE_REQUIRED : ""
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
