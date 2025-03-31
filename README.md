# Auth

## Overview

this is sajndsnasd

## Features

1. Signup Page:

- Form Validation:

  - Ensures all fields are filled out.
  - Checks for valid email format.
  - Password strength validation (minimum 8 characters, one uppercase letter, and one number).
  - Confirms that the password and confirm password fields match.

- Local Storage:

  - New users are added to the local storage with their registration details.
  - If a user is already logged in, they are redirected to the home page.

- Toast Notifications:
  - Displays success or error messages after user interactions.

2. Login Page

- Authentication:

  - Users can log in using their email and password.
  - Credentials are checked against the users stored in localStorage.
  - On successful login, the user is redirected to the home page.

- Toast Notifications:
  - Displays success or error messages for login attempts.

3. Protected Routes:
   - Home Page: Accessible only to logged-in users. If not logged in, users are redirected to the login page.

## Installation

```sh
git clone https://github.com/Nayanprajapati/react_login.git
cd login
npm install
npm start
```

4. Technologies Used

   - React: JavaScript library for building user interfaces.
   - React Router: For routing between pages (Signup, Login, Home).
   - React Toastify: To display toast notifications for success and error messages.
   - Local Storage: For storing user data and maintaining session.

5. Acknowledgments
   - Thanks to the React community for creating a great library that helps build user interfaces easily.
   - Thanks to the maintainers of react-toastify for a simple and effective solution for displaying notifications.
