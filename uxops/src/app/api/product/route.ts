import { HttpStatusCode } from 'axios';
import connectMongo from '@/lib/mongodb/db_connect';
import Release from '@/lib/mongodb/models/release';

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body: any = await req.json();
    console.log(body);
    if (body.name) {
      const product = await Release.create(body);
      return NextResponse.json(
        { product, message: 'Your product has been created' },
        { status: HttpStatusCode.Created }
      );
    }
    return NextResponse.json(
      { message: 'Product name is missing' },
      { status: HttpStatusCode.BadRequest }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
export async function GET() {
  try {
    await connectMongo();
    const { data, error } = await supabaseAdmin
      .from('integrations')
      .select('*');
    console.log(data);
    // const products = await Release.find();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
