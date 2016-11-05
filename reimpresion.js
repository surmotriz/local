/*
var imp_antic_fact_lib.rpt = 'impresion_anticipo_sinot';
var imp_fac_rep_mos.rpt = 'imprime_rep_mostrador';
var imp_fac_rep_mos_fq.rpt = 'imprime_rep_mostrador';
var imp_fac_rep_ot.rpt = 'imprime_fac_rep_ot';
var imp_franq_fac_lib.rpt = 'impresion_franquicias';
var imp_fac_ser_ot_garantia.rpt = 'imprime_fac_ser_ot';
var imp_fac_ser_ot.rpt = 'imprime_fac_ser_ot';
var imp_fact_conta.rpt = 'imprime_fac_contabilidad';
var imp_fact_unica.rpt = 'imprime_fac_repser_ot';
var imp_fact_unica_fq.rpt = 'imprime_fac_repser_ot';
var imp_antic_bol_lib.rpt = 'impresion_anticipo_sinot';
var imp_franq_bol_lib.rpt = 'impresion_franquicias';
var imp_bol_ser_ot.rpt = 'imprime_fac_ser_ot';
var imp_bol_rep_mos.rpt = 'imprime_rep_mostrador';
var imp_bol_rep_ot.rpt = 'imprime_fac_rep_ot';
var imp_bol_conta.rpt = 'imprime_fac_contabilidad';
var imp_bol_unica.rpt = 'imprime_fac_repser_ot';
var imp_fact_unica_na_resu.rpt = 'imprime_fac_repser_ot';
var imp_fact_unica_na_resu_fq.rpt = 'imprime_fac_repser_ot';
var imp_fact_unica_na.rpt = 'imprime_fac_repser_ot';
var imp_fact_unica_na_fq.rpt = 'imprime_fac_repser_ot';
var imp_na_anticipo_repser.rpt = 'imp_na_anticipo_repser';
var imp_na_anulacion_rep_ot.rpt = 'imprime_na_anulacion_rep_ot';
var imp_franq_na_lib.rpt = 'impresion_franquicias_na';
var imp_na_anulacion_ser_ot.rpt = 'imprime_na_anulacion_ser_ot';
var imp_na_anulacion_det.rpt = 'imprime_na_descuento_det';
var imp_na_descuento.rpt = 'impresion_na_descuento';
var imp_na_conta.rpt = 'imprime_fac_contabilidad';


impresion_anticipo_sinot 
impresion_franquicias
imprime_fac_ser_ot
imprime_rep_mostrador
imprime_fac_rep_ot
imprime_fac_repser_ot 5
imp_na_anticipo_repser
imprime_na_anulacion_rep_ot
impresion_franquicias_na 0
imprime_na_anulacion_ser_ot
imprime_na_descuento_det 0
impresion_na_descuento
imprime_fac_contabilidad
*/

Dim StrProcede As String
Dim strTipo As String
Dim sClaDoc As String
Dim dbSerie As String
Dim sMultipleOT  As String
Dim nSerRef  As String
Dim Desc_Documento  As String
Dim strEstadoDoc As String
Dim bolProcesa As Boolean
Dim tipoImpresion As String
Dim TenorResumido As String
Dim docAnulado As String
Dim estAnulado As String
Dim strTipoRefe As String
Dim strCoCr As String
Dim strDocFra As Integer 'declara variable de franquicia
Dim strGarantia As String

Function anti_documentos(Docu As Long, ser As Long, tipo As String) As Integer
    Dim RsAnt As New Recordset
    RsAnt.Open "select COUNT(*) from  REFERENCIA_ANTICIPO WHERE C_n_NUM_DOC=" & Docu & " AND C_N_SER_dOC=" & ser & " AND C_C_EMP_GEN='" & GSTRCodGen & "' AND C_C_COD_TIE='" & GSTRCodEmp & "'", CnxDti
    anti_documentos = RsAnt(0)
    Set RsAnt = Nothing
End Function

Private Sub cmdBuscarDoc_Click()
    If Me.txtdocu.ImpOut = "" Then
        MsgBox "Ingrese Nro de Documento a consultar"
        Exit Sub
    End If
    frmDocumentos.NroDoc = Val(Trim(Me.txtdocu.ImpOut))
    
    If frmDocumentos.NroDocumentos = 0 Then
        MsgBox "No existen Documentos generados con este número.   ", vbExclamation, "Aviso"
        txtdocu.ImpOut = ""
        txtdocu.SetFocus
        Exit Sub
    End If
    frmDocumentos.Show vbModal
    If frmDocumentos.Procesa = False Then
        txtdocu.SetFocus
        Exit Sub
    End If
    
    StrProcede = Mid(frmDocumentos.proced_Documento, 1, 1)
    Desc_Documento = frmDocumentos.Desc_Documento
    strTipo = frmDocumentos.tipo_Documento
    sClaDoc = frmDocumentos.Clase_Documento
    dbSerie = frmDocumentos.Serie_Documento
    strTipo = IIf(strTipo = "N", "A", strTipo)
    sMultipleOT = frmDocumentos.es_multiple_Documento
    strEstadoDoc = frmDocumentos.Estado_Documento
    strTipoRefe = frmDocumentos.Tipo_Ref_Documento
    nSerRef = IIf(strTipo = "A", 0, dbSerie)
    strCoCr = frmDocumentos.cr_co
    buscaDocumento
End Sub

Private Sub buscaDocumento()
    Dim RsDoc As New Recordset
    Dim Rs As New ADODB.Recordset
    Rs.Open "select cdg_num_doc, cdg_imp_sn,cdg_fec_gen,cdg_ord_tra,cdg_doc_cli,cdg_gui_rem, cdg_nom_cli, cdg_dir_cli, " & _
    " cdg_fec_ven,cdg_tip_cam,cdg_tip_ref,cdg_doc_ref,cdg_not_001,cdg_not_002,cdg_not_003,cdg_not_004,cdg_tip_imp, cdg_ten_res, " & _
    " decode(cdg_tip_cam,0,cdg_vvp_tot,cdg_vvp_dol) bruto, " & _
    " decode(cdg_tip_cam,0,cdg_des_tot,cdg_des_dol) descuento, " & _
    " decode(cdg_tip_cam,0,cdg_vvp_tot-cdg_des_tot,cdg_vvp_dol-cdg_des_dol) neto, " & _
    " decode(cdg_tip_cam,0,cdg_igv_tot,cdg_igv_dol) igv, " & _
    " decode(cdg_tip_cam,0,cdg_vvp_tot-cdg_des_tot+cdg_igv_tot,cdg_vvp_dol-cdg_des_dol+cdg_igv_dol) total, cdg_anu_sn, cdg_doc_anu, " & _
    " nvl(cdg_tot_fra,0) deducible, decode(cdg_tip_cam,0,cdg_vvp_tot-cdg_des_tot+cdg_igv_tot,cdg_vvp_dol-cdg_des_dol+cdg_igv_dol)-nvl(cdg_tot_fra,0) total_gen, " & _
    " nvl(cdg_doc_fra,0) cdg_doc_fra, cdg_tip_fra, nvl(cdg_ser_fra,0) cdg_ser_fra, cdg_co_cc " & _
    " from cab_doc_gen where cdg_cod_gen='" & gEmpresa & "' and cdg_cod_emp='" & gTienda & "' and cdg_cla_doc='" & sClaDoc & "' and cdg_num_doc=" & Val(txtdocu.ImpOut) & " and cdg_tip_doc='" & strTipo & "' and cdg_ser_doc='" & Val(Trim(dbSerie)) & "' and cdg_pro_doc='" & StrProcede & "' ", CnxDti, adOpenForwardOnly, adLockReadOnly
    
    If Rs.EOF Then
        MsgBox "Codigo de Documento no existe", vbExclamation, "Notificacion"
        Exit Sub
    End If
    If Null_Cad(Rs!cdg_imp_sn) = "S" Then
        Me.lblDesDocumento.Caption = Desc_Documento & " - " & IIf(Null_Cad(Rs!cdg_co_cc) = "GR", "Garantía", frmDocumentos.proced_Documento) & " - " & strEstadoDoc
        Me.lblDesDocumento.Visible = True
        Me.txtFecGen.Text = Null_Cad(Format(Rs!cdg_fec_gen, "DD/MM/YYYY"))
        Me.txtOT.Text = Null_Num(Rs!cdg_ord_tra)
        Me.txtDocIdent.Text = Null_Num(Rs!cdg_doc_cli)
        Me.txtGuia.Text = Null_Num(Rs!cdg_gui_rem)
        Me.txtNombre.Text = Null_Cad(Rs!cdg_nom_cli)
        Me.txtDireccion.Text = Null_Cad(Rs!cdg_dir_cli)
        Me.txtFecVenc.Text = Null_Cad(Format(Rs!cdg_fec_ven, "DD/MM/YYYY"))
        Me.txtTipCambio.Text = Null_Num(Rs!cdg_tip_cam)
        Me.txtMoneda.Text = IIf(Null_Num(Rs!cdg_tip_cam) = 0, "Soles", "Dolares")
        Me.txtTipRef.Text = Null_Cad(Rs!cdg_tip_Ref)
        Me.txtDocRef.Text = Null_Num(Rs!cdg_doc_ref)
        
        Me.txtSerieRef.Text = frmDocumentos.Serie_Ref_Documento
        Me.txtSerie.Text = frmDocumentos.Serie_Documento
        
        Me.txtNota1.Text = UCase(Null_Cad(Rs!cdg_not_001))
        Me.txtNota2.Text = UCase(Null_Cad(Rs!cdg_not_002))
        Me.txtNota3.Text = UCase(Null_Cad(Rs!cdg_not_003))
        Me.txtNota4.Text = UCase(Null_Cad(Rs!cdg_not_004))
        
        Me.txtTotalBruto.Text = FormatNumber(Null_Num(Rs!bruto), 2)
        Me.txtTotalDscto.Text = FormatNumber(Null_Num(Rs!descuento), 2)
        Me.txtTotalNeto.Text = FormatNumber(Null_Num(Rs!neto), 2)
        Me.txtTotalIGV.Text = FormatNumber(Null_Num(Rs!Igv), 2)
        Me.txtTotalGen.Text = FormatNumber(Null_Num(Rs!total), 2)
        Me.txtDsctoDedu.Text = FormatNumber(Null_Num(Rs!deducible), 2) 'almacena total de la franquicia referente
        Me.txtTotal.Text = FormatNumber(Null_Num(Rs!total_gen), 2) 'total general
        
        docAnulado = Null_Cad(Rs!cdg_doc_anu)
        estAnulado = Null_Cad(Rs!cdg_anu_sn)
        
        tipoImpresion = Trim(Null_Cad(Rs!cdg_tip_imp))
        TenorResumido = Trim(Null_Cad(Rs!cdg_ten_res))
        
        strDocFra = Null_Num(Rs!cdg_doc_fra) 'almacena el nro de la franquicia referente
        
        Me.txtTipFra.Text = Null_Cad(Rs!cdg_tip_fra) 'Tipo de documento de franquicia referente
        Me.txtSerieFra.Text = Null_Num(Rs!cdg_ser_fra) 'Serie de franquicia referente
        Me.txtDocFra.Text = strDocFra
        
        strGarantia = Null_Cad(Rs!cdg_co_cc) 'indicador de facturación por garantía
        
        If Trim(Null_Cad(Rs!cdg_tip_imp)) = "R" Then
            Me.lblTipoImpresion.Caption = "Impresion Resumida"
        Else
            Me.lblTipoImpresion.Caption = "Impresion Detallada"
        End If
        
        Me.txtdocu.Enabled = False
        Me.cmdBuscarDoc.Enabled = False
        Me.fraDocumento.Caption = Me.fraDocumento.Caption & " NRO " & Null_Num(Rs!cdg_num_doc)
        bolProcesa = True
        txtfq.Text = ""
        If strTipo = "A" Then
            If RsDoc.State = 1 Then RsDoc.Close
            RsDoc.Open "select * from cab_doc_gen where cdg_cod_gen='" & gEmpresa & "' and cdg_cod_emp='" & gTienda & "' and cdg_tip_Doc='" & Mid(Null_Cad(Rs!cdg_tip_Ref), 1, 1) & "' and cdg_num_doc=" & Null_Num(Rs!cdg_doc_ref) & " and  cdg_Ser_doc=" & frmDocumentos.Serie_Ref_Documento, CnxDti
            If Not RsDoc.EOF Then
                txtfq.Text = Null_Cad(RsDoc!cdg_tip_Ref)
            End If
            Set RsDoc = Nothing
        End If
    Else
        MsgBox "Código de Documento todavía no se ha impreso", vbExclamation, "Notificacion"
        Me.txtdocu.SetFocus
        bolProcesa = False
        Exit Sub
    End If
        Set Rs = Nothing
End Sub

Private Sub cmdNotas_Click()
 If Not Me.frmNotas.Visible Then
    Me.frmNotas.Visible = True
 Else
    Me.frmNotas.Visible = False
 End If
End Sub

Private Sub Form_Activate()
    Me.txtdocu.SetFocus
    bolProcesa = False
End Sub

Private Sub Form_Load()
   Me.ocTool1.OcultarBoton 1, 2, 3
   Me.ocTool1.Tamanho Me.Width
   Me.Width = 8610
   Me.Height = 7980
   Me.Left = 30
   Me.Top = 30
End Sub

Private Sub ocTool1_Click(ByVal ButtonIndex As Long)
    Select Case ButtonIndex
        Case 4:
               Me.txtdocu.Enabled = True
               Me.cmdBuscarDoc.Enabled = True
               Me.txtdocu.SetFocus
               limpiarControles
               txtfq.Text = ""
        Case 5:
              ImprimirDocumentoz
        Case 6: Unload Me
    End Select
End Sub

Private Sub ImprimirDocumento()
  If bolProcesa = True Then
    If strTipo = "F" Then
        imprimirFactura
    Else
      If strTipo = "B" Then
        imprimirBoleta
      Else
        If strTipo = "A" Then
           imprimirNotaAbono
        End If
      End If
    End If
  Else
    MsgBox "No se cargado ningun documento para imprimir", vbInformation, "Reimpresion de Documento"
    Exit Sub
  End If
End Sub

Private Sub imprimirNotaAbono()
    Dim impr As New CLsGen
    If sMultipleOT = "S" Then
        If tipoImpresion = "R" Then
            If strDocFra = 0 Then 'si no hay franquicia referente
                impr.ExecReportParam GRutaReporte, "imp_fact_unica_na_resu.rpt", "Boleta Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
            Else
                impr.ExecReportParam GRutaReporte, "imp_fact_unica_na_resu_fq.rpt", "Boleta Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
            End If
        Else
            If estAnulado = "S" And docAnulado = "N" Then
                If MsgBox("Desea Confirmar impresion de nota de abono?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                    If strDocFra = 0 Then 'si no hay franquicia referente
                        impr.ExecReportParam GRutaReporte, "imp_fact_unica_na.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                    Else
                        impr.ExecReportParam GRutaReporte, "imp_fact_unica_na_fq.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                    End If
                End If
            End If
        End If
    Else
        If StrProcede = "V" Then
            wwn_ser_Doc = Val(dbSerie)
            wwn_num_Doc = Val(Me.txtdocu.ImpOut)
            wws_tipo_doc = strTipo
            If UCase(Mid(strEstadoDoc, 1, 2)) = "AN" Then
                impr.ExecReportParam GRutaReporte, "imp_antic_veh.rpt", "Anticipos", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
            Else
                If anti_documentos(Val(Me.txtdocu.ImpOut), Val(dbSerie), strTipo) = 0 Then
                    impr.ExecReportParam GRutaReporte, "imp_documento_veh_abono.rpt", "Boleta de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                Else
                    impr.ExecReportParam GRutaReporte, "imp_documento_veh_abono_ant.rpt", "Boleta de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                End If
            End If
        Else
            If StrProcede <> "C" Then
                If strCoCr = "AN" Then
                    impr.ExecReportParam GRutaReporte, "imp_na_anticipo_repser.rpt", "Nota de Abono ANTICIPO", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                Else
                    If estAnulado = "S" And docAnulado = "N" Then ' nota de abono por anulacion
                      If MsgBox("Desea Confirmar impresion de nota de abono?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                         If (StrProcede = "R") And estAnulado = "S" And Null_Num(txtOT.Text) <> 0 Then
                            impr.ExecReportParam GRutaReporte, "imp_na_anulacion_rep_ot.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                         ElseIf (StrProcede = "S") And estAnulado = "S" And Null_Num(txtOT.Text) <> 0 Then
                            If txtfq.Text = "FQ" Then
                                If tipoImpresion = "R" Then
                                    impr.ExecReportParam GRutaReporte, "imp_franq_NA_lib.rpt", "Franquicia Nota de Credito", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                                Else
                                    impr.ExecReportParam GRutaReporte, "imp_na_anulacion_ser_ot.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                                End If
                            Else
                                impr.ExecReportParam GRutaReporte, "imp_na_anulacion_ser_ot.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                            End If
                         Else
                            impr.ExecReportParam GRutaReporte, "imp_na_anulacion_det.rpt", "Nota de Abono por Anulacion", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                         End If
                      End If
                    Else ' Nota de abono por descuento
                      If MsgBox("Desea Confirmar impresion de nota de abono?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                         impr.ExecReportParam GRutaReporte, "imp_na_descuento.rpt", "Nota de Abono por Descuento ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                      End If
                    End If
                End If
            Else
                    If MsgBox("Desea imprimir Nota de Abono de Contabilidad?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                      impr.ExecReportParam GRutaReporte, "imp_na_conta.rpt", "Nota de Abono de Contabilidad ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                    End If
            End If
        End If
    End If
End Sub

Private Sub imprimirBoleta()
    Dim impr As New CLsGen
      
    If sMultipleOT = "N" Then ' Boleta Independiente
      If StrProcede = "R" Then ' Respuestos
          If UCase(Mid(strEstadoDoc, 1, 2)) = "AN" Then  ' Anticipo de Repuestos
              If MsgBox("Desea Confirmar impresion de anticipo?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                 impr.ExecReportParam GRutaReporte, "imp_antic_bol_lib.rpt", "Anticipo", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
              End If
          Else
             If Trim(Me.txtOT.Text) = "0" Then ' Boleta de mostrador
                If tipoImpresion = "D" Then
                   impr.ExecReportParam GRutaReporte, "imp_bol_rep_mos.rpt", "Boleta de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                Else
                   impr.ExecReportParam GRutaReporte, "imp_bol_rep_mos.rpt", "Boleta de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "N" & TipString, Trim(TenorResumido) & TipString
                End If
             
             Else ' Con Boleta de OT
                If tipoImpresion = "D" Then
                   impr.ExecReportParam GRutaReporte, "imp_bol_rep_ot.rpt", "Boleta de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                Else
                   impr.ExecReportParam GRutaReporte, "imp_bol_rep_ot.rpt", "Boleta de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                End If
             End If
              
           End If
      
      Else ' Servicios
          If StrProcede = "S" Then ' Servicios
              If UCase(Mid(strEstadoDoc, 1, 2)) = "AN" Then  ' Anticipo de Servicios
                 If MsgBox("Desea Confirmar impresion de anticipo?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                   impr.ExecReportParam GRutaReporte, "imp_antic_bol_lib.rpt", "Anticipo", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                 End If
              Else
                  If Trim(strTipoRefe) = "FQ" Then
                           If MsgBox("Desea Confirmar impresion de Franquicia?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                              impr.ExecReportParam GRutaReporte, "imp_franq_bol_lib.rpt", "Franquicia Boleta de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                           End If
                  Else
                            If Trim(Me.txtOT.Text) <> "0" Then ' boleta servicios con OT
                                 If tipoImpresion = "D" Then ' detallada
                                   impr.ExecReportParam GRutaReporte, "imp_bol_ser_ot.rpt", "Boleta de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                                 Else
                                   impr.ExecReportParam GRutaReporte, "imp_bol_ser_ot.rpt", "Boleta de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                                 End If
                            Else
                                If strGarantia = "GR" Then 'Garantia
                                   impr.ExecReportParam GRutaReporte, "imp_fac_ser_ot_garantia.rpt", "Boleta de Garantías", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                                End If
                            End If
                  End If
               End If
          Else
            If StrProcede = "V" Then
                wwn_ser_Doc = Val(dbSerie)
                wwn_num_Doc = Val(Me.txtdocu.ImpOut)
                wws_tipo_doc = strTipo
                If UCase(Mid(strEstadoDoc, 1, 2)) = "AN" Then
                            impr.ExecReportParam GRutaReporte, "imp_antic_veh.rpt", "Anticipos", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                Else
                    If anti_documentos(Me.txtdocu.ImpOut, Val(dbSerie), strTipo) = 0 Then
                        impr.ExecReportParam GRutaReporte, "imp_documento_veh.rpt", "Boleta de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                    Else
                        impr.ExecReportParam GRutaReporte, "imp_documento_veh_Ant.rpt", "Boleta de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                    End If
                End If
            End If
            If StrProcede = "C" Then
                If MsgBox("Desea imprimir Boleta de Contabilidad?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                  impr.ExecReportParam GRutaReporte, "imp_bol_conta.rpt", "Boleta de Contabilidad ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                End If
            End If
            
          End If
          
      End If
    Else  ' Boleta Única
        If tipoImpresion = "D" Then
            impr.ExecReportParam GRutaReporte, "imp_bol_unica.rpt", "Boleta Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
        Else
            If tipoImpresion = "R" Then
               impr.ExecReportParam GRutaReporte, "imp_bol_unica.rpt", "Boleta Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
            End If
        End If
    End If
    
End Sub

Private Sub imprimirFactura()
  Dim impr As New CLsGen
    If sMultipleOT = "N" Then  ' Factura separada (Repuestos y Servicios)
        If StrProcede = "R" Then ' respuestos
           
           If UCase(Mid(strEstadoDoc, 1, 2)) = "AN" Then  ' Anticipo de Repuestos
                
                If MsgBox("Desea Confirmar impresion de anticipo?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                       impr.ExecReportParam GRutaReporte, "imp_antic_fact_lib.rpt", "Anticipo", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                End If
             
           Else
                If Trim(Me.txtOT.Text) = "0" Then ' Factura de mostrador
                   If tipoImpresion = "D" Then ' impresion detallada
                        If strDocFra = 0 Then 'si no hay franquicia referente
                            impr.ExecReportParam GRutaReporte, "imp_fac_rep_mos.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                        Else
                            'Reporte que descuenta deducible
                            impr.ExecReportParam GRutaReporte, "imp_fac_rep_mos_fq.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                        End If
                   Else
                        If tipoImpresion = "R" Then
                            If strDocFra = 0 Then 'si no hay franquicia referente
                                impr.ExecReportParam GRutaReporte, "imp_fac_rep_mos.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "N" & TipString, Trim(TenorResumido) & TipString
                            Else
                                'Reporte que descuenta deducible
                                impr.ExecReportParam GRutaReporte, "imp_fac_rep_mos_fq.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "N" & TipString, Trim(TenorResumido) & TipString
                            End If
                        End If
                   End If
                Else
                   If Trim(Me.txtOT.Text) <> "0" Then
                         If tipoImpresion = "D" Then ' impresion detallada
                            impr.ExecReportParam GRutaReporte, "imp_fac_rep_ot.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                        Else
                          If tipoImpresion = "R" Then
                            impr.ExecReportParam GRutaReporte, "imp_fac_rep_ot.rpt", "Factura de Repuestos", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                          End If
                        End If
                    
                    End If
                 
                End If
             
           End If
           
        Else
             If StrProcede = "S" Then
               If UCase(Mid(strEstadoDoc, 1, 2)) = "AN" Then ' Anticipo de Servicios
                   If MsgBox("Desea Confirmar impresion de anticipo?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                          impr.ExecReportParam GRutaReporte, "imp_antic_fact_lib.rpt", "Anticipo", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString
                   End If
               Else
                  If Trim(strTipoRefe) = "FQ" Then
                                    
                           If MsgBox("Desea Confirmar impresion de Franquicia?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                              impr.ExecReportParam GRutaReporte, "imp_franq_fac_lib.rpt", "Franquicia Factura de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "N" & TipString, Trim(TenorResumido) & TipString
                           End If
                                    
                   Else
                        If strGarantia = "GR" Then 'Garantia
                            impr.ExecReportParam GRutaReporte, "imp_fac_ser_ot_garantia.rpt", "Factura de Garantías", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                        Else
                            If tipoImpresion = "D" Then
                                impr.ExecReportParam GRutaReporte, "imp_fac_ser_ot.rpt", "Factura de Servicios ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
                            Else
                                If tipoImpresion = "R" Then
                                    impr.ExecReportParam GRutaReporte, "imp_fac_ser_ot.rpt", "Factura de Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, StrProcede & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
                                End If
                            End If
                        End If
                   End If
               
               End If
            
            Else
                If StrProcede = "V" Then
                    wwn_ser_Doc = Val(dbSerie)
                    wwn_num_Doc = Val(Me.txtdocu.ImpOut)
                    wws_tipo_doc = strTipo
                    If UCase(Mid(strEstadoDoc, 1, 2)) = "AN" Then
                                impr.ExecReportParam GRutaReporte, "imp_antic_veh.rpt", "Anticipos", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                    Else
                        If anti_documentos(Me.txtdocu.ImpOut, Val(dbSerie), strTipo) = 0 Then
                            impr.ExecReportParam GRutaReporte, "imp_documento_veh.rpt", "FACTURA de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                        Else
                            impr.ExecReportParam GRutaReporte, "imp_documento_veh_ant.rpt", "FACTURA de Venta", GSTRCodGen & TipString, GSTRCodEmp & TipString, wws_tipo_doc & TipString, wwn_ser_Doc & TipNumeric, wwn_num_Doc & TipNumeric, "V" & TipString
                        End If
                    End If
                End If
                If StrProcede = "C" Then
                        If MsgBox("Desea imprimir Factura de Contabilidad?  ", vbQuestion + vbYesNo, Me.Caption) = vbYes Then
                          impr.ExecReportParam GRutaReporte, "imp_fact_conta.rpt", "Factura de Contabilidad ", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, StrProcede & TipString, "S" & TipString, "S" & TipString
                        End If
                End If
            End If
        
        End If
    
    Else ' Factura Única
         If tipoImpresion = "D" Then
            If strDocFra = 0 Then 'si no hay franquicia referente
               impr.ExecReportParam GRutaReporte, "imp_fact_unica.rpt", "Factura Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
            Else
               'Reporte que descuenta deducible
               impr.ExecReportParam GRutaReporte, "imp_fact_unica_fq.rpt", "Factura Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "S" & TipString, "S" & TipString
            End If
         Else
            If tipoImpresion = "R" Then
               If strDocFra = 0 Then 'si no hay franquicia referente
                  impr.ExecReportParam GRutaReporte, "imp_fact_unica.rpt", "Factura Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
               Else
                  'Reporte que descuenta deducible
                  impr.ExecReportParam GRutaReporte, "imp_fact_unica_fq.rpt", "Factura Repuestos - Servicios", gEmpresa & TipString, gTienda & TipString, strTipo & TipString, Val(dbSerie) & TipNumeric, Val(Me.txtdocu.ImpOut) & TipNumeric, "N" & TipString, Trim(TenorResumido) & TipString
               End If
            End If
         End If
        
    End If
End Sub

Private Sub limpiarControles()
    
        Me.txtFecGen.Text = ""
        Me.txtOT.Text = ""
        Me.txtDocIdent.Text = ""
        Me.txtGuia.Text = ""
        Me.txtNombre.Text = ""
        Me.txtDireccion.Text = ""
        Me.txtFecVenc.Text = ""
        Me.txtTipCambio.Text = ""
        Me.txtMoneda.Text = ""
        Me.txtTipRef.Text = ""
        Me.txtDocRef.Text = ""
        
        Me.txtSerieRef.Text = ""
        Me.txtSerie.Text = ""
        
        Me.txtNota1.Text = ""
        Me.txtNota2.Text = ""
        Me.txtNota3.Text = ""
        Me.txtNota4.Text = ""
        
        Me.txtTotalBruto.Text = ""
        Me.txtTotalDscto.Text = ""
        Me.txtTotalNeto.Text = ""
        Me.txtTotalIGV.Text = ""
        Me.txtTotalGen.Text = ""
        
        Me.lblTipoImpresion.Caption = "Tipo de Impresion"
        Me.lblDesDocumento.Caption = ""
        Me.lblDesDocumento.Visible = False
        Me.txtdocu.ImpOut = ""
        Me.txtdocu.SetFocus
        Me.fraDocumento.Caption = "DATOS DEL DOCUMENTO"
    
        Me.txtDsctoDedu.Text = ""
        Me.txtTotal.Text = ""
        Me.txtTipFra.Text = ""
        Me.txtSerieFra.Text = ""
        Me.txtDocFra.Text = ""
    
        bolProcesa = False
End Sub

Private Sub txtdocu_Enter()
        Me.cmdBuscarDoc.SetFocus
End Sub

