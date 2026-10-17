[CmdletBinding()]
param([string]$Profile='desktop',[string]$DesktopExe,[switch]$IncludeLocalGameResources,[switch]$PackOnly)
$ErrorActionPreference='Stop'
if($Profile -notmatch '^[a-zA-Z0-9_-]+$'){throw 'Invalid profile name.'}
$root=$PSScriptRoot
$cache=Join-Path $root '.cache/install'
New-Item -ItemType Directory -Path $cache -Force | Out-Null
$stage=Join-Path $cache ([guid]::NewGuid().ToString('N'))
$packageDir=Join-Path $stage 'package'
New-Item -ItemType Directory -Path $packageDir -Force | Out-Null
foreach($required in @('lib/index.js','lib/client.js','demo-assets/manifest.json')){if(!(Test-Path -LiteralPath (Join-Path $root $required))){throw "Missing prebuilt file $required. Download a complete release or run npm ci; npm run build."}}
$metadata=Get-Content -LiteralPath (Join-Path $root 'package.json') -Raw | ConvertFrom-Json
if((Get-Content -LiteralPath (Join-Path $root 'src/resource-pack.json') -Raw | ConvertFrom-Json).kind -eq 'game' -and !$IncludeLocalGameResources){throw 'This checkout uses local game resources. Use -IncludeLocalGameResources for a private local package, or rebuild the demo first.'}
foreach($name in @('lib','demo-assets','cordis.patch.yml','README.md','README.zh-TW.md','README.ja.md','LICENSE','THIRD_PARTY_NOTICES.md')){if(Test-Path -LiteralPath (Join-Path $root $name)){Copy-Item -LiteralPath (Join-Path $root $name) -Destination $packageDir -Recurse}}
foreach($role in @('tig','lpd','lpdcat')){$target=Join-Path $packageDir ('skills/nekojishi-'+$role);New-Item -ItemType Directory -Path $target -Force | Out-Null;Copy-Item -LiteralPath (Join-Path $root ('skills/nekojishi-'+$role+'/SKILL.md')) -Destination $target}
if($IncludeLocalGameResources){if(!(Test-Path -LiteralPath (Join-Path $root 'assets/manifest.json'))){throw 'Import your own game resources first.'};Copy-Item -LiteralPath (Join-Path $root 'assets') -Destination $packageDir -Recurse;foreach($role in @('tig','lpd','lpdcat')){Copy-Item -LiteralPath (Join-Path $root ('skills/nekojishi-'+$role+'/references')) -Destination (Join-Path $packageDir ('skills/nekojishi-'+$role)) -Recurse};Write-Warning 'This local package contains game resources. Do not upload it without separate authorization.'}
$metadata | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath (Join-Path $packageDir 'package.json') -Encoding utf8
$output=Join-Path $cache ($metadata.name+'-'+$metadata.version+$(if($IncludeLocalGameResources){'-local-game'}else{''})+'.tgz')
& tar.exe -czf $output -C $stage package
if($LASTEXITCODE -ne 0){throw 'Failed to create install archive.'}
if($PackOnly){Write-Output $output;return}
$dshHome=if($env:DSH_HOME){$env:DSH_HOME}else{Join-Path $env:USERPROFILE '.dsh'}
$profileFile=Join-Path $dshHome "profiles/$Profile/package.json"
if(Test-Path -LiteralPath $profileFile){$profileData=Get-Content -LiteralPath $profileFile -Raw | ConvertFrom-Json;if($profileData.dependencies.PSObject.Properties.Name -contains '@local/dsh-nekojishi'){throw 'A private development version of this theme is installed. Remove that old theme through the official plugin manager first; do not enable both versions together.'}}
if(!$DesktopExe){$entry=Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*' -ErrorAction SilentlyContinue | Where-Object {$_.DisplayName -match '^DeepSeek Harness(?: \d.*)?$'} | Select-Object -First 1;if($entry.InstallLocation){$DesktopExe=Join-Path $entry.InstallLocation 'DeepSeek Harness.exe'}}
if($DesktopExe -and (Test-Path -LiteralPath $DesktopExe)){
 if(Get-Process -Name 'DeepSeek Harness' -ErrorAction SilentlyContinue){throw 'Exit DeepSeek Harness from the tray, then run install.ps1 again. No profile changes were made.'}
 $cli=Join-Path (Split-Path -Parent $DesktopExe) 'resources/app.asar/dsh/node_modules/@deepseek-ai/dsh-desktop-host/lib/cli.js'
 $oldElectron=$env:ELECTRON_RUN_AS_NODE
 try{$env:ELECTRON_RUN_AS_NODE='1';$spec='file:'+$output.Replace('\','/');$log=Join-Path $cache 'install.log';$errorLog=Join-Path $cache 'install.err';$process=Start-Process -FilePath $DesktopExe -ArgumentList "--expose-internals `"$cli`" plugin --profile $Profile add `"$spec`"" -WindowStyle Hidden -Wait -PassThru -RedirectStandardOutput $log -RedirectStandardError $errorLog;Get-Content -LiteralPath $log -Tail 20;if($process.ExitCode -ne 0){throw "DSH installation failed. Review $log and $errorLog."}}
 finally{if($null -eq $oldElectron){Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue}else{$env:ELECTRON_RUN_AS_NODE=$oldElectron}}
}else{
 $dsh=Get-Command dsh -ErrorAction SilentlyContinue
 if(!$dsh){throw 'Install official DeepSeek Harness first, or pass -DesktopExe with its executable path.'}
 & $dsh.Source plugin --profile $Profile add ('file:'+$output.Replace('\','/'));if($LASTEXITCODE -ne 0){throw 'DSH installation failed.'}
}
Write-Output 'Installed. Start DeepSeek Harness normally. Use the theme toggle to restore the native view.'
