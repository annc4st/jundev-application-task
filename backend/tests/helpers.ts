// import { PrismaClient } from '../prisma/generated/prisma/client.js';
import prisma from '../client.ts';

export const resetDb = async () => {
    // Ensure we are not deleting production data
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('resetDb should only be run in test environment');
    }

    const deleteTasks = prisma.task.deleteMany();

    // Add other models here if necessary, e.g.:
    // const deleteUsers = prisma.user.deleteMany();

    // Use transaction to delete all data
    await prisma.$transaction([
        deleteTasks,
    ]);
};
