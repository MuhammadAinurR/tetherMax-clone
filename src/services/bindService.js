import { binds } from '../../db/models';

export async function createBind({ userId, platformId, uid }) {
  try {
    // Check if there's an existing bind
    const existingBind = await binds.findOne({
      where: {
        userId,
        platformId,
      },
    });

    if (existingBind) {
      const error = new Error('Bind already exists for this platform');
      error.status = 409;
      throw error;
    }

    // Create new bind with isBind false (pending verification)
    const bind = await binds.create({
      userId,
      platformId,
      uid,
      isBind: false, // Always start as pending
    });
    return bind;
  } catch (error) {
    console.error('Error creating bind:', error);
    throw error;
  }
}

export async function getUserBinds(userId) {
  try {
    const userBinds = await binds.findAll({
      where: {
        userId,
      },
      attributes: ['platformId', 'uid', 'isBind'], // Note: it's 'isBind', not 'isBound'
    });

    return userBinds.map((bind) => ({
      platformId: bind.platformId,
      isBind: bind.isBind, // Keep the same property name as in database
      uid: bind.uid,
    }));
  } catch (error) {
    console.error('Error fetching user binds:', error);
    throw error;
  }
}
