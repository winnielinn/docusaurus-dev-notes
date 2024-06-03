---
title: GitHub Actions 入門
description: 簡單介紹 GitHub Actions 
keywords: [github, github actions, devops, ci/cd, yaml]
---

import CenterImage from "@site/src/components/helpers/CenterImage";

## Introduction

> [Learn GitHub Actions](https://docs.github.com/en/actions/learn-github-actions)

Github Actions 是 Github 提供的一個持續整合和持續交付 (CI/CD) 的平台。

<CenterImage src={require('./img/github-action-1-cicd.png').default} alt="CI/CD"/>

:::tip[TIP]
* CI (Continous Integration)：持續整合，每次的改變都可以經過自動化的測試驗證，藉此快速幫助開發者找出淺在或是被忽略的問題。(Jenkins, Travis CI, Gitlab CI)
* CD (Continous Deployment)：持續部署，將前一步驟 (CI) 產出的專案程式碼，自動部署到服務的環境或是伺服器上，減少人工手動部署的時間。 (Jenkins, Argo CD, Spinnaker)
:::

能夠建立一個工作流程 (workflows)，透過自動化的方式打包 (Build)、測試 (Test)、發佈和部署 (Deploy) 專案程式碼。

![GitHub Actions workflow](https://docs.github.com/assets/cb-25535/mw-1440/images/help/actions/overview-actions-simple.webp)

## Components

Github Action 基本元素的涵蓋範圍由大至小可以分成以下：

### Workflows

> [Using workflows](https://docs.github.com/en/actions/using-workflows)

工作流程 (workflows) 是一個可定義的自動化流程，也就是 CI/CD 一次要運行的整個過程，該過程至少需要包含一個工作項目 (Job)。

### Events

事件 (Events) 是一個觸發工作流程的特定時間點，可以根據用途來決定何時要觸發。 (`push`, `pull_request`, `issue` ...)

### Jobs

任務 (Jobs) 是指在相同 Runner 上，為了完成特定目標的一組步驟，預設情況下 Jobs 會平行執行，但也能設定為依序執行。

### Actions

命令 (Actions) 是透過組合每個個別的工作來建立自動化的任務 (Jobs)，可以自行撰寫客製化的腳本或是使用 Github 社群的 Actions。

### Runners

伺服器 (Runners) 負責執行自動化流程，Github 社群有提供一些免費的 Runners，也可以自行設定。

<CenterImage src={require('./img/github-action-2-workflows.png').default} alt="workflows"/>

## Workflow File

> [Understanding the workflow file](https://docs.github.com/en/actions/using-workflows/about-workflows#understanding-the-workflow-file)

透過 `YAML` 語法來設定 Workflow File (一個 Repository 可以有一個以上的 Workflows)。

**Tests Example**

```yaml title=".github/workflows/action.yaml"
# Name of the workflow as you can see it in the "Actions" tab of the Github repository. (Optional)
name: learn-github-actions

# Specifies the trigger for this workflow. It is triggered by a push to every branch.
on: [push]

# Groups together all the jobs that run in this workflow.
jobs:

  # Defines the name of the job.
  check-bats-version:

    # Configures the job to run on which runner. It is on Linux.
    runs-on: ubuntu-latest

    # Groups together all the steps that run in this job.
    steps:

      # "uses": execute the actions.
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      # "run": execute a command on the runner.
      - run: npm install -g bats
      - run: bats -v
```

## Setup

* 專案根目錄建立 `.github/workflows` 的資料夾
* 在資料夾中建立 `.yaml` 來儲存這些自定義的 Workflows

一旦成功觸發工作流程，就可以看到打包時的紀錄 (Build Logs)、測試結果 (Tests Results)、打包結果 (Artifacts) 和執行工作流程時每個步驟的狀態 (Statuses)。

### Implementation Example

簡單介紹以該部落格透過 [GitHub Action](https://github.com/winnielinn/docusaurus-dev-notes/blob/main/.github/workflows/main.yml)，在網站發佈自動自動執行 DocSearch Scraper：

**Algolia DocSearch**

> [darrenjennings/algolia-docsearch-action](https://github.com/darrenjennings/algolia-docsearch-action)

```yaml title=".github/workflows/main.yaml"
name: Algolia DocSearch

# It is triggered when pushing or creating a pull request to the main branch.
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Defines the name of the job to be docsearch.
  docsearch:
    runs-on: ubuntu-latest
    # This name is the display name in the GitHub Actions UI.
    name: Algolia DocSearch
    steps:
      - uses: actions/checkout@v2
      - uses: darrenjennings/algolia-docsearch-action@master
        with:
          # Use actions secrets
          algolia_api_key: ${{ secrets.ALGOLIA_API_KEY }}
          algolia_application_id: ${{ secrets.ALGOLIA_APPLICATION_ID }}
          # "config.json": needs to be inside $GITHUB_WORKSPACE, provided by the actions/checkout step.
          file: config.json
```

<CenterImage src={require('./img/github-action-3-workflow.png').default} alt="worflow and steps"/>

### Actions Secrets

> [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

* 在 Github Repository 的 Settings 內找到 `Secrets and variables`，並點選 `Actions`
* 設定 Secrets，新增需要在 CI 內使用到的 Secrets
* 在設定檔中指定使用的 Secrets

<CenterImage src={require('./img/github-action-4-secrets-tab.png').default} alt="secret-tab"/>

```yaml
steps:
  - name: Hello world action
    with: # Set the secret as an input
      super_secret: ${{ secrets.SuperSecret }}
    env: # Or as an environment variable
      super_secret: ${{ secrets.SuperSecret }}
```
