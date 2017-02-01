# _Angular2 University Tutorial_

#### _A Project built to learn Angular2 with Firebase_

## Description

This project duplicates the Angular University website, where a student can choose between various courses to study. And within each course is many lessons that they can view. The project shows a one-to-many relationship in a Firebase database. It allows you to filter by lesson name, includes user authentication and custom form validation. This was built as a prototype for the Skillswap project, which has a many-to-many relationship. It includes copious notes and very detailed commit messages to document the tutorial.

## Setup/Installation Requirements

To load this site locally (Mac):

1. Clone or download this repository, and in Terminal change directory into the top level of this folder.
2. Make sure you have node.js 6 or higher installed. 
3. Install the Angular2 CLI globally with this command in any directory: `npm install -g angular-cli`. If you run into permissions errors, use sudo: `sudo npm install -g angular-cli`
4. Install local dependencies by running: `npm install`
5. Install the TypeScript definitions manager globally: `npm install typings --global`, again use sudo if you run into permissions errors: `sudo npm install typings --global`
6. Load the app by running `ng serve`.
7. In your browser, navigate to `http://localhost:4200`. 

Here you can view a list of all the "Lessons" and filter by their name. You can also click "Courses" to view all the courses containing the lessons. Then, click a course to view its lessons and page through them. If you are logged in, you may click a lesson title to view its details. Navigate the lessons in a course with the 'next' and 'prev' buttons. You can click the login link to sign in, or the register link to create an account with an email and a password. 

## Support and contact details

Please feel free to fork this repository and submit pull requests back. You can also contact me here:

* Email: diane.douglas1@gmail.com
* My Website: [www.MelodicCode.com](http://www.melodiccode.com)

## Technologies Used

* Angular2 with TypeScript
* NPM
* Of course, good 'ol HTML and CSS :)