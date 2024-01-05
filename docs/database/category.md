---
title: RDBMS & NoSQL
description: 介紹兩種資料庫的差別及使用時機
keywords: [database, rdbms, nosql]
---

import CenterImage from "@site/src/components/helpers/CenterImage";

## 關聯式資料庫 RDBMS

Relational Database Management System 又稱關聯式資料庫系統 (RDBMS)，主要有以下幾個特點：

* 資料是以資料表 (Table) 的方式存放，每一列 (Row) 都代表一筆資料，而每一欄 (Column) 則被稱為資料欄位 (Field)，代表意義為屬性 (Attribute)。

![From ALPHA camp](https://assets-lighthouse.alphacamp.co/uploads/image/file/6770/ExportedContentImage_04.png)

* 一般都用來儲存結構化的資料，資料之間有明確的關聯。
* 以 SQL (Structured Query Language 結構化查詢語言) 操作。
* 每個資料表一定要有一個主鍵 (Primary Key) 的欄位，而多個資料表之間可使用外鍵 (Foreign Key) 建立關聯。
* 可以使用 JOIN 合併資料表，搭配[正規化和反正規化](https://jamie-life-coding.site/2021/09/database-normalization-pros-cons/)。
* 遵循 [ACID 原則](https://zh.wikipedia.org/wiki/ACID)，來保證交易一致性 (Transaction)。

## 非關聯式資料庫 NoSQL

NoSQL 的意思為 Not Only SQL，不限定為關聯式資料庫的統稱，主要有以下特性：

* 每筆資料為一份文件 (Document)，這些文件會組成集合 (Collection)，通常將資料儲存為 JSON 文件。

![From ALPHA camp](https://assets-lighthouse.alphacamp.co/uploads/image/file/11255/ExportedContentImage_01.png)

* 通常不使用關聯模型，也並不需要固定的結構 (Schema-Free)。但有需要時， NoSQL 也可以使用關聯模型與 Schema
* 放寬關聯式資料庫的一致性限制。
* 資料物件由 Key-Value Pair (屬性-值) 或陣列組成。

<CenterImage src="https://assets-lighthouse.alphacamp.co/uploads/image/file/20537/ExportedContentImage_02.png" alt="Document"/>

## 何時使用 RDBMS? 何時使用 NoSQL?

沒有說一定要使用關聯式資料庫或是非關聯式資料庫，端看當時的使用情境與需求，分析兩個資料庫的特性，去選擇最適合的資料庫。

### 使用 RDBMS

* 資料格式應用上變動幅度小且有明確的資料格式。
* 資料要求準確性高不能出錯，且需要確保符合 ACID 特性的情境，像是銀行轉帳、金融交易等。

舉例來說，如果今天已經從你的帳戶轉一筆款項給店家，系統一定要同步「帳戶已經扣除這筆款項」這個訊息。

否則轉出的款項，可能會被重複扣除，或者其他系統會誤以為我們帳戶的結餘跟匯款前一樣。

### 使用 NoSQL

* 開發初期而且需求變化很快，Database Schema 常常需要修改，不太好預先定義。
* 對於簡單的查詢需要快速的回應。
* 不講求資料同步，只求最後結果一致。

舉例來說，像是在 Facebook 上的貼文的按讚數，這個數字的準確性就不是非常重要。

當這篇貼文獲得第 100 個按讚時，某些使用者可能會看到最新的數字，但部分使用者可能需要間隔幾十秒後才能看到按讚數的變更。

這些訊息的延誤，將不會造成太大的問題。

## SQL 和 MongoDB 的術語比較

SQL | MongoDB
--- | ---
表 | 集合
列 | 文件
欄 | 欄位
主索引鍵 | 物件 ID
索引 | 索引
陣列 | 陣列
巢狀表格或物件 | 內嵌文件

## 結語

這裡僅簡單介紹了 RDBMS 和 NoSQL 的特性和差異，文後最後也補充了 MySQL (RDBMS) 以及 MongoDB (NoSQL) 的術語比較，希望能給剛入門資料庫的新手們一點基礎的認識。

:::info[RECOMMENDATION]
* [MongoDB vs. MySQL](https://dzone.com/articles/comparing-mongodb-amp-mysql)
* [MongoDB vs MySQL: A Comparative Study on Databases](https://www.simform.com/blog/mongodb-vs-mysql-databases/)
:::