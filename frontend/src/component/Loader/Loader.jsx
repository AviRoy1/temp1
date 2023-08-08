// import { Spinner, VStack } from "@chakra-ui/react";
// import React from "react";

// const Loader = ({ color = "yellow.800" }) => {
//   return (
//     <VStack h="100vh" justifyContent={"center"}>
//       <div style={{ transform: "scale(4)" }}>
//         <Spinner
//           thickness="2px"
//           speed=".65sec"
//           emptyColor="transparent"
//           color={color}
//           size="xl"
//         />
//       </div>
//     </VStack>
//   );
// };

// export default Loader;

import React from "react";
import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <PacmanLoader color="#f24570" />
      </div>
    </>
  );
};

export default Loader;
