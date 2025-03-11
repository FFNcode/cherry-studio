分析项目中 KaTeX 的使用情况。

从 package.json 中可以看到项目使用了 `rehype-katex`，这是一个用于在 Markdown 中渲染数学公式的插件。

主要的使用场景应该在 Markdown 渲染相关的组件中。让我们来看看具体实现：

1. 首先在依赖中：
```json:/Users/huoyinghui/github/cherry-studio/package.json
{
  "devDependencies": {
    "rehype-katex": "^7.0.1",
    "rehype-mathjax": "^6.0.0",
    // ... 其他依赖
  }
}
```

2. 在 Markdown 渲染组件中的使用：
```tsx:/Users/huoyinghui/github/cherry-studio/src/renderer/src/components/Markdown/index.tsx
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

const Markdown = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      // ... 其他配置
    >
      {content}
    </ReactMarkdown>
  )
}
```

这样配置后，在 Markdown 内容中就可以使用 KaTeX 语法来渲染数学公式：

- 行内公式使用：`$formula$`
- 块级公式使用：`$$formula$$`

例如：
```markdown
行内公式：$E = mc^2$

块级公式：
$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$
```

要使 KaTeX 样式生效，还需要在项目中引入 KaTeX 的 CSS 文件：
```tsx:/Users/huoyinghui/github/cherry-studio/src/renderer/src/App.tsx
import 'katex/dist/katex.min.css'
```

这样配置后，当用户在对话或文档中输入数学公式时，会自动被渲染为漂亮的数学公式显示。

主要使用场景：
1. AI 对话中的数学公式渲染
2. 文档预览中的数学公式渲染
3. 笔记编辑中的数学公式支持

需要了解更具体的使用方式或其他配置细节吗？