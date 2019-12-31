## VUE JS BOOK REVIEW WEB APP – FRONTEND FOR LARAVEL BOOK REVIEW API PROJECT

### PROJECT DESCRIPTION
* This project is the frontend part of the full stack book review app project. It is coupled with Laravel Book Review API project, which serves as the backend part for this app.
* The project is created with VUE CLI and uses Vue JS, Vue Router, Vuex,  Axios and Materialize CSS. 
* This is a book display and rating app, where users can search for books by various filters, read book presentations, find out their ratings and share book reviews.  Users can create personal accounts and following that, rate books by assigning them star ratings and by writing reviews. Users can also upload new books which do not yet exist in the app. 

### AUTHENTICATION 
* The app supports two user types: simple user and admin user with different access privileges. 
* The project uses API tokens as authentication measure, issued using Laravel Passport\'s Password Grant Client on the server side.
* The project also implements custom middleware, applied on routes, which acts as frontend security measure protecting against unauthorized data access (based on user authentication status and user roles).  Additional access control middleware exists server side.
* A single admin user account is created during the installation of the backend part upon running project migrations. Additional admin users can only be created directly in the database. 
* Simple users can register and login via a form, provided as part of this frontend app.  
* Additional routes and views exist for resetting the forgotten password. 

### MAIN APP FUNCTIONALITIES:
* Unauthenticated users are able to view books, their reviews and ratings.
* Authenticated users are able to upload books with images, upload reviews, edit books and reviews they uploaded and delete them, also manage their own accounts.
* Admin users are able to log into an admin panel and manage all items: authors, genres, books, and reviews. 
* !!! Note, admin users cannot edit other user’s reviews, but they can delete them. They can also delete simple user accounts.

### INSTALLATION & SETUP
##### PROJECT INSTALLATION
After downloading the project files, run \'npm install\' command in the terminal to install node modules and all js dependencies.
```bash
npm install
```
##### BACKEND SETUP
This project is coupled with and depends on the LARAVEL BOOK REVIEW API project, which provides the backend functionality. In order to use this project, it is necessary to download and install LARAVEL BOOK REVIEW API project, following the installation guide of that project.

Following that, configure this project to use the LARAVEL BOOK REVIEW API project as its backend by setting the \'apiUrl\' variable in this projects config.js file to the URL of the backend project. The apiUrl  variable must set the base url of the api provider, each api call will using it as servers base url.
###### Example config.js settings:
```
export default{
    apiUrl : 'http://laravelbookreviewapi.dev/api',
    appName : 'Book Review App' 
}
```
To change the app name, reset the value of the \'appName\' variable in config.js file. This variable is used in the entire application as application’s name.

After the project setup is complete, run command \'npm run serve\' in the terminal to compile all files and to launch a local development server.
```bash
npm run serve
```
### PROJECT\'S MAIN DEPENDENCIES
* [VUE JS](https://vuejs.org/)
* [VUEX](https://vuex.vuejs.org/)
* [VUE ROUTER](https://router.vuejs.org/)
* [AXIOS](https://github.com/axios/axios)
* [LODASH](https://lodash.com/)
* [MATERIALIZE CSS](https://materializecss.com/)
* [VUE JS NOTY](https://github.com/renoguyon/vuejs-noty)
* [SWEETALERT2](https://sweetalert2.github.io/)
* [VUE-OWL-CAROUSEL](https://www.npmjs.com/package/vue-owl-carousel)
* [VUE PICTURE INPUT](https://www.npmjs.com/package/vue-picture-input)