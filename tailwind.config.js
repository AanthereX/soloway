const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        c_BF642B: "#BF642B",
        c_1B1B1B: "#1B1B1B",
        c_595959: "#595959",
        c_fff: "#fff",
        c_000: "#000",
        c_212020: "#212020",
        c_0D0D0D: "#0d0d0d",
        c_252525: "#252525",
        c_212121: "#212121",
        c_272727: "#272727",
        c_B2B2B2: "#B2B2B2",
        c_7379FF: "#7379FF",
        c_101010: "#101010",
        c_1C1C1C: "#1C1C1C",
        c_2C2C2C: "#2C2C2C",
        c_9B9B9B: "#9B9B9B",
        c_FF5C5A: "#FF5C5A",
        c_0AA81A: "#0AA81A",
        c_1F1F1F: "#1F1F1F",
        c_DADADA: "#DADADA",
        c_5792EF: "#5792EF",
        c_D46906: "#D46906",
        c_D9C40B: "#D9C40B",
        c_CE7F36: "#CE7F36",
        c_D61ECE: "#D61ECE",
        c_D1FF97: "#D1FF97",
        c_1CFF32: "#1CFF32",
        c_0465FE: "#0465FE",
        c_D1FF97: "#D1FF97",
        c_A8A8A8: "#A8A8A8",
        c_FA833F: "#FA833F",
        c_F5DE0E: "#F5DE0E",
        c_27A486: "#27A486",
        c_FFFFFFCC: "#FFFFFFCC",
        c_0C4FBA33: "#0C4FBA33",
        c_7379FF33: "#7379FF33",
        c_FFFFFF33: "#FFFFFF33",
        c_5792EF33: "#5792EF33",
        c_D9C40B33: "#D9C40B33",
        c_96349233: "#96349233",
        c_0EBEF533: "#0EBEF533",
        c_0EBEF5: "#0EBEF5",
        c_D1FF973: "#D1FF973",
        c_B173FF33: "#B173FF33",
        c_B173FF: "#B173FF",
        c_FA833F33: "#FA833F33",
        c_FF9E5833: "#FF9E5833",
        c_FF9E58: "#FF9E58",
        c_43FFD233: "#43FFD233",
        c_43FFD2: "#43FFD2",
      },
    },
    fontSize: {
      ...defaultTheme.fontSize,
      f_100: 100,
      f_22: 22,
      f_40: 40,
      f_64: 64,
      f_32: 32,
      f_12: 12,
    },
    fontFamily: {
      generalSansRegular: [
        "GeneralSans-Regular",
        ...defaultTheme.fontFamily.serif,
      ],
      generalSansMedium: [
        "GeneralSans-Medium",
        ...defaultTheme.fontFamily.serif,
      ],
      generalSansSemiBold: [
        "GeneralSans-SemiBold",
        ...defaultTheme.fontFamily.serif,
      ],
      generalSansBold: ["GeneralSans-Bold", ...defaultTheme.fontFamily.serif],
      inter: ["Inter", ...defaultTheme.fontFamily.serif],
    },
  },
  plugins: [],
};
