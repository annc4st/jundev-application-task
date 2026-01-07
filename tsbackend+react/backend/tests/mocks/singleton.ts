import { PrismaClient } from '../../prisma/generated/prisma/client.js';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
// import { jest, beforeEach} from '@jest/globals'

export const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

export const resetPrismaMock = () => mockReset(prismaMock);

