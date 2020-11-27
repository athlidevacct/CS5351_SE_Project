'use strict';

angular.module('mpk').controller('ImportController', function ImportController($scope, $http, kanbanRepository) {
	$scope.model = {file: '', readError: false, fileSelected: false};
	$scope.showImportModal = false;

	$scope.$on('OpenImport', function(){
		$scope.model = {file: '', readError: false, fileSelected: false};
		$scope.showImportModal = true;
	})

	//Modified by Alfred Li, Import JSON from AWS S3
	$scope.importFromAWS = function(){

		function singleKanban(kanbanObject){
			var keys = Object.keys(kanbanObject);
			return keys.lastIndexOf('columns') > -1;
		}

		try {
			
			// Simple GET request example :
			//https://jsonstorage-678535459.s3.amazonaws.com/software-export.json
			$http.get('https://jsonstorage-678535459.s3.amazonaws.com/software-export.json').
			success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available
				$scope.model.file = data
				var kanbanOrKanbans = angular.fromJson($scope.model.file);
				if (singleKanban(kanbanOrKanbans)){
					var toImport = {};
					toImport[kanbanOrKanbans.name] = kanbanOrKanbans;
					kanbanRepository.import(toImport);
				} else {
					kanbanRepository.import(kanbanOrKanbans);
				}
				alert("Import Success. Please refresh the page.")
				$scope.$emit('DownloadFinished');
				$scope.showImportModal = false;
				location.reload(); 
			}).
			error(function(data, status, headers, config) {
				alert("Import failure!")
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			});
		} catch(exception) {
			alert(exception)
			$scope.model.readError = true;
		}
		

	};
	$scope.import = function(){

		function singleKanban(kanbanObject){
			var keys = Object.keys(kanbanObject);
			return keys.lastIndexOf('columns') > -1;
		}

		if ($scope.model.file != ''){
			try {
				var kanbanOrKanbans = angular.fromJson($scope.model.file);
				if (singleKanban(kanbanOrKanbans)){
					var toImport = {};
					toImport[kanbanOrKanbans.name] = kanbanOrKanbans;
					kanbanRepository.import(toImport);
				} else {
					kanbanRepository.import(kanbanOrKanbans);
				}
				$scope.$emit('DownloadFinished');
				$scope.showImportModal = false;
			} catch(exception) {
				$scope.model.readError = true;
			}
		} else {
			$scope.model.readError = true;
		}
	};

});