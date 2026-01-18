"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { create } from "domain"

const page = () => {
  const projects = useQuery(api.projects.get)
  const createProject = useMutation(api.projects.create)

  return (
    <div className="flex flex-col p-4 ">
      <Button onClick={() => createProject({ name: "New Project" })}>
        Add Project
      </Button>
      {projects?.map((project) => (
        <div
          key={project._id.toString()}
          className="border flex flex-col justify-center items-center gap-2 p-4 mb-4"
        >
          <p>{project.name}</p>
          <p>Owner ID: {project.ownerId}</p>
        </div>
      ))}
    </div>
  )
}

export default page
