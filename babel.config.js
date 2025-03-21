const presets = [
  [
    "@babel/preset-env",
    {
      targets: "defaults, IE 11, not dead",
      useBuiltIns: "entry",
      corejs: 3, // Remove the ^ symbol
      modules: false, // Add this line
    },
  ],
];

module.exports = { presets };
