import { useQuery, useMutation } from "convex/react"

import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

export const useProject = (projectId: Id<"projects">) => {
  return useQuery(api.projects.getById, { id: projectId })
}

export const useProjects = () => {
  return useQuery(api.projects.get)
}
export const useProjectsPartial = (limit: number) => {
  return useQuery(api.projects.getPartial, { limit })
}

export const useCreateProject = () => {
  return useMutation(api.projects.create).withOptimisticUpdate(
    (localStore, args) => {
      const existingProjects = localStore.getQuery(api.projects.getPartial, {
        limit: 6,
      })

      if (existingProjects !== undefined) {
        const now = Date.now()
        const newProject = {
          _id: crypto.randomUUID() as Id<"projects">,
          _creationTime: now,
          name: args.name,
          ownerId: "anonymous",
          updatedAt: now,
        }

        localStore.setQuery(
          api.projects.getPartial,
          { limit: 6 },
          [newProject, ...existingProjects].slice(0, 6),
        )
      }
    },
  )
}

export const useRenameProject = (projectId: Id<"projects">) => {
  return useMutation(api.projects.rename).withOptimisticUpdate(
    (localStore, args) => {
      const existingProject = localStore.getQuery(api.projects.getById, {
        id: projectId,
      })

      if (existingProject !== undefined && existingProject !== null) {
        const now = Date.now()
        const newProject = {
          _id: crypto.randomUUID() as Id<"projects">,
          _creationTime: now,
          name: args.name,
          ownerId: "anonymous",
          updatedAt: now,
        }

        localStore.setQuery(
          api.projects.getById,
          { id: projectId },
          { ...existingProject, name: args.name, updatedAt: Date.now() },
        )
      }
      const existingProjects = localStore.getQuery(api.projects.getPartial, {
        limit: 6,
      })

      if (existingProject !== undefined) {
        localStore.setQuery(
          api.projects.getPartial,
          { limit: 6 },
          existingProjects
            ?.map((project) => {
              return project._id === args.id
                ? { ...project, name: args.name, updatedAt: Date.now() }
                : project
            })
            .slice(0, 6),
        )
      }
    },
  )
}
