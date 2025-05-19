# 🍴 fork-and-code

A RESTful API built with **Express.js** and **SQLite** to manage restaurants and dishes. Perfect for learning full-stack basics, testing frontend apps, or building your own food-related platform.

### API Endpoints

| Resource     | HTTP Method | Endpoint                                   | Description                                  | Query Parameters                          |
|--------------|-------------|--------------------------------------------|----------------------------------------------|-------------------------------------------|
| **Restaurants** | `GET`       | `/restaurants`                             | Get all restaurants                          | —                                         |
|              | `GET`       | `/restaurants/details/:id`                 | Get a restaurant by ID                       | —                                         |
|              | `GET`       | `/restaurants/cuisine/:cuisine`            | Filter restaurants by cuisine                | —                                         |
|              | `GET`       | `/restaurants/filter`                       | Filter restaurants with multiple parameters | `isVeg`, `hasOutdoorSeating`, `isLuxury` |
|              | `GET`       | `/restaurants/sort-by-rating`               | Get restaurants sorted by rating             | —                                         |
| **Dishes**     | `GET`       | `/dishes`                                  | Get all dishes                               | —                                         |
|              | `GET`       | `/dishes/details/:id`                       | Get a dish by ID                             | —                                         |
|              | `GET`       | `/dishes/filter`                            | Filter dishes by vegetarian option           | `isVeg`                                   |
|              | `GET`       | `/dishes/sort-by-price`                     | Get dishes sorted by price                    | —                                         |

## 🧰 Tech Stack

- Node.js
- Express.js
- SQLite3
- CORS
- REST API principles


## 🛠️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fork-and-code.git
   cd fork-and-code
2. Install dependencies:
```bash
npm install
```
3. Ensure the BD4/database.sqlite file exists with the appropriate schema and data.

4. Start the server:
```bash
node index.js
```

## 📬 Contact
For any queries or collaboration, feel free to reach out:
📧 murugasutha18@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/muruga-sutha-k/)

