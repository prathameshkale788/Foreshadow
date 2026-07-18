# Check all image paths in HTML, JS, CSS files
$root = "d:\rohit\fs"
$files = Get-ChildItem -Path $root -Include *.html,*.js,*.css -Recurse | Where-Object { $_.FullName -notmatch '\\\.git\\' -and $_.FullName -notmatch '\\scratch\\' -and $_.FullName -notmatch 'about_recovered' -and $_.FullName -notmatch 'about_reconstructed' -and $_.FullName -notmatch 'folder_snippet' }

$missing = @()
$found = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $relDir = $file.DirectoryName
    
    # Match src="...", url('...'), url("...")
    $patterns = @(
        'src=["\u0027]([^"''\s\u0027#?]+\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov))["\u0027]',
        'url\(["\u0027]([^"''\s\u0027#?)]+\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov))["\u0027]\)',
        'url\(([^"''\s\u0027#?)]+\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov))\)'
    )
    
    # Also match paths in JS strings like 'folder_1': 'path/to/img.jpg'
    $patterns += "'([^'#?\s]+\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov))'"
    $patterns += '"([^"#?\s]+\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov))"'
    
    foreach ($pattern in $patterns) {
        $matches = [regex]::Matches($content, $pattern, 'IgnoreCase')
        foreach ($m in $matches) {
            $imgPath = $m.Groups[1].Value
            
            # Skip data URIs, http URLs, template variables
            if ($imgPath -match '^(http|data:|//)' -or $imgPath -match '\$\{' -or $imgPath -match '\{\{') { continue }
            
            # Resolve relative path
            if ($imgPath.StartsWith('../')) {
                $resolvedPath = Join-Path $relDir $imgPath
            } else {
                $resolvedPath = Join-Path $root $imgPath
            }
            
            try {
                $resolvedPath = [System.IO.Path]::GetFullPath($resolvedPath)
            } catch { continue }
            
            if (Test-Path $resolvedPath) {
                $found++
            } else {
                $relFile = $file.FullName.Replace($root + '\', '')
                $missing += [PSCustomObject]@{
                    File = $relFile
                    Path = $imgPath
                    Resolved = $resolvedPath
                }
            }
        }
    }
}

Write-Host "`n===== IMAGE PATH CHECK RESULTS =====" -ForegroundColor Cyan
Write-Host "Total valid paths found: $found" -ForegroundColor Green

if ($missing.Count -eq 0) {
    Write-Host "No broken paths found! All image references are correct." -ForegroundColor Green
} else {
    Write-Host "`nBROKEN PATHS ($($missing.Count)):" -ForegroundColor Red
    $missing | ForEach-Object {
        Write-Host "`n  File: $($_.File)" -ForegroundColor Yellow
        Write-Host "  Path: $($_.Path)" -ForegroundColor Red
        Write-Host "  Expected at: $($_.Resolved)" -ForegroundColor DarkGray
    }
}
