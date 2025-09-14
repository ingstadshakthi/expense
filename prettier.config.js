import tailwindcssPlugin from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: "avoid",
  plugins: [tailwindcssPlugin],
};

export default config;
