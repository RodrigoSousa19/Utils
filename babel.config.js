module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      "@babel/plugin-transform-private-methods",
      {
        loose: true,
      },
    ],
    ['react-native-reanimated/plugin'],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
  ],
};
