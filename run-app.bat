@echo off
REM Script to set up and run the full-stack application

REM Step 1: Move to the root directory of the script
cd /d "%~dp0"
echo [DEBUG] Current directory: %CD%

REM Step 2: Install backend dependencies
echo [DEBUG] Step 2: Installing backend dependencies...
if not exist "Backend" (
  echo [ERROR] Backend directory not found.
  exit /b 1
)
cd Backend
echo [DEBUG] Current directory: %CD%
call npm install
if %errorlevel% neq 0 (
  echo [ERROR] Error installing backend dependencies.
  exit /b 1
)
echo [DEBUG] Backend dependencies installed successfully.

REM Ensure package-lock.json exists before audit fix
echo [DEBUG] Ensuring package-lock.json exists...
if not exist "package-lock.json" (
  echo [DEBUG] package-lock.json not found. Generating it...
  call npm i --package-lock-only
  if %errorlevel% neq 0 (
    echo [ERROR] Failed to generate package-lock.json.
    exit /b 1
  )
  echo [DEBUG] package-lock.json generated successfully.
)

REM Step 3: Fix npm vulnerabilities (if any)
echo [DEBUG] Step 3: Fixing npm vulnerabilities...
call npm audit fix
if %errorlevel% neq 0 (
  echo [WARNING] Some vulnerabilities could not be fixed automatically.
)

REM Step 4: Set up the database
echo [DEBUG] Step 4: Setting up the database...
call npx sequelize-cli db:migrate
if %errorlevel% neq 0 (
  echo [ERROR] Error setting up the database.
  exit /b 1
)
echo [DEBUG] Database setup completed successfully.

REM Ensure we return to root directory
cd /d "%~dp0"
echo [DEBUG] Current directory after returning: %CD%

REM Step 5: Start the backend
echo [DEBUG] Step 5: Starting the backend...
start "Backend" cmd /k "cd /d %CD%\Backend && node server.js"
if %errorlevel% neq 0 (
  echo [ERROR] Error starting the backend.
  echo [DEBUG] Please check the backend logs for more details.
  exit /b 1
)
echo [DEBUG] Backend started successfully.
timeout /t 5

REM Ensure we return to root directory before frontend setup
cd /d "%~dp0"
echo [DEBUG] Current directory before frontend setup: %CD%

REM Step 6: Install frontend dependencies
echo [DEBUG] Step 6: Installing frontend dependencies...
if not exist "Frontend_test" (
  echo [ERROR] Frontend_test directory not found.
  exit /b 1
)
cd Frontend_test
echo [DEBUG] Current directory: %CD%
call npm install
if %errorlevel% neq 0 (
  echo [ERROR] Error installing frontend dependencies.
  exit /b 1
)
echo [DEBUG] Frontend dependencies installed successfully.

REM Step 7: Start the frontend
echo [DEBUG] Step 7: Starting the frontend...
start "Frontend" cmd /k "cd /d %CD% && npm start"
if %errorlevel% neq 0 (
  echo [ERROR] Error starting the frontend.
  echo [DEBUG] Please check the frontend logs for more details.
  exit /b 1
)
echo [DEBUG] Frontend started successfully.

REM Step 8: Display success message
echo [DEBUG] The application is running.
echo [DEBUG] Backend: http://localhost
