# WriteupLayoutTemplate 使用指南

這是一個整合了 Edit-Mr 和 OsGa.dev 設計風格的文章排版模板，專為 CTF Write-up 和技術文章設計。

## 🚀 快速開始

### 基本使用

```astro
---
import Layout from '../../layouts/Layout.astro';
import WriteupLayoutTemplate from '../../components/WriteupLayoutTemplate.astro';
---

<Layout>
  <WriteupLayoutTemplate
    title="你的文章標題"
    meta="發布於 2025-02-01 | 分類 | 閱讀時間"
    category="CTF"
    difficulty="Medium"
    points="300"
  >
    <!-- 你的內容 -->
  </WriteupLayoutTemplate>
</Layout>
```

## 📋 Props 參數

| 參數 | 類型 | 默認值 | 描述 |
|------|------|--------|------|
| `title` | string | 必填 | 文章標題 |
| `meta` | string | "發布於 2025-02-01..." | 文章元信息 |
| `breadcrumbCurrent` | string | "Write-up" | 面包屑當前頁面 |
| `challengeTitle` | string | "CHALLENGE" | 挑戰區塊標題 |
| `solutionTitle` | string | "SOLUTION" | 解決方案區塊標題 |
| `showCommands` | boolean | true | 是否顯示命令區塊 |
| `showCode` | boolean | true | 是否顯示代碼區塊 |
| `category` | string | "CTF" | 挑戰分類 |
| `difficulty` | string | "Medium" | 難度等級 |
| `points` | string/number | "300" | 分數 |

## 🎯 Slot 插槽

### 基本內容插槽

- `challenge-content`: 挑戰描述內容
- `solution-content`: 解決方案描述
- `solution-steps`: 自定義解題步驟
- `terminal-content`: 終端命令內容
- `terminal-panels`: 完整的終端面板
- `code-content`: 代碼內容
- `code-panels`: 完整的代碼面板
- `key-points`: 關鍵點列表
- `warning`: 警告信息
- `custom-content`: 自定義額外內容

### 區塊級插槽

- `challenge`: 完整的挑戰區塊
- `solution`: 完整的解決方案區塊
- `commands`: 完整的命令區塊
- `code`: 完整的代碼區塊
- `summary`: 完整的總結區塊

## 💡 使用示例

### 1. 簡單使用（使用默認內容）

```astro
<WriteupLayoutTemplate
  title="RSA Cryptography Challenge"
  category="Cryptography"
  difficulty="Easy"
  points="200"
/>
```

### 2. 自定義挑戰內容

```astro
<WriteupLayoutTemplate title="Web Security Challenge">
  <Fragment slot="challenge-content">
    <p>Find the hidden flag in this web application.</p>
    <p>Target: <code>https://example.com</code></p>
  </Fragment>
</WriteupLayoutTemplate>
```

### 3. 自定義解題步驟

```astro
<WriteupLayoutTemplate title="Binary Exploitation">
  <Fragment slot="solution-steps">
    <div class="analysis-steps">
      <div class="step-item">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>逆向分析</h3>
          <p>使用 IDA Pro 分析二進制文件</p>
        </div>
      </div>
      <!-- 更多步驟... -->
    </div>
  </Fragment>
</WriteupLayoutTemplate>
```

### 4. 自定義終端命令

```astro
<WriteupLayoutTemplate title="Network Security">
  <Fragment slot="terminal-content">
    <div class="terminal-line">
      <span class="prompt">❯</span>
      <span class="command">nmap -sV target.com</span>
    </div>
    <div class="terminal-output">
      <div class="output-line">掃描結果...</div>
      <div class="output-line success">發現漏洞！</div>
    </div>
  </Fragment>
</WriteupLayoutTemplate>
```

### 5. 自定義代碼

```astro
<WriteupLayoutTemplate title="Crypto Challenge">
  <Fragment slot="code-content">
    <pre><code>#!/usr/bin/env python3
import hashlib

def crack_hash(target):
    # 破解邏輯
    pass
</code></pre>
  </Fragment>
</WriteupLayoutTemplate>
```

### 6. 完全自定義區塊

```astro
<WriteupLayoutTemplate title="Advanced Challenge">
  <Fragment slot="challenge">
    <!-- 完全自定義的挑戰區塊 -->
    <section class="custom-challenge">
      <h2>特殊挑戰</h2>
      <p>這是一個完全自定義的挑戰區塊</p>
    </section>
  </Fragment>
</WriteupLayoutTemplate>
```

### 7. 添加額外內容

```astro
<WriteupLayoutTemplate title="Comprehensive Guide">
  <Fragment slot="custom-content">
    <section class="additional-info">
      <h2>📚 相關資源</h2>
      <ul>
        <li><a href="#">相關文檔</a></li>
        <li><a href="#">工具下載</a></li>
      </ul>
    </section>
  </Fragment>
</WriteupLayoutTemplate>
```

## 🎨 設計特色

- **Edit-Mr 風格**: 現代科技感設計，斜角切割容器
- **OsGa.dev 風格**: 專業的終端和代碼展示
- **響應式設計**: 適配桌面和移動設備
- **互動效果**: 懸停動畫和視覺反饋
- **可訪問性**: 支持鍵盤導航和屏幕閱讀器

## 🔧 自定義樣式

如果需要額外的樣式，可以在使用模板的頁面中添加：

```astro
<WriteupLayoutTemplate title="Custom Styled Article">
  <!-- 內容 -->
</WriteupLayoutTemplate>

<style>
  /* 你的自定義樣式 */
  .custom-element {
    /* 樣式規則 */
  }
</style>
```

## 📱 響應式支持

模板已內建響應式設計：
- 桌面: 完整佈局
- 平板: 調整間距和字體大小
- 手機: 垂直堆疊，優化觸控體驗

## 🎯 最佳實踐

1. **標題**: 使用清晰、描述性的標題
2. **步驟**: 將解題過程分解為清晰的步驟
3. **代碼**: 添加註釋和說明
4. **警告**: 包含安全和法律提醒
5. **資源**: 提供相關學習資源

這個模板讓你能夠快速創建專業、美觀的技術文章，同時保持設計的一致性！