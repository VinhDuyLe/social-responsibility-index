// Import Express
const express = require('express');
const { Pool } = require('pg');
const app = express();
const path = require('path');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup PostgreSQL connection
const pool = new Pool({
  user: 'vinhduyle',
  host: 'localhost',
  database: 'listicle_db',
  password: 'vinh2023',
  port: 5432,
});

// Endpoint to retrieve companies
app.get('/companies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to get details of a single company by ID
app.get('/company/:id', async (req, res) => {
  const companyId = parseInt(req.params.id);

  try {
      const result = await pool.query('SELECT * FROM companies WHERE id = $1', [companyId]);

      if (result.rows.length > 0) {
          const company = result.rows[0];
          res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${company.name} - Details</title>
              <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
              <div class="company-detail-container">
                <h1>${company.name}</h1>
                <img src="${company.logo_url}" alt="${company.name}" class="company-logo">
                <div class="company-info">
                  <p><strong>Mission:</strong> ${company.mission_statement}</p>
                  <p><strong>Lobbying Spend in 2021:</strong> $${company.lobbying_spend}</p>
                  <p><strong>Diversity Score:</strong> ${company.diversity_score}/10</p>
                  <p><strong>Environmental Score:</strong> ${company.environmental_score}/10</p>
                  <p><strong>Political Score:</strong> ${company.political_score}/10</p>
                  <a href="/" class="back-to-list">Back to List</a>
                </div>
              </div>
            </body>
            </html>
          `);
      } else {
          res.status(404).send('<h1>Company not found</h1><a href="/">Back to list</a>');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});  

// 404 handler for other routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});