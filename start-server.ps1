# PowerShell script to start local development server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Local Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get local IP address
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" -or $_.IPAddress -like "172.*" } | Select-Object -First 1).IPAddress

if (-not $ipAddress) {
    $ipAddress = "localhost"
}

Write-Host "Your local IP address: $ipAddress" -ForegroundColor Green
Write-Host ""
Write-Host "Starting server on port 8000..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Access from your phone:" -ForegroundColor Cyan
Write-Host "  http://$ipAddress:8000" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start Python HTTP server
python -m http.server 8000

