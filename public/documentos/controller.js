app.controller('documentosIndexCtlr', function($scope, $http){
	$http.get('/apis/docs').success(function(data){
		$scope.docs = data;
	});
	$scope.ver = function(num_doc,cla_doc,co_cr_an,exi_fra,tip_imp,ser,rep,moneda){	

		// Factura o Boleta
		if (cla_doc=='FS' || cla_doc=='FR' || cla_doc=='BS' || cla_doc=='BR' || cla_doc=='FC'){ // Factura y Boleta			
			
			/*			
			// si es al contado o credito entra con ese mismo detalle
			if(co_cr=='CO' || co_cr=='CR'){

				// impresion con detalle
				if (tip_imp=='D'){
					if (data[0][7]!='0'){ // Servicios
						console.log('Detalle Servicios Factura o Boleta');
					}
					if (data[0][8]!='0'){ // Repuestos
						console.log('Detalle Repuestos Factura o Boleta');
					}
				}else if (tip_imp=='R'){ // impresion con resumen
					console.log('Detalle Resumen');
				}
			}else if (co_cr=='AN'){ // si es anticipo tiene un detalle
				console.log('Delle Anticipo');
			}	
			*/			
			$http.get( '/apis/fbc/'+num_doc+'/'+cla_doc+'/'+co_cr_an+'/'+exi_fra+'/'+tip_imp+'/'+moneda).success(function(data){
				$scope.fb_cab = data[0];				
			});
			
			
		// Nota de Credito		
		}else if(cla_doc=='AR' || cla_doc=='AS') { 
			console.log('Nota de Credito');
		}
		
			
	};
});