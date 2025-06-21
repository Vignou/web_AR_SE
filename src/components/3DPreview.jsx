import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function ModelPreview({ fileUrl }) {
  const { scene } = useGLTF(fileUrl);
  return (
    <Canvas>
      <primitive object={scene} />
    </Canvas>
  );
}

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFile(url);
    }
  };

  return (
    <div className="relative mb-4">
      <label htmlFor="file-upload" className="leading-7 text-sm text-gray-600">
        Upload File
      </label>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="w-full bg-white rounded focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out"
        onChange={handleFileChange}
      />
      {file && <ModelPreview fileUrl={file} />}
    </div>
  );
}

export default FileUpload;
