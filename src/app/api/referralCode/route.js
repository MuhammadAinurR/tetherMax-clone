import {
  getReferralCodeByUserId,
  createReferralCode,
} from '../../../services/referralCodeService';
import { createResponse } from '../../../utils/responseUtils';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId'); // Get userId from query parameters

  try {
    const existingCode = await getReferralCodeByUserId(userId);
    if (existingCode) {
      return createResponse({ referralCode: existingCode.referralCode });
    } else {
      return createResponse({ message: 'No referral code found' }, 404);
    }
  } catch (error) {
    console.error('Error fetching referral code:', error);
    return createResponse({ error: 'Internal Server Error' }, 500);
  }
}

export async function POST(req) {
  const { userId } = await req.json(); // Get userId from request body

  try {
    const existingCode = await getReferralCodeByUserId(userId);
    if (existingCode) {
      return createResponse(
        { error: 'Referral Code already exists for this user' },
        409
      );
    }

    const newReferralCode = await createReferralCode(userId);
    return createResponse({ referralCode: newReferralCode.referralCode }, 201);
  } catch (error) {
    console.error('Error creating referral code:', error);
    return createResponse({ error: 'Internal Server Error' }, 500);
  }
}
