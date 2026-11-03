import express from "express";
const app = express();
app.get("/", (req, res) => {
 res.send("Hello world");
});
app.listen(3000, () => {
 console.log("Server running on http://localhost:3000");
});
app.use((req, res, next) => {
console.log(req.method, req.url); next();
});

app.use(express. json());

let nextId = 4;


const listings = [
{ id: 1, title: "Nile View Apartment", pricePerNight: 85 }, 
{ id: 2, title: "Beach House", pricePerNight: 140 }, 
{ id: 3, title: "Desert Eco-Lodge", pricePerNight: 60 }, 
];
function getAlllistings() {
    return listings;
}
function getListingById(id) {
    return listings.find((listing) => listing.id === id);
}
app.use(express.json()); // lets Express read JSON request bodies




// ---------- data functions ----------
function getAllListings() {
  return listings;
}

function getListingById(id) {
  return listings.find((listing) => listing.id === id);
}

function addListing(data) {
  const listing = {
    id: nextId++,
    title: data.title,
    pricePerNight: Number(data.pricePerNight),
  };
  listings.push(listing);
  return listing;
}

function updateListing(id, data) {
  const listing = getListingById(id);
  if (!listing) return null;
  listing.title = data.title;
  listing.pricePerNight = Number(data.pricePerNight);
  return listing;
}

function removeListing(id) {
  const index = listings.findIndex((listing) => listing.id === id);
  if (index === -1) return null;
  return listings.splice(index, 1)[0];
}

// ---------- route handlers ----------
function handleGetAll(req, res) {
  res.json(getAllListings());
}

function handleGetOne(req, res) {
  const listing = getListingById(Number(req.params.id));
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  res.json(listing);
}

function handleCreate(req, res) {
  const data = req.body || {};
  if (!data.title || !data.pricePerNight) {
    return res.status(400).json({ error: "title and pricePerNight required" });
  }
  res.status(201).json(addListing(data));
}

function handleUpdate(req, res) {
  const data = req.body || {};
  if (!data.title || !data.pricePerNight) {
    return res.status(400).json({ error: "title and pricePerNight required" });
  }
  const listing = updateListing(Number(req.params.id), data);
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  res.json(listing);
}

function handleDelete(req, res) {
  const listing = removeListing(Number(req.params.id));
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  res.status(204).end();
}

// ---------- routes ----------
app.get("/", (req, res) => {
  res.send("Welcome to ebd bnb");
});

app.get("/api/listings", handleGetAll);
app.get("/api/listings/:id", handleGetOne);
app.post("/api/listings", handleCreate);
app.put("/api/listings/:id", handleUpdate);
app.delete("/api/listings/:id", handleDelete);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});