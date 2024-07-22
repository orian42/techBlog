const deleteProcess = async (event) => {

    event.preventDefault();

    const blog_id = document.querySelector('#blog-id').value;

    if (blog_id) {
        const response = await fetch(`/api/content/d/${blog_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/dash`);
        } else {
            alert('Failed to delete post.');
        }
    }
}

document
    .querySelector('.delete-blog')
    .addEventListener('click', deleteProcess);