require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL
});

const port = process.env.PORT || 8080;

// 追加
app.get('/public', (req, res) => {
  res.json({
    'message': 'Public endpoint'
  });
});

// 追加
// checkJwtを使って、アクセストークンが有効な場合のみアクセス可能
app.get('/private', checkJwt, (req, res) => {
  res.json({
    'message': 'private endpoint'
  });
});

// 追加
// read:orders スコープを持つかチェックする
const checkReadOrders = requiredScopes('read:order');

// 有効なアクセストークンとスコープを持っているか確認する
app.get('/orders', checkJwt, checkReadOrders, (req, res) => { // 変更
  res.json({
    'message': 'Get all orders!!'
  });
});

const checkCreateOrder = requiredScopes('create:order');

app.post('/orders', checkJwt, checkCreateOrder, (req, res) => { // 変更
  res.json({
    'message': 'Create a order!!'
  });
});

app.listen(port);

console.log('Running on port ', port);