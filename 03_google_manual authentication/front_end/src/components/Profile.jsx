import { Logout } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import httpAction from "../utils/httpAction";
import apis from "../utils/apis";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const data = {
        url: apis().userProfile,
      };
      const response = await httpAction(data);
      console.log(response);
      setUser(response.data);
    };
    getUser();
  }, []);

  const logoutHandler = async () => {
    try {
      const data = {
        url: apis().userLogout,
      };
      const response = await httpAction(data);

      if (response.status) {
        toast.success("Logout");
        navigate("/login");
      }
    } catch (error) {
      console.error("User_Logout failed:", error.message);
    }
  };
  return (
    <div className="auth_card">
      <div className="profile_container">
        <span className="name">
          <Avatar
            sx={{ backgroundColor: "orange", textTransform: "capitalize" }}
          >
            a
          </Avatar>
        </span>
        <span className="full_name">{user.name}</span>
        <span className="email">{user.email}</span>
      </div>
      <div className="col-12">
        <Button
          onClick={() => {
            logoutHandler();
          }}
          endIcon={<Logout />}
          variant="contained"
          fullWidth
          size="small"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
