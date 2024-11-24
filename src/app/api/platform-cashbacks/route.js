import { platforms, platformCashbacks } from '../../../../db/models';

export async function GET(request) {
  const userId = request.headers.get('x-user-id');

  try {
    const cashbacks = await platformCashbacks.findAll({
      where: { userId },
      include: [
        {
          model: platforms,
          as: 'platform',
          attributes: ['name'],
        },
      ],
    });

    return Response.json(cashbacks);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
