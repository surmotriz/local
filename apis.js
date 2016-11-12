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

router.get('/docs', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.DOCS(:docs); END;",
            { 
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

router.get('/fbc/:num_doc/:cla_doc/:co_cr/:exi_fra/:tip_imp/:moneda/', function(req, res){
    oracledb.getConnection(conexion, function (err, conexion) {
        conexion.execute(
            "BEGIN PKG_ELECTRONICA.fbc(:num_doc,:cla_doc,:co_cr,:exi_fra,:tip_imp,:moneda,:fbc); END;",
            { 
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                cla_doc: { val: req.params.cla_doc, type:oracledb.STRING }, 
                co_cr: { val: req.params.co_cr, type:oracledb.STRING }, 
                exi_fra: { val: req.params.exi_fra, type:oracledb.STRING }, 
                tip_imp: { val: req.params.tip_imp, type:oracledb.STRING }, 
                moneda: { val: req.params.moneda, type:oracledb.STRING }, 
                fbc: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
            },
            function (err, result) {
                result.outBinds.fbc.getRows(
                    2,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );
    });
});



/*
router.get('/documentos', function(req, res){
    oracledb.getConnection(dconexion, function (err, conexion) {
        conexion.execute(
            'select '+
            'CDG_NUM_DOC, '+ // 0   num
            'CDG_FEC_GEN, '+ // 1   Fecha 
            'CDG_NOM_CLI, '+ // 2   Razon
            'CDG_CLA_DOC, '+ // 3   clase
            'CDG_CO_CR, '+   // 4   tipo
            'CDG_TIPO_FACTURA, '+ // 5  unica 
            'CDG_TIP_IMP, '+  // 6   Impresion
            'CDG_VVP_TOT '+ // 7    total
            'from cab_doc_gen where cdg_cod_gen=\'02\' and cdg_cod_emp=\'01\' order by CDG_FEC_GEN Desc',
            {} ,
            { outFormat: oracledb.ARRAY } ,
            function (err, result) {
                res.send(result.rows);
            }
        );
    });
});

router.get('/fb_cab/:num_doc/:cla_doc/', function(req, res){
    oracledb.getConnection(dconexion, function (err, conexion) {
        conexion.execute(
            'select '+
            '1 as tipoOperacion, '+ // 0. 
            'CDG_FEC_GEN as fec_gen, '+ // 1
            'CDG_DOC_CLI as doc_cli, '+ // 2
            'CDG_NOM_CLI as nom_cli, '+ // 3
            'CDG_DES_TOT as des_total, '+ //  4
            'CDG_IMP_NETO as imp_neto, '+  // 5
            'CDG_TIPO_FACTURA AS tipo_factura, '+ // 6
            '(select count(*) from DET_DOC_SER where dds_cod_gen=cdg_cod_gen and dds_cod_emp=cdg_cod_emp and dds_cla_doc=cdg_cla_doc and  dds_num_doc=cdg_num_doc) as ser, '+ // 7 Servicos
            '(select count(*) from DET_DOC_REP where ddr_cod_gen=cdg_cod_gen and ddr_cod_emp=cdg_cod_emp and ddr_cla_doc=cdg_cla_doc and  ddr_num_doc=cdg_num_doc) as rep, '+ // 8 Repuestos
            '\'20532710066\' || \'-\' || decode(cdg_tip_doc,\'F\',\'01\',\'B\',\'03\',\'A\',\'07\',\'0\') || \'-\' || lpad(cdg_ser_doc,4,0) || \'-\'|| lpad(cdg_num_doc,8,0) as nombre '+ // 9 Nombre
            'from CAB_DOC_GEN WHERE CDG_NUM_DOC=:num_doc and CDG_CLA_DOC=:cla_doc',
            { 
                num_doc: { val: req.params.num_doc },
                cla_doc: { val: req.params.cla_doc, type:oracledb.STRING },
            } ,
            { outFormat: oracledb.ARRAY } ,
            function (err, result) {
                res.send(result.rows);
            }
        );
    });
});

// factura o boleta servicios detalle
router.get('/documentos_fb_detalle_servicios/:num_doc/:cla_doc/:tipo_factura', function(req, res){
    oracledb.getConnection(dconexion, function (err, conexion) {
        conexion.execute(
            'select * from DET_DOC_SER where DDS_COD_GEN=\'02\' and DDS_COD_EMP=\'01\' and DDS_NUM_DOC=:num_doc and DDS_CLA_DOC=:cla_doc',            
            { 
                num_doc: { val: req.params.num_doc },
                cla_doc: { val: req.params.cla_doc, type:oracledb.STRING },
            } ,
            { outFormat: oracledb.ARRAY } ,
            function (err, result) {
                res.send(result.rows);
            }
        );
    });
});

// factura o boleta repuestos detalle
router.get('/documentos_fb_detalle_repuestos/:num_doc/:cla_doc/:tipo_factura', function(req, res){
    oracledb.getConnection(dconexion, function (err, conexion) {
        conexion.execute(
            'select * from DET_DOC_REP where DDR_COD_GEN=\'02\' and DDR_COD_EMP=\'01\' and DDR_NUM_DOC=:num_doc and DDR_CLA_DOC=:cla_doc',            
            { 
                num_doc: { val: req.params.num_doc },
                cla_doc: { val: req.params.cla_doc, type:oracledb.STRING },
            } ,
            { outFormat: oracledb.ARRAY } ,
            function (err, result) {
                res.send(result.rows);
            }
        );
    });
});

/*
router.get('/inicios', function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
        connection.execute(
            "BEGIN PKG_ELECTRONICA.documentos_all(:resultado); END;",
            { 
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
            },
            function (err, result) {
                result.outBinds.resultado.getRows(
                    150,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )                                                        
            }
        );
    });
});

router.get('/impresion_anticipo_sinot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.impresion_anticipo_sinot(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/impresion_franquicias/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.impresion_franquicias(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_fac_ser_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imprime_fac_ser_ot(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_rep_mostrador/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imprime_rep_mostrador(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_fac_rep_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imprime_fac_rep_ot(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_fac_repser_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imprime_fac_repser_ot(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },                
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imp_na_anticipo_repser/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imp_na_anticipo_repser(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_na_anulacion_rep_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imprime_na_anulacion_rep_ot(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/impresion_franquicias_na/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.impresion_franquicias_na(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_na_anulacion_ser_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imprime_na_anulacion_ser_ot(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_na_descuento_det/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imprime_na_descuento_det(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/impresion_na_descuento/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.impresion_na_descuento(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_fac_contabilidad/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.imprime_fac_contabilidad(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    1,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});


/*
router.get('/imprime_rep_mostrador/:gEmpresa/:gTienda/:strTipo/:dbSerie/:docu/:StrProcede', function(req, res){    
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imprime_Rep_Mostrador(:gempresa, :gTienda, :strTipo, :dbSerie, :docu, :StrProcede, :resultado); END;",
            {
                gEmpresa: { val: req.params.gEmpresa, type:oracledb.STRING },
                gTienda: { val: req.params.gTienda, type:oracledb.STRING },
                strTipo: { val: req.params.strTipo, type:oracledb.STRING },
                dbSerie: { val: req.params.dbSerie, dir:  oracledb.BIND_IN },
                docu: { val: req.params.docu, dir:  oracledb.BIND_IN },
                StrProcede: { val: req.params.StrProcede, type:oracledb.STRING },                
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
    
});


router.get('/impresion_anticipo_sinot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){         
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Impresion_Anticipo_sinOT(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },                
                resultado: { type: oracledb.CURSOR, dir:oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });    
});


router.get('/imprime_rep_mostrador/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){           
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imprime_Rep_Mostrador(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },                
                resultado: { type: oracledb.CURSOR, dir:oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });    
});


router.get('/imprime_fac_rep_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){    
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imprime_Fac_Rep_OT(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir:oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });    
});
router.get('/impresion_franquicias/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Impresion_Franquicias(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_fac_ser_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){          
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imprime_Fac_Ser_OT(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });    
});
router.get('/impresion_doc_veh/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Impresion_Doc_Veh(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });        
});
router.get('/imprime_fac_contabilidad/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){    
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imprime_Fac_Contabilidad(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_fac_repser_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/', function(req, res){   
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imprime_Fac_RepSer_OT(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },                
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imp_na_anticipo_repser/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){  
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imp_na_anticipo_repser(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_na_anulacion_rep_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){  
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imprime_na_anulacion_rep_ot(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_na_anulacion_ser_ot/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){ 
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Imprime_na_anulacion_ser_ot(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
router.get('/imprime_na_descuento_det/:num', function(req, res){    
    res.send(req.params.num);
});
router.get('/impresion_na_descuento/:cod_gen/:cod_emp/:tip_doc/:ser_doc/:num_doc/:pro_doc/', function(req, res){  
    oracledb.getConnection(connAttrs, function(err, connection){
        connection.execute(
            "BEGIN PKG_IMPRESIONES.Impresion_NA_Descuento(:cod_gen,:cod_emp,:tip_doc,:ser_doc,:num_doc,:pro_doc,:resultado); END;",
            {
                cod_gen: { val: req.params.cod_gen, type:oracledb.STRING },
                cod_emp: { val: req.params.cod_emp, type:oracledb.STRING },
                tip_doc: { val: req.params.tip_doc, type:oracledb.STRING },                
                ser_doc: { val: req.params.ser_doc, dir:oracledb.BIND_IN },
                num_doc: { val: req.params.num_doc, dir:oracledb.BIND_IN },
                pro_doc: { val: req.params.pro_doc, type:oracledb.STRING },
                resultado: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            },
            function(err, result){
                result.outBinds.resultado.getRows(
                    100,
                    function(err, rows){
                        res.contentType('application/json').send(JSON.stringify(rows));
                    }
                )
            }
        );      
    });
});
*/

module.exports = router;
