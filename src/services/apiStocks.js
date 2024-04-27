import supabase, { supabaseUrl } from "./supabase";

export async function getStocks() {

    let { data, error } = await supabase
        .from('stocks')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error("Failed to load Stocks")
    }

    return data;
}

export async function deleteStock(id) {

    const { data, error } = await supabase
        .from('stocks')
        .delete()
        .eq('id', id)


    if (error) {
        console.error(error)
        throw new Error("Stock could not be deleted")
    }

    return data
}


export async function addEditStocks(newStock, id) {
    const hasImagePath = newStock.image?.startsWith?.(supabaseUrl)
    const imageName = `${Math.random()}-${newStock.image.name}`.replace("/", "")
    const imagePath = hasImagePath ? newStock.image : `${supabaseUrl}/storage/v1/object/public/Stocks-images/${imageName}`

    let query = supabase.from('stocks')

    if (!id)
        query = query
            .insert([
                { ...newStock, image: imagePath }
            ])

    if (id) {
        query = query.update({ ...newStock, image: imagePath })
            .eq('id', id)
            .select()
    }

    const { data, error } = await query

    if (error) {
        console.error(error.message)
        throw new Error("Stock could not be Added")
    }

    const { error: storageError } = await supabase
        .storage
        .from('Stocks-images')
        .upload(imageName, newStock.image)

    if (storageError) {
        await supabase
            .from('stocks')
            .delete()
            .eq('id', data.id)
        console.error(storageError)
        throw new Error("Stock Image could not be Uploaded and Stock could not be created")
    }

    return data
}
