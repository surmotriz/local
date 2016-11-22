var app = angular.module("surmotriz", ['ui.router', 'ngFileSaver']);

app.config(function ($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/documentos/1/N/N/");

	$stateProvider
		.state('inicios', {
			url: "/inicios",
			views: {
				"header": { templateUrl: "shared/layout/header.html" },
				"contenido": { templateUrl: "inicios/index.html", controller: 'iniciosIndexController' },
				"footer": { templateUrl: "shared/layout/footer.html" }
			}
		})
		.state('documentos', { 
			url: "/documentos/:pag/:fecha1/:fecha2/",
			views: {
				"header": { templateUrl: "shared/layout/header.html" },
				"contenido": { templateUrl: "documentos/index.html", controller: 'documentosIndexCtlr' },
				"footer": { templateUrl: "shared/layout/footer.html" }
			}
		})

});