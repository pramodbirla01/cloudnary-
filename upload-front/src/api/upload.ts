import axios from "axios";

const API_URL = "http://localhost:5000/api";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return res.data;
}

export async function fetchImages() {
  const res = await axios.get(`${API_URL}/uploads`, { withCredentials: true });
  return res.data;
}
