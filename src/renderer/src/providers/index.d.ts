// 导入 Google AI SDK 中的 GroundingMetadata 类型
import type { GroundingMetadata } from '@google/generative-ai'
// 导入自定义类型定义
import type { Assistant, Message, Metrics } from '@renderer/types'

/**
 * AI 响应数据块的回调数据接口
 * 用于处理 AI 生成内容时的流式响应
 */
interface ChunkCallbackData {
  text?: string // AI 生成的文本内容
  reasoning_content?: string // AI 的推理过程内容
  usage?: OpenAI.Completions.CompletionUsage // OpenAI API 使用统计
  metrics?: Metrics // 性能指标数据
  search?: GroundingMetadata // Google AI 的上下文搜索元数据
  citations?: string[] // 引用来源列表
}

/**
 * AI 补全功能的参数接口
 * 用于处理 AI 对话生成的主要接口
 */
interface CompletionsParams {
  messages: Message[] // 对话历史消息列表
  assistant: Assistant // AI 助手配置信息
  onChunk: ({ text, reasoning_content, usage, metrics, search, citations }: ChunkCallbackData) => void // 处理流式响应的回调函数
  onFilterMessages: (messages: Message[]) => void // 消息过滤处理的回调函数
}
