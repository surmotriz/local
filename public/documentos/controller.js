app.controller('documentosIndexCtlr', function($scope, $http, FileSaver, Blob){
	$http.get('/apis/docs').success(function(data){
		$scope.docs = data;
	});
	$scope.ver = function(doc,cab,det){	
		$scope.num_doc = doc[0];
		$scope.cla_doc = doc[3];
		$scope.co_cr_an = doc[4];
		$scope.exi_fra = doc[5];
		$scope.tip_imp = doc[6];
		$scope.moneda = doc[8];		
		$scope.cab = cab;
		$scope.det = det;
		$scope.doc = doc;		
		

		// Factura o Boleta
		if ($scope.cla_doc=='FS' || $scope.cla_doc=='FR' || $scope.cla_doc=='BS' || $scope.cla_doc=='BR' || $scope.cla_doc=='FC'){ // Factura y Boleta			

			// cabezera
			$http.get( '/apis/fbc/'+$scope.num_doc).success(function(data){
				$scope.fb_cab = data[0];
				// genera cabezera txt
				if($scope.cab=='S'){
					var data = new Blob(data[0], { type: 'text/plain;charset=utf-8' });
					FileSaver.saveAs(data, 'cabezera.cab');	
				}
			});

			// detalle
			if($scope.co_cr_an=='CO' || $scope.co_cr_an=='CR'){				
				if ($scope.tip_imp=='D'){
					$http.get( '/apis/dds/'+$scope.num_doc+'/'+$scope.cla_doc+'/'+$scope.moneda).success(function(data){
						$scope.dds = data;
						if($scope.det=='S'){
							var data = new Blob(data[0], { type: 'text/plain;charset=utf-8' });
							FileSaver.saveAs(data, 'detalle.det');
						}
					});
				}else if ($scope.tip_imp=='R'){ // impresion con resumen
					
				}
			}else if($scope.co_cr_an=='AN'){ // si es anticipo tiene un detalle
				
			}
				
			
			
		// Nota de Credito		
		}else if($scope.cla_doc=='AR' || $scope.cla_doc=='AS') { 

			// cabezera
			$http.get('/apis/ncc/'+$scope.num_doc).success(function(data){
				$scope.fb_cab = data[0];
				// genera cabezera txt
				if($scope.cab=='S'){
					var data = new Blob(data[0], { type: 'text/plain;charset=utf-8' });
					FileSaver.saveAs(data, 'cabezera.cab');	
				}
			});

			// detalle
			if($scope.co_cr_an=='CO' || $scope.co_cr_an=='CR'){
				if (tip_imp=='D'){
					$http.get( '/apis/dds/'+$scope.num_doc+'/'+$scope.cla_doc+'/'+$scope.moneda).success(function(data){
						$scope.dds = data;
					});
				}else if ($scope.tip_imp=='R'){ // impresion con resumen
					
				}				
			}else if ($scope.co_cr_an=='AN'){ 
			
			}
			
		}

	};
});