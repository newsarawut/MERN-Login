import React from "react";
import { Menu } from "antd";
import {
  LoginOutlined,
  PoweroffOutlined,
  HomeOutlined,
  UserAddOutlined,
  DownOutlined,
} from "@ant-design/icons";

// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
  const { SubMenu } = Menu ;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({...state}));
  console.log("user navbar", user)

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      {user && <>

        <Menu.SubMenu style={{float:"right"}} key="SubMenu" title={user.username} icon={<DownOutlined />}>
          <Menu.Item key="two" icon={<PoweroffOutlined />} onClick={logout}>
          Logout
          </Menu.Item>

        </Menu.SubMenu>

      </>}

      {!user && <>

        <Menu.Item key="login" style={{float:"right"}} icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>

      <Menu.Item key="register" style={{float:"right"}} icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Menu.Item>

      </>}

    </Menu>
  );
};

export default Navbar;
