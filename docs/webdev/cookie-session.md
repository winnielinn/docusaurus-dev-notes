---
title: Cookie & Session
description: 從使用者認證談到 Cookie & Session
keywords: [webdev, cookie, session]
---

import CenterImage from "@site/src/components/helpers/CenterImage";

> *常在上網的你是否曾經想過，當你透過瀏覽器送出一個登入請求給伺服器，伺服器回應了這個登入請求之後，是如何得知下一個請求是來自於剛剛登入的使用者呢？*

為了解決這個疑問，讓我們先從用戶端與伺服器端的溝通語言，也就是 HTTP 傳輸協定 (protocol) 開始說起。

## HTTP 傳輸協定

HTTP 傳輸協定是一個用戶端 (Client) 和伺服器端 (Server) 之間請求 (Request) 和應答 (Response) 的標準，通常在瀏覽器發送請求，伺服器端回應該請求後就結束。

HTTP 傳輸協定也是一個不會主動儲存 request 狀態資訊的無狀態協定 (stateless protocol)。

### 無狀態協定 (stateless protocol)

無狀態協定指的是用戶端對伺服器發出的每一個請求都是獨立的，這一次的請求無法得知上一次請求的內容與資訊。

簡單的以下圖來進行無狀態的解釋，對 B (伺服器) 來說，每一次的對話都是全新的，並不會記憶這次的對話和上次是否有關聯，也無法得知上一次的內容和資訊。

<CenterImage src={require('./img/cookie-session-1-statusless.png').default} alt="Stateless  Protocols"/>

因此，當你從瀏覽器每送出一個請求，伺服器會將每一個請求都當成新的請求，不會記憶你在上一個請求中是否已經登入驗證過。

為了解決無狀態協定所衍生出使用者體驗不佳的問題，並且讓伺服器能夠辨認不同的請求是否來自同個瀏覽器或是辨認使用者是否已經通過登入驗證，需要透過：**「用戶端的 Cookie 」和 「 伺服器的 Session 」**。

## Cookie

Cookie 是伺服器寄送給瀏覽器的一小片段資料，瀏覽器會保存該資料，並在下次向同樣的伺服器發送 Request 的同時，附上該 Cookie 資料。

### cookies-parser 實際操作

透過 npm 安裝 cookie-parser 就能使用該套件自行設定回傳 Cookie 和內容：

```javascript
// 載入套件
const cookieParser = require('cookie-parser')

// 登入後由伺服器回傳驗證使用者的 Cookie
app.post('/login', (req, res) => {
  // highlight
  res.cookie('userAuthentication', 'passed')
  res.redirect('/')
})
```

這樣一來，無論前往哪個路由，都會帶上由伺服器簽發的 Cookie：

```javascript
// 前往另外一個路徑 /path
app.get('/path', (req, res) => {
  const cookie = req.cookies
  
  console.log(cookie) // userAuthentication: 'passed'
  
  res.render('page')
})
```

### 從 DevTools Application 查看伺服器回傳的 Cookie

根據上個步驟設定之後，往後瀏覽器所發送的每一個請求，都會帶上 `userAuthentication = passed`：

<CenterImage src={require('./img/cookie-session-2-devtool-cookie.png').default} alt="Devtool Cookies"/>

但儲存在 Cookie 內的所有資料在 Client 端就可以被修改，非常容易被偽造，這代表一些重要的資訊 (如密碼) 就不能存放在 Cookie 中了。

而且 Cookie 的儲存容量大約 4 KB，若數據字段太多也會影響傳輸效率。

<CenterImage src={require('./img/cookie-session-3-devtool-cookie-changed.png').default} alt="Devtool Cookies Changed"/>

為了降低資料被串改的風險又可以達到使用者認證的效果，實務上我們會使用 Cookie-Based Session 來實現使用者認證。

把真正的使用者資料存在資料庫，並在伺服器上建立一個儲存機制，將用戶端、伺服器端、資料庫三個地方的資訊匹配起來 ── Session。

<CenterImage src="https://assets-lighthouse.alphacamp.co/uploads/image/file/12337/ExportedContentImage_05.png" alt="Session Usage from ALPHA Camp"/>

## Session

Session 是 Server 為 Client 開闢的一個儲存空間。

Session 負責記錄在 Server 的使用者訊息，會在使用者完成身分認證後，存下相關資料，並產生一組對應的 ID 回傳 Client，而在每一次 Client 發送請求的時候，都會帶上這組 ID 供 Server 驗證。

<CenterImage src={require('./img/cookie-session-4-usage-of-session.png').default} alt="Session Usage"/>

### express-sesssion 實際操作

透過 npm 安裝 [express-sesssion](https://www.npmjs.com/package/express-session) 並實際使用在主程式 app.js：

```javascript
const session = require('express-session')

app.use(session({
  secret: secretSession,
  resave: false,
  saveUninitialized: true
}))
```

* secret：將使用者所設定的 Secret 字串透過特殊的雜湊演算法 (Hashing Algorithm)，產生的一組獨特 SessionID，用來存放在 Cookie 當中。
* resave：在每次與使用者互動後，不論 Session 是否有更動，是否會強制儲存 Session。 (有些 Session Store 會定期清理 Session)
  * true：會強制儲存。
  * false：不會強制儲存。
* saveUninitialized：是否會強制將未初始化 (新的而且沒有被修改過) 的 Session 存回 Session Store。
  * true：強制存回。
  * false：不會強制存回，可以避免存放太多空的 Session，且 Session 在還沒被修改前也不會被存入 Cookie。

後續在登入路由上，在新增 Key 和 Value 於 Session 內：

```javascript
router.post('/login', (req, res) => {
  // highlight
  req.session.userAuthentication = 'passed'
  res.redirect('/')
})
```

### 從 DevTools Application 查看伺服器回傳給瀏覽器的 SessionID

connect.sid 是由 `express-session` 生成的資訊，往後瀏覽器所發送的每一個請求，都會帶上 connect.sid 和一組獨特的 SessionID。

<CenterImage src={require('./img/cookie-session-5-devtool-session.png').default} alt="Devtool Session"/>

## 白話說明 Cookie 和 Session 的關係

假設今天你使用 KKday 買了一張迪士尼樂園的門票，進場前服務人員會先核對你的姓名跟購買號碼，確認無誤之後，服務人員會發給你一張專屬且含有 SessionID 的憑證 (Cookie)，你可以透過該憑證去使用迪士尼樂園內的各種遊樂設施，並在使用前不需要再重新驗證身分，因為憑證內的資料已經儲存在迪士尼樂園的系統 (Session) 內了。

## 總結

透過使用 Cookie & Session ，可以讓伺服器識別不同的請求是是否來自同個瀏覽器，或是辨認使用者是否已經通過登入驗證，來解決 HTTP 無狀態的限制。

Session：帳號登錄驗證過後，Server 開創的一個儲存空間，儲存發給 Client 的 SessionID。
Cookie：瀏覽器存放資料的地方，可以存放由 Server 發出的 SessionID 或是其他資料。

:::info [REFERENCE]
* [cookie-session驗證原理以及express-session套件使用](https://medium.com/johnny的轉職工程師筆記/node-js-cookie-session驗證原理以及express-session套件使用-aeafa386837e)
* [HTTP Cookies 和 Session 使用](https://medium.com/麥克的半路出家筆記/筆記-http-cookie-和-session-使用-19bc740e49b5)
* [白話 Session 與 Cookie：從經營雜貨店開始](https://hulitw.medium.com/session-and-cookie-15e47ed838bc)
:::