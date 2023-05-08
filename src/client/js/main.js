const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/404', view: () => console.log('404') },
    { path: '/', view: () => console.log('home') },
    { path: '/chart', view: () => console.log('chart') },
  ];

  const potentialMatches = routes.map((route) => ({
    route,
    result: location.pathname === route.path,
  }));

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result);

  if (!match) {
    match = {
      route: routes[0],
      result: true,
    };
  }

  match.route.view();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
