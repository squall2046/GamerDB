// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // Don't open this page... huge data
    app.get("/api/game", function (req, res) {
        db.Game.findAll({
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });

    app.get("/api/favorite", function (req, res) {
        db.Favorite.findAll({
        }).then(function (dbFavorite) {
            res.json(dbFavorite);
        });
    });

    app.get("/api/key", function (req, res) {
        var apiKey = { key: process.env.API_KEY };
        res.json(apiKey);
    });
};
