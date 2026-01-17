Set-Location "C:\Users\lenovo\AJ\WILL-BE-THERE\frontend"

# Directories to KEEP (everything else will be deleted)
$keepers = @("src", "public", "tests", "node_modules", ".vite", ".git", ".vscode", ".idea")

Write-Host "Analyzing frontend directory for cleanup..."

$items = Get-ChildItem -Directory

foreach ($item in $items) {
    if ($item.Name -notin $keepers) {
        Write-Host "DELETING INVALID FOLDER: $($item.Name)" -ForegroundColor Yellow
        Remove-Item -Recurse -Force $item.FullName
    }
}

Write-Host "Cleanup complete. Please run 'git reset' then 'git add .' again." -ForegroundColor Green
