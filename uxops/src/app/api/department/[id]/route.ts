import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { HttpStatusCode } from 'axios';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('org_departments')
      .select('*')
      .eq('org_id', params.id)
      .eq('is_deleted', false);

    if (error)
      return NextResponse.json(
        { message: error },
        { status: HttpStatusCode.InternalServerError }
      );
    else return NextResponse.json({ data }, { status: HttpStatusCode.Ok });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
