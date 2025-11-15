import axiosClient from "./axios-client";

export const uploadService = {
  upload(file: File) {
    console.log("hi");
    const formData = new FormData();
    formData.append('image', file);
    return axiosClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
