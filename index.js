// thuong thi 2 thu vien ban dau can install la
// 1. express --> framework cua JS de viet code backend (equivalent to Spring in Java)
// 2. database (MySQL)

const express = require('express'); // equivalent to import express library
const app = express(); // create an instance of the app
const cors = require('cors');
const mysql = require('mysql');
const PORT = 3001; // port to run

app.use(express.json()) // quy định là server này sẽ tương tác (nói chuyện) với các clients thông qua dạng json
// CORS (Cross Origin Restricted Policy)
// cho phép client từ cổng 3000 truy cập vào tài nguyên
app.use(cors({
    origin: ["http://localhost:3000"], // địa chỉ cổng của client (cụ thể là ReactJS cổng 3000)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

// create connection to database
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Quynh4486@^!)',
    database: 'theton'
})

// start server listening on PORT
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

// GET --> lấy dữ liệu
// POST --> gửi lên để thêm mới
// PUT --> gửi lên để update
// DELETE --> gửi lên để xoá

// APIs
// api lấy hết dữ liệu trong database theton bảng ton
app.get('/theton', (request, response) => {
    // truy vấn vào database bằng câu lệnh, sẽ xảy ra 2 trường hợp
    // 1. error --> ko lấy được, trả về lỗi 400
    // 2. lấy thành công --> trả về dữ liệu
    db.query("select * from theton.tonfamily;", (error, result) => {
        if (error) {
            console.log("Cannot get data"); // for debugging
            console.log(error);
            response.status(400);
        }
        else {
            response.status(200).send(result);
        }
    })
})

// HTTP HyperText Transfer Protocol
// HTTP Request --> 3 phần
// 1. Request line (ko quan trọng lắm)
// 2. Request header (nắm những thông tin phụ để phục vụ request)
// 3. Request body (quan trọng nhất, chứa thông tin chính của request)

// cài thư viện để tự chạy lại server : nodemon
// npm install --save-dev nodemon
// cài vào dev dependency để không bị dùng lúc deploy --> giảm tải cho hệ thống
// "start": "nodemon index.js" vào phần script ở trong package.json
// sau đó chạy bằng npm start