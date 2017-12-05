var searchOpen = 0;
var results = document.getElementById('results');
var searchField = document.getElementById('inputValue');

const close = document.getElementById('close');
const btn = document.getElementById('btn');
const textEntry = document.getElementById('textEntry');

window.addEventListener('keydown', (e)=> {
    if (e.key==='Enter' && searchField.value) {
      search();
      searchOpen = 1;
    }
});

btn.addEventListener('mouseup', () => {
  if (searchOpen === 1 && searchField.value) {
      search();
      searchOpen = 1;
    } else if (searchOpen === 1 && !searchField.value) {
      collapse();
      searchOpen = 0;
     } else { // if searchOpen box is closed
      open();
      searchOpen = 1;
    }
});   

close.addEventListener('click', () => {
  // wipes the input field
  document.getElementById('inputValue').value="";
  // clears all the results DIV boxes
results.innerHTML = "";
});

function open(){
  searchOpen = 1;
  btn.classList.add('box-change');
  textEntry.classList.add('textEntry-change');
}

function collapse(){
    searchOpen = 0;
    textEntry.classList.remove('textEntry-change');
    setTimeout( () => {
      btn.classList.remove('box-change');
    }, 1800);
}

// api: http://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&list=search&srlimit=10&srsearch=Queensland&callback=?
function search(){
  var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&list=search&srlimit=5&srsearch==" + searchField.value;
  let header = new Headers({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });

  var request = new Request(url, 
    {
      method: 'GET',
      headers: header,
      mode: 'cors',
      redirect: 'follow',
      cache: 'default'
    });

  fetch(request)

    .then ( response => response.json() )
    .then ( data => {
      let articles = data.query.search;
      for (var i = 0; i < articles.length; i++) {
        var title = articles[i].title;
        var snippet = articles[i].snippet;
        var block = document.createElement('DIV');
        block.setAttribute('id', 'result');
        block.innerHTML = 
        '<a href="https://en.wikipedia.org/wiki/' + title + '" target="_blank"><div class="title">' + title +'</div><div class="normal">' + snippet + '</div></a>';
        results.appendChild(block);
        }
    })
    .catch( err => {
      console.log('failure: ' + err);
    });
  }
