import { NextResponse } from 'next/server';
import { platformCashbacks, cashbackHistory } from '../../../../../db/models';

export async function POST(request) {
  const userId = request.headers.get('x-user-id');
  const { platformId, amount } = await request.json();

  try {
    // Validate minimum withdrawal
    if (amount < 10) {
      return NextResponse.json(
        { error: 'Minimum withdrawal amount is 10 USDT' },
        { status: 400 }
      );
    }

    // Get current balance
    const cashback = await platformCashbacks.findOne({
      where: { userId, platformId },
    });

    if (!cashback || cashback.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Create withdrawal record in history
    await cashbackHistory.create({
      userId,
      platformId,
      amount,
      type: 'EARN',
      status: 'SUCCESS',
    });

    // Update platform cashback balance
    await cashback.decrement('balance', { by: amount });

    // Here you would typically:
    // 1. Create a transfer record
    // 2. Update main wallet balance
    // 3. Create transaction history

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
