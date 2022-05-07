import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const data = localStorage.getItem("accessToken");
  const arr = [
    {
      title: "Wallet",
      hef: "/",
    },
    {
      title: "Profile",
      hef: "/profile",
    },
  ];
  const logoutBtn = () => {
    localStorage.clear("accessToken");
    return navigate("/login");
  };
  return (
    <header class="header-component">
      <div className="header-container">
        <div className="header-logo">
          <img src="http://www.ansonika.com/udema/img/logo.png" />
        </div>
        <div className="header-navbar">
          <ul className="header-navbar-list">
            {arr.map((e, index) => {
              return (
                <a href={e.hef} className="header-list-item" key={index}>
                  {e?.title}
                </a>
              );
            })}
            {data ? (
              <a className="header-list-item" onClick={() => logoutBtn()}>
                logout
              </a>
            ) : (
              <>
                <a className="header-list-item" hef='/login'>
                  Login
                </a>
                <a className="header-list-item" hef='/register'>
                  Regiter
                </a>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="header-main-container" style={{ display: "none" }}>
        <div className="header-solution" style={{ display: "flex" }}>
          <h3 className="header-solution-title">What would you learn?</h3>
          <p className="header-increase">
            Increase your expertise in business, technology and personal
            development
          </p>
          <div className="header-input-search">
            <input
              type="text"
              class=" search-query"
              placeholder="Ex. Architecture, Specialization..."
            />
            <input
              type="submit"
              class="header-search btn_search"
              value="Search"
            ></input>
          </div>
        </div>
        <div className="header-solution" style={{ display: "none" }}>
          {/* <h3 className="header-online-course"> ONLINE COURSES</h3> */}
        </div>
      </div>
    </header>
  );
}

export default Menu;
