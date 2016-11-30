var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); 
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js'); 

var conexion = {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString     
}

router.get('/docs/:gen/:emp/:pag/:fecha1/:fecha2/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.DOCS(:gen, :emp, :pag, :fecha1, :fecha2, :docs); END;",
            {
                gen: { val: req.params.gen, type:oracledb.STRING },
                emp: { val: req.params.emp, type:oracledb.STRING },
                pag: { val: req.params.pag, dir:oracledb.BIND_IN }, 
                fecha1: { val: req.params.fecha1, type:oracledb.STRING },
                fecha2: { val: req.params.fecha2, type:oracledb.STRING },                               
                docs: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function (err, result) {
                result.outBinds.docs.getRows(
                    1000,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );
    });
});


router.get('/fbc/:gen/:emp/:num_doc/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.fbc(:gen,:emp,:num_doc,:fbc); END;",
            {
                gen: { val: req.params.gen, type:oracledb.STRING },
                emp: { val: req.params.emp, type:oracledb.STRING },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },                
                fbc: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
            },
            function (err, result) {
                result.outBinds.fbc.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );
    });
});

router.get('/ncc/:gen/:emp/:num_doc/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.ncc(:gen,:emp,:num_doc,:ncc); END;",
            {
                gen: { val: req.params.gen, type:oracledb.STRING },
                emp: { val: req.params.emp, type:oracledb.STRING },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },                
                ncc: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
            },
            function (err, result) {
                result.outBinds.ncc.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );
    });
});

// detalle de los documentos dolares y soles
router.get('/dds/:gen/:emp/:num_doc/:cla_doc/:moneda/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.dds(:gen,:emp,:num_doc,:cla_doc,:moneda,:dds); END;",
            {
                gen: { val: req.params.gen, type:oracledb.STRING },
                emp: { val: req.params.emp, type:oracledb.STRING },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                cla_doc: { val: req.params.cla_doc, type:oracledb.STRING },                
                moneda: { val: req.params.moneda, type:oracledb.STRING },                
                dds: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
            },
            function (err, result) {
                result.outBinds.dds.getRows(
                    30,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );
    });
});


router.get('/baja/:gen/:emp/:num_doc/:cla_doc/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.baja(:gen,:emp,:num_doc,:cla_doc,:baja); END;",
            {
                gen: { val: req.params.gen, type:oracledb.STRING },
                emp: { val: req.params.emp, type:oracledb.STRING },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                cla_doc: { val: req.params.cla_doc, type:oracledb.STRING },
                baja: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
            },
            function (err, result) {
                result.outBinds.baja.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );
    });
});

module.exports = router;
