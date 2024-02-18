import { togetherClient, TogetherChatModel } from "together-ai-sdk";

export const POST = async () => {
  const client = togetherClient({ apiKey: process.env.TOGETHER_AI_API_KEY });

  const result = await client.chat({
    model: TogetherChatModel.LLaMA_2_Chat_7B,
    prompt:
      "[INST] generate a GitHub actions workflow to check formatting using yapf in python built with pip when a developer makes a pull request. provide only code. [/INST]",
    max_tokens: 400,
  });

  const content = result.choices[0].message.content;

  const start = content.indexOf("yaml");
  const end = content.indexOf("```", start + 5);

  const code = content.substring(start + 5, end);

  return Response.json(code);
};
