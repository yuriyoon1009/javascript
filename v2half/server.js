// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4500;

// Static File Service
app.use(express.static('public'));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

/*
 ROUTERS
 라우팅이란 출발지에서 목적지까지의 경로를 결정하는 기능이다.
 view에서 다른 화면으로 화면을 전환하는 내비게이션을 관라히가 위한 기능을 의미한다.
 서버 렌더링 : 브라우저는 서버가 응답(response)한 html을 수신하고 랜더링한다.
*/

// app.use : creation of the Express server
// app.use('미들웨어 함수가 적용되는 경로', '미들웨어 함수')
// require 전역 함수 : 모듈을 로딩하는 파일의 require() 함수에 로딩할 모듈의 경로를 전달한다. 
app.use('/todos', require('./routes/todos'));

// app.post('/todos',)
// app.get('/', (req, res) => res.send('Hello World!'));

// Create a model and insert a new doc
// const User = mongoose.model('User', new mongoose.Schema({ name: String }));
// User.create({ name: 'Lee' }).then(doc => console.log(doc));

app.listen(port, () => console.log(`Server listening on port ${port}`));