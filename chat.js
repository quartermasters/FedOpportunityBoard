// AI Chat Widget functionality
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.isLoading = false;
        this.chatHistory = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('chat-toggle');
        const closeBtn = document.getElementById('chat-close');
        const sendBtn = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            const chatWidget = document.getElementById('chat-widget');
            if (!chatWidget.contains(e.target) && this.isOpen) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const panel = document.getElementById('chat-panel');
        const toggleBtn = document.getElementById('chat-toggle');
        
        panel.classList.remove('hidden');
        toggleBtn.innerHTML = '<i data-feather="x" class="w-6 h-6"></i>';
        feather.replace();
        
        this.isOpen = true;
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 100);
    }

    closeChat() {
        const panel = document.getElementById('chat-panel');
        const toggleBtn = document.getElementById('chat-toggle');
        
        panel.classList.add('hidden');
        toggleBtn.innerHTML = '<i data-feather="message-circle" class="w-6 h-6"></i>';
        feather.replace();
        
        this.isOpen = false;
    }

    addWelcomeMessage() {
        // Welcome message is already in the HTML
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message || this.isLoading) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show loading indicator
        this.showLoading();
        
        try {
            const response = await this.callChatAPI(message);
            this.hideLoading();
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.hideLoading();
            this.addMessage('Sorry, I encountered an error processing your request. Please try again later.', 'error');
            console.error('Chat API error:', error);
        }
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        
        let messageClass = '';
        let icon = '';
        
        switch (type) {
            case 'user':
                messageClass = 'bg-blue-100 text-blue-800 ml-8';
                icon = '<i data-feather="user" class="w-4 h-4"></i>';
                break;
            case 'assistant':
                messageClass = 'bg-gray-100 text-gray-800 mr-8';
                icon = '<i data-feather="bot" class="w-4 h-4"></i>';
                break;
            case 'error':
                messageClass = 'bg-red-100 text-red-800 mr-8';
                icon = '<i data-feather="alert-circle" class="w-4 h-4"></i>';
                break;
        }
        
        messageDiv.className = `flex items-start space-x-2 p-3 rounded-lg ${messageClass}`;
        messageDiv.innerHTML = `
            <div class="flex-shrink-0 mt-0.5">
                ${icon}
            </div>
            <div class="text-sm leading-relaxed">${this.formatMessage(content)}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        feather.replace();
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store in history
        this.chatHistory.push({ content, type, timestamp: new Date() });
    }

    formatMessage(message) {
        // Basic markdown-like formatting
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    showLoading() {
        this.isLoading = true;
        const messagesContainer = document.getElementById('chat-messages');
        const loadingDiv = document.createElement('div');
        
        loadingDiv.id = 'loading-message';
        loadingDiv.className = 'flex items-center space-x-2 p-3 rounded-lg bg-gray-100 text-gray-600 mr-8';
        loadingDiv.innerHTML = `
            <div class="flex-shrink-0">
                <i data-feather="loader" class="w-4 h-4 animate-spin"></i>
            </div>
            <div class="text-sm">AI is thinking...</div>
        `;
        
        messagesContainer.appendChild(loadingDiv);
        feather.replace();
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideLoading() {
        this.isLoading = false;
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    async callChatAPI(message) {
        // Get context from current dashboard section
        const context = this.getCurrentContext();
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                context: context
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get AI response');
        }

        const data = await response.json();
        return data.response;
    }

    getCurrentContext() {
        // Get context based on current dashboard section
        const currentSection = window.dashboard?.currentSection || 'market-overview';
        
        const contexts = {
            'market-overview': 'The user is currently viewing market overview data including agency spending, contract awards, and market trends.',
            'contract-vehicles': 'The user is currently viewing contract vehicles including OASIS+, GSA schedules, and other procurement mechanisms.',
            'prime-contractors': 'The user is currently viewing prime contractor information including capabilities, recent contracts, and subcontracting opportunities.',
            'strategic-toolkit': 'The user is currently viewing strategic toolkit including capability assessment tools, market intelligence, and action plans.',
            'cost-strategy': 'The user is currently viewing cost strategy information including cost phases, breakdowns, and optimization recommendations.'
        };
        
        return contexts[currentSection] || contexts['market-overview'];
    }

    // Export chat history
    exportChatHistory() {
        const data = {
            timestamp: new Date().toISOString(),
            history: this.chatHistory
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-history-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Clear chat history
    clearHistory() {
        this.chatHistory = [];
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = `
            <div class="text-center text-gray-500 text-sm">
                <p>Hello! I'm St Michael -AI, your federal contracting assistant.</p>
                <p>Ask me about contract vehicles, prime contractors, or cost strategies.</p>
            </div>
        `;
    }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatWidget = new ChatWidget();
});
