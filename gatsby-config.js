module.exports = {
  siteMetadata: {
    title: `Babybowl`,
    siteUrl: `https://www.babybowl.life/`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `Babybowl`,
        short_name: `Babybowl`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: "src/assets/favicon.png"
      },
      // .
    }
  ],
};
