app.controller('documentosIndexCtlr', function($scope, $stateParams, $http, FileSaver, Blob){	

	$scope.pag = parseInt($stateParams.pag);
	$scope.fecha = $stateParams.fecha;
	$scope.dias = parseInt($stateParams.dias);

	$http.get('/apis/docs/'+$scope.pag+'/'+$scope.fecha+'/'+$scope.dias+'/').success(function(data){
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
							
				// txt cabezera								
				if($scope.cab=='S'){
					var i=0;
					var cabe = '';
					data[0].forEach(function(entry) {
						if(i<=16){
							cabe += entry+'|';							
						}
	    				i++;

					});	
					var cabezera = new Blob([cabe], { type: 'text/plain;charset=utf-8' });
					FileSaver.saveAs(cabezera, data[0][17]);	
				}

				// detalle
				if($scope.co_cr_an=='CO' || $scope.co_cr_an=='CR'){				
					if ($scope.tip_imp=='D'){
						$http.get( '/apis/dds/'+$scope.num_doc+'/'+$scope.cla_doc+'/'+$scope.moneda).success(function(data1){
							$scope.dds = data1;

							// genera txt det
							if($scope.det=='S'){
								var deta = '';
								var i=0;
								data1.forEach(function(){
									data1[i].forEach(function(entry){
										deta += entry+'|';										
									});
									deta += '\r\n';
									i++;
								});
									
								var detalle = new Blob([deta], { type: 'text/plain;charset=utf-8' });
								FileSaver.saveAs(detalle, data[0][20]);
							}
						});
					}else if ($scope.tip_imp=='R'){ // impresion con resumen
						if($scope.det=='S'){
							var deta = 'NIU||||'+ data[0][19] +'|||||||||';
							var detalle = new Blob([deta], { type: 'text/plain;charset=utf-8' });
							FileSaver.saveAs(detalle, data[0][20]);
						}
						
					}
				}else if($scope.co_cr_an=='AN'){ // si es anticipo tiene un detalle
					if($scope.det=='S'){
						var deta = 'NIU||||'+ data[0][18] +'|||||||||';
						var detalle = new Blob([deta], { type: 'text/plain;charset=utf-8' });
						FileSaver.saveAs(detalle, data[0][20]);
					}
				}
			});

				
				
			
			
		// Nota de Credito		
		}else if($scope.cla_doc=='AR' || $scope.cla_doc=='AS') { 

			// cabezera
			$http.get('/apis/ncc/'+$scope.num_doc).success(function(data){
				$scope.fb_cab = data[0];

				// genera cabezera txt
				if($scope.cab=='S'){
					var i=0;
					var cabe = '';
					data[0].forEach(function(entry) {
						if(i<=16){
							cabe += entry+'|';							
						}
	    				i++;

					});	
					var cabezera = new Blob([cabe], { type: 'text/plain;charset=utf-8' });
					FileSaver.saveAs(cabezera, data[0][17]);	
				}

				// detalle
				if($scope.co_cr_an=='CO' || $scope.co_cr_an=='CR'){
					if ($scope.tip_imp=='D'){
						$http.get( '/apis/dds/'+$scope.num_doc+'/'+$scope.cla_doc+'/'+$scope.moneda).success(function(data1){
							$scope.dds = data1;
							// genera txt det
							if($scope.det=='S'){
								var deta = '';
								var i=0;
								data1.forEach(function(){
									data1[i].forEach(function(entry){
										deta += entry+'|';										
									});
									deta += '\r\n';
									i++;
								});
									
								var detalle = new Blob([deta], { type: 'text/plain;charset=utf-8' });
								FileSaver.saveAs(detalle, data[0][20]);
							}
						});
					}else if ($scope.tip_imp=='R'){ // impresion con resumen
						if($scope.det=='S'){
							var deta = 'NIU||||'+ data[0][19] +'|||||||||';
							var detalle = new Blob([deta], { type: 'text/plain;charset=utf-8' });
							FileSaver.saveAs(detalle, data[0][20]);
						}
					}				
				}else if ($scope.co_cr_an=='AN'){ 
					if($scope.det=='S'){
						var deta = 'NIU||||'+ data[0][18] +'|||||||||';
						var detalle = new Blob([deta], { type: 'text/plain;charset=utf-8' });
						FileSaver.saveAs(detalle, data[0][20]);
					}
				} 

			});
			
		}

	};
});