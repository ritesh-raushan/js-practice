let currentRating = 0;
let reviews = [];

// DOM Elements
const userNameInput = document.getElementById('userName');
const reviewTextarea = document.getElementById('reviewText');
const submitButton = document.getElementById('submitReview');
const reviewsContainer = document.getElementById('reviewsContainer');
const emptyState = document.getElementById('emptyState');
const ratingText = document.getElementById('ratingText');
const stars = document.querySelectorAll('.fa-star[data-rating]');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeStarRating();
    initializeSubmitButton();
    displayReviews();
});

// Star Rating System
function initializeStarRating() {
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            setRating(currentRating);
            updateRatingText(currentRating);
        });
    });
}

// Set the permanent rating
function setRating(rating) {
    currentRating = rating;
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('text-gray-300');
            star.classList.add('text-yellow-400');
        } else {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-300');
        }
    });
}

// Update rating text
function updateRatingText(rating) {
    if (rating > 0) {
        ratingText.textContent = `${rating}/5 stars selected`;
    } else {
        ratingText.textContent = 'Select a rating';
    }
}

// Submit Functionality
function initializeSubmitButton() {
    submitButton.addEventListener('click', handleSubmitReview);
}

// Handle review submission
function handleSubmitReview() {
    const userName = userNameInput.value.trim();
    const reviewText = reviewTextarea.value.trim();

    // Validation
    if (!userName) {
        alert('Please enter your name');
        return;
    }

    if (!reviewText) {
        alert('Please write a review');
        return;
    }

    if (currentRating === 0) {
        alert('Please select a rating');
        return;
    }

    // Create new review object
    const newReview = {
        id: Date.now(),
        userName: userName,
        reviewText: reviewText,
        rating: currentRating,
        date: new Date().toLocaleDateString()
    };

    reviews.unshift(newReview);

    displayReviews();

    resetForm();

    alert('Review submitted successfully!');
}

// Display all reviews
function displayReviews() {
    if (reviews.length > 0) {
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewCard = createReviewCard(review);
            reviewsContainer.appendChild(reviewCard);
        });
    } else {
        reviewsContainer.innerHTML = `
            <div id="emptyState" class="flex flex-col items-center justify-center h-full text-gray-500">
                <i class="fa fa-comments text-4xl mb-4"></i>
                <p>No reviews yet. Be the first to write one!</p>
            </div>
        `;
    }
}

// Create review card element
function createReviewCard(review) {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'bg-blue-50 p-4 rounded-lg border border-blue-200';

    reviewCard.innerHTML = `
        <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-gray-800">${review.userName}</h3>
            <div class="flex items-center">
                ${generateStarDisplay(review.rating)}
                <span class="ml-1 text-sm text-gray-600">(${review.rating}/5)</span>
                <button class="ml-2 text-red-500 hover:text-red-700 text-sm" onclick="deleteReview(${review.id})">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
        <p class="text-gray-700 text-sm leading-relaxed">
            ${review.reviewText}
        </p>
        <div class="mt-2 text-xs text-gray-500">
            ${review.date}
        </div>
    `;

    return reviewCard;
}

// Generate star display for a review
function generateStarDisplay(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<span class="fa fa-star text-yellow-400"></span>';
        } else {
            starsHtml += '<span class="fa fa-star text-gray-300"></span>';
        }
    }
    return starsHtml;
}

// Delete review
function deleteReview(reviewId) {
    if (confirm('Are you sure you want to delete this review?')) {
        reviews = reviews.filter(review => review.id !== reviewId);
        displayReviews();
        alert('Review deleted!');
    }
}

// Reset form
function resetForm() {
    userNameInput.value = '';
    reviewTextarea.value = '';
    currentRating = 0;
    setRating(0);
    ratingText.textContent = 'Select a rating';
}