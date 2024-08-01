import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { HttpStatusCode } from 'axios';

const createClientApp = require('@/lib/msal/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');

export async function POST(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: productsList, error: getProductError } = await supabaseAdmin
      .from('products')
      .select('*');
    if (!getProductError) {
      const { data: integrationData, error: intergrationError } =
        await supabaseAdmin
          .from('org_vendors')
          .select('*, vendors(name)')
          .eq('org_id', params.id)
          .eq('status', true);
      if (!intergrationError)
        for (const item of integrationData) {
          if (item?.vendors?.name === 'Microsoft') {
            const clientApp = createClientApp(
              item?.integration_info?.clientId,
              item?.integration_info?.clientSecret,
              item?.integration_info?.tenantId
            );
            const token = await clientApp.getToken();

            if (!token) {
              console.error('Failed to get token');
              return;
            }
            const client = Client.init({
              authProvider: (done: any) => {
                done(null, token); // First parameter takes an error if you can't get an access token.
              },
            });

            // Get available products of each customer
            const products = await client
              .api('/admin/serviceAnnouncement/healthOverviews')
              .get();
            if (products.value.length > 0)
              for (const pro of products.value) {
                let pr = productsList.find(
                  (p: any) => p.ven_prod_id === pro.service
                );
                if (pr) {
                  const { error } = await supabaseAdmin
                    .from('org_products')
                    .insert({
                      org_id: params.id,
                      product_id: pr.id,
                    });
                  console.log(error);
                }
              }
          }
        }

      return NextResponse.json(
        { message: `Sucessful!` },
        { status: HttpStatusCode.Ok }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin.rpc(
      'get_active_org_products',
      {
        search_org_id: params.id,
      }
    );
    console.log(error);
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
