# csv ファイルを.json に変換するコード

## 概要

CSV ファイル(`./data/data.csv`)を読みこみ、JSON ファイルへ変換する。  
これはフロントエンド[Next.js]だけで完結させるための JSON データを作成するツールである。  
CSV ヘッダーは固定で「写真,記事日本語,記事英語,緯度経度,時代タグ,建築タグ」とする。

実行 ( `node main.js` ) することで、Next.js 用に加工した

- data.json (map してデータの描画に利用する)
- ja.json (i18n の言語ファイルとして利用する)
- en.json (i18n の言語ファイルとして利用する)

を作成する

## 環境設定

- Node.js を Install する
- `npm install`を実行する

## 実行方法

node main.js
