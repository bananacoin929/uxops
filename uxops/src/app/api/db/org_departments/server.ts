import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const insertOrgDepartment = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_departments')
    .insert(data)
    .select()
    .single();

  return result;
};

export const getOrgDepartmentById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_departments')
    .select('*')
    .eq('org_id', data.org_id)
    .eq('is_deleted', false);

  return result;
};

export const getOrgDepartmentDetailById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_departments')
    .select('*')
    .eq('org_id', data.org_id)
    .eq('is_deleted', false);

  return result;
};

export const updateOrgDepartmentById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_departments')
    .select('*')
    .eq('org_id', data.org_id)
    .eq('is_deleted', false);

  let existDepartData: any[] = result.data ?? [];
  console.log('existDepartData', existDepartData, data);

  if (!result.error) {
    let index = 0;
    let error: any;
    for (const department of data.departments) {
      const isExistDepart = existDepartData.find(
        (it: any) =>
          it.org_id === data.org_id &&
          it.name === department &&
          it.is_deleted === false
      );
      console.log('isExistDepart', isExistDepart);
      if (isExistDepart) {
        existDepartData = existDepartData.filter(
          (it: any) => it.id !== isExistDepart.id
        );
        index++;
      } else {
        const { error: insertError } = await supabaseAdmin
          .from('org_departments')
          .insert({ org_id: data.org_id, name: department });
        if (error) {
          error = insertError;
          break;
        }
        index++;
      }
    }
    console.log('**existDepartData', existDepartData);

    for (const item of existDepartData) {
      await supabaseAdmin
        .from('org_departments')
        .delete()
        .eq('id', item.id);
    }
    if (index === data.departments.length) {
      return { ...result, error };
    } else return result;
  } else {
    return result;
  }
  
};
