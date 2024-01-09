---
title: 一個資料庫，三種關聯
description: 介紹關聯式資料庫的關聯
keywords: [database, rdbms, relationship]
---

import CenterImage from "@site/src/components/helpers/CenterImage";

> *常常聽人家說：「關聯式資料庫⋯⋯關聯式資料庫⋯⋯」，那到底這個資料庫是關聯了什麼？或是有了幾種關聯呢？*

## 關聯式資料庫

關聯式資料庫是目前最多軟體開發者使用的資料庫系統，資料間大多彼此都會以表格間的某個欄位做關聯，而資料表中的每一列資料行都是一條資料，並有唯一的 ID。

<!-- >延伸閱讀: [關聯式資料庫 vs 非關聯式資料庫](https://winnielinn.github.io/2022/04/30/database-rdbms-nosql/) -->

## 為什麼要關聯

* 降低重複性
* 著重資料操作的準確性與一致性 (ACID)
* 備份與還原功能
* 能透過 SQL 直接與資料庫互動

## 三種關聯

### 一對一 (One to One)

一筆資料 A 只會對應到最多一筆資料 B。

<CenterImage src={require('./img/relationship-1-one-to-one.png').default} alt="One To One"/>

像是一個人只會對應到一組身分證字號，而這組身分證字號也只會被一個人所擁有。

### 一對多 (One to Many)

一筆資料 A 會對應到多筆資料 Bs，而資料 B 則只會對應到一筆資料 A。

<CenterImage src={require('./img/relationship-2-one-to-many.png').default} alt="One To Many"/>

像是一個人會擁有多筆訂單，但是一筆訂單只會屬於一個人。

### 多對多 (Many to Many)

一筆資料 A 會對應到多筆資料 Bs，資料 B 也會對應到多筆資料 As。

<CenterImage src={require('./img/relationship-3-many-to-many.png').default} alt="Many To Many"/>

像是一位醫生會有很多位病人，一位病人可能也有很多不同的醫生。

## 辨識資料間的關係

資料的關係會根據需求而有所不同，那要如何識別資料間關係的種類呢？

最基本的思考方式，是確認目前需求的情境中：

* 資料 A 是否有多筆資料 B？

* 資料 B 是否有多筆資料 A？

若兩個問題都是 No，代表資料 A 和 B 是一對一的關係。

若一個為 No，一個為 Yes，那麼就是一對多的關係。

若兩個問題都是 Yes，就是多對多的關係。

## 建立資料的關係

在關聯式資料庫裡，資料間會有明確的關係，而我們通常會透過**主鍵**和**外鍵**來建立資料之間的關係。

### 主鍵 (Primary Key)

主鍵的作用是確保資料表中每筆資料都具有唯一性（Uniqueness）和持有性 (Availability)，因此每個資料表都必須設定一個主鍵欄位。

* 唯一性：獨一無二的值，不會重複出現。

* 持有性：每筆資料都會具備那個屬性的值。

### 外鍵 (Foreign Key)

外鍵的功能是用來建立資料表之間的關係，且外鍵一定是其他資料表的主鍵。

而外鍵的取名，通常會讓人能看得出來與另一個資料表的關係。

### 如何使用主鍵及外鍵

#### 一對一 (One to One)

在一對一的關係裡，可以把任一資料表的 Primary Key 放入另一個資料表當 Foreign Key。

* 把使用者的主鍵 (id) 當作外鍵建立在身份證字號這張資料表內。

<CenterImage src={require('./img/relationship-4-one-to-one-key.png').default} alt="One To One Key Sample 1"/>

* 把身份證字號的主鍵 (id) 當作外鍵建立在使用者這張資料表內。

<CenterImage src={require('./img/relationship-5-one-to-one-key.png').default} alt="One To One Key Sample 2"/>

#### 一對多 (One to Many)

在一對多的關係裡，需要把 Primary Key 建在資料少的資料表上，Foreign Key 建在資料多的那張資料表。

* 把使用者的主鍵 (id) 當作外鍵建立在訂單這張資料表內。

<CenterImage src={require('./img/relationship-6-one-to-many-key.png').default} alt="One To Many Key"/>

#### 多對多 (Many to Many)

在多對多的關係裡，則需要透過新增一個 Join Table 作為連結點，讓兩張資料表分別與這張 Join Table 成為一對多的關係。

* 透過 Join Table (Clinic) 與 Table Doctor 和 Table Patient 產生一對多的關聯，藉此將兩個多對多關聯的 Table 建立起關聯。

<CenterImage src={require('./img/relationship-7-many-to-many-key.png').default} alt="Many To Many Key"/>

## 總結

* 一對一關聯 (外鍵可以建立在任一張資料表上)
* 一對多關聯 (外鍵要建立在多的那張資料表上)
* 多對多關聯 (建立 Join Table，拆成兩個一對多關係)