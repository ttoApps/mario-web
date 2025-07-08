# mario-web

mario-webはFC版スーパーマリオブラザーズのような2DアクションゲームをWeb上で再現したものです。
少しだけ機能を拡張し、オンラインで複数人同時プレイを可能にします。

まずは最小限にステージ1のみを再現し、オンラインで同時にアクセスしている人で2Pプレイを可能にします。

## 技術スタック

- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Radix UI / shadcn/ui
- Docker
- GitHub Actions
- GitHub Pages

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn
- Docker (オプション)

### ローカル開発

1. リポジトリをクローン
```bash
git clone https://github.com/ttoApps/mario-web.git
cd mario-web
```

2. 依存関係をインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
npm run dev
```

4. ブラウザで `http://localhost:3000` を開く

### Docker を使用した開発

1. Docker イメージをビルド
```bash
docker build -t mario-web .
```

2. コンテナを起動
```bash
docker run -p 3000:80 mario-web
```

または、docker-compose を使用：
```bash
docker-compose up -d
```

3. ブラウザで `http://localhost:3000` を開く

### 本番ビルド

```bash
npm run build
```

ビルドされたファイルは `out/` ディレクトリに生成されます。

## 動作確認手順

1. **タイトル画面の確認**
   - ブラウザでアプリケーションを開く
   - アニメーションする背景が表示されることを確認
   - 「MARIO-WEB」タイトルが表示されることを確認
   - 3つのメニュー項目（1P PLAY、2P PLAY、OPTIONS）が表示されることを確認

2. **キーボードナビゲーションの確認**
   - ↑↓キーでメニュー選択ができることを確認
   - 選択されたメニューがハイライトされることを確認
   - Enterキーで選択されたメニューが実行されることを確認

3. **画面遷移の確認**
   - 1P PLAY / 2P PLAY → ゲーム画面に遷移することを確認
   - OPTIONS → 設定画面に遷移することを確認
   - 各画面でESCキーでタイトル画面に戻ることを確認

4. **設定画面の確認**
   - キーコンフィグ項目が表示されることを確認
   - 各項目をクリックしてキー設定を変更できることを確認

## デプロイ

### GitHub Pages へのデプロイ

GitHub Actions を使用して自動デプロイが設定されています。

1. **自動デプロイ**: `main` ブランチにプッシュすると自動的にデプロイされます
2. **手動デプロイ**: GitHubの Actions タブから `Deploy to GitHub Pages` を手動実行可能

デプロイされたアプリケーションは以下のURLで確認できます：
https://ttoapps.github.io/mario-web/

### GCP Cloud Run へのデプロイ（予定）

Cloud Run の無料枠での運用を予定しています。

1. Google Cloud SDK のインストール
2. プロジェクトの設定
3. Docker イメージのビルドとプッシュ
4. Cloud Run へのデプロイ

詳細な手順は後日追加予定です。

## 仕様

marioのようなキャラクターを操作してゴールを目指します。
上下左右キーとジャンプボタン、ダッシュボタンが使えます。
キーコンフィグが出来るようにします。

## タイトル画面

背景にステージ1のゲーム画面が表示され、デモプレイの様子が映っています。
その上に重ねて「MARIO-WEB」というタイトルテキストを表示し、
その下に以下のメニューがあります。

- 1P PLAY
- 2P PLAY
- OPTIONS

`1P PLAY` または `2P PLAY` を選択するとゲーム画面に切り替わり、ステージ1がスタートします。  
`OPTIONS` を選択すると設定画面に切り替わります。

## 設定画面

キーコンフィグが出来ます。
デフォルトでは以下のキーレイアウトになっていますが、変更したい操作を選択して設定したいキーを押すとそのキーに上書きできます。

| 操作 | キー |
|----|----|
| 上 | e |
| 右 | f |
| 下 | d |
| 左 | s |
| ジャンプ | k |
| ダッシュ | j |
| スタート | Enter |

## 開発

### フォルダ構成

```
mario-web/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # レイアウトコンポーネント
│   └── page.tsx           # メインページ
├── components/            # Reactコンポーネント
│   ├── TitleScreen.tsx    # タイトル画面
│   ├── DemoBackground.tsx # デモ背景
│   ├── GameScreen.tsx     # ゲーム画面
│   └── OptionsScreen.tsx  # 設定画面
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # デプロイワークフロー
├── Dockerfile             # Docker設定
├── docker-compose.yml     # Docker Compose設定
├── nginx.conf             # Nginx設定
└── package.json           # 依存関係
```

### 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - 本番ビルド
- `npm run start` - 本番サーバーの起動
- `npm run lint` - コードチェック
- `npm run export` - 静的ファイルのエクスポート

### 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成
