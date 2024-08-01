import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const insertOrgAdmin = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_admins')
    .insert(data)
    .select()
    .single();

  return result;
};

export const getOrgAdminById = async (
  org_id: number
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_admins')
    .select('*')
    .eq('org_id', org_id)
    .single();

  return result;
};

export const updateOrgAdminById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_admins')
    .update(data)
    .eq('id', data.id)
    .single();

  return result;
};
