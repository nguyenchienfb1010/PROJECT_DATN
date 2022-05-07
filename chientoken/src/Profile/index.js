import axios from "axios";
import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import "./index.css";
function Profile() {
  const [user, setUser] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const getToken = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:5001/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
      if (res) {
        setUser(res?.data);
      }
    } catch (error) {}
  };
  return (
    <>
      <Menu />
      <div class="container mt-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-7">
            <div class="card p-3 py-4">
              <div class="text-center">
                <img
                  src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                  width="100"
                  class="rounded-circle"
                />
              </div>

              <div class="text-center mt-3">
                <span class="bg-secondary p-1 px-4 rounded text-white">
                  User
                </span>
                <h5 class="mt-2 mb-0">{user?.email}</h5>
                <span>{user?.contractAdd}</span>

                <div class="px-4 mt-1">
                  <p class="fonts">
                    Consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.{" "}
                  </p>
                </div>

                <ul class="social-list">
                  <li>
                    <i class="fa fa-facebook"></i>
                  </li>
                  <li>
                    <i class="fa fa-dribbble"></i>
                  </li>
                  <li>
                    <i class="fa fa-instagram"></i>
                  </li>
                  <li>
                    <i class="fa fa-linkedin"></i>
                  </li>
                  <li>
                    <i class="fa fa-google"></i>
                  </li>
                </ul>

                <div class="buttons">
                  <button class="btn btn-outline-primary px-4">Message</button>
                  <button class="btn btn-primary px-4 ms-3 ml-5">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
