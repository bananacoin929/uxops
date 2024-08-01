import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const insertDepDetail = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('dep_details')
    .insert(data)
    .select()
    .single();

  return result;
};

export const getDepDetailById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_departments_view')
    .select('*')
    .eq('org_id', data.org_id);
  return result;
};

export const updateDepDetailById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  let result: any;
  let error: any;

  if (data.dep_ids) {
    const res = await supabaseAdmin
      .from('dep_details')
      .update({ is_deleted: true })
      .in('org_dep_id', data.dep_ids);
    await supabaseAdmin
      .from('dep_detail_locations')
      .update({ is_deleted: true })
      .in('org_dep_id', data.dep_ids);

    result = res;
  }

  try {
    for (const item of data.department_details) {
      const { data: dep_detail, error: depError } = await supabaseAdmin
        .from('dep_details')
        .insert({ org_dep_id: item.id, total_members: item.total_members })
        .select()
        .single();
      if (dep_detail) {
        for (const it of item.locations) {
          const { error: locationError } = await supabaseAdmin
            .from('dep_detail_locations')
            .insert({
              org_dep_id: item.id,
              dep_detail_id: dep_detail.id,
              location_id: it,
            });
          if (locationError) {
            error = locationError;
            break;
          }
        }
      } else {
        error = depError;
        break;
      }
    }
  } catch (err) {
    error = err;
  }

  return { ...result, error };
};
