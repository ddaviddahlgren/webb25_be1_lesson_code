import { Router } from "express";

const router = Router();

let artists = [
  { id: 1, name: "Bad Bunny" },
  { id: 2, name: "Zara Larsson" },
  { id: 3, name: "Radiohead" },
];

router.get("/", (req, res) => {
  res.json(artists);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const artist = artists.find((a) => a.id === id);

  if (!artist) {
    return res.status(404).json({ error: "Artist not found" });
  }

  req.json(artist);
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "A name is required" });
  }

  const lastId = artists.length > 0 ? artists[artists.length - 1].id : 0;
  const newArtist = { id: lastId + 1, name };

  artists.push(newArtist);
  res.status(201).json(newArtist);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const artist = artists.find((a) => a.id === id);

  if (!artist) {
    return res.status(404).json({ error: "Artist not found" });
  }

  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: "A name is required" });
  }

  artist.name = name
  res.json(artist)
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    const index = artists.findIndex((a) => a.id === id)

    if (index === -1){
        return req.status(404).json({ error: "Artist not found" })
    }

    artists.splice(index, 1)
    res.status(204).send()
})

export default artistsRouter