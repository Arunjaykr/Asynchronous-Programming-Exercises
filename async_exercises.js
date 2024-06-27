// Callbacks Implementation
function executeCallback() {
    const div = document.getElementById('callbackResult');
    div.innerText = 'Executing callback...';

    setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                div.innerHTML = 'Callback executed after 5 seconds. Fetched data:<br><br>';
                data.forEach(post => {
                    div.innerHTML += `${post.title}<br><br>`;
                });
            })
            .catch(error => {
                div.innerText = 'Error fetching data from API.';
                console.error('Error fetching data:', error);
            });
    }, 5000);
}


// Promises Implementation
function executePromise() {
    const div = document.getElementById('promiseResult');
    div.innerText = 'Loading...';

    const fetchData = new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        }, 5000); // Simulating a delay longer than 5 seconds
    });

    fetchData.then(data => {
        div.innerHTML = 'Promise resolved. Fetched data:<br><br>'; // Adds a line break
       data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.style.marginBottom = '10px'; // Adds a gap between posts
            postElement.innerText = post.title;
            div.appendChild(postElement);
        });
    }).catch(error => {
        div.innerText = `Error: ${error.message}`;
        console.error('Error fetching data:', error);
    });
}


// Async/Await Implementation
async function executeAsyncAwait() {
    const div = document.getElementById('asyncAwaitResult');
    div.innerText = 'Loading...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        div.innerText = 'Async/Await executed. Fetched data:\n';
        data.forEach(post => {
            div.innerText += `${post.title}\n`;
        });
    } catch (error) {
        div.innerText = `Error: ${error.message}`;
        console.error('Error fetching data:', error);
    }
}
