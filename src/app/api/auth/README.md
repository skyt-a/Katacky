## 注意点
これらのAPIは現在使われていない。
理由は以下のページで書かれている通り、`createRouteHandlerSupabaseClient`がNext.jsのバグによって現在正常に動かないため。
https://stackoverflow.com/questions/76036419/how-to-query-a-nextjs-route-handler-from-a-server-component-and-get-data-from-su
ただ個人的には認証処理はAPI生やしてそこで行いたいのでこのバグが修正されるまでRSC内で認証処理を行うことにする。