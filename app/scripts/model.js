'use strict';
function Kanban(name, numberOfColumns, numberOfSprints,currentSprint) {
	return {
		name: name,
		numberOfColumns: numberOfColumns,
		numberOfSprints: numberOfSprints,//Modified by Alfred Li
		currentSprint: currentSprint,
		columns: [],
		archived: [],
		settings: {}
	};
}

function KanbanColumn(name){
	return {
		name: name,
		cards: [],
		settings: {}
	};
}

function KanbanColumn(name, settings){
	return {
		name: name,
		cards: [],
		settings: settings
	};
}
//Modified by Alfred, backlog 1.1
function KanbanCard(name, EstManHours, details, color, priority,targetCompletionDate, handledby,
	completedHoursS1,completedHoursS2,completedHoursS3,completedHoursS4,completedHoursS5){
	this.name = name;
	this.details = details;
	this.color = color;
	this.EstManHours = EstManHours;
	this.priority = priority;
	this.targetCompletionDate = targetCompletionDate;
	this.handledby = handledby;
	this.completedHoursS1 = completedHoursS1;
	this.completedHoursS2 = completedHoursS2;
	this.completedHoursS3 = completedHoursS3;
	this.completedHoursS4 = completedHoursS4;
	this.completedHoursS5 = completedHoursS5;
	return this;
}