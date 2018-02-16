const lineRoutes = require("./line_routes.js");

module.exports = function(app, db){
  lineRoutes(app,db);
}
