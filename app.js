document.addEventListener('DOMContentLoaded', function() {
    const recommendationDiv = document.getElementById('albumRecommendation');

    document.getElementById('genreForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const genre = document.getElementById('genreSelect').value;

        recommendationDiv.innerHTML = 'Loading...'; // Show loading message

        fetch(`/recommend?genre=${genre}`)
            .then(response => response.json())
            .then(album => {  // Directly receive one album
                if (album) {
                    recommendationDiv.innerHTML = `
                        <h2>We Recommend:</h2>
                        <p><strong>Album:</strong> ${album.name}</p>
                        <p><strong>Artist:</strong> ${album.artist.name}</p>
                        ${album.image ? `<img src="${album.image[3]['#text']}" alt="Cover image of ${album.name}">` : ''}
                        <p><a href="${album.url}" target="_blank">More Info</a></p>
                    `;
                } else {
                    recommendationDiv.innerHTML = 'No album found for this genre.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                recommendationDiv.innerHTML = 'Sorry, an error occurred while fetching the recommendation.';
            });
    });
});





