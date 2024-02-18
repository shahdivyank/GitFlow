import { api } from "@/lib/api";
import { togetherClient, TogetherChatModel } from "together-ai-sdk";

export const POST = async () => {
  console.log("entered");
  const client = togetherClient({ apiKey: process.env.TOGETHER_AI_API_KEY });

  //   const result = await client.chat({
  //     model: TogetherChatModel.LLaMA_2_Chat_7B,
  //     prompt:
  //       "[INST] generate a GitHub actions workflow to check formatting using yapf in python built with poetry [/INST]",
  //     max_tokens: 512,
  //   });

  const content =
    "  Sure! Here is an example GitHub Actions workflow file that checks the formatting of a Python file using `yapf`:\n\n```yaml\nname: Check formatting with yapf\n\non: [push]\n\njobs:\n  check-formatting:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Check formatting\n        uses: poetry/actions-check-formatting@v1\n        with:\n          file: \"main.py\"\n          yapf_config: |\n            [extends]\n            yapf.style = \"google\"\n            yapf.check_whitespace = true\n            yapf.check_tabs = true\n```\n\nLet me explain what this workflow does:\n\n* `name`: The name of the workflow.\n* `on`: The events that trigger the workflow. In this case, we're using `push` to trigger the workflow whenever someone pushes changes to the repository.\n* `jobs`: The job that runs the workflow. In this case, we're using `check-formatting`.\n* `steps`: The steps that make up the job.\n\nHere's what each step does:\n\n* `name`: The name of the step.\n* `runs-on`: The platform that the step runs on. In this case, we're using `ubuntu-latest`.\n* `steps`: The actual steps that run.\n\nHere's what each step does:\n\n* `uses`: The action that runs the `yapf` command. In this case, we're using the `poetry/actions-check-formatting` action, which is a Poetry action that checks the formatting of a Python file using `yapf`.\n* `with`: The configuration for the `yapf` command. In this case, we're setting the `file` to `main.py`, which is the file we want to check for formatting. We're also setting the `yapf_config` to a JSON object that defines the formatting options. In this case, we're setting the `style` to `google`, which tells `yapf` to use the Google style guide. We're also setting `check_whitespace` to `true` and `check_tabs` to `true`,";

  const start = content.indexOf("yaml");
  const end = content.indexOf("```", start + 5);

  const code = content.substring(start + 5, end);

  console.log(code);

  //   const url = "https://api.together.xyz/v1/chat/completions";

  //   console.log(process.env.TOGETHER_AI_API_KEY);

  //   const headers = new Headers({
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.TOGETHER_AI_API_KEY}`,
  //   });

  //   const data = {
  //     model: "meta-llama/Llama-2-13b-chat-hf",
  //     max_tokens: 512,
  //     prompt:
  //       "[INST] generate a GitHub actions workflow to check formatting using yapf in python built with poetry [/INST]",
  //     temperature: 0.7,
  //     top_p: 0.7,
  //     top_k: 50,
  //     repetition_penalty: 1,
  //     stream_tokens: true,
  //     stop: ["[/INST]", "</s>"],
  //     repetitive_penalty: 1,
  //     update_at: "2024-02-18T00:39:03.538Z",
  //   };

  //   console.log({ url, method: "POST", headers, body: JSON.stringify(data) });

  //   const response = await api({
  //     url,
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(data),
  //   });

  //   console.log(response);

  return Response.json(code);
};
