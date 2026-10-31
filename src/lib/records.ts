import { experience, projects, skills } from '../data/portfolio'

export type Project = (typeof projects)[number]
export type Role = (typeof experience)[number] & { id: string }
export type SkillGroup = (typeof skills)[number] & { id: string }

export const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const roles: Role[] = experience.map((e) => ({ ...e, id: slug(`${e.company} ${e.role}`) }))

export const skillGroups: SkillGroup[] = skills.map((s) => ({ ...s, id: slug(s.category) }))

export const findProject = (id: string | null) => projects.find((p) => p.id === id) ?? null
export const findRole = (id: string | null) => roles.find((r) => r.id === id) ?? null

/** urutimall.com from https://urutimall.com */
export const domain = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

export const categories = Array.from(new Set(projects.map((p) => p.category)))
