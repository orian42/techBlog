const commentProcess = async (event) => {

    event.preventDefault();

    const comment = document.querySelector('#comment-box').value.trim();
    const blog_id = document.querySelector('#blogID').value;
    // const user_id = currentUserId; 

    if (comment) {
        const response = await fetch('/api/content/c', {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert('Failed to add comment.');
        }
    }
}

document
    .querySelector('.addCommentForm')
    .addEventListener('submit', commentProcess);