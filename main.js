import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

function lowerCase(e) {
  return e.toLowerCase();
}

async function fetchAPIByPlatform(platform) {
  const apiItem = await fetch('/api/fetchNotion_apiList')
    .then((res) => res.json().then((data) => data.results));
    const results = []
    apiItem.map((api) => results.push(api.properties));
    const key = [] 
    apiItem.map((api) => key.push(api.properties.platform.select.name));
    const expectAPI = results.filter(item => item.platform.select.name === platform);


    document.querySelector('#platform-title').innerHTML = 
    `<h3 class="platform-badge">${platform} <span class="badge rounded-pill bg-danger">${expectAPI.length}</span></h3>`

    let htmlApiCollection ='';

    for(let i=0; i< expectAPI.length; i++) {
      let item = expectAPI[i]
      let type = lowerCase(item.type.select.name);
      let method = lowerCase(item.method.select.name);
      let apiNumber = `payload-${lowerCase(item.No.title[0].plain_text)}`;
      let format = '';
      if(item.format.select.name = 'json'){
          format = 'jinja5'
      }else format = 'xml-doc';
      htmlApiCollection +=
          `
          <div class="api-card">
          <span class="tag type ${type}">${item.type.select.name}</span>               
          <span class="tag method ${method}">${item.method.select.name}</span>
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
                <pre class="container">
                  <code type="text" class="line-numbers language-${format} line-numbers" id="${apiNumber}" value="Text to copy">
                  ${item.payload.rich_text[0].plain_text}
                </code>
              </pre>
               <button onclick="copyTextFromInput('${apiNumber}')">copy</button>
            </div>
          </div>
        </div>
        `;
    }



    document.querySelector('.api_collection').innerHTML = htmlApiCollection;
  
    console.log(typeof expectAPI[0].type.select.name)
    // console.log(results);
    // console.log(expectAPI);
    
    // console.log(api);

}

window.displayApi = (key) => {
  fetchAPIByPlatform(key);
}

window.copyTextFromInput = (value) => {
  const inputElement = document.getElementById(value);
  const text = inputElement.textContent;
  copyToClipboard(text);
}

window.copyToClipboard = (text) => {
  // Use the Clipboard API to write the text to the clipboard
  navigator.clipboard.writeText(text)
      .then(() => {
          console.log('Text copied to clipboard');
          console.log(text)
          // alert('Text copied to clipboard');
      })
      .catch(err => {
          console.error('Failed to copy text: ', err);
      });
}

window.displayCode = () => {
    // JSON object
    const jsonObject = document.querySelector('.payload').value;

    // Convert JSON object to a formatted string
    // const jsonString = JSON.stringify(jsonObject, null, 2);

    // Display the JSON string in the <code> element
    // document.getElementById('jsonDisplay').textContent = jsonString;
}


// fetchAPIByPlatform('SmartRecruiter');