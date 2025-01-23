import React from 'react'

const Loading = () => {
  return (
    <div
      className="loading-component"
      style={{ width: "100%", height: "100%",display:"flex",justifyContent:"center",alignItems:"center" }}
    >
      <i
        className="fa-solid fa-pizza-slice fa-fade"
        style={{ color: " #D2411E", fontSize: "5rem" }}
      ></i>
      {/* #D2411E */}
    </div>
  );
}

export default Loading