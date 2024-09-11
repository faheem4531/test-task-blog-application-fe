// Enums for form errors
export enum FormErrors {
  TITLE_REQUIRED = "Title is required.",
  DESCRIPTION_REQUIRED = "Description is required.",
  AUTHOR_REQUIRED = "Author is required.",
  CATEGORY_REQUIRED = "Category is required.",
  CONTENT_REQUIRED = "Content is required.",
  COVER_IMAGE_REQUIRED = "Please select a valid image file.",
}

// Enum for button status
export enum ButtonStatus {
  EDIT = "Update Blog",
  CREATE = "Publish Blog",
}

// Enum for headings
export enum FormHeading {
  EDIT = "Edit Blog",
  CREATE = "Create a New Blog",
}

// Enum for form modes
export enum Modes {
  EDIT = "edit",
  CREATE = "create",
}

// Enum for editor controls
export enum EditorControls {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  LINK = "link",
  UNORDERED_LIST = "unorderedList",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  SUP = "sup",
  SUB = "sub",
  ALIGN_LEFT = "alignLeft",
  ALIGN_CENTER = "alignCenter",
  ALIGN_RIGHT = "alignRight",
}
