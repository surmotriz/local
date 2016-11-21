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

router.get('/docs/:pag/:fecha/:dias/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.DOCS(:pag, :fecha, :dias, :docs); END;",
            {
                pag: { val: req.params.pag, dir:oracledb.BIND_IN }, 
                fecha: { val: req.params.fecha, type:oracledb.STRING },                
                dias: { val: req.params.dias, dir:oracledb.BIND_IN },                 
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


router.get('/fbc/:num_doc/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.fbc(:num_doc,:fbc); END;",
            { 
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

router.get('/ncc/:num_doc/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.ncc(:num_doc,:ncc); END;",
            { 
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
router.get('/dds/:num_doc/:cla_doc/:moneda/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.dds(:num_doc,:cla_doc,:moneda,:dds); END;",
            { 
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


module.exports = router;
