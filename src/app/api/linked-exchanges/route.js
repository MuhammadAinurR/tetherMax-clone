import { binds, platforms } from '../../../../db/models';

export async function GET(request) {
  const userId = request.headers.get('x-user-id');

  try {
    const linkedExchanges = await binds.findAll({
      where: {
        userId: userId,
        isBind: true,
      },
      include: [
        {
          model: platforms,
          attributes: ['name', 'cashback'],
        },
      ],
    });

    return Response.json(linkedExchanges);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
