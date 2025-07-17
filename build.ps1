param (
    [string]$version,
    [string]$env
)

if (-not $version -or -not $env)
{
    Write-Host "Error. Image tag (version) and environment (env) must be specified."
    exit 1
}

Write-Host "building with profile: $env"
Write-Host "image version: $version"

Write-Host "clean .next"
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

Write-Host "build docker image"

docker build -t sdrc:$version .

docker tag sdrc:$version registry.cn-hangzhou.aliyuncs.com/devl/sdrc:$version

docker push registry.cn-hangzhou.aliyuncs.com/devl/sdrc:$version

Write-Host "build docker image done"