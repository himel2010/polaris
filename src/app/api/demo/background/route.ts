import { inngest } from "@/inngest/client"

import { generateText } from "ai"

export async function POST() {
  await inngest.send({
    name: "demo/generate",
    data: {},
  })

  return Response.json({ status: "Event sent" })
}
