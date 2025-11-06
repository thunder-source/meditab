@echo off
echo ========================================
echo   Starting Local Development Server
echo ========================================
echo.

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%a
    goto :found
)
:found
set IP=%IP:~1%

echo Your local IP address: %IP%
echo.
echo Starting server on port 8000...
echo.
echo ========================================
echo   Access from your phone:
echo   http://%IP%:8000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 8000

