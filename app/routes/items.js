'use strict';

// Articles routes use articles controller
var items = require('../controllers/items');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (req.item.owned_by.id !== req.owned_by.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/items', items.all);
    app.post('/items', authorization.requiresLogin, items.create);
    app.get('/items/:itemId', items.show);
    app.put('/items/:itemId', authorization.requiresLogin, hasAuthorization, items.update);
    app.del('/items/:itemId', authorization.requiresLogin, hasAuthorization, items.destroy);

    // Finish with setting up the itemId param
    app.param('itemId', items.item);

};
