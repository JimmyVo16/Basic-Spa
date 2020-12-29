
param(
  [string]$apiBaseUrl,
  [string]$envFilePath
)

Write-Output "API Base URL: $apiBaseUrl"
Write-Output "Environment File Path: $envFilePath"

(Get-Content -Path $envFilePath) |
% { $_ -replace "{{API_BASE_URL}}", $apiBaseUrl } |
Set-Content -Path $envFilePath
