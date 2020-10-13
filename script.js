const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.diasbled = !button.diasbled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: '140ca048e8ba4186a0439b71a9d4c3a4',
        src: jokeString,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}



// Get Jokes from Joke API
async function getJoke() {
    let joke = '';
    const apiURL = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        // Assign One or Two Part Joke
        if (data.setup) {
            joke = data.setup + ' ... ' + data.delivery;
        } else {
            joke = data.joke;
        }
        // Passing Joke to VoiceRSS API
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);