import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import authActions from "../../redux/actions/auth.actions";
import userActions from "../../redux/actions/user.actions";
import logo from "../../images/logo.png";
import messageActions from "../../redux/actions/message.actions";

const AuthLinks = ({ name }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          {name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(authActions.logout())}>
            Logout
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/profile/myorders">
            My Orders
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};
const AdminLinks = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const { messages } = message;
  const numNewMessages = messages.reduce((acc, mes) => {
    console.log(mes);
    return !mes.isRead ? (acc += 1) : acc;
  }, 0);
  console.log(numNewMessages);
  useEffect(() => {
    dispatch(messageActions.getAllMessages());
  }, [dispatch]);
  return (
    <>
      <li>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Manage
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/admin/product/create">
              Create Product
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin/product/list">
              List Products
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin/order/list">
              List Orders
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li>
        <Link to="/admin/message/list">
          <i className="far fa-envelope relative fa-2x">
            <div
              className={`absolute bg-red-800 w-2 h-2 rounded-full inset-1/2 ${
                numNewMessages ? "animate-ping" : "d-none"
              }`}
            ></div>
          </i>
        </Link>
      </li>
    </>
  );
};
const GuestLinks = () => {
  return (
    <>
      <Link to="/login">
        <li className="navbar-nav-link border-r border-green-300 pr-2 hover:text-gray-400">
          <i className="fas fa-sign-in-alt mr-2"></i>Sign In
        </li>
      </Link>
      <Link to="/register">
        <li className="navbar-nav-link border-r border-green-300 pr-2 hover:text-gray-400">
          Register
        </li>
      </Link>
    </>
  );
};

const PublicNavbar = () => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, token } = auth;
  const user = useSelector((state) => state.user.userInfo);
  const cart = useSelector((state) => state.order.cart);

  const loading = useSelector((state) => state.user.loading);

  const { role, name } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && token) dispatch(userActions.getCurrentUser());
  }, [dispatch, isAuthenticated, token]);
  return (
    <div className="h-52 bg-white w-full grid grid-flow-row auto-rows-min	grid-cols-3 text-gray-700  justify-center px-4 relative  md:h-64">
      <ul className="row-span-1 col-span-3">
        <div className="flex space-x-3 pt-2 items-center font-light">
          {isAuthenticated ? <AuthLinks name={name} /> : <GuestLinks />}
          {role === "admin" && isAuthenticated && <AdminLinks />}
          <li className="mr-auto">
            <SearchBar />
          </li>
          <li className="justify-self-end">
            <Link to="/cart">
              <div className="flex space-x-3 pt-2 items-center font-light">
                <i className="fas fa-shopping-cart hover:text-gray-400 relative">
                  <div className="flex items-center justify-center bg-red-600 text-white p-2 text-xs border border-white h-4 w-4 rounded-full absolute -right-3 -top-2">
                    {cart.length}
                  </div>
                </i>
              </div>
            </Link>
          </li>
        </div>
      </ul>
      <Link
        className="row-start-2 col-start-2 flex justify-self-center align-self-start mx-auto flex-shrink-0"
        to="/"
      >
        <div>
          <img src={logo} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default PublicNavbar;
