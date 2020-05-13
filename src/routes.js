const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionConctroller = require('./controllers/SessionController');

const routes = express.Router();                

routes.post('/sessions', SessionConctroller.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().required(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index); 

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;
