import { NextRequest, NextResponse } from 'next/server';
import type { Property } from '@/types/property';

let properties: Property[] = [];

export async function GET() {
  return NextResponse.json({ properties });
}

export async function POST(request: NextRequest) {
  try {
    const property: Property = await request.json();
    properties.push(property);
    return NextResponse.json({ success: true, property });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    properties = properties.filter((p: Property) => p.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}