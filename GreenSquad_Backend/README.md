# GreenSquad Backend

Django REST API backend for the **GreenSquad Environmental Platform**.

## ⚠️ Strict Requirement: Python 3.12

**Python 3.12 is mandatory for this project.**

You MUST install Python 3.12 before installing any dependencies or running setup commands.

The GreenSquad AI module is configured to run with **Python 3.12**. Do not use any other Python version.

### Windows

Download and install Python 3.12 using the official installer:

- [Download Python 3.12](https://www.python.org/downloads/release/python-3120/)
- Alternatively, install using Winget:

```bash
winget install Python.Python.3.12
```

Verify the installation:

```bash
python --version
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install python3.12 python3.12-venv python3-pip
```

Verify the installation:

```bash
python3.12 --version
```

---

## Setup Flow

Follow these steps in the given order:

```text
Python 3.12 Requirement
        ↓
Clone Repository
        ↓
Create Virtual Environment
        ↓
Activate Virtual Environment
        ↓
Install Dependencies
        ↓
Configure .env File
        ↓
Database Migration
        ↓
Create Superuser
        ↓
Run Development Server
        ↓
API / Admin Access
```

## 1. Clone Repository

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the backend directory:

```bash
cd GreenSquad_Backend
```

## 2. Create Virtual Environment

Create the virtual environment using Python 3.12:

```bash
python3.12 -m venv .venv
```

**Windows:**

```bash
py -3.12 -m venv .venv
```

## 3. Activate Virtual Environment

**Windows (Command Prompt / PowerShell):**

```bash
.venv\Scripts\activate
```

**Linux / macOS:**

```bash
source .venv/bin/activate
```

Verify the Python version:

```bash
python --version
```

Expected output:

```text
Python 3.12.x
```

## 4. Install Dependencies

First, upgrade pip:

```bash
python -m pip install --upgrade pip
```

Install all required backend dependencies:

```bash
pip install -r requirements.txt
```

## 5. Environment Configuration (.env)

Create a `.env` file in the backend root directory.

Example configuration:

```env
SECRET_KEY=your_django_secret_key
DEBUG=True

# Database Configuration
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432

# AI / External Services
OPENAI_API_KEY=your_openai_api_key
ROBOFLOW_API_KEY=your_roboflow_api_key
```

**Note:** Use the actual environment variable names required by the project.

### Security Requirements

- Never commit your actual `.env` file to GitHub.
- Keep all API keys and database credentials private.
- Include an `.env.example` file in the repository.
- The `.env.example` file must contain placeholder values only.

Example `.env.example`:

```env
SECRET_KEY=your_secret_key
DEBUG=True

# Database Configuration
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432

# AI / External Services
OPENAI_API_KEY=your_api_key
ROBOFLOW_API_KEY=your_api_key
```

## 6. Database Migration

Generate database migrations:

```bash
python manage.py makemigrations
```

Apply migrations to the database:

```bash
python manage.py migrate
```

## 7. Create Superuser

Create a Django administrator account:

```bash
python manage.py createsuperuser
```

Follow the instructions displayed in the terminal to configure your administrator credentials.

## 8. Run Development Server

Start the Django development server:

```bash
python manage.py runserver
```

The backend server will be available at:

```text
http://127.0.0.1:8000/
```

## 9. API / Admin Access

| Service | URL |
|---|---|
| Backend | http://127.0.0.1:8000/ |
| Django Admin | http://127.0.0.1:8000/admin/ |

Use the superuser credentials created during setup to access the Django Admin panel.

---

## Project Structure

```text
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
```

## Important Notes

1. **Python 3.12 is mandatory.** Do not use another Python version.
2. Install Python 3.12 before installing project dependencies.
3. Always activate the virtual environment before running backend commands.
4. Configure the `.env` file before starting the server.
5. Ensure your database server is running before applying migrations.
6. Never commit `.env` files, API keys, or sensitive credentials to GitHub.
7. Keep `.env.example` updated whenever new environment variables are introduced.

---

## 10. Quick Start

For users who already have Python 3.12 installed:

**Step 1: Clone the repository**

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd GreenSquad_Backend
```

**Step 2: Create virtual environment**

Windows:

```bash
py -3.12 -m venv .venv
```

Linux / macOS:

```bash
python3.12 -m venv .venv
```

**Step 3: Activate virtual environment**

Windows:

```bash
.venv\Scripts\activate
```

Linux / macOS:

```bash
source .venv/bin/activate
```

**Step 4: Install dependencies**

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

**Step 5: Configure environment variables**

Create and configure the `.env` file using the `.env.example` file as a reference.

**Step 6: Apply database migrations**

```bash
python manage.py makemigrations
python manage.py migrate
```

**Step 7: Create administrator account**

```bash
python manage.py createsuperuser
```

**Step 8: Start the server**

```bash
python manage.py runserver
```

### Access the Backend

- **Backend:** http://127.0.0.1:8000/
- **Django Admin:** http://127.0.0.1:8000/admin/

---

**GreenSquad Backend**  
*Building a smarter and greener environment through technology.*
