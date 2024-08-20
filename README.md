# node-red-contrib-miibo-api

Node-REDでmiiboのAPIを使って会話ができるカスタムノードです。

## 概要

このNode-REDカスタムノードを使用すると、miiboのAPIを介して会話を生成することができます。miiboのAIエージェントとの対話を、Node-REDフロー内に簡単に統合できます。

## インストール

Node-REDのパレットマネージャーを使用するか、Node-REDのユーザーディレクトリで以下のコマンドを実行してインストールします：

```
npm install node-red-contrib-miibo-api
```

## 使用方法

1. miiboの管理画面から、APIキーとエージェントIDを取得します。
2. フローにmiibo会話ノード（`conversation`）を追加します。
3. ノードをダブルクリックして設定画面を開き、APIキーとエージェントIDを入力します。
4. （オプション）UUIDを設定します。

> ![](https://i.gyazo.com/0fd66bd276be65a3f7977d911938ec19.gif)

### 入力

ノードは以下の形式のメッセージを受け付けます：

```javascript
msg.payload = {
    utterance: '秋葉原はどうですか？',
    uid: '9a262221-xxxx-xxxx-a73f-4356a63fba20'  // オプション
}
```

uidにはUUIDを入れますが、UUIDを生成してくれる[サイト](https://uuid.doratool.com/)などで生成できます。 

または、単純に文字列を渡すこともできます：

```javascript
msg.payload = '秋葉原はどうですか？'
```

### 出力

ノードは、miiboのAPIからのレスポンスを`msg.payload`に設定して出力します。

## 設定

- **Name**: ノードの表示名（オプション）
- **API Key**: miiboのAPIキー（必須）
- **Agent ID**: miiboのエージェントID（必須）
- **UUID**: 会話を識別するためのUUID（オプション）

## 例

以下は、Function ノードを使用してmiiboノードにメッセージを送信する例です：

```javascript
msg.payload = {
    utterance: '秋葉原はどうですか？ - その4',
    uid: '9a262221-de43-053c-a73f-4356a63fba20'
}
return msg;
```

## トラブルシューティング

- APIキーやエージェントIDが正しく設定されていることを確認してください。
- ネットワーク接続に問題がないか確認してください。
- エラーが発生した場合は、Node-REDのデバッグタブでエラーメッセージを確認してください。

## 開発

このプロジェクトに貢献したい場合は、以下のリポジトリをクローンして開発してください。

```
git clone https://github.com/n0bisuke/node-red-contrib-miibo-api.git
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細については、[LICENSE](LICENSE)ファイルを参照してください。

## 作者

- n0bisuke

## バージョン情報

現在のバージョン：0.0.1

## サポート

問題や質問がある場合は、[GitHubのイシュートラッカー](https://github.com/n0bisuke/node-red-contrib-miibo-api/issues)で新しいイシューを作成してください。