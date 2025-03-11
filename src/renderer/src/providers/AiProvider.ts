import BaseProvider from '@renderer/providers/BaseProvider'
import ProviderFactory from '@renderer/providers/ProviderFactory'
import { Assistant, GenerateImageParams, Message, Model, Provider, Suggestion } from '@renderer/types'
import OpenAI from 'openai'

import { CompletionsParams } from '.'

/**
 * AI 服务提供者类
 * 负责管理和协调不同 AI 服务（如 OpenAI、Google AI 等）的调用
 */
export default class AiProvider {
  /** 具体的 AI 服务提供者实例 */
  private sdk: BaseProvider

  /**
   * 构造函数
   * @param provider AI 提供者配置信息
   */
  constructor(provider: Provider) {
    this.sdk = ProviderFactory.create(provider)
  }

  /**
   * 模拟 AI 补全响应，用于测试
   * @param params 补全参数
   */
  public async fakeCompletions(params: CompletionsParams): Promise<void> {
    return this.sdk.fakeCompletions(params)
  }

  /**
   * 执行 AI 对话补全
   * @param params 包含消息历史、助手配置、回调函数等参数
   */
  public async completions({ messages, assistant, onChunk, onFilterMessages }: CompletionsParams): Promise<void> {
    return this.sdk.completions({ messages, assistant, onChunk, onFilterMessages })
  }

  /**
   * 翻译文本内容
   * @param message 需要翻译的消息
   * @param assistant 助手配置
   * @param onResponse 翻译过程的回调函数
   * @returns 翻译后的文本
   */
  public async translate(message: Message, assistant: Assistant, onResponse?: (text: string) => void): Promise<string> {
    return this.sdk.translate(message, assistant, onResponse)
  }

  /**
   * 总结对话内容
   * @param messages 需要总结的消息列表
   * @param assistant 助手配置
   * @returns 总结文本
   */
  public async summaries(messages: Message[], assistant: Assistant): Promise<string> {
    return this.sdk.summaries(messages, assistant)
  }

  /**
   * 生成对话建议
   * @param messages 对话历史
   * @param assistant 助手配置
   * @returns 建议列表
   */
  public async suggestions(messages: Message[], assistant: Assistant): Promise<Suggestion[]> {
    return this.sdk.suggestions(messages, assistant)
  }

  /**
   * 根据提示生成文本
   * @param param0 包含提示和内容的参数对象
   * @returns 生成的文本
   */
  public async generateText({ prompt, content }: { prompt: string; content: string }): Promise<string> {
    return this.sdk.generateText({ prompt, content })
  }

  /**
   * 检查 AI 模型的可用性
   * @param model 要检查的模型
   * @returns 检查结果和错误信息
   */
  public async check(model: Model): Promise<{ valid: boolean; error: Error | null }> {
    return this.sdk.check(model)
  }

  /**
   * 获取可用的 AI 模型列表
   * @returns OpenAI 模型列表
   */
  public async models(): Promise<OpenAI.Models.Model[]> {
    return this.sdk.models()
  }

  /**
   * 获取 API 密钥
   * @returns API 密钥字符串
   */
  public getApiKey(): string {
    return this.sdk.getApiKey()
  }

  /**
   * 生成图像
   * @param params 图像生成参数
   * @returns 生成的图像 URL 数组
   */
  public async generateImage(params: GenerateImageParams): Promise<string[]> {
    return this.sdk.generateImage(params)
  }

  /**
   * 获取嵌入模型的维度
   * @param model AI 模型
   * @returns 嵌入维度
   */
  public async getEmbeddingDimensions(model: Model): Promise<number> {
    return this.sdk.getEmbeddingDimensions(model)
  }

  /**
   * 获取 API 基础 URL
   * @returns API 基础 URL 字符串
   */
  public getBaseURL(): string {
    return this.sdk.getBaseURL()
  }
}
