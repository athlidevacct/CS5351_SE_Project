'use strict';

var NewKanbanCardController = function ($scope, kanbanManipulator) {
	$scope.master = {title: '', details: '', cardColor: $scope.colorOptions[0]};
	$scope.newCard = {};
	$scope.priorityList = ["1", "2", "3","4","5"];

	$scope.$on('AddNewCard', function(e, column){
		$scope.kanbanColumnName = column.name;
		$scope.column = column;
		$scope.newCard = angular.copy($scope.master);
		$scope.showNewCard = true;
	});


	$scope.addNewCard = function(newCard){
		if (!this.newCardForm.$valid){
			return false;
		}
		//Modified by Alfred, Backlog 1.1, newCard.EstManHours, priority, 2020
		kanbanManipulator.addCardToColumn($scope.kanban, $scope.column, newCard.title, newCard.EstManHours, newCard.details, 
			newCard.cardColor, newCard.priority, newCard.targetCompletionDate, newCard.handledby);
		$scope.newCard = angular.copy($scope.master);
		$scope.showNewCard = false;

		return true;
	};

};

angular.module('mpk').controller('NewKanbanCardController', NewKanbanCardController);