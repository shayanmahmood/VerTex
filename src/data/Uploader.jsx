import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../ui/Button";

import { shares } from "./data-shares";
import { stocks } from "./data-stocks";
import { investors } from "./data-investor";

async function deleteinvestors() {
  const { error } = await supabase.from("investors").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deletestocks() {
  const { error } = await supabase.from("stocks").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteshares() {
  const { error } = await supabase.from("shares").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createinvestors() {
  const { error } = await supabase.from("investors").insert(investors);
  if (error) console.log(error.message);
}

async function createstocks() {
  const { error } = await supabase.from("stocks").insert(stocks);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: InvestorIds } = await supabase
    .from("investors")
    .select("id")
    .order("id");

  const allGuestIds = InvestorIds.map((investor) => investor.id);

  const { data: stockId } = await supabase
    .from("stocks")
    .select("id")
    .order("id");
  const allCabinIds = stockId.map((stock) => stock.id);

  const finalBookings = shares.map((share) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    return {
      ...share,
      investerId: allGuestIds.at(share.investerId - 1),
      stockId: allCabinIds.at(share.stockId - 1),
    };
  });

  console.log(finalBookings);
  console.log(stocks);
  console.log(investors);

  const { error } = await supabase.from("shares").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteshares();
    await deleteinvestors();
    await deletestocks();

    // Bookings need to be created LAST
    await createinvestors();
    await createstocks();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteshares();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
