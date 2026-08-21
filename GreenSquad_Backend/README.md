GreenSquad Backend

Django REST API backend for the GreenSquad environmental platform.

⚠️ STRICT REQUIREMENT

PYTHON 3.12 IS REQUIRED

*You MUST install Python 3.12 before installing any dependencies or running any setup commands.*

The GreenSquad AI module is configured to run with **Python 3.12*.

Do not use another Python version.

Windows

Download and install Python 3.12 using the official Python installer:
-> https://www.python.org/downloads/release/python-3120/
-> winget install Python.Python.3.12
-> python --version

Linux

For Ubuntu/Debian-based systems:
-> sudo apt update
-> sudo apt install python3.12 python3.12-venv python3-pip

Setup Flow--- 

Python 3.12 Requirement
        ↓
Requirements
        ↓
Clone Repository
        ↓
Virtual Environment
        ↓
Install Dependencies
        ↓
.env Configuration
        ↓
Database Migration
        ↓
Create Superuser
        ↓
Run Server
        ↓
API / Admin Access


1- Create the virtual environment using Python 3.12:

python3.12 -m venv .venv

Activate it:

source .venv/bin/activate

Install Dependencies

Upgrade pip:

python -m pip install --upgrade pip

2- Install all backend dependencies:

pip install -r requirements.txt

3- .env Configuration

Create a .env file in the backend root directory.

Example:

SECRET_KEY=your_django_secret_key
DEBUG=True


# Database
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432


# AI / External Services
OPENAI_API_KEY=your_openai_api_key
ROBOFLOW_API_KEY=your_roboflow_api_key

Use the actual environment variable names required by the project.

(IMPORTANT) Security

Do not commit the real .env file to GitHub.

The repository should contain:

.env.example

The .env.example file should contain placeholder values only.

Example:

SECRET_KEY=your_secret_key
DEBUG=True


DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432


OPENAI_API_KEY=your_api_key
ROBOFLOW_API_KEY=your_api_key7. Database Migration

Run the following command:

python manage.py makemigrations

Then apply the migrations:

python manage.py migrate
8. Create Superuser

Create a Django administrator account:

python manage.py createsuperuser

Follow the instructions displayed in the terminal.

9. Run Server

Start the Django development server:

python manage.py runserver

The backend will be available at:

http://127.0.0.1:8000/
10. API / Admin Access
Backend
http://127.0.0.1:8000/
Django Admin
http://127.0.0.1:8000/admin/

Use the superuser credentials created during setup to access the Django Admin panel.

Project Structure
GreenSquad_Backend/
│
├── .venv/
├── .env
├── .env.example
├── .gitignore
├── manage.py
├── requirements.txt
├── README.md
│
├── <django_project>/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── <django_apps>/
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    └── ...
Important Notes

Python 3.12 is mandatory for this project.

Install Python 3.12 before installing the project dependencies.

Activate the virtual environment before running the backend.

Configure the .env file before starting the server.

Never commit the real .env file or API credentials to GitHub.

11- Quick Start

For users who already have Python 3.12 installed:

git clone <YOUR_GITHUB_REPOSITORY_URL>


cd GreenSquad_Backend


python --version


python -m venv .venv


.venv\Scripts\activate


python -m pip install --upgrade pip


pip install -r requirements.txt


python manage.py makemigrations


python manage.py migrate


python manage.py createsuperuser


python manage.py runserver

Backend:

http://127.0.0.1:8000/

Admin:

http://127.0.0.1:8000/admin/