"use client";
// Next/React imports
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Third-party imports
import { createBlog, updateBlog, uploadImage } from "@/app/_api/apiService";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

// Local imports
import AppLoader from "../loader/AppLoader";
import {
  FormErrors,
  ButtonStatus,
  FormHeading,
  EditorControls,
  Modes,
} from "@/app/_enums/blogEnums";

const RichTextEditor = dynamic(() => import("@mantine/rte"), { ssr: false });

interface BlogFormProps {
  mode: "edit" | "create";
  existingBlog?: IBlog;
}

interface BlogFormData {
  title: string;
  description: string;
  author: string;
  category: string;
  content: string;
  coverImage: File | null;
}

const BlogForm: React.FC<BlogFormProps> = ({ mode, existingBlog }) => {
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

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === Modes.EDIT && existingBlog) {
      setValue("title", existingBlog.title);
      setValue("description", existingBlog.briefContent);
      setValue("author", existingBlog.author);
      setValue("category", existingBlog.category);
      setValue("content", existingBlog.content);
      setSelectedFile(null);
    }
  }, [mode, existingBlog, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("coverImage", file);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    if (mode === Modes.CREATE && !data.coverImage) {
      toast.error(FormErrors.COVER_IMAGE_REQUIRED);
      return;
    }

    setLoading(true);
    try {
      let coverImageUrl = "";
      if (data.coverImage) {
        const formData = new FormData();
        formData.append("file", data.coverImage);
        coverImageUrl = await uploadImage(formData);
      } else if (mode === Modes.EDIT && existingBlog?.coverImage) {
        coverImageUrl = existingBlog.coverImage;
      }

      const blogData: IBlogPayload = {
        title: data.title,
        briefContent: data.description,
        author: data.author,
        content: data.content,
        coverImage: coverImageUrl,
        category: data.category,
      };

      if (mode === Modes.CREATE) {
        await createBlog(blogData);
        reset();
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success("Blog created successfully!");
      } else if (mode === Modes.EDIT && existingBlog) {
        await updateBlog(existingBlog._id, blogData);
        toast.success("Blog updated successfully!");
        router.back();
      }
    } catch (error) {
      console.error("Error handling blog:", error);
      toast.error(
        `Error ${
          mode === Modes.CREATE ? "creating" : "updating"
        } blog. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const renderFilePreview = () => {
    if (mode === Modes.EDIT && existingBlog?.coverImage && !selectedFile) {
      return (
        <Box mb={2}>
          <img
            src={existingBlog.coverImage}
            alt="Cover"
            style={{
              maxWidth: "200px",
              height: "auto",
              display: "block",
              marginBottom: "0.5rem",
            }}
          />
          <Typography mt={1}>Current cover image</Typography>
        </Box>
      );
    }
    if (selectedFile) {
      return (
        <Box mt={2}>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            style={{ maxWidth: "200px", height: "auto", display: "block" }}
          />
          <Typography mt={1}>Selected file: {selectedFile.name}</Typography>
        </Box>
      );
    }
    return null;
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
                <Typography variant="h6" gutterBottom>
                  Cover Image
                </Typography>
                {renderFilePreview()}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "block", marginTop: "1rem" }}
                />
                {errors.coverImage && (
                  <Typography color="error" variant="body2">
                    {FormErrors.COVER_IMAGE_REQUIRED}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Box mt={4} display="flex" justifyContent="end">
              <Button
                sx={{
                  bgcolor: "#222831",
                  color: "#f0f0f0",
                  ":hover": { bgcolor: "#444d56" },
                  p: 2,
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
