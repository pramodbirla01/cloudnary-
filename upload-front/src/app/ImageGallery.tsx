"use client";
import React, { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import ImageList, { ImageItem } from "../components/ImageList";
import { fetchImages } from "../api/upload";

export default function ImageGallery() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const loadImages = async () => {
    const data = await fetchImages();
    setImages(data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <UploadForm onUpload={loadImages} />
      <ImageList images={images} />
    </div>
  );
}
