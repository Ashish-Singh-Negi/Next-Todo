import React from "react";

const Loader = ({ top }:{top?:number}) => {
  return (
    <div className={`absolute top-${top} text-blue-600 font-semibold dark:text-blue-200`}>
      Loading...
    </div>
  );
};

export default Loader;
