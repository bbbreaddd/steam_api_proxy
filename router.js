//import ejs from "./route/ejs.js";
import steam from "./route/steam.js";
import steam_v1_wrapper from "./route/legacy/steam_v1_wrapper.js";
import proxy from "./route/proxy.js";

export default [
  { endpoint: proxy.endpoint, router: proxy.router },
  { endpoint: steam.endpoint, router: steam.router },
  { endpoint: steam_v1_wrapper.endpoint, router: steam_v1_wrapper.router }
];