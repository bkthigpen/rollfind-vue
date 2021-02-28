module.exports = {
  darkMode: "media",
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: require("daisyui/colors")
    },
    FontFamily: {
      sans: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"]
    },
    purge: {
      content: ["yourfiles/**/*.html"],
      options: {
        safelist: [/data-theme$/]
      }
    },
    daisyui: {
      styled: true,
      themes: true,
      rtl: false
    }
  }
};
