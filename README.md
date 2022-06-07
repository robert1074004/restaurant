# 餐廳清單
此專案需先註冊帳密再登入，登入後讓使用者可以新增餐廳，有了餐廳資訊可做搜尋、刪除、新增、排序、修改和查閱詳細資訊

## 功能列表
* 使用者登入
* facebook登入
* 使用者註冊
* 依照餐廳名稱做搜尋
* 點擊餐廳圖片查閱詳細資訊
* 點擊左上角我的餐廳清單回到首頁
* 點擊detail查閱詳細資訊
* 點擊create新增餐廳資料
* 點擊edit修改餐廳資料
* 點擊delete刪除餐廳資料
* 點擊sort排序餐廳資料


## 安裝
 1.打開你的 terminal，Clone 此專案至本機電腦
      
    git clone https://github.com/robert1074004/restaurant
 2.開啟終端機(Terminal)，進入存放此專案的資料夾
 
    cd restaurant
 3.安裝 nodemon
 
    npm install -g nodemon
 4.npm init：建立 package.json 檔
 
    npm init -y
 5.npm install所需要的套件
 
    npm i express@4.16.4
    npm i express-handlebars@3.0.0
    npm i mongoose@5.9.7
    npm i method-override@3.0.0
    npm i bcryptjs@2.4.3
    npm i body-parser@1.20.0
    npm i connect-flash@0.1.1
    npm i dotenv@8.2.0
    npm i express-session@1.17.1
    npm i passport@0.4.1
    npm i passport-facebook@3.0.0
    npm i passport-local@1.0.0
    
 6.用nodemon 打開app.js
 
    nodemon app.js
 7.複製顯示在終端機的網址，前往網頁

## 環境建置
[Node.js](https://nodejs.org/en/)
[Robo3T](https://blog.robomongo.org/studio3t-free/)

## 開發人員
Robert
