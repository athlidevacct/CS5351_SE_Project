'use strict';

angular.module('mpk').factory('kanbanManipulator', function () {
  return {
    columnIndex: function(kanban, column){
      var theIndex;
      angular.forEach(kanban.columns, function(col, index){
        if (col === column) { theIndex = index; }
      });
      return theIndex;  
    },

    addColumn: function(kanban, columnName){
      kanban.columns.push(new KanbanColumn(columnName));
    },
    //Modified by Alfred, Backlog 1.1, add EstManHours
    addCardToColumn: function(kanban, column, cardTitle, EstManHours, details, color, priority, targetCompletionDate, 
      handledby){
    
      angular.forEach(kanban.columns, function(col){
        if (col.name === column.name){
          col.cards.push(new KanbanCard(cardTitle, EstManHours, details, color, priority, targetCompletionDate, 
            handledby));
        }
      });
    },

    removeCardFromColumn: function(kanban, column, card){
      angular.forEach(kanban.columns, function(col){
        if (col.name === column.name){
          col.cards.splice(col.cards.indexOf(card), 1);
        }
      });
    },

    archiveCard: function(kanban, column, card){
      if (kanban.archived == undefined){
        kanban.archived = [];
      }
      kanban.archived.push({card: card, archivedOn: new Date()})
      this.removeCardFromColumn(kanban, column, card);
    },

    unarchiveCard: function(kanban, archivedCard){
      function lastColumn(kanban){
        return kanban.columns[kanban.columns.length - 1];
      }
      this.removeFromArchive(kanban, archivedCard);
      lastColumn(kanban).cards.push(archivedCard.card);     
    },

    removeFromArchive: function(kanban, archivedCard){
      kanban.archived.splice(kanban.archived.indexOf(archivedCard), 1); 
    },

    createNewFromTemplate: function(kanban, newName){
      var newKanban = new Kanban(newName, kanban.columns.length);
      angular.forEach(kanban.columns, function(col) {
        newKanban.columns.push(new KanbanColumn(col.name, col.settings));
      });
      return newKanban;
    },

    removeColumn: function(kanban, column){
      var indexOfColumn = this.columnIndex(kanban, column);
      kanban.columns.splice(indexOfColumn, 1);
      kanban.numberOfColumns--;
      return kanban;
    },

    addColumnNextToColumn: function(kanban, column, direction){
      var columnIndex = this.columnIndex(kanban, column);
      if (direction == 'left'){
        kanban.columns.splice(columnIndex, 0, new KanbanColumn('New column '+ (kanban.numberOfColumns + 1)));
      } else {
        kanban.columns.splice(columnIndex+1, 0, new KanbanColumn('New column '+ (kanban.numberOfColumns + 1)));
      }
      kanban.numberOfColumns++;
      return kanban;
    }
  };
});
