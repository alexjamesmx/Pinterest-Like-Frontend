import React, { useContext, useState } from "react";
import { Drawer, IconButton, Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { UserContext } from "../../customHooks/UserContext";
import { ImagesContext } from "../../customHooks/ImagesContext";
import axios from "axios";
import PropTypes from "prop-types";
export const DrawerBottom = ({ openBottom, closeDrawerBottom }) => {
  const { user } = useContext(UserContext);
  const { setRefresh: setRefreshLibrary } = useContext(ImagesContext);
  const [newLibrary, setNewLibrary] = useState(null);

  const postLibrary = async () => {
    if (!newLibrary || newLibrary === "")
      toast.error("Library name is required");

    try {
      //create dinamic object with the new library name
      const data = {};
      data[newLibrary] = [];

      const url = `${process.env.REACT_APP_BACK_API}/users/${user._id}/categories`;
      axios
        .post(url, {
          category: data,
        })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.message.includes("updated")) {
              toast.info("Library already exists");
            } else {
              toast.success("Library created successfully");
              setRefreshLibrary((prev) => !prev);
              closeDrawerBottom();
            }
          }
        })
        .catch((error) => {
          console.error("Error creating library:", error);
        });
    } catch (error) {
      console.error("Error creating library:", error);
    }
  };

  return (
    <Drawer
      placement="bottom"
      open={openBottom}
      onClose={closeDrawerBottom}
      className="p-4"
    >
      <div className="mb-6 flex items-center justify-center">
        <p>Give a name to your library</p>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={closeDrawerBottom}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div className="flex gap-2 justify-center">
        <div className="w-1/2 flex gap-2">
          <Input
            label="library"
            onChange={(e) => setNewLibrary(e.target.value)}
          />
          <Button size="sm" onClick={() => postLibrary()}>
            Crear
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

DrawerBottom.propTypes = {
  openBottom: PropTypes.bool,
  closeDrawerBottom: PropTypes.func,
};
