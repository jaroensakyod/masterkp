@echo off
echo ===== KP Exam Setup =====
echo.
echo Step 1: Starting PostgreSQL with Docker...
docker-compose up -d
if errorlevel 1 (
    echo ERROR: Docker failed. Please make sure Docker Desktop is running.
    pause
    exit /b 1
)

echo.
echo Waiting for database to be ready...
timeout /t 5 /nobreak

echo.
echo Step 2: Running database migrations...
npx prisma migrate dev --name init
if errorlevel 1 (
    echo ERROR: Migration failed.
    pause
    exit /b 1
)

echo.
echo Step 3: Seeding database with example questions...
npm run db:seed
if errorlevel 1 (
    echo ERROR: Seeding failed.
    pause
    exit /b 1
)

echo.
echo ===== Setup Complete! =====
echo.
echo Run: npm run dev
echo Then open: http://localhost:3000
echo.
echo Admin login: admin@kpexam.com / admin1234
echo.
pause
