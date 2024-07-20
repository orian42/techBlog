const commentProcess = async (event) => {

    event.preventDefault();

    const comment = document.querySelector('#comment-box').value.trim();
    const blog_id = document.querySelector('#blogID').value;
    const user_id = 1;

    if (comment) {
        const response = await fetch('/api/content/c', {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id, user_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to add comment.');
        }
    }
}

document
    .querySelector('.addCommentForm')
    .addEventListener('submit', commentProcess);