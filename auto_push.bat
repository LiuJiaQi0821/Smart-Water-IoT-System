@echo off
setlocal EnableDelayedExpansion
:: 设置白字黑底
color 0F
title Smart Git Auto-Increment

echo =======================================================
echo          Smart Car Project - Auto Versioning
echo =======================================================
echo.

:: --- 步骤 1: 检查版本文件 ---
if not exist version.txt (
    echo [!] version.txt not found. Creating default 1.0.0
    echo 1.0.0 > version.txt
)

:: --- 步骤 2: 读取旧版本号 ---
set /p old_ver=<version.txt

:: 解析 x.x.x 格式 (例如 1.1.9)
for /f "tokens=1,2,3 delims=." %%a in ("%old_ver%") do (
    set /a maj=%%a
    set /a min=%%b
    set /a pat=%%c
)

:: --- 步骤 3: 计算新版本 (逢9进位逻辑) ---
set /a pat+=1

:: 如果最后一位 > 9，归零，中间位 +1
if !pat! gtr 9 (
    set pat=0
    set /a min+=1
)

:: 如果中间位 > 9，归零，第一位 +1
if !min! gtr 9 (
    set min=0
    set /a maj+=1
)

:: 组合成新字符串
set "auto_ver=!maj!.!min!.!pat!"

:: --- 步骤 4: git add ---
echo [Step 1] Adding files...
git add .
echo.

:: --- 步骤 5: 用户确认与修改 ---
echo -------------------------------------------------------
echo  Previous Version: V%old_ver%
echo  Auto Suggestion : V%auto_ver%
echo -------------------------------------------------------
echo.
echo  [Enter]  = Accept V%auto_ver%
echo  [Type]   = Input custom version (e.g. 1.2.5)
echo.

set "final_ver="
set /p final_ver="Your Choice: "

:: 如果用户直接回车，使用自动计算的值
if "%final_ver%"=="" set final_ver=%auto_ver%

:: 如果用户输入了带V的(如V1.2.0)，把V去掉，方便下次计算
set "clean_ver=%final_ver:V=%"
set "clean_ver=%clean_ver:v=%"

:: --- 步骤 6: 保存新版本号到文件 ---
echo %clean_ver% > version.txt

:: --- 步骤 7: 提交与推送 ---
echo.
echo [Step 2] Committing with tag: "V%clean_ver%"
git commit -m "V%clean_ver%"

echo.
echo [Step 3] Pushing to remote...
git push

echo.
echo =======================================================
if %errorlevel% equ 0 (
    echo             SUCCESS: Updated to V%clean_ver%
) else (
    color 0C
    echo             ERROR: Push Failed!
)
echo =======================================================
echo.
pause