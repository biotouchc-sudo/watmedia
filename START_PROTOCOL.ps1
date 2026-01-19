# 🦅 WATMEDIA: ELITE PROTOCOL STARTUP
# Automation for Clean Build & Launch

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   WATMEDIA PLATFORM - ELITE PROTOCOL     " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 0. Set Working Directory
Set-Location $PSScriptRoot
Write-Host "Working Directory set to: $PSScriptRoot" -ForegroundColor DarkGray

# 1. Clean Environment
Write-Host "`n[1/5] Cleaning Environment..." -ForegroundColor Yellow
if (Test-Path ".next") { 
    Remove-Item -Recurse -Force ".next" 
    Write-Host "Deleted .next directory." -ForegroundColor DarkGray
}
# Uncomment the line below for a full deep clean (slower)
# if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }

# 2. Install Dependencies
Write-Host "`n[2/5] Verifying Dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "Dependency install failed!"; exit 1 }

# 3. Quality Assurance
Write-Host "`n[3/5] Running Quality Checks (Lint)..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) { Write-Error "Linting failed! Fix errors before deployment."; exit 1 }

# 4. Production Build
Write-Host "`n[4/5] Compiling Production Build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed!"; exit 1 }

# 5. Launch
Write-Host "`n[5/5] Launching Satellite..." -ForegroundColor Green
Write-Host "Access the platform at http://localhost:3000" -ForegroundColor Cyan
npm run start
