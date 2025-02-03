@echo off
echo Starting development servers...

REM Kill any existing processes on ports 5001 and 3001
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :5001') DO TaskKill /PID %%P /F 2>nul
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3001') DO TaskKill /PID %%P /F 2>nul

echo Waiting for ports to be released...
timeout /t 2 /nobreak > nul

cd backend
echo Starting backend server...
start cmd /k "npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

cd ../frontend
echo Starting frontend...
start cmd /k "npm start"

echo Development servers started! 