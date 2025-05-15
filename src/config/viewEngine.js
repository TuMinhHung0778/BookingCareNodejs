import express from "express";  


let configViewEngine = (app) => {
    app.use(express.static("./src/public")); 
    app.set("view engine", "ejs"); // Set the view engine to ejs
    app.set("views", "./src/views"); // Set the views directory to ./src/views
}

module.exports = configViewEngine;