import supabase, { supabaseUrl } from './supabase.js';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

export async function createEditCabin(cabinData, cabinId) {
  const isImageHasPath = cabinData.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabinData.image?.name}`.replace(
    '/',
    ''
  );
  const imagePath = isImageHasPath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://byekcwxivmgprwqmhaxh.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  // 1. Create/edit cabin
  let query = await supabase.from('cabins');
  // A) Create
  if (!cabinId) query = query.insert([{ ...cabinData, image: imagePath }]);
  // B) Edit
  if (cabinId)
    query = query.update({ ...cabinData, image: imagePath }).eq('id', cabinId);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  if (isImageHasPath) return data;
  // 2. Upload image

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabinData.image);

  // 3. Delete the cabin IF there was an error uploading images
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('File could not be uploaded and cabin was not created');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}
