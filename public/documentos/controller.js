app.controller('documentosIndexCtlr', function($scope, $http){
	$http.get('/apis/documentos').success(function(data){
		$scope.documentos = data;
	});
	$scope.ver = function(num_doc,cla_doc,co_cr,tip_imp){	

		

		
		// si es factura o boleta entra
		if (cla_doc=='FS' || cla_doc=='FR' || cla_doc=='BS' || cla_doc=='BR'){ // Factura y Boleta
			
			$scope.numero = '';
			// cabezera
			$http.get( '/apis/fb_cab/'+num_doc+'/'+cla_doc+'/',{ cache: 'true'}).success(function(data){
				$scope.fb_cab = data;

				console.log('Cabezera Factura o Boleta');
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
				
			});
			
			
				
		}else if(cla_doc=='AR' || cla_doc=='AS') { // Nota de Credito
			console.log('Nota de Credito');
		}
		
			
	};
});