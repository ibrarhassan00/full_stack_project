// import * as React from "react";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import axios from "axios"

export default function UploadAvatars({profileImage}) {
  const [avatarSrc, setAvatarSrc] = React.useState(undefined);

useEffect(()=>{
setAvatarSrc(profileImage)
},[profileImage])

  const handleAvatarChange = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        // Read the file as a data URL
        const reader = new FileReader();
        reader.onload = () => {
          setAvatarSrc(reader.result);
        };
        reader.readAsDataURL(file);
      }

      const formData = new FormData();
      formData.append("profileImage", file);
      const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/profileImage/upload`;
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("uid")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ButtonBase
      component="label"
      role={undefined}
      tabIndex={-1} // prevent label from tab focus
      aria-label="Avatar image"
      sx={{
        borderRadius: "40px",
        "&:has(:focus-visible)": {
          outline: "2px solid",
          outlineOffset: "2px",
        },
      }}
    >
      <Avatar alt="Upload new avatar" src={avatarSrc} />
      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: "rect(0 0 0 0)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          whiteSpace: "nowrap",
          width: "1px",
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}
