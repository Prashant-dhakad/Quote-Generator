// Select DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//show loader 

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// hide loader

function competed(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
    
};



// Quote API URL
const apiURL = "https://type.fit/api/quotes"; 

// Get random quote from API
async function getRandomQuote() {
  try {
    loading();
    const response = await fetch(apiURL);
    const quotes = await response.json();

    // Generate random index
    const index = Math.floor(Math.random() * quotes.length);

    // Extract quote & author
    const quote = quotes[index];
    // const { text, author } = quote;
    const text = quote.text;
    let author = quote.author
    author = author.split(",")[0]
    if(author==="type.fit"){
        author = "Anonymous"
    };
    

    // Update DOM
    quoteText.innerText = text; 
    authorText.innerText = author;

    competed();
    
} catch(error) {
    console.error(error);
    // Show error message
}
}

// Tweet quote

// tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}


// Click event to get new quote
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getRandomQuote);

// Initialize
getRandomQuote();
