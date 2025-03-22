@echo off
REM Script to set up and run the full-stack application

REM Step 1: Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
pause
echo Debug: npm install completado

if %errorlevel% neq 0 (
  echo Error installing backend dependencies.
  exit /b 1
)

REM Step 2: Fix npm vulnerabilities (if any)
echo Fixing npm vulnerabilities...
call npm audit fix
if %errorlevel% neq 0 (
  echo Warning: Some vulnerabilities could not be fixed automatically.
)

REM Step 3: Set up the database
echo Setting up the database...
start /b npx sequelize-cli db:migrate
echo Debug: Migraciones completadas

if %errorlevel% neq 0 (
  echo Error setting up the database.
  exit /b 1
)

REM Step 4: Start the backend
echo Starting the backend...
start /b node server.js

if %errorlevel% neq 0 (
  echo Error starting the backend.
  echo Please check the backend logs for more details.
  exit /b 1
)

REM Step 5: Install frontend dependencies
echo Installing frontend dependencies...
cd ..\frontend_test
call npm install
pause
echo Debug: npm install frontend completado

if %errorlevel% neq 0 (
  echo Error installing frontend dependencies.
  exit /b 1
)

REM Step 6: Start the frontend
echo Starting the frontend...
start "Frontend" npm start

if %errorlevel% neq 0 (
  echo Error starting the frontend.
  echo Please check the frontend logs for more details.
  exit /b 1
)

REM Step 7: Display success message
echo The application is running.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000

REM Pause to keep the script window open
pause
