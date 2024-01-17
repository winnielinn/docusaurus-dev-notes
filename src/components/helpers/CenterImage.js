import React from "react";

const CenterImage = ({ src }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
    >
      <img src={src} width="auto" style={{ margin: "0 auto" }} />
    </div>
  );
};

export default CenterImage;
