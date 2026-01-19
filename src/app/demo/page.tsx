"use client"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import * as Sentry from "@sentry/nextjs"
import { useAuth } from "@clerk/nextjs"

const demoPage = () => {
  const { userId } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleBlocking = async () => {
    setLoading(true)
    try {
      await fetch("/api/demo/blocking", { method: "POST" })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  const handleBackground = async () => {
    setLoading(true)
    try {
      await fetch("/api/demo/background", { method: "POST" })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleClientError = () => {
    Sentry.logger.info(
      "About to throw a client-side error for testing Sentry",
      { userId },
    )
    throw new Error("This is a client-side error for testing Sentry!")
  }
  const handleApiError = async () => {
    await fetch("/api/demo/error", { method: "POST" })
  }
  const handleInngestError = async () => {
    await fetch("/api/demo/inngest-error", { method: "POST" })
  }

  return (
    <div className="p-8 space-x-4">
      <Button disabled={loading} onClick={handleBlocking}>
        {loading ? "Loading..." : "Blocking"}
      </Button>
      <Button disabled={loading} onClick={handleBackground}>
        {loading ? "Loading..." : "Background"}
      </Button>
      <Button
        disabled={loading}
        onClick={handleClientError}
        variant={"destructive"}
      >
        Client
      </Button>
      <Button
        disabled={loading}
        onClick={handleApiError}
        variant={"destructive"}
      >
        API
      </Button>
      <Button
        disabled={loading}
        onClick={handleInngestError}
        variant={"destructive"}
      >
        Inngest
      </Button>
    </div>
  )
}

export default demoPage
