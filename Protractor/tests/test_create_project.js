
describe('KanBan homepage', function() {
    
    it('Create Project Name', function() {
      browser.get('https://scrum-91875346894.s3.amazonaws.com/index.html#/kanban');
      browser.sleep(2000);

      element(by.css('.dropdown-toggle')).click();
      browser.sleep(100)
      element(by.css('.mpkNew')).click();
      browser.sleep(100)

     element(by.css('input[ng-model="model.kanbanName"]')).sendKeys('Scrum XXX');
     browser.sleep(500)
     element(by.css('select[ng-model="model.numberOfColumns"]')).sendKeys('3');
     browser.sleep(500)
     element(by.css('select[ng-model="model.numberOfSprints"]')).sendKeys('4');
     browser.sleep(500)

     element(by.css('[ng-click="createNew()"]')).click();
     browser.sleep(5000)

     var pname = element(by.css('.renameKanban'))
     expect(pname.getText()).toEqual('Scrum XXX');
     
     browser.sleep(10000)

  });
});
  
  
  