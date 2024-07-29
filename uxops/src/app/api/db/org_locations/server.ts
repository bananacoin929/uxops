import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const insertOrgLocation = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_locations')
    .insert(data)
    .select()
    .single();

  return result;
};

export const getOrgLocationById = async (
  org_id: number
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_locations')
    .select('*')
    .eq('org_id', org_id)
    .eq('is_deleted', false);

  return result;
};

export const updateOrgLocationById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_locations')
    .select('*')
    .eq('org_id', data.org_id)
    .eq('is_deleted', false);

  let existLocationData: any[] = result.data ?? [];
  console.log('existLocationData', existLocationData, data);

  if (!result.error) {
    let index = 0;
    let error: any;
    for (const location of data.locations) {
      const isExistLocation = existLocationData.find(
        (it: any) =>
          it.org_id === data.org_id &&
          it.address === location.address &&
          it.type === location.type &&
          it.name === location.name &&
          it.country === location.country &&
          it.state === location.state &&
          it.city === location.city &&
          it.is_deleted === false
      );

      console.log('isExistLocation', isExistLocation);

      if (isExistLocation) {
        existLocationData = existLocationData.filter(
          (it: any) => it.id !== isExistLocation.id
        );
        index++;
      } else {
        const { error: insertError } = await supabaseAdmin
          .from('org_locations')
          .insert({ ...location, org_id: data.org_id });
        if (error) {
          error = insertError;
          break;
        }
        index++;
      }
    }
    console.log('**existLocationData', existLocationData);

    for (const item of existLocationData) {
      await supabaseAdmin
        .from('org_locations')
        .update({ is_deleted: true })
        .eq('id', item.id);
      await supabaseAdmin
        .from('dep_detail_locations')
        .update({ is_deleted: true })
        .eq('location_id', item.id);
    }

    if (index === data.locations.length) {
      return { ...result, error };
    } else return result;
  } else {
    return result;
  }
};
