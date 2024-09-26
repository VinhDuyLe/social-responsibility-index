// Import Express
const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//use json data later
const companies = [
    {
      id: 1,
      name: "EcoGreen Inc.",
      logo: "https://via.placeholder.com/100",
      mission: "Promoting renewable energy and sustainability solutions.",
      lobbyingSpend: "$1.2 million",
      diversityScore: 8.5,
      environmentalScore: 9.2,
      politicalScore: 7.5
    },
    {
      id: 2,
      name: "TechMinds",
      logo: "https://via.placeholder.com/100",
      mission: "Innovating the future of AI and machine learning.",
      lobbyingSpend: "$3.7 million",
      diversityScore: 7.3,
      environmentalScore: 6.8,
      politicalScore: 8.1
    },
    {
      id: 3,
      name: "CleanWater Corp.",
      logo: "https://via.placeholder.com/100",
      mission: "Ensuring access to clean and safe water worldwide.",
      lobbyingSpend: "$900,000",
      diversityScore: 9.1,
      environmentalScore: 9.8,
      politicalScore: 7.9
    },
    {
      id: 4,
      name: "GreenPower Co.",
      logo: "https://via.placeholder.com/100",
      mission: "Revolutionizing the electric vehicle industry.",
      lobbyingSpend: "$4.5 million",
      diversityScore: 6.9,
      environmentalScore: 8.9,
      politicalScore: 7.0
    },
    {
      id: 5,
      name: "SolarTech Solutions",
      logo: "https://via.placeholder.com/100",
      mission: "Developing cutting-edge solar energy technologies.",
      lobbyingSpend: "$2.1 million",
      diversityScore: 7.8,
      environmentalScore: 8.4,
      politicalScore: 6.9
    },
    {
        id: 6,
        name: "NewWind Solutions",
        logo: "https://via.placeholder.com/100",
        mission: "Developing wind energy technologies.",
        lobbyingSpend: "$2.1 million",
        diversityScore: 7.8,
        environmentalScore: 8.4,
        politicalScore: 6.9
      }
  ];
  

// Route to serve company data as JSON
app.get('/companies', (req, res) => {
  res.json(companies);
});

// Route to get details of a single company by ID
app.get('/company/:id', (req, res) => {
    const companyId = parseInt(req.params.id);
    const company = companies.find(c => c.id === companyId);
  
    if (company) {
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
            <img src="${company.logo}" alt="${company.name}" class="company-logo">
            <div class="company-info">
              <p><strong>Mission:</strong> ${company.mission}</p>
              <p><strong>Lobbying Spend in 2021:</strong> ${company.lobbyingSpend}</p>
              <p><strong>Diversity Score:</strong> ${company.diversityScore}/10</p>
              <p><strong>Environmental Score:</strong> ${company.environmentalScore}/10</p>
              <p><strong>Political Score:</strong> ${company.politicalScore}/10</p>
              <a href="/" class="back-to-list">Back to List</a>
            </div>
          </div>
        </body>
        </html>
      `);
    } else {
      res.status(404).send('<h1>Company not found</h1><a href="/">Back to list</a>');
    }
});

  

// 404 handler for other routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
