export default {
  locales: [
    "(en",
    "fr",
    "it)"
  ],
  extract: {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "src/locales/{{language}}/{{namespace}}.json"
  }
}