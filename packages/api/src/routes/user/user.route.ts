import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserAccountsSchema,
  getUserSchema,
  getUserSessionSchema,
  getUserSettingsSchema,
  updateUserSettingsSchema,
} from '@repo/api/db/schemas'
import { notFoundSchema } from '@repo/api/lib/constants'
import * as HttpStatusCodes from '@repo/api/lib/http-status-codes'
import jsonContent from '@repo/api/lib/openapi/helpers/json-content'

const tags = ['User']

export const getUser = createRoute({
  path: '/user',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getUserSchema, 'The requested user'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'User not found'),
  },
})

export const getUserSession = createRoute({
  path: '/user/session',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getUserSessionSchema, 'The requested session'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Session not found'),
  },
})

export const getUserAccounts = createRoute({
  path: '/user/accounts',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(getUserAccountsSchema.pick({ providerId: true })),
      'The requested accounts',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Session not found'),
  },
})

export const getUserSettings = createRoute({
  path: '/user/settings',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getUserSettingsSchema, 'The requested session'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Session not found'),
  },
})

export const createUserSettingsSchema = z.object({
  workDuration: z.number(),
  breakDuration: z.number(),
  numberOfSessions: z.number(),
})

export const createUserSettings = createRoute({
  path: '/user/settings',
  method: 'post',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: createUserSettingsSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getUserSettingsSchema, 'The requested session'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Session not found'),
  },
})

export const updateUserSettings = createRoute({
  path: '/user/settings',
  method: 'put',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: updateUserSettingsSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getUserSettingsSchema, 'Successfully updated settings'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'User or settings not found'),
  },
})

export type CreateUserSettings = typeof createUserSettings
export type GetUserAccountsRoute = typeof getUserAccounts
export type GetUserRoute = typeof getUser
export type GetUserSessionRoute = typeof getUserSession
export type GetUserSettings = typeof getUserSettings
export type UpdateUserSettings = typeof updateUserSettings
