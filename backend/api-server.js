"use strict";

// 모듈
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// 쿠키 이용
const cookieParser = require("cookie-parser")

// jwt 웹토큰 이용
const jwt = require("jsonwebtoken");

// 데이타베이스 연결
// const db = require("./database");

app.use(cookieParser());
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함도리 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

const jwtKey = "abc1234567";

const members = [
    {
        id: 3,
        name: "홍길동1",
        loginId: "inter1",
        loginPw: "1234"
    },
    {
        id: 4,
        name: "홍길동2",
        loginId: "inter2",
        loginPw: "1234"
    }
];

app.get("/account", (req, res) => {
    if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, jwtKey, (err, decoded) => {
            if (err) {
                res.clearCookie('token');
                return res.send({
                    mid: "",
                    memberName: ""
                });
            }
            res.send(decoded);
        });
    }
    else {
        res.send({
            mid: "",
            memberName: ""
        });
    }
});

app.post("/account", (req, res) => {
    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;

    const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw);

    // jwt 토큰
    const token = jwt.sign({
        id: member.id,
        name: member.name
    }, jwtKey, {
        expiresIn: "10s",
        issuer: "interbirds"
    });

    if (member) {
        res.cookie("token", token);
        res.send(member)
    }
    else {
        res.sendStatus(404);
    }
});

app.delete("/account", (req, res) => {
    if (req.cookies && req.cookies.token) {
        res.clearCookie("token");

        res.sendStatus(200);
    }
});

// 서버실행
app.listen(port, () => {
    console.log(`${port}번 포트에서 서버실행`);
});