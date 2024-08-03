import React, { useContext, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ImagesContext } from "../../customHooks/ImagesContext";
import LibraryList from "./LibraryList";
import { Loading } from "../Loading";
import PropTypes from "prop-types";

const UserLibrary = memo(({ showCategory, openDrawerBottom }) => {
  const { library, l_loading } = useContext(ImagesContext);

  const navigate = useNavigate();

  const displayLibrary = (category) => () => {
    navigate(`/library?category=${category}`);
  };

  const handleCreateLibrary = () => {
    openDrawerBottom();
  };

  if (l_loading) {
    return <Loading />;
  }

  if (!library) {
    return <div>Loading...</div>;
  }

  const otherLibraries = Object.entries(library)
    .filter(([key]) => key !== "saved")
    .map(([category, images]) => ({ category, images }));

  const savedLibraries = Object.entries(library)
    .filter(([key]) => key === "saved")
    .map(([category, images]) => ({ category, images }));
  return (
    <>
      {showCategory === "saved" ? (
        <LibraryList
          libraries={savedLibraries}
          displayLibrary={displayLibrary}
          emptyMessage="No saved images"
        />
      ) : (
        <LibraryList
          libraries={otherLibraries}
          displayLibrary={displayLibrary}
          emptyMessage="No libraries created yet"
          showCreateButton
          onCreateLibrary={handleCreateLibrary}
        />
      )}
    </>
  );
});

UserLibrary.displayName = "UserLibrary";
UserLibrary.propTypes = {
  showCategory: PropTypes.string,
  openDrawerBottom: PropTypes.func,
};

export default UserLibrary;
