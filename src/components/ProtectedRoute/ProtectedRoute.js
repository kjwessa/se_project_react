import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children, ...props }) {
  console.log("Protected Route: rendering protected route.");
  const { isLoggedIn } = useContext(CurrentUserContext);

  return <Route {...props}>{isLoggedIn ? children : <Redirect to="/" />}</Route>;
}

export default ProtectedRoute;
