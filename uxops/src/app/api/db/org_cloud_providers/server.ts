import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const insertOrgCloudProvider = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin.from('org_cloud_providers').insert(data);

  return result;
};

export const getOrgCloudProviderById = async (
  org_id: number
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_cloud_providers')
    .select('*')
    .eq('org_id', org_id)
    .eq('is_deleted', false);

  return result;
};

export const updateOrgCloudProviderById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_cloud_providers')
    .update({ is_deleted: true })
    .eq('org_id', data.org_id);

  if (!result.error) {
    let index = 0;
    let error: any;
    for (const provider_id of data.public_cloud_providers) {
      const { error: insertError } = await supabaseAdmin
        .from('org_cloud_providers')
        .insert({ org_id: data.org_id, provider_id });
      if (error) {
        error = insertError;
        break;
      }
      index++;
    }
    if (index === data.public_cloud_providers.length) {
      return { ...result, error };
    } else return result;
  } else {
    return result;
  }
};
