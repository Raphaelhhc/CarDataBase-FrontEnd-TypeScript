# Car Database

A Web application of providing car informations using React and Spring Boot.

This is project's front-end repository. For back-end repository go to [https://github.com/Raphaelhhc/CarDataBase-Backend-SpringBoot](https://github.com/Raphaelhhc/CarDataBase-Backend-SpringBoot)

## Demo

[https://web-cardatabase-react.onrender.com](https://web-cardatabase-react.onrender.com)

Visitor authority: Can only view cars' specification/rating/review. 

User(need login) authority: Can add car to favorite list and leave rating/review.

Admin(need login) authority: Can add/edit/delete car data.

### Demo Account

User
 - Username: ```man1@email.com```
 - Password: ```boss8055```
 
Admin
 - Username: ```adminman@email.com```
 - Password: ```boss8055```

## Technology Stack

The application uses following technologies (Front-End/Back-End both included):

- Typescript: Programming Language (complies to plain JavaScript)
- Java: Programming Language
- React: JavaScript library for building user interfaces
- Spring Boot: Java-based framework for building REST API
- MySQL on AWS RDS: Relational database built on AWS
- Okta: Secure identity management platform for user authentication and authorization

## Features

- User authentication: Login/Logout
- User Roles: Visitor/User/Admin
- View car specification/rating/review
- Search car in list by word
- Filter car list by body style
- Create/Update/Delete car data
- Leave user rating/review of each car
- Add/Remove car to/from user's favorite list

## Start the Application

### 1. Clone the repository
```
git clone https://github.com/Raphaelhhc/CarDataBase-FrontEnd-TypeScript
```

### 2. Change into the project directory
```
cd CarDataBase-FrontEnd-TypeScript
```

### 3. Install the project dependencies
```
npm install
```

### 4. Set environmental variables
```
REACT_APP_OKTA_CLIENT_ID= <Enter your Okta client ID>
REACT_APP_OKTA_ISSUER= <Enter your Okta issuer link>
REACT_APP_OKTA_REDIRECT_URI= <Enter your Okta redirect URI (for local server enter http://localhost:3000/login/callback)>
REACT_APP_API= <Enter your Back-End API link>
```
* If no OKTA account: refer to [https://developer.okta.com/](https://developer.okta.com/) to create and build application to manage user/admin account.
* If no Back-End API you can use API of this project https://cardatabaseapi.herokuapp.com/api

### 5. Start the development server
```
npm start
```

### 6. Open your web browser and visit [http://localhost:3000](http://localhost:3000)

## Screenshots

 - Home Page
 ![App Screenshot](https://res.cloudinary.com/doe9mfetd/image/upload/v1686499692/Car-Database_GITHUB/Home_mycjnw.png)
 - Car List Page
![App Screenshot](https://res.cloudinary.com/doe9mfetd/image/upload/v1686499691/Car-Database_GITHUB/Car-List_uu9onx.png)
 - Car Detail Page (Login as User)
![App Screenshot](https://res.cloudinary.com/doe9mfetd/image/upload/v1686499691/Car-Database_GITHUB/Car_Detail_e3jctt.png)
 - Favorite List Page (Login as User)
![App Screenshot](https://res.cloudinary.com/doe9mfetd/image/upload/v1686499691/Car-Database_GITHUB/Favorite-List_byxilq.png)
 - Add Car Page (Login as Admin)
![App Screenshot](https://res.cloudinary.com/doe9mfetd/image/upload/v1686499691/Car-Database_GITHUB/Add_Car_fgrecx.png)
 - Edit Car Page (Login as Admin)
![App Screenshot](https://res.cloudinary.com/doe9mfetd/image/upload/v1686499691/Car-Database_GITHUB/Edit_Car_szf1q5.png)