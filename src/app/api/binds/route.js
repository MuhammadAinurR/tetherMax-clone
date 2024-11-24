import { NextResponse } from 'next/server';
import { createBind, getUserBinds } from '@/services/bindService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const binds = await getUserBinds(userId);
    return NextResponse.json(binds);
  } catch (error) {
    console.error('Error in bind API:', error);
    return NextResponse.json({ error: 'Failed to fetch binds' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { platformId, uid, userId } = await request.json();

    if (!platformId || !uid || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bind = await createBind({ userId, platformId, uid });
    return NextResponse.json({
      ...bind,
      message: 'Bind request submitted successfully. Waiting for verification.',
    });
  } catch (error) {
    console.error('Error in bind API:', error);

    if (error.status === 409) {
      return NextResponse.json({ error: 'Platform already bound or pending verification' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Failed to create bind' }, { status: 500 });
  }
}
