//Front end process for updating a blog post
const updateProcess = async (event) => {

    event.preventDefault();

    const title = document.querySelector('#title-input').value.trim();
    const content = document.querySelector('#content-box').value;
    const blog_id = document.querySelector('#blog-id').value;

    if (title && content) {
        const response = await fetch('/api/content/u', {
            method: 'PUT',
            body: JSON.stringify({ title, content, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/dash`);
        } else {
            alert('Failed to update post.');
        }
    }
}

document
    .querySelector('.updatePostForm')
    .addEventListener('submit', updateProcess);