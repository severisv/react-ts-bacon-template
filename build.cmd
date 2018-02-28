if not EXIST "tools\packages\FAKE\tools\Fake.exe" tools\NuGet.exe "Install" "FAKE" "-OutputDirectory" "tools\packages" "-ExcludeVersion"

"tools\packages\FAKE\tools\Fake.exe" Build.fsx %*