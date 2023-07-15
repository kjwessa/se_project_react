import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log("Rendering ProtectedRoute with props:", {
    component: Component,
    isAuthenticated,
    rest,
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("ProtectedRoute render prop called with:", props);
        if (isAuthenticated) {
          console.log("User is authenticated, rendering component");
          return <Component {...props} {...rest} />;
        } else {
          console.log("User not authenticated, redirecting to login");

          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
