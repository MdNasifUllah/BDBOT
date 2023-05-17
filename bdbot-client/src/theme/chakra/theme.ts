import { fonts } from "./foundations/fonts";
import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";
import config from "./config";

// Foundational style overrides
import colors from "./foundations/colors";

// Component style overrides
// import Button from "./components/button";

export default extendTheme({
  config,
  styles,
  fonts,
  colors,

  // Other foundational style overrides go here

  components: {
    Button: {
      defaultProps: {
        size: "sm",
        colorScheme: "blue"
      }
    },
    Input: {
      defaultProps: {
        size: "sm"
      }
    }
  }
});
