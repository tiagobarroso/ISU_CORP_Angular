# ISU_CORP_Angular
##### This is a test project for ISU Corp Company
This intent of this project is to demonstrate development abilities for a technical test.
It was developed based on a document and followed most of its requirements.

The project was built using the default ASP .NET Core + AngularJS suggested by the Visual Studio project Wizard.
It has some external components such as a richtext editor and a paginator controller.

The project as whole still mostly experimental.

### Startup
 - Change the connection string "DefaultConnection" on the "appsettings.json" file placed in the root project folder. Use the databse connection string you want pointing to the database you want (better to be an empty one).
 - Run the Update-Database to run the migrations an create the default database structure.
 - Start the application thorught Visual Studio.
 - There's a small script to insert the intial type data.

## Achieved

 - [x] Set the default app route to an specific page (reservation list)
 
 - [ ] Implement Reservation list sort
 
 - [x] Reservation Edit button navigation to edit page
 
 - [x] Reservation edit page with an external richtext component
 
 - [x] [partially] Front end form fill validations
 
 - [ ] Backend end form fill validation (it is currently using the dafult ASP .NET layer)
 
 - [ ] Implement Contacts list sort
 
 - [x] Contact Edit button navigation to edit page
 
 - [x] Contact edit page (reusing the same component)
 
 - [x] [partially] Contact search on type input
 
 - [x] [partially] Input masks
 
 - [x] [partially] Page responsivity (It miss some mobile implementation)
