*** Settings ***
Library           SeleniumLibrary

*** Test Cases ***
Login Success with username and password
    เข้ามายังระบบ
    ทำการ login ด้วย username=demo1 และ password=n0te$App!23 ที่ถูกต้อง
    ตรวจสอบว่าเข้าสู่ระบบสำเร็จ

*** Keywords ***
เข้ามายังระบบ
    Open Browser    http://localhost:3000    browser=chrome
    ...    options=add_experimental_option("detach", True)
    Maximize Browser Window

ทำการ login ด้วย username=${username} และ password=${password} ที่ถูกต้อง
    Input Text    xpath=//*[@data-testid="username"]    ${username}
    Input Text    xpath=//*[@data-testid="password"]    ${password}
    Click Button    Login

ตรวจสอบว่าเข้าสู่ระบบสำเร็จ
    Wait Until Page Contains    Profile
    Wait Until Page Contains    Logout
    
    Wait Until Element Contains    xpath=//*[@id="root"]/div/div[1]/button[2]    Profile
    Wait Until Element Contains    xpath=//*[@id="root"]/div/div[1]/button[3]    Logout

