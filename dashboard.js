class BlogDashboard {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        this.form = document.querySelector('form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.displayPosts();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const title = this.form.querySelector('input[type="text"]').value;
        const date = this.form.querySelector('input[type="date"]').value;
        const content = this.form.querySelector('textarea').value;

        if (!title || !date || !content) {
            this.showMessage('Please fill all fields', 'error');
            return;
        }

        const post = {
            id: Date.now(),
            title,
            date,
            content,
            createdAt: new Date().toISOString()
        };

        this.posts.push(post);
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
        
        this.showMessage('Post added successfully!', 'success');
        this.form.reset();
        this.displayPosts();
    }

    displayPosts() {
        const container = document.getElementById('posts-list') || this.createPostsList();
        container.innerHTML = this.posts.map(post => `
            <div class="post-item" data-id="${post.id}">
                <h3>${post.title}</h3>
                <p class="date">${new Date(post.date).toLocaleDateString()}</p>
                <p class="preview">${post.content.substring(0,100)}...</p>
                <button onclick="dashboard.deletePost(${post.id})">Delete</button>
            </div>
        `).join('');
    }

    createPostsList() {
        const container = document.createElement('div');
        container.id = 'posts-list';
        document.querySelector('.content').appendChild(container);
        return container;
    }

    deletePost(id) {
        this.posts = this.posts.filter(post => post.id !== id);
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
        this.displayPosts();
        this.showMessage('Post deleted successfully!', 'success');
    }

    showMessage(message, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.textContent = message;
        this.form.insertAdjacentElement('beforebegin', msgDiv);
        setTimeout(() => msgDiv.remove(), 3000);
    }
}

const dashboard = new BlogDashboard();
