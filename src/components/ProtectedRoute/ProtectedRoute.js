import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children, ...props }) {
  console.log("Protected Route: rendering protected route.");
  const { isLoggedIn } = useContext(CurrentUserContext);

  return <Route {...props}>{isLoggedIn ? children : <Redirect to="/" />}</Route>;
}

export default ProtectedRoute;

//TODO Submission: remove code below
// const ProtectedRoute = ({
//   component: Component,
//   isAuthenticated,
//   cards,
//   onAddNewClick,
//   onCardClick,
//   onCardLike,
//   handleSetUserNull,
//   onEditProfileOpen,
//   onSignOut,
// }) => {
//   console.log("Protected Route: rendering protected route.");

//   return (
//     <Route
//       render={(props) =>
//         isAuthenticated ? (
//           <Component
//             cards={cards}
//             onAddNewClick={onAddNewClick}
//             onCardClick={onCardClick}
//             onCardLike={onCardLike}
//             handleSetUserNull={handleSetUserNull}
//             onEditProfileOpen={onEditProfileOpen}
//             onSignOut={onSignOut}
//           />
//         ) : (
//           <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//         )
//       }
//     />
//   );
// };
