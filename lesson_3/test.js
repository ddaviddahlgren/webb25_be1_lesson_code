import { connectToDb } from "./connect.js";
import mongoose from "mongoose";
import Artist from "./models/Artist.js";

async function main() {
  try {
    await connectToDb("lesson_3");
    console.log("Connected");

    await Artist.deleteMany({});

    const artistSeedData = [
      { name: "Jan Banan" },
      { name: "Åsnan" },
      { name: "Future" },
      { name: "Thorsten Flinck" },
      { name: "Kalle Pulin" },
    ];

    await Artist.insertMany(artistSeedData);
    console.log("Created Artists:", artistSeedData);

    await Artist.find();

    const updatedArtist = await Artist.findOneAndUpdate(
      { name: "Åsnan" }, // filter
      { name: "Åsnan 2.0" }, // nya värden
      { new: true }, // returnerar det uppdaterade dokumentet
    );

    console.log("Updated artist:", updatedArtist);

    const deleted = await Artist.deleteOne({ name: "Jan Banan"})
    console.log(`Deleted artists`, deleted)
  } catch (error) {
    console.warn("Cannot connect");
  }
  
  await mongoose.disconnect()
}

main();
