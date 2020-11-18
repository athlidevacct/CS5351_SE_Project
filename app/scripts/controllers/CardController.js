'use strict';

var CardController = function ($scope) {
	$scope.card = {};
	$scope.editTitle = false;

	$scope.editingDetails = false;
	$scope.editingTitle = false;

	//Modified by Alfred Li Backlog 1.1
	$scope.editingEstManHours = false;
	$scope.editingPriority = false;
	$scope.editinghandledby = false;
	$scope.editingtargetCompletionDate = false;

	$scope.totalCompletionHours = function(s1,s2,s3,s4,s5) {
		var total = 0;
		s1 = parseInt(s1) * 1; 
		s2 = parseInt(s2) * 1; 
		s3 = parseInt(s3) * 1;
		s4 = parseInt(s4) * 1;
		s5 = parseInt(s5) * 1;

		if(s1>0)
			total = total + s1;
		if(s2>0)
			total = total + s2;
		if(s3>0)
			total = total + s3;	
		if(s4>0)
			total = total + s4;	
		if(s5>0)
			total = total + s5;	
        return total || 0;
	};
	
	$scope.$on('OpenCardDetails', function(e, card){
		$scope.card = card;
		$scope.editingDetails = false;
		$scope.editingTitle = false;
		$scope.editingEstManHours = false;
		$scope.editinghandledby = false;
		$scope.editingPriority = false;
		$scope.editingtargetCompletionDate = false;
	
		$scope.showCardDetails = true;
	});

};
mpkModule.controller('CardController', CardController);
