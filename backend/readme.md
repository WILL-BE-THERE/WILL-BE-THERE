# Will Be There

## Table Of content
1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
 

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