const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async function initializeDB() {
  db = await open({
    filename: './BD4/database.sqlite',
    driver: sqlite3.Database,
  });
  console.log('Database connected successfully');
})();

// 1: Get All Restaurants

async function getAllRestaurant() {
  let query = 'SELECT * FROM restaurants';
  let response = await db.all(query, []);
  return { restaurants: response };
}

app.get('/restaurants', async (req, res) => {
  try {
    let result = await getAllRestaurant();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurant found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 2: Get Restaurant by ID

async function getRestaurantById(id) {
  let query = 'SELECT * FROM restaurants WHERE id = ? ';
  let response = await db.all(query, [id]);
  return { restaurants: response };
}

app.get('/restaurants/details/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await getRestaurantById(id);
    if (result.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurant found for id: ' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 3: Get Restaurants by Cuisine

async function getRestaurantByCuisine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine = ? ';
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    let cuisine = req.params.cuisine;
    let result = await getRestaurantByCuisine(cuisine);
    if (result.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurant found for cuisine: ' + cuisine });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 4: Get Restaurants by Filter

async function getRestaurantByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ? ';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

app.get('/restaurants/filter', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let hasOutdoorSeating = req.query.hasOutdoorSeating;
    let isLuxury = req.query.isLuxury;
    let result = await getRestaurantByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurant found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 5: Get Restaurants Sorted by Rating

async function sortByRating() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC ';
  let response = await db.all(query, []);
  return { restaurants: response };
}

app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let result = await sortByRating();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurant' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 6: Get All Dishes

async function getAllDishes() {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get('/dishes', async (req, res) => {
  try {
    let result = await getAllDishes();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 7: Get Dish by ID

async function getDishesById(id) {
  let query = 'SELECT * FROM dishes WHERE id = ? ';
  let response = await db.all(query, [id]);
  return { dishes: response };
}

app.get('/dishes/details/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await getDishesById(id);
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found for id: ' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 8: Get Dishes by Filter

async function getDishesByFilter(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg = ? ';
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get('/dishes/filter/', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let result = await getDishesByFilter(isVeg);
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found ' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 9: Get Dishes Sorted by Price

async function sortByPrice() {
  let query = 'SELECT * FROM dishes ORDER BY price';
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let result = await sortByPrice();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
