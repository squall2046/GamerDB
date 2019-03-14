// Dependencies
// =============================================================
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var db = require('../models');

// Routes
// =============================================================
module.exports = function (app) {

    // Get all games in database
    app.get("/", function (req, res) {
        db.Game.findAll({ limit: 1000 })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
                // console.log(hbsObject)
                console.log(hbsObject.game[1].Name)
            });
    });

    //search a game
    app.get("/input/:input", function (req, res) {
        var inputName = req.params.input.split("+").join(" ")
        db.Game.findOne({
            where: {
                Name: {
                    [Op.like]: '%' + inputName + '%'
                }
            }
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });

    // order by year
    app.get("/year-desc", function (req, res) {
        db.Game.findAll({
            limit: 20,
            order: [
                ['Year_of_Release', 'DESC'],
            ],
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    })

    app.get("/year-asc", function (req, res) {
        db.Game.findAll({
            limit: 20,
            order: [
                ['Year_of_Release', 'ASC'],
            ],
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    })

    // order by sales
    app.get("/sales-desc", function (req, res) {
        db.Game.findAll({
            limit: 20,
            order: [
                ['Global_Sales', 'DESC'],
            ],
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    })

    app.get("/sales-asc", function (req, res) {
        db.Game.findAll({
            limit: 20,
            order: [
                ['Global_Sales', 'ASC'],
            ],
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    })

    // sort games by genre
    app.get("/Genre/action", function (req, res) {
        db.Game.findAll({
            limit: 20,
            where: {
                Genre: 'Action'
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    });

    app.get("/Genre/rpg", function (req, res) {
        db.Game.findAll({
            limit: 20,
            where: {
                Genre: 'Role-Playing'
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    });

    app.get("/Genre/sports", function (req, res) {
        db.Game.findAll({
            limit: 20,
            where: {
                Genre: 'Sports'
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    });

    app.get("/Genre/shooter", function (req, res) {
        db.Game.findAll({
            limit: 20,
            where: {
                Genre: 'Shooter'
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    });

    // sort games by platform
    app.get("/platform/ps4", function (req, res) {
        db.Game.findAll({
            limit: 20,
            where: {
                Platform: 'PS4'
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    });

    app.get("/platform/XOne", function (req, res) {
        db.Game.findAll({
            limit: 20,
            where: {
                Platform: 'XOne'
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    });

    app.get("/platform/WiiU", function (req, res) {
        db.Game.findAll({
            limit: 20,
            where: {
                Platform: 'WiiU'
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    });

    app.get("/platform/3DS", function (req, res) {
        db.Game.findAll({
            limit: 20,
            where: {
                Platform: '3DS'
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                res.render("index", hbsObject);
            });
    });

    //------------------ favorite page ---------------------
    app.get("/favorite", function (req, res) {
        db.Favorite.findAll({})
            .then(function (dbGame) {
                var hbsObject = {
                    fav: dbGame
                };
                res.render("favorite", hbsObject);
            });
    });

    app.put("/favorite/add/:gameId", function (req, res) {
        db.Game.update(
            { isFav: 1 },
            { where: { id: req.params.gameId } }
        )
            .then(function (dbGame) {
                console.log(dbGame)
            });
    });

    app.post("/favorite/add/:gameId", function (req, res) {
        db.Game.findOne({
            where: {
                id: req.params.gameId
            }
        })
            .then(function (theOne) {
                db.Favorite.create(
                    {
                        Name: theOne.Name,
                        Platform: theOne.Platform,
                        Year_of_Release: theOne.Year_of_Release,
                        Genre: theOne.Genre,
                        NA_Sales: theOne.NA_Sales,
                        Global_Sales: theOne.Global_Sales,
                        Stars: theOne.Stars,
                        GameId: req.params.gameId
                    })
                    .then(function (dbGame) {
                        res.render("favorite", dbGame);
                    });
            });
    });

    app.put("/favorite/remove/:gameId", function (req, res) {
        db.Game.update(
            { isFav: 0 },
            { where: { id: req.params.gameId } }
        )
            .then(function (dbGame) {
                console.log("dbGame" + dbGame)
            });
    });

    app.delete("/favorite/remove/:gameId", function (req, res) {
        db.Favorite.destroy(
            { where: { GameId: req.params.gameId } }
        )
            .then(function (removedOne) {
                res.json(removedOne);
            });
    });


    //------------------ star rate ---------------------
    app.put("/rating/:id", function (req, res) {
        db.Game.update(
            { Stars: req.body.star },
            { where: { id: req.params.id } }
        )
            .then(function (put) {
                console.log("star-put_______", put)
                var hbsObject = {
                    star: put
                };
                res.render("index", hbsObject);
            });
    });


    //------------------ card ---------------------

    app.get("/card/:id", function (req, res) {
        db.Game.findAll({
            where: {
                id: req.params.id
            },
        })
            .then(function (dbGame) {
                var hbsObject = {
                    game: dbGame
                };
                db.Card.findAll({
                    where: {
                        GameId: req.params.id
                    },
                })
                    .then(function (dbCard) {
                        hbsObject.card = dbCard;
                        res.render("card", hbsObject);
                        console.log(hbsObject)
                    });
            });
    });

    app.post("/card/comment/:id", function (req, res) {
        db.Card.create({
            UserId: req.body.inputId,
            Comment: req.body.inputCom,
            GameId: req.params.id
        })
            .then(function (dbGame) {
                res.json(dbGame);
                console.log(dbGame)
            });
    });
};
