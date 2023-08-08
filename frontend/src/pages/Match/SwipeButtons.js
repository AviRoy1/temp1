import React from "react";
import "./SwipeButtons.css";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import IconButton from "@mui/material/IconButton";

const SwipeButtons = () => {
  return (
    <div className="swipeButtons">
      <IconButton className="swipeButtons__repeat">
        <VisibilityRoundedIcon fontSize="large" />
      </IconButton>

      <IconButton className="swipeButtons__left">
        <CloseIcon fontSize="large" />
      </IconButton>

      <IconButton className="swipeButtons__right">
        <FavoriteIcon fontSize="large" />
      </IconButton>

      <IconButton className="swipeButtons__lightning">
        <FlashOnIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
