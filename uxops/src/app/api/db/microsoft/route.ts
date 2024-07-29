import { NextRequest, NextResponse } from 'next/server';
// const { Client } = require('@microsoft/microsoft-graph-client');
// import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js';

// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL || '',
//   process.env.SUPABASE_SERVICE_ROLE_KEY || ''
// );

// import { createServerSupabaseClient } from "@/lib/providers/supabase-server";

export async function GET(req: NextRequest) {
  try {
    // const supabase = createServerSupabaseClient();
    // const token =
    //   'eyJ0eXAiOiJKV1QiLCJub25jZSI6IlNFZ0tnREIxYm1lMlRhWVhSTHV0S2JlMDlWU2c4a2hBU1c5Tk5ySjZxd00iLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kNTVkNjAyMS03NTVkLTQ1MjgtODk4Mi0zZmY2NDc0NDdhYzMvIiwiaWF0IjoxNzIyMjM4Mjc0LCJuYmYiOjE3MjIyMzgyNzQsImV4cCI6MTcyMjMyNDk3NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQXN1RjlpdFJkY3lLSytvRDNLMUZKRDc4eWlmNzBzZXdlQTY4TGxiV2wrcnJXNnVueE1Kc1ZablhCZ1F1R1hYZ2wiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIzOC4xNzAuMTgxLjEwIiwibmFtZSI6IlRob21hcyIsIm9pZCI6IjY1MDhmODgzLWVkN2MtNGMxMS05MjlkLTk1N2NhNDI4NjNkMyIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwM0E2QzA5MzA1IiwicmgiOiIwLkFYMEFJV0JkMVYxMUtFV0pnal8yUjBSNnd3TUFBQUFBQUFBQXdBQUFBQUFBQUFDYUFGRS4iLCJzY3AiOiJvcGVuaWQgcHJvZmlsZSBTZXJ2aWNlSGVhbHRoLlJlYWQuQWxsIFNlcnZpY2VNZXNzYWdlLlJlYWQuQWxsIFVzZXIuUmVhZCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6ImVFQndUQW1yZmlGUWphbXRzRUpicWNMNjVyVmo2a2Qwb29wWkM1TUQwOEkiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiJkNTVkNjAyMS03NTVkLTQ1MjgtODk4Mi0zZmY2NDc0NDdhYzMiLCJ1bmlxdWVfbmFtZSI6InRob21hc0BkaWdpZHdlbGwub25taWNyb3NvZnQuY29tIiwidXBuIjoidGhvbWFzQGRpZ2lkd2VsbC5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJKT3RUNnR0Q1hFcTRfRXBTT01FZEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJmMmVmOTkyYy0zYWZiLTQ2YjktYjdjZi1hMTI2ZWU3NGM0NTEiLCI5Yjg5NWQ5Mi0yY2QzLTQ0YzctOWQwMi1hNmFjMmQ1ZWE1YzMiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfaWRyZWwiOiI4IDEiLCJ4bXNfc3NtIjoiMSIsInhtc19zdCI6eyJzdWIiOiJvOHBPSVpiczdCUE5TaVZLcjJHS2R1Mk96VHU0VmlScUNpSHVPTTVTUVFjIn0sInhtc190Y2R0IjoxNjUxMzU1MjU5fQ.TT6z1K3an9rRLnKcmoQG8zn9WfqUodBJ_3eanfJSuxBvbwr9Rml0hYtl1Fjn6KMfHoLAQksn2kc2E_ZluWjIZDl_6luj-hZxTstdaIwIyfjOqnNsgOc5M0g2ZkrK6DUM6RLJD-euwEVUFtfZYH6WuO6TQy-1tI6IgPfkShwI2aJ813dMyb0oJUmVI4-wIPLgZ2yuv70Wlgc1CDre2VYZg8Lflw50eOlmpjz8H1ngrj9Wg9d4vNOUgN2-1QWIDG_564vJcQRd3cHSHNmZUyVtIN6nFV6FOu1UkAEPlU4PW7OAkVJ5__ztxHIEyad7q8sCfL2FyO5T9hkSCDxO_OvMTA';
    // const client = Client.init({
    //   authProvider: (done: any) => {
    //     done(null, token); // First parameter takes an error if you can't get an access token.
    //   },
    // });
    // try {
    //   // Example: Fetch Microsoft 365 updates
    //   let messages = await client
    //     .api('/admin/serviceAnnouncement/messages')
    //     .get();
    //   if (messages) {
    //     console.log(messages);
    //     for (const item of messages.value) {
    //       const { error } = await supabaseAdmin.from('microsoft').insert(item);
    //       console.log(error);
    //     }
    //   }
    //   return NextResponse.json({ message: 'Success.', status: 200 });
    // } catch (err) {
    //   console.error(err);
    // }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
