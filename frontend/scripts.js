function copyToClipboard() {
    const twitterIdElement = document.getElementById('twitter-id');
    const copyButton = document.getElementById('copy-button');
    const textToCopy = twitterIdElement.textContent.trim();

    // Check if there is text to copy
    if (textToCopy !== "") {
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('ID copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        window.alert("Nothing to copy")
        console.log('Nothing to copy');
    }
}

document.addEventListener('htmx:afterOnLoad', function (event) {
const twitterIdElement = document.getElementById('twitter-id');
const copyButton = document.getElementById('copy-button');

if (twitterIdElement.textContent.trim() !== "") {
copyButton.style.display = 'inline-block';
} else {
copyButton.style.display = 'none';
}
});

document.addEventListener('htmx:responseError', function (event) {
console.error('Error fetching Twitter ID:', event.detail.xhr.status, event.detail.xhr.statusText);
alert('Error fetching Twitter ID. Please try again.');
});
