
describe('KanBan homepage', function() {
    it('Export to AWS', function() {
      browser.get('https://scrum-91875346894.s3.amazonaws.com/index.html#/kanban');
      browser.sleep(2000);
  
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

      browser.sleep(500)
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
  });
    
    
    