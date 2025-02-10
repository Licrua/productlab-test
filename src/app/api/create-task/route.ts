import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const task = await req.json(); // Получаем данные из тела запроса

    // Пример успешного ответа
    return NextResponse.json({
      ok: true,
      message: 'HardTask created successfully.',
      task: task,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Произошла ошибка при обработке задачи.' }, { status: 500 });
  }
}
