import { NextResponse } from 'next/server';
import { cashbackHistory } from '../../../../../db/models';

export async function POST(request) {
  const userId = request.headers.get('x-user-id');
  const { amount, crypto, network, walletAddress, convertedAmount } =
    await request.json();

  try {
    if (amount < 10) {
      throw new Error('Minimum withdrawal amount is 10 USDT');
    }

    // Create withdrawal record
    const withdrawal = await cashbackHistory.create({
      userId,
      platformId: null,
      amount: amount,
      type: 'WITHDRAW',
      status: 'PENDING',
      network,
      walletAddress,
      crypto,
      convertedAmount,
      hashLink: null, // Will be updated when transaction is processed
    });

    // Here you would typically:
    // 1. Queue the withdrawal for processing
    // 2. Initiate blockchain transaction
    // 3. Update status and hashLink when confirmed

    return NextResponse.json({
      success: true,
      withdrawalId: withdrawal.id,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
