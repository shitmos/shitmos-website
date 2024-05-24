document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML = '<p>Welcome to the Shitmos chat!</p>';

    // Add a form for user input
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Send';
    form.appendChild(input);
    form.appendChild(button);
    chatbox.appendChild(form);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = input.value.trim();
        if (message) {
            const msgElement = document.createElement('p');
            msgElement.textContent = message;
            chatbox.insertBefore(msgElement, form);
            input.value = '';
        }
    });
});
