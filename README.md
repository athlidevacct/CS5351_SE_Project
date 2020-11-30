CS5351 Group Project - Features Enhancement on Kanban Board
==========================

This project is to enhance some features for Personal Kanban board. So that we can run the Scrum process in the enhanced application.
The original project is clone from Personal Kanban.
https://github.com/greggigon/my-personal-kanban

The application can be hosted in AWS S3 static web service.
For saving the JSON file in AWS S3 bucket, please revise the AWS S3 bucket URL in app\script\controllers\SetupCloudController.js.

var fileURL = "https://scrum-91875346894.s3.amazonaws.com/create_chart.html?filename=" +name + "-export.json"

You can also export the JSON on your local drive if not using AWS S3.

The Protractor testing script are located in Protractor folder. For installatiopn and running the script, please refer to Protractor tutorial site.
https://www.protractortest.org/#/tutorial

For running the Allure Report for testing result, please install allure-jasmine plugin and run command allure serve.
https://github.com/allure-framework/allure-jasmine

