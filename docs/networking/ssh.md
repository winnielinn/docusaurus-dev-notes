---
title: SSH
description: 介紹及使用 SSH 連線
keywords: [ssh, security, agent forwarding, scp, agent]
---

import CenterImage from "@site/src/components/helpers/CenterImage";

## 什麼是 SSH

SSH 是一種通訊協定，用於在不安全的網路中，提供使用者一種建立安全遠程連線電腦的方式。

> SSH, also known as Secure Shell or Secure Socket Shell, is a network protocol that gives users, particularly system administrators, a secure way to access a computer over an unsecured network.

通過 SSH 連線，所有的通訊數據都經過加密傳輸，以防止被竊聽和篡改，同時也提供了身份驗證機制，可以使用密碼、公鑰等方式驗證用戶的身份，確保僅有授權的用戶可以訪問 Server。

> Secure Shell provides strong password authentication and public key authentication, as well as encrypted data communications between two computers connecting over an open network, such as the internet.

雖然可以使用密碼建立 SSH 連線，但容易遭受暴力密碼破解攻擊，且每次登入時都要重新手動輸入一次密碼，因此在建立 SSH 連線時通常都透過 SSH Key。

## SSH Key

SSH Key 是一對鑰匙，包含一把公鑰 (Public Key) 和一把私鑰 (Private Key)，用於通過 Internet 在客戶端與遠端電腦主機之間進行身份驗證和建立加密通訊通道。

若用公鑰來加密資料，就必須拿對應的金鑰 (私鑰) 解密才能得到原本的資料 --- **非對稱金鑰**。

<CenterImage src="https://upload.wikimedia.org/wikipedia/commons/9/98/Asymmetric_encryption_%28colored%29.png" alt="From NoobTW"/>

### Generate

```bash
# 預設產生 SSH 金鑰
# 鑰匙類型為 RSA，且 bits 為 2048，並將產出的金鑰放在 ~/.ssh/
ssh-keygen

# 客製化設定
# ssh-keygen -t <type> -b <bits> -C <comment> -f <filename> -N <passphrase>
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/my_rsa_key -N "mypassword"
```

* `-t`：指定鑰匙類型。常見的加密類型包括 `rsa`、`dsa`、`ecdsa` 和 `ed25519`。
* `-b`：為鑰匙指定位數。更長的鑰匙通常更安全，但也會消耗更多的計算資源。
* `-C`：加上註解。有助於識別鑰匙的用途或是擁有者。
* `-f`：指定生成鑰匙文件的名稱，會將鑰匙儲存在指定的文件中。
* `-N`：為私鑰設置密碼短語。增加了一層安全性，但每次透過 SSH 連線時都要額外再輸入設定的密碼短語。

### Public Key & Private Key

以預設指令產生出的 SSH 金鑰範例如下：

**Public Key (公鑰)**：公開的，通常 SSH 連線是藉由公鑰來相互驗證身份

```shell
ssh-rsa 
AAAAB3NzaC1yc2EAAAABJQAAAQEA1Xp/0hUwbQF7a0xtkFipbkDvNyUL7h
qcTO7Rix8J7lLcDQNnfhqu6SaLPHMqvOdPzyS81Wn
+PK2DPaTLjd26DM05yTQYCss4uMfFlwhhpYEp8VrFLRJwOZUM8S2oxPoj
IOrh7KYq0wum2iQiM2VSY9kh7DttgZVY0sxjbE58oUx2TC
tcCLV1OpdfC3vrtb4VwjnVOl27Eu3S/
XYdpSiMN0IEqvuH13ODeoOvhuYqqr3fDuON0MnHSQJSx
+shlnZ14KHvrBDq/IV1ghjPAdm3A3tjrEdpcf0IWRg
+jYviJhWzK38j4O1U6n2ubOIV9MOBBXlsOYdSlo0yJTr7ptJ6w= rsa-key-20230618
```

**Private Key (私鑰)**：個人自己持有，必須妥善保管和注意保密

```shell
-----BEGIN OPENSSH PRIVATE KEY-----
AAABAFaLm5pbngKtkuZParAj8ak861uLjzcGBRkiz2GjVO2CeIdvDHB5d2DUByb6
Pjd3hPAfedhFUe9No8AQ749G6wQwb2SgOM0KlagW4xbnFIKrhVjFp/OjCSSwZ1NB
6S1bGRZe5KyiWZGNllqt2brrj4yGPYMeNtsXUwyUGwIXaoTpJe3Uz5RMLGrHkIg0
wn61Zyg0J63vN0+U3fPX35OHqaESz1tqLCrfMxrpGaAS2+dbebNMSmYuW/x4KYZA
eDKHHYERHOCbn+uL6YA/wbxn4HXyZGVPeSQ6wQ6wXtQl8hXvy5t96nvylScbxRsx
W+6pO8xcDuG/a6ce03BzXmma7EUAAACBAPdQS+vc0dcuDQvtNw4EFewHqyv8dk59
UWrQ+laOLEHv6kpTCzQvtee6X6qFFkcGB7+GwXSV/DEjhNK2TewSPc025VlCd4ao
3bp/C+5m57QmN+xAaqhR+xu4Abq03Krj2QheR9vVcCMRW4YNOWjWtZxx8Ivop4P3
UtGwigJ/mOMXAAAAgQDc+fn0vx2iKAIgPv1GLfCFUpjQ762gAAKPZcTi8/ebs6I1
vAE77E4kABg2FJKIjBbpoZvIgxjf4DKL40PLKqyht5UadFJ2zyGj53BBnf1V1yrF
ZXFblAi379G8XC8ebqMC3ckimWfeFQnw4N48vPN3qyAkAczUDCG/8ZkAjKZkTQAA
AIEA8tfe4XqRkpWQ5f8uKkzOyzpQA5WI5cbNR5Nm2i+JjXEHAP7hPfxVRPnxM/nu
2NyWbVeQ75zayHcsnCEyoQQ1SqZHQLu7qqbPn0A/sNMMLmzjPffXcO0/tE3YYNaw
3yW/KYlaiHDy2ioDbDpEC3LVarz7oGsv8ho89nZXHZj7SxU=
-----END OPENSSH PRIVATE KEY-----
```

## Connection

基本的 SSH 連線指令：

```bash
# ssh <username>@<remote_server_host>
ssh root@host.com.tw
```

### Config

經常透過 SSH 連線伺服器，或是會有一次連多台的伺服器的需求，可以建立一支 `~/.ssh/config` 檔，將每台主機的連線都放入：

```yaml title="~/.ssh/config"
Host master
    Hostname master.com.tw
    User root
    Port 77
    IdentityFile ~/.ssh/id_rsa
```

* `Host`：連線代號。
* `Hostname`：遠端伺服器的位址 (IP/Domain)。
* `User`：使用者帳號。
* `Port`：遠端伺服器的 Port。
* `IdentityFile`：指定金鑰檔案位址。

接著只要輸入以下指令，便可以連進指定的主機：

```bash
ssh master
```

### Agent

將 SSH 金鑰加到 `ssh-agent`，好處是只需要打一次密碼，就可以持續使用金鑰。

```bash
# 在背景先啟動 ssh-agent
$ eval "$(ssh-agent -s)"

# 將要 Forwaring 的 Private Key 加到清單內
$ ssh-add
```

* `-s`：以 Shell 腳本的形式輸出所需的環境變量 (`SSH_AUTH_SOCK` 和 `SSH_AGENT_PID`) 設置命令，有更好的兼容性。

### Agent Forwarding

:::warning[NOTICE]
在使用 Agent Forwarding 之前，需要先使用 `ssh-add` 加入金鑰。
:::

讓本地的 SSH Key 在遠端的 Server 上進行轉送，不需要將 Key Pair 手動複製到遠端的 Server 上。

<CenterImage src={require('./img/ssh-1-agent-forwarding.png').default} alt="SSH Agent Forwarding"/>

```bash
ssh -A <host>
```

* `-A`：開啟 SSH 代理轉發 (Agent Forwarding)。

或是可以直接修改連線設定：

```yaml title="~/.ssh/config"
Host master
    Hostname master.com.tw
    User root
    Port 77
    IdentityFile ~/.ssh/id_rsa
    # 讓本地的 SSH Key 可以在遠端 Server master 轉送
    // highlight
    ForwardAgent yes
```

### Service

**將 SSH 公鑰上傳至 Gitlab**

將公鑰複製到剪貼簿：

```bash
$ pbcopy < ~/.ssh/id_rsa.pub
```

並在 Gitlab 的 Setting 內找到以下的區域，貼上剛剛複製的公鑰，及設定 SSH Key 到期時間：

<CenterImage src={require('./img/ssh-2-service-gitlab.png').default} alt="Gitlab to set SSH key"/>

## Other Usages

### scp

透過 `scp` 可以將本機的檔案複製到遠端主機上，也可以將遠端主機的檔案複製到本機上：

```bash
# scp <file> <username>@<hostname>:<path>
scp ./file.txt root@master:/home/winnielin/
scp root@master:/home/winnielin/file.txt ./file.txt
scp root@master:/home/winnielin/file.txt root@slave:/home/winnielin/file.txt

# scp <file> -i <identity_file> -P <port>
scp ./file.txt root@master:/home/winnielin/ -i ~/.ssh/id_rsa_254 -P 88

# scp -r <folder>
scp -r projects root@master:/home/winnielin/
```

* `-i`：指定傳輸時使用的密鑰，此參數會直接傳給 SSH。
* `-P`：指定傳輸的 Port。
* `-r`：複製整個資料夾。

### Jump Host

有時候遠端伺服器並不會對外開放，如果想要連線，必須經由另一台特定的伺服器當作跳板才能連線。

:::info[TIP]
Jump Host 又稱跳板機，是一個位於兩個不同網路之間的中繼主機，用於建立安全的連接，讓用戶可以通過跳板機訪問目標主機。
:::

```yaml title="~/.ssh/config"
Host master
    Hostname master.com.tw
    User root
    Port 77
    IdentityFile ~/.ssh/id_rsa

Host internal-master
    Hostname master.internal.com
    User root
    ForwardAgent yes
    # 將 master 設定為跳板，internal-master 為目標主機
    # 意即在 master 內輸入 ssh internal-master 後，就能連上 internal-master
    // highlight
    ProxyJump master
```

### SSH Tunneling

有時候因為安全性的關係，資料庫或是 Interal API 等資源會限制只有特定伺服器才能夠直接連線存取，無法從外部電腦直接存取。

如果想要在本機的電腦開發，直接連線或存取的話，需要使用 SSH Tunneling。

<CenterImage src={require('./img/ssh-3-ssh-tunneling.png').default} alt="SSH Tunneling"/>

可以透過在 SSH 連線設定中加入：

```yaml title="~/.ssh/config"
Host master
    Hostname master.com.tw
    User root
    Port 77
    IdentityFile ~/.ssh/id_rsa
    DynamicForward 1080
    # 當 master 連上後通道會打開，將本地端口 8080 轉發到遠端伺服器的端口 3306，以利在本地操作遠端資料庫
    // highlight-start
    LocalForward 8080 db-audio.internal-master.com:3306
    LocalForward 8081 db-metadata.internal-master.com:3306 
    // highlight-end
```

* `DynamicForward`：一般的 Port Forwarding 只能夠轉送一個 IP 上的一個 Port，當你有很多 IP 或很多 Port 想轉時就只能一個一個開，Dynamic Forword 能直接建立一個代理伺服器，透過這個代理伺服器讓本地的所有流量都導向某個 SSH 伺服器，再將流量導到目的地。

* `LocalForward`：將本地的一個或多個 Port 的流量轉發到通過 SSH 連接的遠程伺服器上的指定  Port。讓本地可以透過 SSH Tunnel 去訪問遠端伺服器上的服務。

之後當本機連上 master 後 SSH Tunneling 就會自動打開，可以直接透過 SQL 連線 `mysql -h 127.0.0.1 -P 8080 -u audio-root -p audio` 到遠端伺服器上的資料庫進行操作。

:::info[REFERENCE]
* [SSH 免除重複輸入金鑰密碼教學：SSH Agent 與 Forwarding](https://blog.gtwang.org/linux/using-ssh-agent-forwarding-to-avoid-being-asked-passphrase/)
* [使用SSH跳板機，連接至內網主機](https://yenpodarren.medium.com/%E4%BD%BF%E7%94%A8ssh%E8%B7%B3%E6%9D%BF%E6%A9%9F-%E9%80%A3%E6%8E%A5%E8%87%B3%E5%85%A7%E7%B6%B2%E4%B8%BB%E6%A9%9F-20c6fbf86f50)
* [SSH Tunneling (Port Forwarding) 詳解](https://johnliu55.tw/ssh-tunnel.html)
:::