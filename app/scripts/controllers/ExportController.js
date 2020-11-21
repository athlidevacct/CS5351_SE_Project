'use strict';



angular.module('mpk').controller('ExportController', function ExportController($scope, $http, kanbanRepository, fileService) {
	$scope.model = {exportAll: false, allKanbanNames: [], selectedKanban: ''};
	$scope.showExportModal = false;

	$scope.$on('OpenExport', function(e, allKanbanNames, current){
		$scope.model.allKanbanNames = allKanbanNames;
		$scope.model.selectedKanban = current;
		//alert(current)

		$scope.showExportModal = true;
	})

	$scope.doExportToAWS = function(){
		var bucketName = "jsonstorage-678535459";
		var bucketRegion = "us-east-1";
		var IdentityPoolId = "us-east-1:6f922beb-8015-47d4-af50-693e9e7e0a19";

		var toExport = null;
		var fileName = $scope.model.selectedKanban + '-export.json';
		
		if ($scope.model.exportAll){
			var kanbans = kanbanRepository.all();
			toExport = new Blob([angular.toJson(kanbans, true)], {type: 'application/json;charset=utf-8'});
			fileName = 'all-kanbans-export.json';
		} else {
			var kanban = kanbanRepository.get($scope.model.selectedKanban);
			toExport = new Blob([angular.toJson(kanban, true)], {type: 'application/json;charset=utf-8'});
		}

		var config = { headers: {
			"Content-Type": undefined,
		   }
		};

        //var promise = $http.put("https://jsonstorage-678535459.s3.amazonaws.com", toExport, config);
		//fileService.saveBlob(toExport, fileName);
		//alert(JSON.stringify(toExport))

		AWS.config.update({
			region: bucketRegion,
			credentials: new AWS.CognitoIdentityCredentials({
			  IdentityPoolId: IdentityPoolId
			})
		  });
		  
		var s3 = new AWS.S3({
			apiVersion: "2006-03-01",
			params: { Bucket: bucketName }
		});
  
		// Use S3 ManagedUpload class as it supports multipart uploads
		var upload = new AWS.S3.ManagedUpload({
		  params: {
			Bucket: bucketName,
			Key: fileName,
			Body: toExport,
			ACL: "public-read"
		  }
		});
	  
		var promise = upload.promise();
	  
		promise.then(
		  function(data) {
			alert("Successfully uploaded file.");
			location.reload();
		  },
		  function(err) {
			return alert("There was an error uploading your file: ", err.message);
		  }
		);
		$scope.showExportModal = false;
		return true;
	};

	$scope.doExport = function(){
		var toExport = null;
		var fileName = $scope.model.selectedKanban + '-export.json';
		
		if ($scope.model.exportAll){
			var kanbans = kanbanRepository.all();
			toExport = new Blob([angular.toJson(kanbans, true)], {type: 'application/json;charset=utf-8'});
			fileName = 'all-kanbans-export.json';
		} else {
			var kanban = kanbanRepository.get($scope.model.selectedKanban);
			toExport = new Blob([angular.toJson(kanban, true)], {type: 'application/json;charset=utf-8'});
		}

		fileService.saveBlob(toExport, fileName);
		$scope.showExportModal = false;
		return true;
	};

});