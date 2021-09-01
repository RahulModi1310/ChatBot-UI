import React from "react";

import classes from "./IsLoading.module.css";

const IsLoading = (props) => {
  return (
    <React.Fragment>
      <div className={classes.stage}>
        <div className={classes.dotpulse}></div>
      </div>
    </React.Fragment>
  );
};

export default IsLoading;
