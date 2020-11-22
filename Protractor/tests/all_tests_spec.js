
describe('KanBan homepage', function() {
    beforeEach(function() {
        browser.get('https://scrum-91875346894.s3.amazonaws.com/index.html#/kanban');
        browser.sleep(2000);
  
    });

    it('Create Project Name', function() {
      //browser.get('https://scrum-91875346894.s3.amazonaws.com/index.html#/kanban');
     

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
     
     browser.sleep(5000)

  });
  it('Export to AWS', function() {
    
    element(by.css('.dropdown-toggle')).click();
    browser.sleep(100)
    element(by.css('[ng-click="kanbanMenu.openExport(allKanbans, kanban.name)"]')).click();
    browser.sleep(1000)
    element(by.css('[ng-click="doExportToAWS()"]')).click();
   
    browser.sleep(5000)
    

    alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual('Successfully uploaded file.');
    alert.accept();

    browser.sleep(20000)

  });
  it('Import from AWS', function() {

    element(by.css('.dropdown-toggle')).click();
    browser.sleep(100)
    element(by.css('[ng-click="kanbanMenu.openImport()"]')).click();

    browser.sleep(500)
    element(by.css('[ng-click="importFromAWS()"]')).click();
    browser.sleep(2000)
    

    alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual('Import Success. Please refresh the page.');
    alert.accept();

    var switchList = element(by.model('switchTo'));
    switchList.sendKeys('software');
   
    browser.sleep(5000)

});
});
  
  
  