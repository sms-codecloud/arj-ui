Param(
  [string]$ApiBase,
  [string]$BucketName,
  [string]$DistributionId = ""
)

$ErrorActionPreference = "Stop"

# Build React
Push-Location "$PSScriptRoot\..\ui\app"
$env:VITE_API_BASE = $ApiBase
npm ci
npm run build
Pop-Location

# Upload to S3
$dist = Join-Path $PSScriptRoot "..\ui\app\dist"
aws s3 sync $dist "s3://$BucketName" --delete --only-show-errors

# Invalidate CF
if ($DistributionId) {
  aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
  Write-Host "Invalidated CloudFront distribution $DistributionId"
}
