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

## セットアップ

```bash
npm install
```

## 開発起動

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## Lint

```bash
npm run lint
```

---

## Cloudflare Pages 方針

Phase 3 の途中では Cloudflare Pages へデプロイしません。
MVP 完成後に以下が満たされた場合のみ、デプロイ準備を行います。

- `npm run build` が成功している
- MVP 機能が揃っている
- README が更新されている
- Phase 1 / Phase 2 の設計と大きくずれていない

Cloudflare Pages の想定設定: 

- Build command: `npm run build`
- Build output directory: `dist`

---

## ドキュメント

| ファイル | 内容 |
|----------|------|
| [docs/concept.md](docs/concept.md) | 「残心」の思想と世界観 |
| [docs/design-system.md](docs/design-system.md) | UI / UX とデザインシステム |
| [docs/mvp-spec.md](docs/mvp-spec.md) | MVP 仕様 |
| [docs/development-phases.md](docs/development-phases.md) | 開発フェーズ |
| [docs/audit-phase-2.md](docs/audit-phase-2.md) | Phase 2 監査結果 |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Cloud Agent / Copilot 向けルール |
