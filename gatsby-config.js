module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-emoji-favicon",
      options: {
        emoji: "📆"
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/cal/*`] }
    },
    {
      resolve: "gatsby-plugin-chakra-ui"
    }
  ]
};
