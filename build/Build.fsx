#r @"nuget/packages/FAKE/tools/FakeLib.dll"
open Fake
open Fake.AppVeyor
open Fake.FileSystemHelper
open Fake.EnvironmentHelper
open Fake.DotNetCli
open System.IO
open System

[<AutoOpen>]
module Helpers = 
  let getDirectory file = Directory.GetParent(file).FullName

[<AutoOpen>]
module Targets =
  

  Target "Clean-dist" (fun() ->
    CleanDirs ["_dist"]
  )

  Target "Clean-frontend" (fun() ->
    CleanDirs (!! "**/wwwroot/dist")
  )

  Target "Clean-backend" (fun() ->
      CleanDirs (!! "**/server/**/bin")
      CleanDirs (!! "**/server/**/obj")
  )

  Target "Restore-backend" (fun _ ->     
      DotNetCli.Restore id
  )

  Target "Build-backend" (fun _ ->     
    printf "Build-backend"
  )

  Target "Restore-frontend" (fun _ ->     
    printf "Restore-frontend"
  )
  
  Target "Build-frontend" (fun _ ->     
    printf "Build-frontend"
  )

  Target "Publish" (fun _ ->     
    printf "Publish"
  )

  Target "Default" ignore

"Clean-backend"
==> "Restore-backend"
==> "Build-backend"

"Clean-frontend"
==> "Restore-frontend"
==> "Build-frontend"

"Clean-dist"
==> "Build-frontend"
==> "Build-backend"
==> "Publish"

"Publish"
==> "Default"

RunTargetOrDefault "Default"