if not EXIST "build\nuget\packages\FAKE\tools\Fake.exe" build\nuget\NuGet.exe "Install" "FAKE" "-OutputDirectory" "build\nuget\packages" "-ExcludeVersion"

"build\nuget\packages\FAKE\tools\Fake.exe" build\Build.fsx %*