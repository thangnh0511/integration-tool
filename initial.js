import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

async function fetchPlatformListFromAPI() {
  const platform = await fetch('/api/fetchNotion_apiList')
    .then((res) => res.json().then((data) => data.results));
    const platformList = [] 
    platform.map((api) => 
      platformList.push(api.properties.platform.select.name)
    );
    const distinctPlatforms = [...new Set(platformList)];
    
    console.log(distinctPlatforms)
    document.querySelector('.api_list').innerHTML = distinctPlatforms.map((item) => 
      `
      <li><a class="dropdown-item" onclick="displayApi('${item}')">${item}</a></li>
    `).join('');
}

fetchPlatformListFromAPI();