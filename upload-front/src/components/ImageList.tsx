import React from "react";

export type ImageItem = {
  id: number;
  filename: string;
  url: string;
};

export default function ImageList({ images }: { images: ImageItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {images.map((img) => (
        <div key={img.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={img.url} alt={img.filename} className="w-full h-48 object-cover rounded mb-2" />
          <div className="font-semibold text-gray-800">{img.filename}</div>
          <div className="text-xs text-gray-500">ID: {img.id}</div>
        </div>
      ))}
    </div>
  );
}
