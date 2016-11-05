app.controller('iniciosIndexController', function($scope, $http, $location, FileSaver, Blob){   
    

    // LISTA INICIAL
    $http.get('/apis/inicios').success(function(data){              
        $scope.listas = data;  
    });
    
    $scope.detalle = function(lista){

        var gEmpresa        = '02';
        var gTienda         = '01';
        var sMultipleOT     = lista[0];
        var StrProcede      = lista[1];
        var strEstadoDoc    = strCoCr       = lista[2];
        var txtOtText       = lista[3];
        var tipoImpresion   = lista[4];
        var strDocFra       = lista[5];
        var strTipoRefe     = txtfqText     = lista[6];
        var strGarantia     = lista[7];
        var dbSerie         = lista[8];
        var txtdocuImpOut   = lista[9];
        var strTipo         = lista[10];
        var estAnulado      = lista[11];
        var docAnulado      = lista[12];
        var variable6       = gEmpresa+'/'+gTienda+'/'+strTipo+'/'+dbSerie+'/'+txtdocuImpOut+'/'+StrProcede+'/';
        var variable5       = gEmpresa+'/'+gTienda+'/'+strTipo+'/'+dbSerie+'/'+txtdocuImpOut+'/';

        var imp_antic_fact_lib           = 'impresion_anticipo_sinot';
        var imp_fac_rep_mos              = 'imprime_rep_mostrador';
        var imp_fac_rep_mos_fq           = 'imprime_rep_mostrador';
        var imp_fac_rep_ot               = 'imprime_fac_rep_ot';
        var imp_franq_fac_lib            = 'impresion_franquicias';
        var imp_fac_ser_ot_garantia      = 'imprime_fac_ser_ot';
        var imp_fac_ser_ot               = 'imprime_fac_ser_ot';
        var imp_fact_conta               = 'imprime_fac_contabilidad';
        var imp_fact_unica               = 'imprime_fac_repser_ot';
        var imp_fact_unica_fq            = 'imprime_fac_repser_ot';
        var imp_antic_bol_lib            = 'impresion_anticipo_sinot';
        var imp_franq_bol_lib            = 'impresion_franquicias';
        var imp_bol_ser_ot               = 'imprime_fac_ser_ot';
        var imp_bol_rep_mos              = 'imprime_rep_mostrador';
        var imp_bol_rep_ot               = 'imprime_fac_rep_ot';
        var imp_bol_conta                = 'imprime_fac_contabilidad';
        var imp_bol_unica                = 'imprime_fac_repser_ot';
        var imp_fact_unica_na_resu       = 'imprime_fac_repser_ot';
        var imp_fact_unica_na_resu_fq    = 'imprime_fac_repser_ot';
        var imp_fact_unica_na            = 'imprime_fac_repser_ot';
        var imp_fact_unica_na_fq         = 'imprime_fac_repser_ot';
        var imp_na_anticipo_repser       = 'imp_na_anticipo_repser';
        var imp_na_anulacion_rep_ot      = 'imprime_na_anulacion_rep_ot';
        var imp_franq_na_lib             = 'impresion_franquicias_na';
        var imp_na_anulacion_ser_ot      = 'imprime_na_anulacion_ser_ot';
        var imp_na_anulacion_det         = 'imprime_na_descuento_det';
        var imp_na_descuento             = 'impresion_na_descuento';
        var imp_na_conta                 = 'imprime_fac_contabilidad';

        if (strTipo == "F") {
            if (sMultipleOT == "N") { //  ' Factura separada (Repuestos y Servicios)
                if (StrProcede == "R") { // ' respuestos
                    if (strEstadoDoc == "AN") { //  ' Anticipo de Repuestos                
                        $http.get('/apis/'+imp_antic_fact_lib+'/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_antic_fact_lib.rpt');
                        });
                        //"imp_antic_fact_lib.rpt", "Anticipo", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede                
                    }else {
                        if (txtOtText == "0") { // Factura de mostrador
                            if (tipoImpresion == "D") { // impresion detallada
                                if (strDocFra == 0) { // si no hay franquicia referente
                                    $http.get('/apis/'+imp_fac_rep_mos+'/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_fac_rep_mos.rpt');
                                    });
                                    //"imp_fac_rep_mos.rpt", "Factura de Repuestos", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "S", "S"
                                }else { // Reporte que descuenta deducible
                                    $http.get('/apis/'+imp_fac_rep_mos_fq+'/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_fac_rep_mos_fq.rpt');
                                    });
                                    //"imp_fac_rep_mos_fq.rpt", "Factura de Repuestos", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "S", "S"
                                }
                            }else {
                                if (tipoImpresion == "R") {
                                    if (strDocFra == 0) { // si no hay franquicia referente
                                        $http.get('/apis/'+imp_fac_rep_mos+'/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_fac_rep_mos.rpt');
                                        });
                                        //"imp_fac_rep_mos.rpt", "Factura de Repuestos", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "N", Trim(TenorResumido)
                                    }else { // Reporte que descuenta deducible
                                        $http.get('/apis/'+imp_fac_rep_mos_fq+'/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_fac_rep_mos_fq.rpt');
                                        });
                                        //"imp_fac_rep_mos_fq.rpt", "Factura de Repuestos", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "N", Trim(TenorResumido)
                                    }
                                }
                            }
                        }else {
                            if (txtOtText !== "0") {
                                if (tipoImpresion == "D") { // ' impresion detallada
                                    $http.get('/apis/'+imp_fac_rep_ot+'/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_fac_rep_ot.rpt');
                                    });
                                    //"imp_fac_rep_ot.rpt", "Factura de Repuestos", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "S", "S"
                                }else { 
                                    if (tipoImpresion == "R") { //
                                        $http.get('/apis/'+imp_fac_rep_ot+'/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_fac_rep_ot.rpt');
                                        });
                                        //"imp_fac_rep_ot.rpt", "Factura de Repuestos", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "N", Trim(TenorResumido)
                                    }
                                }
                            }
                        }
                    }
                }else {
                    if (StrProcede == "S") {
                        if (strEstadoDoc == "AN") { // ' Anticipo de Servicios                    
                            $http.get('/apis/'+imp_antic_fact_lib+'/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_antic_fact_lib.rpt');
                            });
                            //"imp_antic_fact_lib.rpt", "Anticipo", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede                    
                        }else { 
                            if (strTipoRefe == "FQ") { 
                                $http.get('/apis/'+imp_franq_fac_lib+'/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_franq_fac_lib.rpt');
                                });
                                //"imp_franq_fac_lib.rpt", "Franquicia Factura de Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "N", Trim(TenorResumido)                        
                            }else { //
                                if (strGarantia == "GR") { // 'Garantia
                                    $http.get('/apis/'+imp_fac_ser_ot_garantia+'/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_fac_ser_ot_garantia.rpt');
                                    });
                                    //"imp_fac_ser_ot_garantia.rpt", "Factura de Garantías", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "S", "S"
                                }else { //
                                    if (tipoImpresion == "D") { //
                                        $http.get('/apis/'+imp_fac_ser_ot+'/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_fac_ser_ot.rpt');
                                        });
                                        //"imp_fac_ser_ot.rpt", "Factura de Servicios ", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "S", "S"
                                    }else { //
                                        if (tipoImpresion == "R") { //
                                            $http.get('/apis/'+imp_fac_ser_ot+'/'+variable6).success(function(data){
                                                $scope.documento = data;
                                                console.log('imp_fac_ser_ot.rpt');
                                            });
                                            //"imp_fac_ser_ot.rpt", "Factura de Servicios", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "N", Trim(TenorResumido)
                                        }
                                    }
                                }
                            }
                        }
                    }else {
                        if (StrProcede == "V") {
                            /*
                            if (strEstadoDoc == "AN") {
                                $http.get('/apis/imp_antic_veh.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_antic_veh.rpt');
                                });
                                //"imp_antic_veh.rpt", "Anticipos", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                            }else { 
                                if (anti_documentos(Me.txtdocuImpOut, dbSerie 0) { //
                                    $http.get('/apis/imp_documento_veh.rpt/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_documento_veh.rpt');
                                    });
                                    //"imp_documento_veh.rpt", "FACTURA de Venta", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                                }else { //
                                    $http.get('/apis/imp_documento_veh_ant.rpt/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_documento_veh_ant.rpt');
                                    });
                                    //"imp_documento_veh_ant.rpt", "FACTURA de Venta", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                                }
                            }
                            */
                            console.log('No hay vehiculos');
                        }
                        if (StrProcede == "C") {                    
                            $http.get('/apis/'+imp_fact_conta+'/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fact_conta.rpt');
                            });
                            //"imp_fact_conta.rpt", "Factura de Contabilidad ", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "S", "S"                    
                        }                
                    }
                }
            }else { // ' Factura Única
                if (tipoImpresion == "D") { //
                    if (strDocFra == 0) { // 'si no hay franquicia referente
                        $http.get('/apis/'+imp_fact_unica+'/'+variable5).success(function(data){
                            $scope.documento = data;
                            console.log('imp_fact_unica.rpt');
                        });
                        //"imp_fact_unica.rpt", "Factura Repuestos - Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "S", "S"
                    }else { // Reporte que descuenta deducible
                        $http.get('/apis/'+imp_fact_unica_fq+'/'+variable5).success(function(data){
                            $scope.documento = data;
                            console.log('imp_fact_unica_fq.rpt');
                        });
                        //"imp_fact_unica_fq.rpt", "Factura Repuestos - Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "S", "S"
                    }
                }else { //
                    if (tipoImpresion == "R") { //
                        if (strDocFra == 0) { // 'si no hay franquicia referente
                            $http.get('/apis/'+imp_fact_unica+'/'+variable5).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fact_unica.rpt');
                            });
                            //"imp_fact_unica.rpt", "Factura Repuestos - Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "N", Trim(TenorResumido)
                        }else { // Reporte que descuenta deducible
                            $http.get('/apis/'+imp_fact_unica_fq+'/'+variable5).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fact_unica_fq.rpt');
                            });
                            //"imp_fact_unica_fq.rpt", "Factura Repuestos - Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "N", Trim(TenorResumido)
                        }
                    }
                }
            }
        }else if (strTipo == "B"){
            if (sMultipleOT == "N") { // ' Boleta Independiente
                if (StrProcede == "R") { // ' Respuestos
                    if (strEstadoDoc == "AN") { // Anticipo de Repuestos                
                        $http.get('/apis/'+imp_antic_bol_lib+'/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_antic_bol_lib.rpt');
                        });
                        //"imp_antic_bol_lib.rpt", "Anticipo", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede                
                    }else { //
                        if (txtOtText == "0") { // ' Boleta de mostrador
                            if (tipoImpresion == "D") { //
                                $http.get('/apis/'+imp_bol_rep_mos+'/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_bol_rep_mos.rpt');
                                });
                                //"imp_bol_rep_mos.rpt", "Boleta de Repuestos", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "S", "S"
                            }else { //
                                $http.get('/apis/'+imp_bol_rep_mos+'/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_bol_rep_mos.rpt');
                                });
                                //"imp_bol_rep_mos.rpt", "Boleta de Repuestos", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "N", Trim(TenorResumido)
                            }

                        }else { // ' Con Boleta de OT
                            if (tipoImpresion == "D") { //
                                $http.get('/apis/'+imp_bol_rep_ot+'/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_bol_rep_ot.rpt');
                                });
                                //"imp_bol_rep_ot.rpt", "Boleta de Repuestos", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "S", "S"
                            }else { //
                                $http.get('/apis/'+imp_bol_rep_ot+'/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_bol_rep_ot.rpt');
                                });
                                //"imp_bol_rep_ot.rpt", "Boleta de Repuestos", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "N", Trim(TenorResumido)
                            }
                        }
                    }
                }else { // Servicios
                    if (StrProcede == "S") { // Servicios
                        if (strEstadoDoc == "AN") { //  ' Anticipo de Servicios                    
                            $http.get('/apis/'+imp_antic_bol_lib+'/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_antic_bol_lib.rpt');
                            });
                            //"imp_antic_bol_lib.rpt", "Anticipo", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede                    
                        }else {
                            if (strTipoRefe == "FQ") { //
                                $http.get('/apis/'+imp_franq_bol_lib+'/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_franq_bol_lib.rpt');
                                });
                                //"imp_franq_bol_lib.rpt", "Franquicia Boleta de Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede                        
                            }else {
                                if (txtOtText !== "0") { // ' boleta servicios con OT
                                    if (tipoImpresion == "D") { // ' detallada
                                        $http.get('/apis/'+imp_bol_ser_ot+'/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_bol_ser_ot.rpt');
                                        });
                                        //"imp_bol_ser_ot.rpt", "Boleta de Servicios", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "S", "S"
                                    }else { //
                                        $http.get('/apis/'+imp_bol_ser_ot+'/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_bol_ser_ot.rpt');
                                        });
                                        //"imp_bol_ser_ot.rpt", "Boleta de Servicios", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "N", Trim(TenorResumido)
                                    }
                                }else {
                                    if (strGarantia == "GR") { // 'Garantia
                                        $http.get('/apis/'+imp_fac_ser_ot_garantia+'/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_fac_ser_ot_garantia.rpt');
                                        });
                                        //"imp_fac_ser_ot_garantia.rpt", "Boleta de Garantías", gEmpresa, gTienda, strTipo, StrProcede, dbSerie, num_doc, "S", "S"
                                    }
                                }
                            }
                        }
                    }else {
                        if (StrProcede == "V") { 
                            /*                   
                            if (strEstadoDoc == "AN") { //
                                $http.get('/apis/imp_antic_veh.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_antic_veh.rpt');
                                });
                                //"imp_antic_veh.rpt", "Anticipos", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                            }else { 
                                if (anti_documentos(Me.txtdocuImpOut, dbSerie 0) { //
                                    $http.get('/apis/imp_documento_veh.rpt/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_documento_veh.rpt');
                                    });
                                    //"imp_documento_veh.rpt", "Boleta de Venta", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                                }else { //
                                    $http.get('/apis/imp_documento_veh_Ant.rpt/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_documento_veh_Ant.rpt');
                                    });
                                    //"imp_documento_veh_Ant.rpt", "Boleta de Venta", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                                }
                            }
                            */
                        }
                        if (StrProcede == "C") {
                            $http.get('/apis/'+imp_bol_conta+'/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_bol_conta.rpt');
                            });
                            //"imp_bol_conta.rpt", "Boleta de Contabilidad ", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "S", "S"                    
                        }
                    }
                }
            }else { //  Boleta Única
                if (tipoImpresion == "D") {
                    $http.get('/apis/'+imp_bol_unica+'/'+variable5).success(function(data){
                        $scope.documento = data;
                        console.log('imp_bol_unica.rpt');
                    });
                    //"imp_bol_unica.rpt", "Boleta Repuestos - Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "S", "S"
                }else {
                    if (tipoImpresion == "R") {
                        $http.get('/apis/'+imp_bol_unica+'/'+variable5).success(function(data){
                            $scope.documento = data;
                            console.log('imp_bol_unica.rpt');
                        });
                        //"imp_bol_unica.rpt", "Boleta Repuestos - Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "N", Trim(TenorResumido)
                    }
                }
            }
        }else if (strTipo == "A") {
            if (sMultipleOT == "S") {
                if (tipoImpresion == "R") {
                    if (strDocFra == 0) { // si no hay franquicia referente
                        $http.get('/apis/'+imp_fact_unica_na_resu+'/'+variable5).success(function(data){
                            $scope.documento = data;
                            console.log('imp_fact_unica_na_resu.rpt');
                        });
                        //"imp_fact_unica_na_resu.rpt", "Boleta Repuestos - Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "N", Trim(TenorResumido)
                    }else {
                        $http.get('/apis/'+imp_fact_unica_na_resu_fq+'/'+variable5).success(function(data){
                            $scope.documento = data;
                            console.log('imp_fact_unica_na_resu_fq.rpt');
                        });
                        //"imp_fact_unica_na_resu_fq.rpt", "Boleta Repuestos - Servicios", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "N", Trim(TenorResumido)
                    }
                }else {
                    if (estAnulado == "S" && docAnulado == "N") {
                        if (strDocFra == 0) { // si no hay franquicia referente
                            $http.get('/apis/'+imp_fact_unica_na+'/'+variable5).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fact_unica_na.rpt');
                            });
                            //"imp_fact_unica_na.rpt", "Nota de Abono por Anulacion", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "S", "S"
                        }else {
                            $http.get('/apis/'+imp_fact_unica_na_fq+'/'+variable5).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fact_unica_na_fq.rpt');
                            });
                            //"imp_fact_unica_na_fq.rpt", "Nota de Abono por Anulacion", gEmpresa, gTienda, strTipo, dbSerie, num_doc, "S", "S"
                        }                
                    }
                }
            }else {
                if (StrProcede == "V") {
                    /*                    
                    if (strEstadoDoc == "AN") { //
                        $http.get('/apis/imp_antic_veh.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_antic_veh.rpt');
                        });
                        //"imp_antic_veh.rpt", "Anticipos", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                    }else { //
                        if (anti_documentos(num_doc,dbSerie 0) { //
                            $http.get('/apis/imp_documento_veh_abono.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_documento_veh_abono.rpt');
                            });
                            //"imp_documento_veh_abono.rpt", "Boleta de Venta", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                        }else { //
                            $http.get('/apis/imp_documento_veh_abono_ant.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_documento_veh_abono_ant.rpt');
                            });
                            //"imp_documento_veh_abono_ant.rpt", "Boleta de Venta", GSTRCodGen, GSTRCodEmp, wws_tipo_doc, wwn_ser_Doc & wwn_num_Doc & "V"
                        }
                    }
                    */
                }else {
                    if (StrProcede !== "C") {
                        if (strCoCr == "AN") {
                            $http.get('/apis/'+imp_na_anticipo_repser+'/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_na_anticipo_repser.rpt');
                            });
                            //"imp_na_anticipo_repser.rpt", "Nota de Abono ANTICIPO", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede
                        }else {
                            if (estAnulado == "S" && docAnulado == "N") { // nota de abono por anulacion                        
                                if (StrProcede == "R" && estAnulado == "S" && txtOtText !== 0) {
                                    $http.get('/apis/'+imp_na_anulacion_rep_ot+'/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_na_anulacion_rep_ot.rpt');
                                    });
                                    //"imp_na_anulacion_rep_ot.rpt", "Nota de Abono por Anulacion", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede
                                }else if ( StrProcede == "S" && estAnulado == "S" && txtOtText !== 0 ){
                                    if (txtfqText == "FQ") { //
                                        if (tipoImpresion == "R") { //
                                            $http.get('/apis/'+imp_franq_NA_lib+'/'+variable6).success(function(data){
                                                $scope.documento = data;
                                                console.log('imp_franq_NA_lib.rpt');
                                            });
                                            //imp_franq_NA_lib.rpt", "Franquicia Nota de Credito", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede
                                        }else {
                                            $http.get('/apis/'+imp_na_anulacion_ser_ot+'/'+variable6).success(function(data){
                                                $scope.documento = data;
                                                console.log('imp_na_anulacion_ser_ot.rpt');
                                            });
                                            //imp_na_anulacion_ser_ot.rpt", "Nota de Abono por Anulacion", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede
                                        }
                                    }else {
                                        $http.get('/apis/'+imp_na_anulacion_ser_ot+'/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_na_anulacion_ser_ot.rpt');
                                        });
                                        //imp_na_anulacion_ser_ot.rpt", "Nota de Abono por Anulacion", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede                                    
                                    }    
                                }else {
                                    $http.get('/apis/'+imp_na_anulacion_det+'/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_na_anulacion_det.rpt');
                                    });
                                    //imp_na_anulacion_det.rpt", "Nota de Abono por Anulacion", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede                                    
                                }
                            }else { // Nota de abono por descuento
                                $http.get('/apis/'+imp_na_descuento+'/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_na_descuento.rpt');
                                });
                                //"imp_na_descuento.rpt", "Nota de Abono por Descuento ", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede                        
                            }
                        }
                    }else {                
                        $http.get('/apis/'+imp_na_conta+'/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_na_conta.rpt');
                        });
                        //"imp_na_conta.rpt", "Nota de Abono de Contabilidad ", gEmpresa, gTienda, strTipo, dbSerie, num_doc, StrProcede, "S", "S"                
                    }
                }
            }
        }
    };
    $scope.descargar = function(documento){
        var data = new Blob([documento], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(data, 'text.txt');        
    };
});

/*
$scope.descargar = function(contenido){
    var data = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(data, 'text.txt');
    console.log(contenido); 
};
*/