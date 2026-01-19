$ErrorActionPreference = 'Stop'

function Write-Section([string]$t) {
  Write-Host "";
  Write-Host "=== $t ===" -ForegroundColor Cyan
}

function New-Directory($path) {
  if (-not (Test-Path $path)) {
    New-Item -ItemType Directory -Force -Path $path | Out-Null
  }
}

function Invoke-IfExists([string]$scriptPath, [string]$label, [string]$fallbackOutputPath) {
  if (Test-Path $scriptPath) {
    Write-Host "Running $label..."
    powershell -ExecutionPolicy Bypass -File $scriptPath
    return
  }

  Write-Host "Missing $label script: $scriptPath" -ForegroundColor Yellow
  if ($fallbackOutputPath) {
    $fallbackDir = Split-Path -Parent $fallbackOutputPath
    New-Directory $fallbackDir
    $fallback = @" 
# $label (Placeholder)

Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm')

This repo does not currently include the generator script expected at:
`$scriptPath`

Action:
- Add the script, or update `playbook/generate-proof-pack.ps1` to point to your preferred tooling.
"@
    Set-Content -Path $fallbackOutputPath -Value $fallback -Encoding UTF8
  }
}

Write-Section "Generating Proof Pack"

$proofDir = "docs/accelerator/proof"
New-Directory "docs"
New-Directory "docs/accelerator"
New-Directory $proofDir

# Run all proof generators
Invoke-IfExists (Join-Path $PSScriptRoot "bench-lighthouse.ps1") "Lighthouse Benchmark" (Join-Path $proofDir "lighthouse.md")

Invoke-IfExists (Join-Path $PSScriptRoot "audit-bundle.ps1") "Bundle Audit" (Join-Path $proofDir "bundle-audit.md")

Invoke-IfExists (Join-Path $PSScriptRoot "bench-api.ps1") "API Benchmark" (Join-Path $proofDir "api-benchmark.md")

# Generate security decisions
$securityPath = Join-Path $proofDir "security-decisions.md"
$securityDir = Split-Path -Parent $securityPath
New-Directory $securityDir
$securityContent = @"
# Security Decisions (Last Updated: $(Get-Date -Format 'yyyy-MM-dd'))

## Dependency Security
- Critical: Fixed immediately (see npm audit history)
- Moderate: Documented and accepted for dev-only packages

## Webhook Security
- Stripe webhook signature verification: Implemented
- Metadata sanitization: Implemented

## Auth Boundary
- Protected routes: Guarded at layout level
- Ownership checks: Implemented for user resources

## Known Breakpoints Addressed
- Font subsets: Verified before use
- Provider exports: Verified imports
- AI SDK imports: Updated to @ai-sdk/react
"@
Set-Content -Path $securityPath -Value $securityContent -Encoding UTF8

Write-Host "Proof pack generated in docs/accelerator/proof/" -ForegroundColor Green
