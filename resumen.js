if (strTipo == "F") {
    if (sMultipleOT == "N") { //  ' Factura separada (Repuestos y Servicios)
        if (StrProcede == "R") { // ' respuestos
            if (strEstadoDoc == "AN") { //  ' Anticipo de Repuestos                
                $http.get('/apis/imp_antic_fact_lib.rpt/'+variable6).success(function(data){
                    $scope.documento = data;
                    console.log('imp_antic_fact_lib.rpt');
                });
                //"imp_antic_fact_lib.rpt", "Anticipo", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString                
            }else { //
                if (txtOT.Text == "0") { // ' Factura de mostrador
                    if (tipoImpresion == "D") { // ' impresion detallada
                        if (strDocFra == 0) { // 'si no hay franquicia referente
                            $http.get('/apis/imp_fac_rep_mos.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fac_rep_mos.rpt');
                            });
                            //"imp_fac_rep_mos.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                        }else { // Reporte que descuenta deducible
                            $http.get('/apis/imp_fac_rep_mos_fq.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fac_rep_mos_fq.rpt');
                            });
                            //"imp_fac_rep_mos_fq.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                        }
                    }else { //
                        if (tipoImpresion == "R") { //
                            if (strDocFra == 0) { // 'si no hay franquicia referente
                                $http.get('/apis/imp_fac_rep_mos.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_fac_rep_mos.rpt');
                                });
                                //"imp_fac_rep_mos.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "N" & TipString, Trim(TenorResumido) & TipString
                            }else { // Reporte que descuenta deducible
                                $http.get('/apis/imp_fac_rep_mos_fq.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_fac_rep_mos_fq.rpt');
                                });
                                //"imp_fac_rep_mos_fq.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "N" & TipString, Trim(TenorResumido) & TipString
                            }
                        }
                    }
                }else { //
                    if (txtOT.Text !== "0") { //
                        if (tipoImpresion == "D") { // ' impresion detallada
                            $http.get('/apis/imp_fac_rep_ot.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fac_rep_ot.rpt');
                            });
                            //"imp_fac_rep_ot.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                        }else { //
                            if (tipoImpresion == "R") { //
                                $http.get('/apis/imp_fac_rep_ot.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_fac_rep_ot.rpt');
                                });
                                //"imp_fac_rep_ot.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                            }
                        }
                    }
                }
            }
        }else { //
            if (StrProcede == "S") {
                if (strEstadoDoc == "AN") { // ' Anticipo de Servicios                    
                    $http.get('/apis/imp_antic_fact_lib.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_antic_fact_lib.rpt');
                    });
                    //"imp_antic_fact_lib.rpt", "Anticipo", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString                    
                }else { //
                    if (strTipoRefe == "FQ") { 
                        $http.get('/apis/imp_franq_fac_lib.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_franq_fac_lib.rpt');
                        });
                        //"imp_franq_fac_lib.rpt", "Franquicia Factura de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "N" & TipString, Trim(TenorResumido) & TipString                        
                    }else { //
                        if (strGarantia == "GR") { // 'Garantia
                            $http.get('/apis/imp_fac_ser_ot_garantia.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_fac_ser_ot_garantia.rpt');
                            });
                            //"imp_fac_ser_ot_garantia.rpt", "Factura de Garantías", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                        }else { //
                            if (tipoImpresion == "D") { //
                                $http.get('/apis/imp_fac_ser_ot.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_fac_ser_ot.rpt');
                                });
                                //"imp_fac_ser_ot.rpt", "Factura de Servicios ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                            }else { //
                                if (tipoImpresion == "R") { //
                                    $http.get('/apis/imp_fac_ser_ot.rpt/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_fac_ser_ot.rpt');
                                    });
                                    //"imp_fac_ser_ot.rpt", "Factura de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
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
                        //"imp_antic_veh.rpt", "Anticipos", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                    }else { 
                        if (anti_documentos(Me.txtdocu.ImpOut, Val(dbSerie), strTipo) == 0) { //
                            $http.get('/apis/imp_documento_veh.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_documento_veh.rpt');
                            });
                            //"imp_documento_veh.rpt", "FACTURA de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                        }else { //
                            $http.get('/apis/imp_documento_veh_ant.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_documento_veh_ant.rpt');
                            });
                            //"imp_documento_veh_ant.rpt", "FACTURA de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                        }
                    }
                    */
                    console.log('No hay vehiculos');
                }
                if (StrProcede == "C") {                    
                    $http.get('/apis/imp_fact_conta.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_fact_conta.rpt');
                    });
                    //"imp_fact_conta.rpt", "Factura de Contabilidad ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString                    
                }                
            }
        }

    }else { // ' Factura Única
        if (tipoImpresion == "D") { //
            if (strDocFra == 0) { // 'si no hay franquicia referente
                $http.get('/apis/imp_fact_unica.rpt/'+variable6).success(function(data){
                    $scope.documento = data;
                    console.log('imp_fact_unica.rpt');
                });
                //"imp_fact_unica.rpt", "Factura Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
            }else { // Reporte que descuenta deducible
                $http.get('/apis/imp_fact_unica_fq.rpt/'+variable6).success(function(data){
                    $scope.documento = data;
                    console.log('imp_fact_unica_fq.rpt');
                });
                //"imp_fact_unica_fq.rpt", "Factura Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
            }
        }else { //
            if (tipoImpresion == "R") { //
                if (strDocFra == 0) { // 'si no hay franquicia referente
                    $http.get('/apis/imp_fact_unica.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_fact_unica.rpt');
                    });
                    //"imp_fact_unica.rpt", "Factura Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                }else { // Reporte que descuenta deducible
                    $http.get('/apis/imp_fact_unica_fq.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_fact_unica_fq.rpt');
                    });
                    //"imp_fact_unica_fq.rpt", "Factura Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                }
            }
        }

    }
}else if (strTipo == "B"){
    if (sMultipleOT == "N") { // ' Boleta Independiente
        if (StrProcede == "R") { // ' Respuestos
            if (strEstadoDoc == "AN") { //  ' Anticipo de Repuestos                
                $http.get('/apis/imp_antic_bol_lib.rpt/'+variable6).success(function(data){
                    $scope.documento = data;
                    console.log('imp_antic_bol_lib.rpt');
                });
                //"imp_antic_bol_lib.rpt", "Anticipo", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString                
            }else { //
                if (txtOT.Text == "0") { // ' Boleta de mostrador
                    if (tipoImpresion == "D") { //
                        $http.get('/apis/imp_bol_rep_mos.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_bol_rep_mos.rpt');
                        });
                        //"imp_bol_rep_mos.rpt", "Boleta de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                    }else { //
                        $http.get('/apis/imp_bol_rep_mos.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_bol_rep_mos.rpt');
                        });
                        //"imp_bol_rep_mos.rpt", "Boleta de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "N" & TipString, Trim(TenorResumido) & TipString
                    }

                }else { // ' Con Boleta de OT
                    if (tipoImpresion == "D") { //
                        $http.get('/apis/imp_bol_rep_ot.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_bol_rep_ot.rpt');
                        });
                        //"imp_bol_rep_ot.rpt", "Boleta de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                    }else { //
                        $http.get('/apis/imp_bol_rep_ot.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_bol_rep_ot.rpt');
                        });
                        //"imp_bol_rep_ot.rpt", "Boleta de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                    }
                }

            }

        }else { // ' Servicios
            if (StrProcede == "S") { // ' Servicios
                if (strEstadoDoc == "AN") { //  ' Anticipo de Servicios                    
                    $http.get('/apis/imp_antic_bol_lib.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_antic_bol_lib.rpt');
                    });
                    //"imp_antic_bol_lib.rpt", "Anticipo", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString                    
                }else { //
                    if (strTipoRefe == "FQ") { //
                        $http.get('/apis/imp_franq_bol_lib.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_franq_bol_lib.rpt');
                        });
                        //"imp_franq_bol_lib.rpt", "Franquicia Boleta de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString                        
                    }else { //
                        if (txtOT.Text !== "0") { // ' boleta servicios con OT
                            if (tipoImpresion == "D") { // ' detallada
                                $http.get('/apis/imp_bol_ser_ot.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_bol_ser_ot.rpt');
                                });
                                //"imp_bol_ser_ot.rpt", "Boleta de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                            }else { //
                                $http.get('/apis/imp_bol_ser_ot.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_bol_ser_ot.rpt');
                                });
                                //"imp_bol_ser_ot.rpt", "Boleta de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                            }
                        }else { //
                            if (strGarantia == "GR") { // 'Garantia
                                $http.get('/apis/imp_fac_ser_ot_garantia.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_fac_ser_ot_garantia.rpt');
                                });
                                //"imp_fac_ser_ot_garantia.rpt", "Boleta de Garantías", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                            }
                        }
                    }
                }
            }else { //
                if (StrProcede == "V") { //                    
                    if (strEstadoDoc == "AN") { //
                        $http.get('/apis/imp_antic_veh.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_antic_veh.rpt');
                        });
                        //"imp_antic_veh.rpt", "Anticipos", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                    }else { /*
                        if (anti_documentos(Me.txtdocu.ImpOut, Val(dbSerie), strTipo) == 0) { //
                            $http.get('/apis/imp_documento_veh.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_documento_veh.rpt');
                            });
                            //"imp_documento_veh.rpt", "Boleta de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                        }else { //
                            $http.get('/apis/imp_documento_veh_Ant.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_documento_veh_Ant.rpt');
                            });
                            //"imp_documento_veh_Ant.rpt", "Boleta de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                        }
                    }
                }
                if (StrProcede == "C") { //
                    if (MsgBox("Desea imprimir Boleta de Contabilidad?  ", vbQuestion + vbYesNo, Me.Caption) == vbYes) { //
                        $http.get('/apis/imp_bol_conta.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_bol_conta.rpt');
                        });
                        //"imp_bol_conta.rpt", "Boleta de Contabilidad ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                    }
                }

            }

        }
    }else { //  ' Boleta Única
        if (tipoImpresion == "D") { //
            $http.get('/apis/imp_bol_unica.rpt/'+variable6).success(function(data){
                $scope.documento = data;
                console.log('imp_bol_unica.rpt');
            });
            //"imp_bol_unica.rpt", "Boleta Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
        }else { //
            if (tipoImpresion == "R") { //
                $http.get('/apis/imp_bol_unica.rpt/'+variable6).success(function(data){
                    $scope.documento = data;
                    console.log('imp_bol_unica.rpt');
                });
                //"imp_bol_unica.rpt", "Boleta Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
            }
        }
    }
}else if (strTipo == "A") {
    if (sMultipleOT == "S") { //
        if (tipoImpresion == "R") { //
            if (strDocFra == 0) { // 'si no hay franquicia referente
                $http.get('/apis/imp_fact_unica_na_resu.rpt/'+variable6).success(function(data){
                    $scope.documento = data;
                    console.log('imp_fact_unica_na_resu.rpt');
                });
                //"imp_fact_unica_na_resu.rpt", "Boleta Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
            }else { //
                $http.get('/apis/imp_fact_unica_na_resu_fq.rpt/'+variable6).success(function(data){
                    $scope.documento = data;
                    console.log('imp_fact_unica_na_resu_fq.rpt');
                });
                //"imp_fact_unica_na_resu_fq.rpt", "Boleta Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
            }
        }else { //
            if (estAnulado == "S"
                And docAnulado == "N") { //
                if (MsgBox("Desea Confirmar impresion de nota de abono?  ", vbQuestion + vbYesNo, Me.Caption) == vbYes) { //
                    if (strDocFra == 0) { // 'si no hay franquicia referente
                        $http.get('/apis/imp_fact_unica_na.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_fact_unica_na.rpt');
                        });
                        //"imp_fact_unica_na.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                    }else { //
                        $http.get('/apis/imp_fact_unica_na_fq.rpt/'+variable6).success(function(data){
                            $scope.documento = data;
                            console.log('imp_fact_unica_na_fq.rpt');
                        });
                        //"imp_fact_unica_na_fq.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                    }
                }
            }
        }
    }else { //
        if (StrProcede == "V") { //
            wwn_ser_Doc == Val(dbSerie)
            wwn_num_Doc == Val(Me.txtdocu.ImpOut)
            wws_tipo_doc == strTipo
            if (strEstadoDoc == "AN") { //
                $http.get('/apis/imp_antic_veh.rpt/'+variable6).success(function(data){
                    $scope.documento = data;
                    console.log('imp_antic_veh.rpt');
                });
                //"imp_antic_veh.rpt", "Anticipos", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
            }else { //
                if (anti_documentos(Val(Me.txtdocu.ImpOut), Val(dbSerie), strTipo) == 0) { //
                    $http.get('/apis/imp_documento_veh_abono.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_documento_veh_abono.rpt');
                    });
                    //"imp_documento_veh_abono.rpt", "Boleta de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                }else { //
                    $http.get('/apis/imp_documento_veh_abono_ant.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_documento_veh_abono_ant.rpt');
                    });
                    //"imp_documento_veh_abono_ant.rpt", "Boleta de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                }
            }
        }else { //
            if (StrProcede !== "C") { //
                if (strCoCr == "AN") { //
                    $http.get('/apis/imp_na_anticipo_repser.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_na_anticipo_repser.rpt');
                    });
                    //"imp_na_anticipo_repser.rpt", "Nota de Abono ANTICIPO", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                }else { //
                    if (estAnulado == "S"
                        And docAnulado == "N") { // ' nota de abono por anulacion
                        if (MsgBox("Desea Confirmar impresion de nota de abono?  ", vbQuestion + vbYesNo, Me.Caption) == vbYes) { //
                            if ((StrProcede == "R") And estAnulado == "S"
                                And Null_Num(txtOT.Text) !== 0) { //
                                $http.get('/apis/imp_na_anulacion_rep_ot.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_na_anulacion_rep_ot.rpt');
                                });
                                //"imp_na_anulacion_rep_ot.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                            }else { //if( (StrProcede == "S") And estAnulado == "S" And Null_Num(txtOT.Text) <> 0 ){ //
                                if (txtfq.Text == "FQ") { //
                                    if (tipoImpresion == "R") { //
                                        $http.get('/apis/imp_franq_NA_lib.rpt/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_franq_NA_lib.rpt');
                                        });
                                        //"imp_franq_NA_lib.rpt", "Franquicia Nota de Credito", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                                    }else { //
                                        $http.get('/apis/imp_na_anulacion_ser_ot.rpt/'+variable6).success(function(data){
                                            $scope.documento = data;
                                            console.log('imp_na_anulacion_ser_ot.rpt');
                                        });
                                        //"imp_na_anulacion_ser_ot.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                                    }
                                }else { //
                                    $http.get('/apis/imp_na_anulacion_ser_ot.rpt/'+variable6).success(function(data){
                                        $scope.documento = data;
                                        console.log('imp_na_anulacion_ser_ot.rpt');
                                    });
                                    //"imp_na_anulacion_ser_ot.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                                }
                            }else { //
                                $http.get('/apis/imp_na_anulacion_det.rpt/'+variable6).success(function(data){
                                    $scope.documento = data;
                                    console.log('imp_na_anulacion_det.rpt');
                                });
                                //"imp_na_anulacion_det.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                            }
                        }
                    }else { // ' Nota de abono por descuento
                        if (MsgBox("Desea Confirmar impresion de nota de abono?  ", vbQuestion + vbYesNo, Me.Caption) == vbYes) { //
                            $http.get('/apis/imp_na_descuento.rpt/'+variable6).success(function(data){
                                $scope.documento = data;
                                console.log('imp_na_descuento.rpt');
                            });
                            //"imp_na_descuento.rpt", "Nota de Abono por Descuento ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                        }
                    }
                }
            }else { //
                if (MsgBox("Desea imprimir Nota de Abono de Contabilidad?  ", vbQuestion + vbYesNo, Me.Caption) == vbYes) { //
                    $http.get('/apis/imp_na_conta.rpt/'+variable6).success(function(data){
                        $scope.documento = data;
                        console.log('imp_na_conta.rpt');
                    });
                    //"imp_na_conta.rpt", "Nota de Abono de Contabilidad ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                }
            }
        }
    }
}


