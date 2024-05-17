exports.createPages = async ({ actions }) => {
  actions.createRedirect({
    fromPath: `/`,
    toPath: `/onboarding`,
    isPermanent: true,
    force: true,
    redirectInBrowser: true,
  });
};
