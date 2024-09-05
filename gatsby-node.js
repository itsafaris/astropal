exports.createPages = async ({ actions }) => {
  actions.createRedirect({
    fromPath: `/`,
    toPath: `/face-reading`,
    isPermanent: true,
    force: true,
    redirectInBrowser: true,
  });
};
