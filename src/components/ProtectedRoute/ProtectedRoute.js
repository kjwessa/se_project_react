import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  cards,
  onAddNewClick,
  onCardClick,
  onCardLike,
  handleSetUserNull,
  onEditProfileOpen,
  onSignOut,
}) => {
  console.log("Protected Route: rendering protected route.");

  return (
    <Route
      render={(props) =>
        isAuthenticated ? (
          <Component
            cards={cards}
            onAddNewClick={onAddNewClick}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            handleSetUserNull={handleSetUserNull}
            onEditProfileOpen={onEditProfileOpen}
            onSignOut={onSignOut}
          />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
