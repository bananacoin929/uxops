import connectMongo from '@/lib/mongodb/db_connect';
import Release from '@/lib/mongodb/models/release';

const createClientApp = require('@/lib/msal/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');

import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    await connectMongo();
    const { data, error } = await supabaseAdmin
      .from('integrations')
      .select('*');
    if (!error) {
      for (const item of data) {
        if (item.azure?.enabled === true) {
          const clientApp = createClientApp(
            item?.azure?.clientID,
            item?.azure?.clientSecret,
            item?.azure?.tenantID
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

          try {
            // Example: Fetch Microsoft 365 updates
            let messages = await client
              .api('/admin/serviceAnnouncement/messages')
              .get();
            const d = await Release.insertMany(messages.value);
            return NextResponse.json({ data: d });
          } catch (error) {
            return NextResponse.json({ error });
          }
        }
      }
    }
    return NextResponse.json({ data: '' });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
