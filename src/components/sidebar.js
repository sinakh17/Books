import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
import "./sidebar.css";
import Navigation from "./Navigation";

const Sidebar = () => {
  const [isOpen, setisOpen] = useState();
  const closeHandler = () => {
    setisOpen(false);
  };
  const handleStateChange = (state) => {
    setisOpen(state.isOpen);
  };
  return (
    <Menu isOpen={isOpen} onStateChange={(state) => handleStateChange(state)}>
      <Navigation onclose={closeHandler} />
    </Menu>
  );
};

export default Sidebar;
