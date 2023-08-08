import React, { useEffect } from "react";

const BackToTop = () => {
  useEffect(() => {
    //Get the button
    const mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    const scrollFunction = () => {
      if (mybutton) {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          mybutton.style.display = "block";
        } else {
          mybutton.style.display = "none";
        }
      }
    };

    // When the component is mounted, add the scroll event listener
    window.addEventListener("scroll", scrollFunction);

    // When the user clicks on the button, scroll to the top of the document
    const backToTop = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    if (mybutton) {
      mybutton.addEventListener("click", backToTop);
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", scrollFunction);
      if (mybutton) {
        mybutton.removeEventListener("click", backToTop);
      }
    };
  }, []);

  return (
    <>
      <button
        type="button"
        class="btn btn-danger btn-floating btn-lg"
        id="btn-back-to-top"
        style={{ borderRadius: "100%" }}>
        <i
          class="fas fa-arrow-up"
          // style={{
          //   position: "fixed",
          //   top: "2px",
          // }}
        ></i>
      </button>
    </>
  );
};

export default BackToTop;
