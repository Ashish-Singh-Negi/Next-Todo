import React from "react";

const Loader = ({ top }:{top?:number}) => {
  return (
    <div className={`absolute top-${top} text-blue-600 font-semibold`}>
      Loading...
    </div>
  );
};

export default Loader;
