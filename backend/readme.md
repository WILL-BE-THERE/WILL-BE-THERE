# Will Be There: Your RSVP Revolution 
----

This comprehensive README provides a clear roadmap for getting your **Will Be There** server up and running.  With this system, managing event RSVPs becomes a breeze! 

**Table of Contents** 

1. **Getting Started (Let's Get This Party Started!)** 
2. **Prerequisites (Gotta Have the Essentials)**
3. **Installation (Effortless Setup) 🪄** 
4. **API Endpoints (Your Gateway to RSVP Management)** 

**Getting Started (Let's Get This Party Started!)** 

Follow these steps to get your **Will Be There** server humming:

**Prerequisites (Gotta Have the Essentials)**

Before diving in, make sure you have these tools installed:

*  **Python:** The programming language powering the server. (Download here: [https://www.python.org/downloads/](https://www.python.org/downloads/)) 
*  **pip:** Python's package manager for installing dependencies. (Usually comes bundled with Python) 
*  **Git:** The version control system for managing your code. (Download here: [https://git-scm.com/downloads](https://git-scm.com/downloads)) ️

**Installation (Effortless Setup) 🪄**

1. **Clone the Repository:** 
   ```bash
   git clone https://github.com/ADCH24-GROUP-22/WILL-BE-THERE.git
   ```

2. **Navigate to the Backend:**
   ```bash
   cd backend
   ```

3. **Create a Virtual Environment:**
   This isolates your project's dependencies:
   ```bash
   python -m venv venv  # For Python 2
   python3 -m venv venv  # For Python 3
   ```

4. **Activate the Virtual Environment:**
   ```bash
   venv/Scripts/activate  # Windows
   source bin/activate    # macOS/Linux
   ```

5. **Install Requirements:**
   ```bash
   pip install -r requirements.txt
   ```
   This installs all the necessary libraries for your project. 

6. **Database Migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
   These commands create and apply database changes. ️ ➡️ 

7. **Start the Server:**
   ```bash
   python manage.py runserver
   ```
   Now your server is up and running, ready to handle RSVP requests! 

**API Endpoints (Your Gateway to RSVP Management)** 

These endpoints allow users to interact with the Will Be There application:

**1. Signup Endpoint (Welcome to the Party!)** 

* **URL:** http://127.0.0.1:8000/api/account/signup/
* **Method:** POST
* **Purpose:** Create a new user account for the application.

**Request Parameters:**

* `email` (string): User's email address.
* `first_name` (string): User's first name.
* `last_name` (string): User's last name.
* `phone_number` (string): User's phone number (optional).
* `password` (string): User's password (must be at least 8 characters).
* `confirm_password` (string): Confirmation of the password.

**Responses:**

* **200 OK:** Signup successful!   A JSON response with user information and an authorization token is returned. 
* **400 Bad Request:**  Oops!  There's an error in your request.  Check the parameters and try again. ❗️

**2. Login Endpoint (Let's Get RSVPing!)** 

* **URL:** http://127.0.0.1:8000/api/account/login/
* **Method:** POST
* **Purpose:** Authenticate existing users to access the application.

**Request Parameters:**

* `email` (string): User's email address.
* `password` (string): User's password.

**Responses:**

* **200 OK:** Login successful!  A JSON response with user information and an authorization token is returned. 

