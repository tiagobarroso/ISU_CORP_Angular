# ISU_CORP_Angular
##### This is a test project for ISU Corp Company
This intent of this project is to demonstrate development habilities for a technical test.
It was developed based on a document and followed most of its requirements.

The project was built using the default ASP .NET Core + AngularJS sugested by the Visual Studio project Wizard.
It has some external components such as a richtext editor and a paginator controller.

The project as whole still mostly experimental.
Several features would be implemented more graciously but I kept simple in order to improve some time

### Startup
 - Change the connection string "DefaultConnection" on the "appsettings.json" file placed in the root project folder. 
 - Use the databse connection string you want pointing to the database you want (better to be an empty one). Do not miss creating the empty DB.
 - Run the Update-Database command to run the migrations an create the default structure
 - Start the application thorught Visual Studio
 - There's a small script on project root folder ('helper_script.sql') to insert the intial type data

## Achieved
 [X] Set the default app route to an specific page (reservation list)
 [X] Implement lists sort clicking on header
 [X] Reservation Edit button navigation to edit page
 [X] Reservation edit page with an external richtext component
 [X] [partially] Front end form fill validations
 [ ] Backend end form fill validation (it is currently using the dafult ASP .NET layer)
 [X] Implement Contacts list sort
 [X] Contact Edit button navigation to edit page
 [X] Contact edit page (reusing the same component)
 [X] [partially] Contact search on type input
 [X] [partially] Input masks
 [X] [partially] Page responsivity (It miss some mobile implementation)