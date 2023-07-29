const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data:', error);
 
    return [];
  }
}


function displayGridView(data) {
    const container = document.getElementById('dataContainer');
    container.innerHTML = '';
    data.forEach(crypto => {
      const card = createCard(crypto);
      container.appendChild(card);
    });
  }
  
  function displayListView(data) {
    console.log(data)
    const container = document.getElementById('dataContainer');
    container.innerHTML = `
      <table>
        <thead>
       
        <tbody>
          ${data.map(crypto =>
            //  console.log(data))
             createTableRow(crypto)).join('')      
            }
        </tbody>
      </table>
    `;
  }

  
  function createCard(crypto) {
    console.log(crypto)
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="cardImgName">
       <div>
            <img src="${crypto.image}" alt="${crypto.name}" width="40px" height="40px" />
       </div>
       <div style="padding-left:10px">
            <h3>${crypto.name}</h3>
       </div>   
    </div>
    <div class="price_change_percentage_24h">
        <p> ${crypto.price_change_percentage_24h}%</p>
    </div>
      <p>Total Volume: $${crypto.total_volume}</p>
      <p>Market Cap: $${crypto.market_cap}</p>
    `;
    card.classList.add('card'); // Add appropriate CSS classes for card styling
    return card;
  }
  
  function createTableRow(crypto) {
    return `
      <tr>
        <td>
          <img src="${crypto.image}" alt= "img" width="30px" height="30px"/>
        </td>
        <td>${crypto.name}</td>
        <td>${crypto.price_change_percentage_24h}%</td>
        <td>${crypto.current_price}</td>
        <td>${crypto.market_cap}</td>
      </tr>
    `;
  }
  
  // The rest of the code remains the same.
  
  

  document.addEventListener('DOMContentLoaded', () => {
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
  
    gridViewBtn.addEventListener('click', async () => {
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      const data = await fetchData();
      displayGridView(data);
    });
  
    listViewBtn.addEventListener('click', async () => {
      gridViewBtn.classList.remove('active');
      listViewBtn.classList.add('active');
      const data = await fetchData();
      displayListView(data);
    });
  
    gridViewBtn.click();
  });
  