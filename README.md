# Building a Simple Express Server with Static Files and JSON API

1. Serves static HTML, CSS, and JavaScript files
2. Creates API endpoints using data from JSON files

## Setup

1. Initialize a new Node.js project:

```bash
npm init -y
npm install express
```

2. Create the project structure:

```
project-root/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── data/
│   └── items.json
├── server.js
└── README.md
```

## Step 1: Create the Server

Create a `server.js` file with the following code:

```javascript
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Step 2: Add JSON Data

Create a sample JSON file at `data/items.json`:

```json
[
  {
    "id": 1,
    "name": "Item 1",
    "description": "Description for item 1"
  },
  {
    "id": 2,
    "name": "Item 2",
    "description": "Description for item 2"
  },
  {
    "id": 3,
    "name": "Item 3",
    "description": "Description for item 3"
  }
]
```

## Step 3: Create API Endpoints

Add the following code to your `server.js` file:

```javascript
// GET all items
app.get("/api/items", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "items.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }

      const items = JSON.parse(data);
      res.json(items);
    }
  );
});

// GET item by id
app.get("/api/items/:id", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "items.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }

      const items = JSON.parse(data);
      const item = items.find((item) => item.id === parseInt(req.params.id));

      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.json(item);
    }
  );
});
```

## Step 4: Create Static Files

1. Create an `index.html` file in the `public` folder:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Express JSON API</title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <div class="container">
      <h1>Items from JSON API</h1>
      <div id="items-container"></div>
    </div>
    <script src="/js/script.js"></script>
  </body>
</html>
```

2. Create a `style.css` file in the `public/css` folder:

```css
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
  background-color: #f4f4f4;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
}

.item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
```

3. Create a `script.js` file in the `public/js` folder:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const itemsContainer = document.getElementById("items-container");

  // Fetch items from the API
  fetch("/api/items")
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "item";
        itemElement.innerHTML = `
          <h2>${item.name}</h2>
          <p>${item.description}</p>
        `;
        itemsContainer.appendChild(itemElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
      itemsContainer.innerHTML = "<p>Error loading items</p>";
    });
});
```

## Running the Application

1. Start the server:

```bash
node server.js
```

2. Open your browser and navigate to `http://localhost:3000`

3. To test the API directly:
   - `GET http://localhost:3000/api/items` - Returns all items
   - `GET http://localhost:3000/api/items/1` - Returns item with ID 1

## Next Steps

- Add CRUD functionality (POST, PUT, DELETE endpoints)
- Implement error handling middleware
- Add data validation
- Implement pagination for large datasets
