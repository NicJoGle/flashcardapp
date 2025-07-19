class FlashcardApp {
    constructor() {
        this.flashcards = [];
        this.currentIndex = 0;
        this.isShowingAnswer = false;
        this.viewedCards = new Set();
        
        this.initializeElements();
        this.bindEvents();
        this.updateUI();
    }
    
    initializeElements() {
        this.fileInput = document.getElementById('fileInput');
        this.subjectInput = document.getElementById('subjectInput');
        this.flashcard = document.getElementById('flashcard');
        this.cardContent = document.getElementById('cardContent');
        this.cardType = document.getElementById('cardType');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.flipBtn = document.getElementById('flipBtn');
        this.cardCounter = document.getElementById('cardCounter');
        this.progressFill = document.getElementById('progressFill');
    }
    
    bindEvents() {
        this.fileInput.addEventListener('change', (e) => this.handleFileLoad(e));
        this.prevBtn.addEventListener('click', () => this.previousCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());
        this.flipBtn.addEventListener('click', () => this.flipCard());
        this.flashcard.addEventListener('click', () => this.flipCard());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.flashcards.length === 0) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousCard();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextCard();
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.flipCard();
                    break;
            }
        });
    }
    
    async handleFileLoad(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            const text = await this.readFile(file);
            this.flashcards = this.parseFlashcards(text);
            
            if (this.flashcards.length === 0) {
                this.showError('No valid flashcards found in the file. Please check the format.');
                return;
            }
            
            this.shuffleFlashcards();
            this.currentIndex = 0;
            this.isShowingAnswer = false;
            this.viewedCards = new Set();
            this.updateUI();
            this.showCurrentCard();
            
            // Show success message
            this.showMessage(`Loaded ${this.flashcards.length} flashcards successfully!`);
            
        } catch (error) {
            this.showError('Error reading file. Please try again.');
            console.error('File reading error:', error);
        }
    }
    
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }
    
    parseFlashcards(text) {
        const lines = text.split('\n');
        const flashcards = [];
        let currentQuestion = '';
        let currentAnswer = '';
        let isReadingQuestion = false;
        let isReadingAnswer = false;
        
        for (let line of lines) {
            line = line.trim();
            
            // Skip comments and empty lines
            if (line.startsWith('#') || line === '') {
                // If we have a complete Q&A pair, save it
                if (currentQuestion && currentAnswer) {
                    flashcards.push({
                        question: currentQuestion.trim(),
                        answer: currentAnswer.trim()
                    });
                    currentQuestion = '';
                    currentAnswer = '';
                    isReadingQuestion = false;
                    isReadingAnswer = false;
                }
                continue;
            }
            
            if (line.startsWith('Q: ')) {
                // Save previous card if exists
                if (currentQuestion && currentAnswer) {
                    flashcards.push({
                        question: currentQuestion.trim(),
                        answer: currentAnswer.trim()
                    });
                }
                
                currentQuestion = line.substring(3);
                currentAnswer = '';
                isReadingQuestion = true;
                isReadingAnswer = false;
            } else if (line.startsWith('A: ')) {
                currentAnswer = line.substring(3);
                isReadingQuestion = false;
                isReadingAnswer = true;
            } else {
                // Continue multi-line content
                if (isReadingQuestion) {
                    currentQuestion += ' ' + line;
                } else if (isReadingAnswer) {
                    currentAnswer += ' ' + line;
                }
            }
        }
        
        // Don't forget the last card
        if (currentQuestion && currentAnswer) {
            flashcards.push({
                question: currentQuestion.trim(),
                answer: currentAnswer.trim()
            });
        }
        
        return flashcards;
    }
    
    shuffleFlashcards() {
        for (let i = this.flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.flashcards[i], this.flashcards[j]] = [this.flashcards[j], this.flashcards[i]];
        }
    }
    
    showCurrentCard() {
        if (this.flashcards.length === 0) return;
        
        const currentCard = this.flashcards[this.currentIndex];
        
        if (this.isShowingAnswer) {
            this.cardContent.textContent = currentCard.answer;
            this.cardType.textContent = 'Answer';
            this.cardType.className = 'card-type answer';
            this.flashcard.classList.add('flipped');
        } else {
            this.cardContent.textContent = currentCard.question;
            this.cardType.textContent = 'Question';
            this.cardType.className = 'card-type question';
            this.flashcard.classList.remove('flipped');
        }
        
        this.updateUI();
    }
    
    flipCard() {
        if (this.flashcards.length === 0) return;
        
        this.isShowingAnswer = !this.isShowingAnswer;
        this.showCurrentCard();
    }
    
    nextCard() {
        if (this.flashcards.length === 0) return;
        
        // Mark current card as viewed if showing answer
        if (this.isShowingAnswer) {
            this.viewedCards.add(this.currentIndex);
        }
        
        this.currentIndex = (this.currentIndex + 1) % this.flashcards.length;
        this.isShowingAnswer = false;
        this.showCurrentCard();
        
        // Check if deck is completed
        if (this.viewedCards.size === this.flashcards.length) {
            this.celebrateCompletion();
        }
    }
    
    previousCard() {
        if (this.flashcards.length === 0) return;
        
        this.currentIndex = this.currentIndex === 0 ? this.flashcards.length - 1 : this.currentIndex - 1;
        this.isShowingAnswer = false;
        this.showCurrentCard();
    }
    
    updateUI() {
        const hasCards = this.flashcards.length > 0;
        
        this.prevBtn.disabled = !hasCards;
        this.nextBtn.disabled = !hasCards;
        this.flipBtn.disabled = !hasCards;
        
        if (hasCards) {
            this.cardCounter.textContent = `${this.currentIndex + 1} / ${this.flashcards.length} (${this.viewedCards.size} reviewed)`;
        } else {
            this.cardCounter.textContent = '0 / 0';
        }
        
        this.updateProgress();
    }
    
    updateProgress() {
        if (this.flashcards.length === 0) {
            this.progressFill.style.width = '0%';
            return;
        }
        
        const progress = ((this.currentIndex + 1) / this.flashcards.length) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
    
    showMessage(message) {
        // Create temporary message element
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(messageEl);
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
    
    showError(message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff4757 0%, #ff3838 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(messageEl);
        setTimeout(() => {
            messageEl.remove();
        }, 4000);
    }
    
    createConfetti() {
        const colors = ['#4facfe', '#00f2fe', '#667eea', '#764ba2', '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    celebrateCompletion() {
        this.createConfetti();
        
        const subject = this.subjectInput.value.trim() || 'your studies';
        const celebrationEl = document.createElement('div');
        celebrationEl.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 10px;">🎉</div>
            <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">Congratulations!</div>
            <div style="font-size: 1.1rem;">You've completed the entire deck!</div>
            <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.8;">Great job studying for ${subject}! 📚</div>
        `;
        celebrationEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, #667eea, #764ba2);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: celebrationPop 0.5s ease;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(celebrationEl);
        
        setTimeout(() => {
            celebrationEl.remove();
        }, 4000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes celebrationPop {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlashcardApp();
});