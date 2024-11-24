import { referralCodes } from '../../db/models';

export const getReferralCodeByUserId = async (userId) => {
  return await referralCodes.findOne({ where: { userId } });
};

export const createReferralCode = async (userId) => {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const existingReferralCode = await referralCodes.findOne({
      where: { referralCode: code },
    });
    if (!existingReferralCode) {
      isUnique = true;
    }
  }

  return await referralCodes.create({
    userId,
    referralCode: code,
  });
};
