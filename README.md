# 残心 / Zanshin

> 書いたあとにも、心がそこに残るメモ帳。  
> A note-taking app where the heart lingers, even after the writing ends.

---

## アプリ概要

「残心」は、和の美意識・間・余白・静けさを大切にした、シンプルな iPhone-first のメモアプリです。

多機能化ではなく、
**静かに開く → 言葉を置く → 静かに保存される → また戻って読める** という最小体験を丁寧に整えています。

---

## MVP機能

- メモ一覧
- メモ作成
- メモ編集
- メモ削除
- 自動保存
- 検索
- お気に入り
- localStorage 保存
- iPhone 向けレスポンシブ UI
- 日本語 / 英語を意識した文言

Phase 4 では、基本機能のデバッグ、保存まわりの安定化、iPhone 幅を優先した UI/UX の最終調整を実施済みです。

### MVPで作らないもの

- ログイン
- クラウド同期
- AI機能
- 課金
- Markdown完全対応
- 複雑なタグ管理
- 共同編集
- 通知機能
- 多機能な設定画面

---

## 技術構成

- Vite
- React
- TypeScript
- Tailwind CSS
- localStorage

将来的に PWA / Capacitor へ移行しやすいように、保存処理は `src/lib/storage.ts` に分離しています。

---

## 起動方法

```bash
npm install
npm run dev
```

## build方法

```bash
npm run build
```

## Lint

```bash
npm run lint
```

---

## Cloudflare Pages 設定

Cloudflare Pages へ接続する場合は、GitHub リポジトリを Pages に接続したうえで以下を設定してください。

```txt
Build command: npm run build
Build output directory: dist
```

- 環境変数: 基本不要
- デプロイ条件: `npm run build` 成功後のみ
- 未接続の場合: 上記設定で Pages プロジェクトを作成し、初回デプロイ後に発行 URL を確認

### 手動接続時の手順

1. Cloudflare Dashboard で **Workers & Pages** → **Create application** → **Pages** を開く
2. この GitHub リポジトリ `sunpotflower4460-cpu/AAA-5.4` を接続する
3. Build command に `npm run build` を設定する
4. Build output directory に `dist` を設定する
5. 保存してデプロイし、生成された Pages URL を確認する

---

## ドキュメント

| ファイル | 内容 |
|----------|------|
| [docs/concept.md](docs/concept.md) | 「残心」の思想と世界観 |
| [docs/design-system.md](docs/design-system.md) | UI / UX とデザインシステム |
| [docs/mvp-spec.md](docs/mvp-spec.md) | MVP 仕様 |
| [docs/development-phases.md](docs/development-phases.md) | 開発フェーズ |
| [docs/audit-phase-2.md](docs/audit-phase-2.md) | Phase 2 監査結果 |
| [docs/final-polish-and-deploy-phase-4.md](docs/final-polish-and-deploy-phase-4.md) | Phase 4 最終調整・デプロイ記録 |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Cloud Agent / Copilot 向けルール |
