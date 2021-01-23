const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

const Usuario = require('../models/usuario');

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;

    let limite = req.query.limite || 5;

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(Number(desde))
        .limit(Number(limite))
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });

        });

});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'email',
        'img',
        'role',
        'estado'
    ]);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })


})

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }


        res.json({
            ok: true,
            usuarioBorrado
        })
    })

})

module.exports = app;