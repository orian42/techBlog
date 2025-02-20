//Front end process for adding a comment to a blog post
const commentProcess = async (event) => {

    event.preventDefault();

    const title = document.querySelector('#title-input').value.trim();
    const content = document.querySelector('#content-box').value;

    if (title && content) {
        const response = await fetch('/api/content/b', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/dash`);
        } else {
            alert('Failed to add new post.');
        }
    }
}

document
    .querySelector('.newPostForm')
    .addEventListener('submit', commentProcess);