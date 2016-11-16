app.controller('documentosIndexCtlr', function($scope, $http){
	$http.get('/apis/docs').success(function(data){
		$scope.docs = data;
	});
	$scope.ver = function(num_doc,cla_doc,co_cr_an,exi_fra,tip_imp,ser,rep,moneda){	
		$scope.num_doc = num_doc;
		$scope.cla_doc = cla_doc;
		$scope.co_cr_an = co_cr_an;
		$scope.exi_fra = exi_fra;
		$scope.tip_imp = tip_imp;
		$scope.ser 	= ser;
		$scope.rep = rep;
		$scope.moneda = moneda;

		// Factura o Boleta
		if (cla_doc=='FS' || cla_doc=='FR' || cla_doc=='BS' || cla_doc=='BR' || cla_doc=='FC'){ // Factura y Boleta			
			
			$http.get( '/apis/fbc/'+num_doc).success(function(data){
				$scope.fb_cab = data[0];			
				// si es al contado o credito entra con ese mismo detalle
				if(co_cr_an=='CO' || co_cr_an=='CR'){
					// impresion con detalle
					if (tip_imp=='D'){
						$http.get( '/apis/dds/'+num_doc+'/'+cla_doc).success(function(data){
							$scope.dds = data;
						});
					}else if (tip_imp=='R'){ // impresion con resumen
						console.log('Detalle Resumen');
					}
				}else if (co_cr_an=='AN'){ // si es anticipo tiene un detalle
					console.log('Delle Anticipo');
				}	
						
			
								
			});
			
			
		// Nota de Credito		
		}else if(cla_doc=='AR' || cla_doc=='AS') { 
			$http.get( '/apis/ncc/'+num_doc).success(function(data){
				$scope.fb_cab = data[0];				
			});
		}
		
			
	};
});