"use client"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"

const demoPage = () => {
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

  return (
    <div className="p-8 space-x-4">
      <Button disabled={loading} onClick={handleBlocking}>
        {loading ? "Loading..." : "Blocking"}
      </Button>
      <Button disabled={loading} onClick={handleBackground}>
        {loading ? "Loading..." : "Background"}
      </Button>
    </div>
  )
}

export default demoPage
