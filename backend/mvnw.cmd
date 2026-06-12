@echo off
setlocal

if not defined JAVA_HOME (
    set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot"
)

set "MAVEN_BIN=%USERPROFILE%\.barberhub-maven\apache-maven-3.9.6\bin\mvn.cmd"

if not exist "%MAVEN_BIN%" (
    echo Maven nao encontrado em %MAVEN_BIN%
    echo Rode o script de preparacao novamente.
    exit /b 1
)

call "%MAVEN_BIN%" %*
exit /b %errorlevel%
