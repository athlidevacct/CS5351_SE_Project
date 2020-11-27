'use strict';

var SetupCloudController = function($scope, $http,$sce, cloudService){
	$scope.model = {useLocalCloud: false, localCloudUrl: ''};
	$scope.model.showConfigurationError = true;

    $scope.showCloudSetup = false;
    $scope.showBurndownchart = false;
	//Alfred add burndownchart
	$scope.$on('Burndownchart', function(e, name){
    
        var fileURL = "https://scrum-91875346894.s3.amazonaws.com/create_chart.html?filename=" +name + "-export.json"
        
        $scope.url = $sce.trustAsResourceUrl(fileURL);
    
        $scope.showBurndownchart = true;
      

	});

	$scope.$on('OpenCloudSetup', function(){
		var settings = cloudService.loadSettings();
	
		if (!settings.notSetup){
			$scope.model.kanbanKey = settings.kanbanKey;
			$scope.model.encryptionKey = settings.encryptionKey;
			$scope.model.useLocalCloud = settings.useLocalCloud;
			$scope.model.localCloudUrl = settings.localCloudUrl;
		}

		$scope.showCloudSetup = true;
	});

	$scope.saveSettings = function(){
		if ($scope.model.kanbanKey != undefined && $scope.model.kanbanKey.length != 0){
			var settings = {kanbanKey: $scope.model.kanbanKey, encryptionKey: $scope.model.encryptionKey,
							useLocalCloud: $scope.model.useLocalCloud, localCloudUrl: $scope.model.localCloudUrl};

			cloudService.saveSettings(settings);

			$scope.showCloudSetup = false;
		}
	};

};

angular.module('mpk').controller('SetupCloudController', SetupCloudController);