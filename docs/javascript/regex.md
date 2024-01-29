---
title: Regular Expression
description: 介紹及使用 regex
keywords: [regex, regular expression, javascript]
---

## 介紹

正規表達式 (Regular Expression) 是一種用來描述字串符合某個語法規則的模式 (Pattern)。

常常被使用來作為文字的搜尋、比對、萃取、替代、轉換等等

## 撰寫方式

通常有以下兩種：

1. 使用正規表達式字面值 (Regular Expression Literal)，包含兩個斜線 `/ /` 字元之間的模式，會在 Script 載入時就被編譯，效能較好：

```javascript
const regex = /test sentence/
```

2. 使用 `new` 建構一個 RegExp 物件，適合用在 Regular Expression Pattern 可能會改變時：

```javascript
const regex = new RegExp('test sentence')
```

### 修飾詞

在正規表達式後方加上修飾詞 (Flag) 讓比對功能更為彈性和強大，以下列出常用到的：

修飾詞 Flag | 意義 | 說明
--- | --- | ---
i | ignore case | 比對不區分大小寫。
m |  multiline | 使用多行模式，可以比對換行字串。
g |  global search | 使用全局匹配模式，比對所有字串。

套用在上面的寫法即可寫成：

```javascript
// 不區分大小寫去比對
const regex = /test sentence/i

// 比對所有字串
const regex = new RegExp('test sentence', 'g')
```

### 特殊字元

搜尋一個除了直接匹配外，包含更多條件的匹配 (比如搜尋一或多個 b，或者搜尋空格)，就需要加上特殊字元：

特定字元 | 說明 | 等效的正規表示式
--- | --- | ---
\d | 數字 | [0-9]
\D | 非數字 | [^0-9]
\w | 數字、字母、底線 | [a-zA-Z0-9_]
\W | 非 \w | [^a-zA-Z0-9_]
\s | 空白字元 | [ \r\t\n\f]
\S | 非空白字元 | [^ \r\t\n\f]

除了以上的特殊字元外，你也可以使用以下字元讓比對功能更強大：

字元 | 說明 | 範例 | 意義
--- | --- | -------- | ---
\ | 避開特殊字元 | `/B\?/` | 比對B? (其中 `?` 是一個特殊字元，需避開其特殊意義)
^ | 比對字串的第一個位置 | `/^A/` | 比對 Abcd 中的 A (但不可比對 aAb )
$ | 比對字串的最後一個位置 | `/A$/` | 比較 bcdA 中的 A (但不可比對 aAb )
`*` | 比對前一個字元0次或以上 | `/bo*/` | 比對 facek book 中的 boo，也可比對 Good bk 中的 b
`+` | 比對前一個字元1次或以上 | `/a+/` | 比對 aaapple 中的 aaa ( 但不可比對 cndy )
? | 比對前一個字元0次或1次 | `/e?l/` | 比對 angel 中的 el，也可比對 angle 中的 l
. | 比對包含前一個字元的任何字元(不包含換行符號) | `/.n/` | 比對 nay, an apple is on the tree 中的 an 和 on (但不可比對 nay)
(x) | 比對 x 並將符合的部分存入一個變數 | `/(a*) and (b*)/` | 比對 aaa and bb 中的 aaa 和 bb，並可各別存入 const regex1 和 const regex2
xy | 比對 x 或 y | `/a*b*/g`  | 比對 aaa and bb 中的 aaa 和 bb
`{n}` | 比對前一個字元 n 次 (n > 0) | `/a{3}/` | 比對 lllaaalaa 其中的 aaa (但不可比對 aa )
`{n,}` | 比對前一個字元至少 n 次 (n>0) | `/a{3,}/` | 比對 aa aaa aaaa 其中的 aaa 及 aaaa (但不可比對 aa)
`{n,m}` | 比對前一個字元至少 n 次，至多 m 次 (n,m >0) | `/a{3,4}/` | 比對 aa aaa aaaa aaaaa 其中的 aaa 及 aaaa (但不可比對 aa 及 aaaaa)
[xyz] | 比對中括弧內的任一個字元 | `/[wth]/` | 比對 weather 中的 w 或 t 或 h
[^xyz] | 比對不在中括弧內出現的任一個字元 | `/[^wth]/` | 比對 weather 中的 e 或 a 或 r (與 [xyz] 功能相反)

## 使用函式

正規表達式可使用 RegExp 內建函式，

* `test()`：搜尋字串中是否有符合的部分，回傳 Boolean。
* `exec()`：以陣列回傳字串中匹配到的部分，否則回傳 Null。

或是使用 JavaScript 的 String Method：

* `match()`：以陣列回傳字串中匹配到的部分，否則回傳 Null。
* `replace()`：尋找字串中匹配的部分，並取代。
* `search()`：尋找字串中是否有符合的部分，有的話回傳 Index，否則回傳 -1。
* `split()`：在字串根據匹配到的項目拆成陣列。

:::info[REFERENCE]
* [十五分鐘認識正規表達式，解決所有文字難題](https://5xruby.tw/posts/15min-regular-expression)
* [正規表示式 Regular Expression](https://blog.poychang.net/note-regular-expression/)
* [Regex 正規表示法 — 修飾詞 (Flags)](https://www.fooish.com/regex-regular-expression/flags.html)
:::