create or replace package body PKG_ELECTRONICA as
  procedure documentos_all(resultados out sys_refcursor) is 
  begin 
    open resultados for 
         select * from (
             select              
             decode(nvl(cdg_tipo_factura,0),0,'N','S') as cdg_tipo_factura_fi, -- 0. 0, 'N', 'S' -- sMultipleOT
             cdg_pro_doc as cdg_pro_doc_fi, -- 1.
             cdg_co_cr as cdg_co_cr_fi, -- 2. 'CO', 'CR', 'TG', 'AN'
             cdg_ord_tra as cdg_ord_tra_fi, -- 3. '0', '3971'
             cdg_tip_imp as cdg_tip_imp_fi, -- 4. 'D', 'R'
             nvl(cdg_doc_fra,0) as cdg_doc_fra_fi, -- 5.  0, 11951
             cdg_tip_ref as cdg_tip_ref_fi, -- 6. null, 'FS', 'FQ'
             cdg_co_cc as cdg_co_cc_fi, -- 7. null
             cdg_ser_doc as cdg_ser_doc, -- 8. 1, 3
             cdg_num_doc as cdg_num_doc_fi, -- 9. 14120, 14119
             cdg_tip_doc as cdg_tip_doc_fi, -- 10. 'F', 'B', 'A'
             cdg_anu_sn as cdg_anu_sn_fi, -- 11. 'S', 'N'
             cdg_doc_anu as cdg_doc_anu_fi, -- 12. 'N'
             
             
             cdg_num_doc, -- 13. 
             cdg_fec_gen, -- 14.
             cdg_nom_cli, -- 15.
             cdg_cla_doc, -- 16.
             decode(cdg_co_cr,'CO','Contado','CR','Credito','No Definido') as Pago, -- 17. 
             decode(concat(cdg_cod_gen,cdg_cod_emp),'0201','Tacna','0202','Moquegua','Ninguno') as Lugar, -- 18.
             cdg_des_tot, -- 19. 
             cdg_imp_neto -- 20.               
             
             from cab_doc_gen 
             where cdg_cod_gen='02' and  CDG_COD_EMP='01'              
             --and CDG_TIP_DOC='F' and CDG_TIPO_FACTURA=0 and CDG_PRO_DOC='S' and CDG_CO_CR!='AN' and CDG_TIP_REF='FQ'             
             order by cdg_fec_gen DESC
         ) WHERE rownum <= 120; 
      end;
  
  procedure factura_servicios(doc number,resultado out sys_refcursor) is
  begin
    open resultado for
      select cdg_ser_doc as serie,
      cdg_num_doc as numero,
      cdg_fec_gen as fecha,
      cdg_nom_cli as cliente,
      cdg_cod_cli as ruc,
      cdg_dir_cli as direccion,
      trim((select initcap(ubi_nombre) from ubigeo where ubi_id=substr(cdg_ubi_geo,1,2)||'0000')) || '/' || 
      trim((select initcap(ubi_nombre) from ubigeo where ubi_id=substr(cdg_ubi_geo,1,4)||'00')) || '/' ||
      trim((select initcap(ubi_nombre) from ubigeo where ubi_id=substr(cdg_ubi_geo,1,6))) ubigeo,
      cdg_ord_tra as orden,
      decode (cdg_co_cr,'CO','Contado','CR','Credito','No Definido') as pago,
      dis_pla_veh as placa,
      (select cfv_des_fam from cab_fam_veh where cfv_cod_gen=cdg_cod_gen and cfv_cod_mar=dis_mar_veh and cfv_cod_fam=dis_cod_fam) familia,
      dis_ano_veh as ano,
      dis_mot_veh as chasis,
      dis_col_veh as color,
      dis_kil_veh as kilometraje
      from cab_doc_gen
      left join  det_ing_ser on cab_doc_gen.cdg_cod_cli=det_ing_ser.dis_cod_cli
      where cdg_cod_gen='02' and 
      cdg_cod_emp='01' and 
      cdg_num_doc=doc;   
  end;
  
  procedure documentos(resultados out sys_refcursor) is 
    begin
    open resultados for
      select CDG_NUM_DOC, CDG_FEC_GEN, CDG_NOM_CLI, CDG_CLA_DOC, CDG_CO_CR, CDG_IMP_APAGAR from cab_doc_gen order by CDG_FEC_GEN Desc;      
  end;
  
end PKG_ELECTRONICA;