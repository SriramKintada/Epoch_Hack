# Download all video applications and transcribe with Whisper
$videoDir = "C:\Users\kinta\clawd\epoch-hack\videos"

# Google Drive direct download helper
function Get-GDriveDirectUrl($url) {
    if ($url -match "drive\.google\.com/file/d/([^/]+)") {
        $fileId = $Matches[1]
        return "https://drive.google.com/uc?export=download&id=$fileId"
    }
    return $url
}

$videos = @(
    @{ name = "niraj-puran-rao"; url = "https://drive.google.com/file/d/1mTI3LRZvzJxT1J64QpxZpyVE5B49mc91/view" },
    @{ name = "sahil-bharat-markubees"; url = "https://drive.google.com/file/d/1Sbjd9wV2LgfEgOqS9Ue8aTK0yUrTKw4z/view" },
    @{ name = "pritam-pawar"; url = "https://drive.google.com/file/d/1twB0vlcp9sLAV7hoY9iSUTDL4fl6Kvpu/view" },
    @{ name = "almas-sayyed"; url = "https://www.loom.com/share/1de062a5aafd4e2897effc43360ed615" },
    @{ name = "rahul-dange"; url = "https://www.youtube.com/shorts/tpy5UAP034E" },
    @{ name = "prasad-hajare"; url = "https://drive.google.com/file/d/10f9-plnqbbqpZxLPrmZrhU016QcwC-8k/view" },
    @{ name = "colrows-team"; url = "https://drive.google.com/file/d/1JG2QznmMLOHywX-ujar96BwK-V5P2cNK/view" },
    @{ name = "tushar-kanavalli"; url = "https://drive.google.com/file/d/14QOTyPyqRttkEpZul6ACFiKkHivz9qyn/view" },
    @{ name = "dhruv-gadiya"; url = "https://youtu.be/p61bLFmz0JI" },
    @{ name = "pritesh-kamdi"; url = "https://drive.google.com/file/d/1QRNvfNcz5C-SViDj1bULe4lP8_ZCBuvr/view" },
    @{ name = "raghvendra-dharmapurikar"; url = "https://www.loom.com/share/3690e2ad70ed43e69db24c53245c33cf" },
    @{ name = "suyash-dhumal"; url = "https://drive.google.com/file/d/1h5cmwxnSbvblgLzj-D6pNYyNJ5LOh_3X/view" },
    @{ name = "muhammed-umar"; url = "https://drive.google.com/file/d/1pxOaAa2JApQZ6GxfBScH5R7E6Bv5ygz8/view" }
)

foreach ($v in $videos) {
    $outPath = Join-Path $videoDir "$($v.name)"
    Write-Host "--- Downloading: $($v.name) ---"
    
    try {
        # Use yt-dlp for all sources (handles YouTube, Loom, GDrive)
        & python -m yt_dlp -x --audio-format wav --audio-quality 0 -o "$outPath.%(ext)s" $v.url 2>&1 | Select-Object -Last 3
        Write-Host "OK: $($v.name)"
    } catch {
        Write-Host "FAILED: $($v.name) - $($_.Exception.Message)"
    }
}

Write-Host "`n--- Download phase complete ---"
Get-ChildItem $videoDir -Filter "*.wav" | ForEach-Object { Write-Host "  $($_.Name) - $([math]::Round($_.Length/1MB, 1))MB" }
