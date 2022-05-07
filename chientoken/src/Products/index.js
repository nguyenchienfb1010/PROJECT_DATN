import React from "react";

function Product() {
  const arr = [
    {
      name: "product1",
      title: "Token Tranfer",
      price: 0.2,
    },
  ];
  return (
    <>
      {arr.map((e, index) => {
        return (
          <div class="card" key={index}>
            <img src="img_avatar.png" alt="Avatar" width={100} />
            <div class="container">
              <h4>
                <b>{e.name}</b>
              </h4>
              <p>Architect & Engineer</p>
              <p>{e.price}</p>

            </div>
          </div>
        );
      })}
    </>
  );
}

export default Product;
