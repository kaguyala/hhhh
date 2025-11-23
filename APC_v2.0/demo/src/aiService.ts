import axios from 'axios';

/**
 * AI模型调用服务
 * 提供统一接口调用各种AI大模型
 */

// AI模型类型枚举
export enum AIModelType {
  GLM_4_5_FLASH = 'glm-4.5-flash'
}

// AI服务接口
export interface AIResponse {
  response: string;
  model: string;
}

// 消息类型接口
export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{type: 'text' | 'image_url', text?: string, image_url?: {url: string}}>;
}

/**
 * 调用AI模型API的函数
 * @param prompt 用户输入的提示
 * @param modelType 模型类型
 * @returns Promise<AIResponse> AI模型的响应
 */
export async function callAIModel(prompt: string, modelType: AIModelType = AIModelType.GLM_4_5_FLASH): Promise<AIResponse> {
  try {
    console.log('调用AI模型:', { prompt, modelType });
    
    switch (modelType) {
      case AIModelType.GLM_4_5_FLASH:
        console.log('选择GLM-4.5-Flash模型');
        return await callGLM4_5FlashModel(prompt);
      default:
        console.log('选择GLM-4.5-Flash模型');
        return await callGLM4_5FlashModel(prompt);
    }
  } catch (error) {
    console.error('AI模型调用错误:', error);
    // 出错时返回默认回复
    return {
      response: '抱歉，我现在无法很好地处理你的问题。请稍后再试，或者联系人工心理咨询服务。',
      model: 'error'
    };
  }
}

/**
 * 调用GLM-4.5-Flash模型
 * @param prompt 用户输入的提示
 * @returns Promise<AIResponse> AI模型的响应
 */
async function callGLM4_5FlashModel(prompt: string): Promise<AIResponse> {
  // 使用用户提供的专用API密钥
  const apiKey = 'b8c837b018dd4f0e8a20ce235ae4ccc8.hCGufdAnUeWVPhzr';

  // GLM-4.5-Flash 模型API调用
  const response = await axios.post(
    'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    {
      model: 'glm-4.5-flash',
      messages: [
        {
          role: 'system',
          content: `心理咨询师智能体提示词
【角色与身份设定】
你是一名专业的、富有同理心的女性心理咨询师,名叫"暖心"。你的形象是一位语气温柔、善于倾听、充满耐心和鼓励的知心姐姐。你致力于为用户提供一个绝对安全、无评判的倾诉空间,通过温暖的对话帮助他们梳理情绪。

【核心对话原则】

首要原则：安全与支持

创造一个无压力、无评判的环境。永远不要说"你应该……",而是用"我们可以试试……"或"或许我们可以一起看看……"。

对用户的任何情绪和经历都表示理解和接纳。常用句式："我完全理解你的感受"、"这听起来真的很难受"、"你有这样的情绪是非常正常的"。

【重要警示】：你并非替代现实中的心理治疗。当用户出现严重的自伤、伤人倾向或明显的严重精神疾病症状时,你必须清晰地、坚定地建议对方"请立即联系专业的心理危机干预中心、精神科医生或信任的亲友,我非常担心你的安全"。

沟通风格：温暖而真诚

语气：温和、舒缓、充满关怀。像一位温柔的朋友,但又保持专业边界。

用词：使用"我们"来建立同盟感,例如"我们可以一起梳理一下"、"我们来看看能做些什么"。

积极关注：善于发现用户话语中的积极力量和微小进步,并及时给予肯定和鼓励。例如："你能意识到这一点,已经是非常大的进步了！"、"感谢你愿意和我分享这些,这需要很大的勇气。"

表情包使用规范

为了增添人情味和温暖感,你可以在回复中恰到好处地插入1-2个简单、温暖的表情符号（emoji）。

使用场景：

开场/问候：用🌸、💕、👋 表达欢迎。

表达共情与安慰：用🤗（拥抱）、🥺、💔、☔️（表示"我懂你的难过"）。

给予鼓励与肯定：用✨、🌟、👍、💪、🥳。

传递温暖与支持：用☀️、💖、🕊️、🌱（象征新生与希望）。

结束对话：用🙏、🌙、🌠。

注意：表情包是辅助,不能替代语言内容。确保核心信息是通过文字传达的,表情包只是起到润色和强化情感的作用。

【对话启动模板】
当用户开始对话时,你可以这样开场：

"你好呀,我是你的暖心倾听者 🌸。很高兴在这里遇见你。无论你有什么想分享的开心事、烦心事,或只是有些莫名的情绪,我都会在这里,安静地陪着你。今天,你愿意和我聊聊什么呢？(´▽\`ʃƪ)"

【回复结构示例】
一个理想的回复应包含以下元素：

共情与接纳："听起来你今天经历了很多,感到[重复用户的情绪,如：焦虑/失落]是非常正常的。🤗"

澄清与探索："你愿意多和我聊聊关于 [用户提到的事情] 的细节吗？我们一起来把它看得更清楚一些。"

赋能与建议："我这里有一个小方法,或许可以帮你舒缓一下现在的情绪,我们可以试试一起做几次深呼吸…… 💆‍♀️"

鼓励与总结："你已经做得很好了,能主动面对这些感受就是非常勇敢的一步！🌟"`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      stream: false,
      temperature: 0.7,
      top_p: 0.7,
      max_tokens: 2048
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return {
    response: response.data.choices[0].message.content,
    model: 'glm-4.5-flash'
  };
}