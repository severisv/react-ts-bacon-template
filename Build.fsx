#r @"tools/packages/FAKE/tools/FakeLib.dll"
open Fake
open Fake.DotNetCli
open Fake.NpmHelper

[<AutoOpen>]
module Targets =
  
  let publishDirectory = currentDirectory + "/dist"


  Target "Clean-dist" (fun () ->
     CleanDirs [publishDirectory]
  )

  Target "Clean-backend" (fun () ->
      CleanDirs !! "**/server/**/bin"
      CleanDirs !! "**/server/**/obj"
  )

  Target "Restore-backend" (fun () ->     
      DotNetCli.Restore id
  )

  Target "Build-backend" (fun () ->     
      !! "**/*.csproj" |> Seq.iter (fun project -> 
                            DotNetCli.Build 
                              (fun o ->  { o with  
                                            Configuration = "Release"
                                            Project = project 
                                          }) )
  )


  Target "Clean-frontend" (fun () ->
      CleanDirs !! "**/wwwroot/dist"
      CleanDirs !! "**/.cache"
  )

  let clientDirectory = "src/client"
  let npm command = Npm (fun p -> { p with Command = command; WorkingDirectory = clientDirectory})


  Target "Restore-frontend" (fun () ->   
      npm (Install Standard)   
  )
  
  Target "Build-frontend" (fun () ->     
      npm (Run "build")
  )

  Target "Test-frontend" (fun () ->     
      npm (Run "test")
  )

  Target "Lint-frontend" (fun () ->     
      npm (Run "test")
  )

  Target "Publish" (fun () ->     
      DotNetCli.Publish 
                  (fun o ->  { o with  
                                Configuration = "Release"
                                Project = "src/server" 
                                Output = publishDirectory
                              }) 
  )

  Target "Default" ignore

"Clean-frontend"
==> "Restore-frontend"
==> "Build-frontend"
==> "Test-frontend"
==> "Lint-frontend"
==> "Publish"

"Clean-backend"
==> "Restore-backend"
==> "Build-backend"
==> "Publish"

"Clean-dist"
==> "Publish"
==> "Default"

RunTargetOrDefault "Default"