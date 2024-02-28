---
title: Simple Queue Service (SQS)
description: 介紹及說明如何使用 SQS
keywords: [aws, cloud-service, simple-queue-service, sqs, message-reply]
---

:::tip[PREFACE]
**Message Queue**

一個訊息佇列，當發送方 (Producer) 產生資料傳送給接收方 (Consumer) 過程中，用來存放 Message 的緩衝區。

由於先進先出 (FIFO) 的特性，Producer 只要將 Message 往 Queue 內丟， Consumer 就能依序從 Queue 中取出訊息，使雙方能夠獨立運作，不需要放在同一套系統內，提高了執行效率，也降低了 Worker 的耦合性。

[Message Queue 介紹與實際應用](https://enzochang.com/message-queue-introduction/)

![sqs](https://blackie1019.github.io/2018/01/08/Amazon-Web-Service-30-days-21-SQS/Queue_HLD.png)
:::


## What is SQS

Amazon Simple Queue Service (SQS) 是全受管訊息佇列服務 (可讓使用者存取訊息佇列的 Web 服務)，提供可靠、安全且可高度擴展的託管佇列服務，也提供了兩種訊息佇列類型。

## Feature

## Message

### Type

### Lifecycle

## Queue Type

## Usage

