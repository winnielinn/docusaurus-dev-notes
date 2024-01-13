---
title: CronJob
description: 介紹及如何使用排程工作
keywords: [devlop, cronjob, linux, nodejs]
---

import CenterImage from "@site/src/components/helpers/CenterImage";

排程工作 (CronJob) 用來定期自動化許多工作，可以設定固定日期、時間、重複間隔或指定間隔後執行一次不同的腳本、指令或是程式，減少每次都必須重複執行相同工作的麻煩。

:::tip[DESCRIPTION]
These are the tasks that run periodically by the operating system. Users can schedule commands the OS will run these  commands automatically according to the given time. It is usually used for system admin jobs such as backups, logging, sending newsletters, subscription emails and more.
:::

## 格式

CronJob 寫法必須符合 Cron 格式，這樣才能在正確的時間點執行任務。

### 說明

<CenterImage src={require('./img/cron-job-1-format.png').default} alt="One To One"/>

總共分成六個區塊： `*(秒) *(分鐘) *(小時) *(天) *(月份) *(星期)`。

|**區塊說明**|**可設定值**|
|-----------|----------|
|秒|0 秒到 59 秒|
|分鐘|0 分到 59 分|
|小時|0 時到 23 時|
|天|1 天到 31 天|
|月份|1 月到 12 月 (1月 到 12月，可用英文簡稱，例如：Jan、Feb...)|
|星期|0 ~ 7 (0 和 7 都代表星期日，可用英文簡稱，例如：Mon)|

### 特殊符號

除了可以在時間區塊內放入數字代表確切的時間之外，也可以使用特殊符號來表示不同的執行時間。

|**特殊符號**|**代表意義**|
|-----------|----------|
|`＊`|任意時間點|
|`/n`|每隔 n 單位執行|
|`,`|分隔不同時間點|
|`-`|時間區間|

### 範例

```javascript
// 每秒都執行一次
cronTime: '* * * * * *'

// 每小時的 25 分時執行
cronTime: '0 25 * * * *'

// 每天上午 10:15 時觸發
cronTime: '0 15 10 * * *'

// 每 10 分鐘執行一次 (5, 15, 25 ...)
cronTime: '0 5/10 * * * *'

// 不限定是哪一天的 26 分、29 分、33 分執行
cronTime: '0 26,29,33 * * * *'
    
// 每隔 1 分鐘執行一次
cronTime: '0 */1 * * * *'

// 在每天下午 2:00 到 2:05 之間，每 1 分鐘觸發
cronTime: '0 0-5 14 * * *'

// 在每天的上午 9:00 到下午 17:00 之間，每半小時觸發
cronTime: '0 0/30 9-17 * * *' 
```

## 用法

以下僅針對 Node.js 的兩個框架 —— `Express.js` 和 `Loopback` 來說明 CronJob 用法。

### Express.js

#### 安裝

在 Express.js 框架內需要先安裝 [node-cron](https://www.npmjs.com/package/node-cron) 來幫助實現我們實現 CronJob 的功能。

```bash npm2yarn
npm install --save node-cron
```

#### 使用

> cron.schedule(expression: string, task: Function, options: Object)

* Expression：放置 Cron 表達式，也就是 Cron 寫法。
* Task：需要執行的執行的任務。
* Options：可選配置。
  * Scheduled (Default: True): `boolean`，用於設定建立的任務排程是否已安排，也就是是否要立即執行。
  * Timezone: 用於任務排程的時區。可參考 [IANA Time Zone Database](https://www.iana.org/time-zones) 設定有效值。

#### 範例

```javascript
const cron = require('node-cron');

cron.schedule('1-5 * * * * *', () => {
  console.log('從每分鐘的第 1 秒開始運行一次，直到第 5 秒結束。');
});
```

此外，透過 ScheduledTask Methods 也可以手動控制讓任務排程開始或是停止。

```javascript
// 將 scheduled 設置為 false 代表此任務排程並不會立即執行
const cron = require('node-cron');

const task = cron.schedule('* * * * * *', 
  () => {
    console.log('running every minute to 1 from 5');
  },
  // highlight
  { scheduled: false },
);

// 需要透過 start 啟動
task.start();

// 將啟動中的任務排程停止，再次將 scheduled 設置為 false，需要以 start 重新啟動
task.stop();
```

如果需要驗證 cron expression 的格式，可以使用 `cron.validate()`。

```javascript
const cron = require('node-cron');

console.log(cron.validate('55 * * * * *')) // true
console.log(cron.validate('? * * * * *')) // false
```

### Loopback

#### 安裝

在 Loopback 框架內需要先安裝 [@loopback/cron](https://www.npmjs.com/package/@loopback/cron) 來幫助實現我們實現 CronJob 的功能。

```bash npm2yarn
npm install --save @loopback/cron
```

#### 使用

**Register the CronComponent**

先綁定 `CronComponent`。

```typescript title="./Application.ts"
import {CronComponent} from '@loopback/cron';

this.component(CronComponent);
```

**Register Cron Jobs**

創建 Class `MyCronJob`，定義任務排程。

```typescript title="./my-cron-job.ts"
import {CronJob, cronJob} from '@loopback/cron';
import {createBindingFromClass} from '@loopback/core';

@cronJob()
export class MyCronJob extends CronJob {
  constructor() {
    super({
      name: 'cronjob-A', // 名稱
      onTick: () => {
        // 執行的任務排程
      },
      cronTime: '* * * * * *', // cron 格式
      start: true, // 立即開始這個任務排程
    });
  }
}

// 創建一個 Class MyCronJob 並綁定
export const jobBinding = createBindingFromClass(MyCronJob);
```

將創建的 Class `MyCronJob` 引入至主程式中。

```typescript title="./index.ts"
import {ApplicationConfig, StarterApplication} from './application';
import {jobBinding} from './cron-job';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new StarterApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  // 添加到 Application
  app.add(jobBinding);
  return app;
}
```

重新綁定新的 Component `MyCronJob`，才能根據自定義去執行任務排程。

```typescript title="./Application.ts"
import {MyCronJob} from './cron-job';

this.component(MyCronJob);
```

:::info[REFERENCES]
* [How to run Cron Jobs in Node.js ?](https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/)
* [Running a Cron Job in LoopBack 4](https://quadrixm.medium.com/running-a-cron-job-in-loopback-4-for-updating-a-database-table-using-a-loopback-repository-97fcf5c96e28)
:::