# Will Be There

  

## Table Of content

1. [Getting Started](#getting-started)

2. [Prerequisites](#prerequisites)

3. [Installation](#installation)

4. [API Endpoints](#api-endpoints)
  

## Getting Started

Follow these steps to get the server up and running.

  

  

### Prerequisites

  

- Python Installed

  

- pip Installed

  

- Git

  

  

### Installation

  

1. first clone the repository and changed directory to the backend folder `cd backend`

2. create your virtual environment using the command

`python -m venv venv`. use `python3 -m venv venv` if you have python3 installed

3. activate your virtual environment using the command `venv/Scripts/activate` for windows and `source bin/activate` for macOs

4. install requirements using the command `pip install -r requirements.txt`

5. run `python manage.py makemigrations` to make database migrations

6. run `python manage.py migrate` to migrate database changes.

7. run `python manage.py runserver` to start server

Everything is good to go.

  

### API Endpoints
to get the documentation via swagger visit the url http://127.0.0.1:8000/swagger/ Or you could use the documentation right here in the Readme

 1. [signup](#signup-endpoint)
 2. [Log in](#login-endpoint)

#### Signup Endpoint 
http://127.0.0.1:8000/api/account/signup/

- This endpoint allows users to sign up for the service.

-  **HTTP Method:** POST

  

##### Request Parameters:

  

-  `email` (string): User's email address.

-  `first_name` (string): User's first name.

-  `last_name` (string): User's last name.

-  `phone_number` (string): User's phone number.

-  `password` (string): User's password. It must be at least 8 characters long.

-  `confirm_password` (string): Confirmation of user's password.

##### Responses:

  

-  **200 OK:** User signed up successfully. Returns a JSON response with the user's information and authorization token.

**400 Bad Request:** Invalid request. Check the request parameters and try again.

#### Login Endpoint
http://127.0.0.1:8000/api/account/login/

This endpoint allows users to log in to the service.

-   **HTTP Method:** POST
This endpoint allows users to log in to the service.

- ##### Request Parameters:

-   `email` (string): User's email address.
-   `password` (string): User's password.

##### Responses:

-   **200 OK:** Success. Returns a JSON response with the user's information and authorization token
- **401 Unauthorized:** Invalid credentials. The email or password provided is incorrect.

#### Logout Endpoint
http://127.0.0.1:8000/api/account/logout/

-   **HTTP Method:** POST
- ##### Request Parameters:

-   `none but user must be authenticated`
- ##### Header
- `Authorization: Token 2d2e5ef111480d71c65c17a6708eabf3befc88a`
- must be in the above form when adding token to header in postman or through swagger
##### Responses:

-   **200 OK:** Success. Returns a JSON response with user logout successfully
- **401 Unauthorized:** unauthorized. Please login to continue if token is invalid
 - **401 Unauthorized:** Authentication details were not provided if token is missing from the header