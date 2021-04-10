module.exports = {
  darkMode: "media",
  theme: {
    FontFamily: {
      sans: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"]
    },
    purge: {
      content: ["yourfiles/**/*.html"],
      options: {
        safelist: [/data-theme$/]
      }
    }
  }
};
