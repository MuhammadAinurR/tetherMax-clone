import { NextResponse } from 'next/server';
import { platforms, cashbackHistory } from '../../../../db/models';

export async function GET(request) {
  const userId = request.headers.get('x-user-id');

  try {
    const history = await cashbackHistory.findAll({
      where: { userId },
      include: [
        {
          model: platforms,
          as: 'platform',
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
