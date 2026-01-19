Param(
  [Parameter(Position=0)]
  [string]$Command = "help",

  [Parameter(Position=1, ValueFromRemainingArguments=$true)]
  [string[]]$Args = @()
)

$ErrorActionPreference = 'Stop'

function New-Directory($path) {
  if (-not (Test-Path $path)) {
    New-Item -ItemType Directory -Force -Path $path | Out-Null
  }
}

function Write-Section($t) {
  Write-Host "";
  Write-Host "=== $t ===" -ForegroundColor Cyan
}

function Show-Help {
  Write-Section "WATMEDIA Accelerator (PowerShell-safe)"
  Write-Host "Commands:" 
  Write-Host "  help                         Show help" 
  Write-Host "  health                       Run lint/type-check/tests (safe)" 
  Write-Host "  clean                         Remove .next cache (PowerShell-safe)" 
  Write-Host "  generate-content <pack> <out> Generate vertical pack content into out dir" 
  Write-Host "  proof-pack                    Generate proof pack outputs" 
  Write-Host "  audit-docs                    Audit playbook docs structure" 
  Write-Host "" 
  Write-Host "Examples:" 
  Write-Host "  powershell -ExecutionPolicy Bypass -File playbook/acc.ps1 health" 
  Write-Host "  powershell -ExecutionPolicy Bypass -File playbook/acc.ps1 clean" 
  Write-Host "  powershell -ExecutionPolicy Bypass -File playbook/acc.ps1 generate-content clinic docs/accelerator/out/clinic" 
  Write-Host "  powershell -ExecutionPolicy Bypass -File playbook/acc.ps1 proof-pack" 
}

function Clear-NextCache {
  Write-Section "Cleaning .next"
  if (Test-Path .next) {
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
  }
  Write-Host "Done."
}

function Invoke-HealthChecks {
  Write-Section "Health checks"
  npm run lint
  if ($LASTEXITCODE -ne 0) { throw "lint failed" }

  npm run type-check
  if ($LASTEXITCODE -ne 0) { throw "type-check failed" }

  npm test
  if ($LASTEXITCODE -ne 0) { throw "tests failed" }

  Write-Host "All checks passed." -ForegroundColor Green
}

function Invoke-ContentGeneration($pack, $outDir) {
  if (-not $pack) { throw "pack is required" }
  if (-not $outDir) { throw "outDir is required" }

  $scriptPath = Join-Path $PSScriptRoot "generate-content.ps1"
  powershell -ExecutionPolicy Bypass -File $scriptPath -Pack $pack -OutDir $outDir
}

function Invoke-ProofPack {
  $scriptPath = Join-Path $PSScriptRoot "generate-proof-pack.ps1"
  powershell -ExecutionPolicy Bypass -File $scriptPath
}

function Invoke-DocsAudit {
  $scriptPath = Join-Path $PSScriptRoot "audit-docs.ps1"
  powershell -ExecutionPolicy Bypass -File $scriptPath
}

switch ($Command) {
  "help" { Show-Help }
  "health" { Invoke-HealthChecks }
  "clean" { Clear-NextCache }
  "generate-content" { Invoke-ContentGeneration $Args[0] $Args[1] }
  "proof-pack" { Invoke-ProofPack }
  "audit-docs" { Invoke-DocsAudit }
  default { Show-Help }
}
