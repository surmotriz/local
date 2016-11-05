app.controller('documentosIndexCtlr', function($scope, $http){
	$http.get('/apis/documentos').success(function(data){
		$scope.documentos = data;
	});
	$scope.ver = function(num_doc,cla_doc,tipo_factura){

		$scope.num_doc = num_doc;
		$scope.cla_doc = cla_doc;
		$scope.tipo_factura = tipo_factura;		

		/*
		if(cla_doc=='FS' || cla_doc=='FR' || cla_doc=='BS' || cla_doc=='BR'){ // Factura y Boleta
			// cabezera
			$http.get( '/apis/documentos_fb_cabezera/'+num_doc+'/'+cla_doc+'/').success(function(data){
				$scope.documento = data;
			});

			// Detalle 
			if(tipo_factura=='0'){
				// Factura Separada
				console.log('No es Factura Unica');
			}else{
				// Factura unica

				// Servicios
				$http.get('/apis/documentos_fb_detalle_servicios/'+num_doc+'/'+cla_doc+'/').success(function(data){
					$scope.fb_detalle_servicios = data;
				});

				// Repuestos
				$http.get('/apis/documentos_fb_detalle_repuestos/'+num_doc+'/'+cla_doc+'/').success(function(data){
					$scope.fb_detalle_repuestos = data;
				});
				
			}
		}else{ // Nota de Credito
			console.log('Nota de Credito');
		}
		*/
		console.log(Object.keys($scope.fb_detalle_servicios).length);
		console.log(Object.keys($scope.fb_detalle_repuestos).length);




			
	};
});