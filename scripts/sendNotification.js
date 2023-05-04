require("dotenv").config();
const fetch = require("node-fetch");

// curlで送ってもいいけどコマンドが長くなるので
// node.jsからPush通知を送信するスクリプトを用意しておく。

// 送信先のURL
// このURLにpostすると、toで指定したtokenに対して
// Push通知が送信される
const url = "https://fcm.googleapis.com/fcm/send";

// Push通知の内容
// toにはPush通知送信先のtokenを設定する
// これら以外のパラメータについては以下を参照
// => メッセージを送信する  |  Firebase
//    https://firebase.google.com/docs/cloud-messaging/admin/send-messages?hl=ja#defining_the_message
const payload = {
  to: process.env.FCM_TOKEN,
  data: {
    foo: "bar",
  },
  notification: {
    title: "notification title",
    body: "notification body",
  },
};

// fetchする際のオプション
// headerにサーバーキーを指定する
// サーバーキーはFirebaseコンソール > 設定 > クラウド メッセージング で確認できる
const opts = {
  method: "post",
  headers: {
    Authorization: `key=${process.env.FCM_SERVER_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
};

// リクエスト送信
fetch(url, opts).then((res) => console.log(res.status));
