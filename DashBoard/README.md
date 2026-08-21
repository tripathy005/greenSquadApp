🚀 Installation
Prerequisites

Make sure you have installed:

Node.js
npm

1. Check installation:

                    node -v
                    npm -v

2. If node is not installed in your system:
Download and install Node use the official Node installer
https://nodejs.org/en/download

3. Navigate to the first frontend application

                    cd .\DashBoard\

4. Install dependencies

                    npm install 

                    or

                    npm i

5. Create the environment file

    Create a file named:  .env

    Example:
    VITE_API_BASE_URL=http://127.0.0.1:8000

    Important .env Rule
    For Vite applications, environment variables must start with:   VITE_

    # for crypto-js SECRET_KEY:

    VITE_STORAGE_SECRET_KEY=<YOUR SECRET_KEY >

6. Start the application

                        npm run dev

                The application will run on the URL shown in your terminal, usually:
                http://localhost:6999