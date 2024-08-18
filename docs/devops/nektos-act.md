---
title: Local 測試 GitHub Action
description: 介紹 nektos/act 的使用
keywords: [nektos/act, act, cicd, github, github action]
---

## Introduction

[nektos/act](https://github.com/nektos/act) 是一個能在本地運行 GitHub Actions 的開源專案，主要是以 `Go` 語言撰寫。

透過閱讀專案內的 `.github/workflows` 資料夾，來確定需要一系列需要執行的 action，並且使用 Docker API 來拉取或建置 workflow 中定義的 Image，並根據最後定義的依賴項來執行。

`Environment Variable` 和 `Filesystem` 與 GitHub Action 內所定義的相同。

在本地運行 GitHub Actions 的好處有以下：

* 快速的回饋 (Fast Feedback)：不需要每一次的變動都重新推上 repository 去確認 CICD 的結果，也可以直接測試 push to master 時要被觸發的 Action。

* 本地測試的運行器 (Local Task Runner)：如果使用 [Make](https://en.wikipedia.org/wiki/Make_(software)) 來編譯代碼、運行測試，每次都要根據不同的專案額外再撰寫 `Makefile`，但透過 `act` 可以直接運行本地定義好的 GitHub Action 流程。

## Installation

:::tip[TIP]
透過 package manager 來安裝 act：[各套件管理器的安裝方式](https://nektosact.com/installation/index.html#installation-via-software-package-manager)
:::

**Pre-build artifact**

```bash
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

**Build from source**

Requires Go toolchain 1.18+

```bash
go build -ldflags "-X main.version=$(git describe --tags --dirty --always | sed -e 's/^v//')" -o dist/local/act main.go
```

## Usage

以下為我常用的指令：

* `act`：執行所有的 pipeline
* `act -n`：試運行所有的 pipeline (`--dryrun`)
* `act -g`：以圖像方式呈現 workflow (`--graph`)
* `act -l`：查看執行的 workflow (`--list`)

除以上之外，也可以透過 `act --help` 來看看其他的指令用法。

### Events

執行特定事件的 pipeline：

```bash
act <event>
# act pull_request
```

### Jobs

執行特定任務的 Action:

```bash
act -j <your_job>
# act -j test
# --job
```

### Vars

可以透過 CLI 輸入或是從檔案內載入 workflow 中使用的 `variables` 或是 `secrets`：

```bash
act --var VARIABLE=somevalue
act --var-file .env
```

:::warning[NOTICE]
較為敏感的資訊不建議直接透過 CLI 輸入，建議透過 `act -s MY_SECRET` 來進行定義，以此方式輸入 `secret`，`act` 會提供安全輸入提示，不會保存在 shell 歷史記錄檔內。
:::


### Runner

根據專案的 pipeline，指定不同的 runner 來運行：

```bash
act -P <platform>=-self-hosted
# act -P ubuntu-latest=-self-hosted
# act -P ubuntu-22.04=-self-hosted
# act -P windows-latest=-self-hosted
# --platform
```

:::info[REFERENCE]
* [nektos/act](https://github.com/nektos/act)
* [User Guide](https://nektosact.com/introduction.html)
:::