import { Button, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <Typography.Title level={2}>Profile</Typography.Title>
      {/* TEMPORARY FOR TESTING */}
      <Button>
        <Link to="/dashboard/profile/edit-profile">Edit Profile</Link>
      </Button>
    </div>
  );
};

export default Profile;
