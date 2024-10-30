"use client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import React, { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage src={publicId} width={250} height={240} alt="image" />
      )}
      <CldUploadWidget
        uploadPreset="ok5avy8f"
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => <button onClick={() => open()}>Upload</button>}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
