const styles = {
  global: {
    // Page scrollbar style
    "html, body": {
      "&::-webkit-scrollbar": {
        width: "8px"
      },
      "&::-webkit-scrollbar-track": {
        width: "8px",
        backgroundColor: "gray.100"
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "gray.600",
        borderRadius: "12px"
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "gray.500"
      }
    }
  }
};

export default styles;
