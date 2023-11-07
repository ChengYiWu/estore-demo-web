import UploadedFile from "./UploadedFile";

type MutipleFileUpload = {
  oriImageIds: string[];
  newImages: UploadedFile[];
};

type SingleFileUpload = {
  oriImageId: string | null;
  newImage: UploadedFile | null;
};

export type { MutipleFileUpload, SingleFileUpload };
