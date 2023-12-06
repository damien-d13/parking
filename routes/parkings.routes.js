const parkingsController = require("../controllers/parkings.controller.js");

module.exports = (app) => {

   // New route: Retrieve all parkings where 'worked' is true
   app.get("/parkings/findAllByWorked", parkingsController.findAllByWorked);
  // Create a new Parking
  app.post("/parkings", parkingsController.create);

  // Retrieve all parkings
  app.get("/parkings", parkingsController.findAll);

  // Retrieve a single Parking with id
  app.get("/parkings/:id", parkingsController.findOne);

  // Update a Parking with id
  app.put("/parkings/:id", parkingsController.update);

  // Delete a Parking with id
  app.delete("/parkings/:id", parkingsController.delete);

  // Delete all parkings
  app.delete("/parkings", parkingsController.deleteAll);


  
};
