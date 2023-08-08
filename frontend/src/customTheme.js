// customTheme.js

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        // bg: "linear-gradient(120deg, #FFC0CB, #D8BFD8)", // Original gradient
        // // Updated gradient with light pink colors
        // // Replace with your desired colors (e.g., "#FDD6E3", "#FFE9ED")
        // bg: "linear-gradient(120deg, #FFB6C1, #FAFAD2)",
        fontFamily: "Roboto, sans-serif", // Optional: Customize the font-family
      },
    },
  },
});

export default customTheme;
