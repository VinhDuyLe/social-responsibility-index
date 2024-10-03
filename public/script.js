document.addEventListener('DOMContentLoaded', () => {
  fetch('/companies')
    .then(response => response.json())
    .then(companies => {
      const companyList = document.getElementById('company-list');

      companies.forEach(company => {
        const listItem = document.createElement('div');
        listItem.classList.add('company-card');  
        listItem.innerHTML = `
          <img src="${company.logo_url}" alt="${company.name}" class="company-logo">
          <div class="company-info">
            <h2>${company.name}</h2>
            <p><strong>Mission:</strong> ${company.mission_statement}</p>
            <p><strong>Lobbying Spend in 2024:</strong> $${company.lobbying_spend}</p>
            <p><strong>Diversity Score:</strong> ${company.diversity_score}/10</p>
            <p><strong>Environmental Score:</strong> ${company.environmental_score}/10</p>
            <p><strong>Political Score:</strong> ${company.political_score}/10</p>
            <a href="/company/${company.id}" class="more-details">More Details</a>
          </div>
        `;
        companyList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching company data:', error));
});
