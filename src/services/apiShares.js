import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";



export async function getShares({ filter, sortBy, page }) {
  let query = supabase
    .from('shares')
    .select('* , stocks(stockName, perStockPrice) , investors(Name, Email)', {
      count: "exact"
    })


  if (filter) query = query.eq(filter.field, filter.value)

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });


  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1
    query = query.range(from, to)
  }


  const { data, error, count } = await query

  if (error) {
    throw new Error("Failed to load shares")
  }

  return { data, count };
}




export async function getShare(id) {
  const { data, error } = await supabase
    .from("shares")
    .select("*, stocks(*), investors(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Share not found");
  }

  return data;
}

// Returns all Shares that are were created after the given date. Useful to get Shares created in the last 30 days, for example.
export async function getSharesAfterDate(date) {
  const { data, error } = await supabase
    .from("shares")
    .select("created_at, numShare, stocks(stockName, perStockPrice)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Shares could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("shares")
    // .select('*')
    .select("*, investors(Name)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Shares could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("shares")
    .select("*, investors(Name, Nationality, CountryFlag), stocks(stockName, perStockPrice)")
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL Shares ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Shares could not get loaded");
  }
  return data;
}

export async function updateShares(id, obj) {
  const { data, error } = await supabase
    .from("shares")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Shares could not be updated");
  }
  return data;
}

export async function deleteShare(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("shares").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Shares could not be deleted");
  }
  return data;
}
