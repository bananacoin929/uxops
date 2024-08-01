import { HttpStatusCode } from 'axios';
import connectMongo from '@/lib/mongodb/db_connect';
import ProductUpdate from '@/lib/mongodb/models/product-update';
import { createClient } from '@supabase/supabase-js';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
  try {
    await connectMongo();
    const body: any = await req.json();
    console.log(body);
    if (body.name) {
      const product = await ProductUpdate.create(body);
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
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
  try {
    await connectMongo();
    const { data, error } = await supabaseAdmin
      .from('integrations')
      .select('*');
    console.log(data);
    // const products = await ProductUpdate.find();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
