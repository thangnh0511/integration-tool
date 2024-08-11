import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


async function fetchAPIByPlatform(platform) {
  const apiItem = await fetch('/api/fetchNotion_apiList')
    .then((res) => res.json().then((data) => data.results));
    const results = []
    apiItem.map((api) => results.push(api.properties));
    const key = [] 
    apiItem.map((api) => key.push(api.properties.platform.select.name));
    const expectAPI = results.filter(item => item.platform.select.name === platform);


    document.querySelector('#platform-title').innerHTML = 
    `<h3 class="platform-badge">${platform} <span class="badge rounded-pill bg-danger">${expectAPI.length} APIs</span></h3>`

    document.querySelector('.api_collection').innerHTML = expectAPI.map((item) => 
          `
          <div class="api-card">
          <span class="tag type ${item.type.select.name}">${item.type.select.name}</span>               
          <span class="tag method ${item.method.select.name}">${item.method.select.name}</span>
          <div>
              <h3 class="api__header">${item.request_name.rich_text[0].plain_text}</h3>
            </div>
          <div class="box-info">
            <span class="small-title">Description</span>
            <div class="box-info__content">
                ${item.request_description.rich_text[0].plain_text}
              </div>
          </div>
          <div class="box-info">
            <span class="small-title">Header</span>
            <div class="box-info__content">
              ${item.api_endpoint.rich_text[0].plain_text}
            </div>
          </div>
          <div class="box-info">
            <span class="small-title">Payload</span>
            <div class="box-info__content">
              <div>
                <pre class="payload container">
                  <code class="language-Jjinja2">
                  ${item.payload.rich_text[0].plain_text}
                </code>
              </pre>
              </div>
              </div>
            </div>
          </div>
        `).join('');
    
    
    console.log(expectAPI.length)
    console.log(results);
    console.log(expectAPI);
    
    // console.log(api);

}

window.displayApi = (key) => {
  fetchAPIByPlatform(key);
}

// fetchAPIByPlatform('SmartRecruiter');