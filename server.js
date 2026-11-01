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


let listings = [
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