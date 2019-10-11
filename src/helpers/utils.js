export function createRoutes(screens) {
  const routes = {};
  Object.keys(screens).forEach(key => {
    routes[key] = {
      screen: screens[key],
    };
  });
  return routes;
}
