# 🎯 Flashcard Study App

A sleek, dark-themed flashcard application perfect for studying SAT vocabulary, foreign languages, or any subject that benefits from active recall. Features a modern interface with smooth animations, progress tracking, and celebratory confetti when you complete a deck!


## ✨ Features

- **🌙 Dark Theme**: Easy on the eyes during long study sessions
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🎲 Random Order**: Cards are shuffled for optimal learning
- **📊 Progress Tracking**: See how many cards you've reviewed
- **⌨️ Keyboard Navigation**: Use arrow keys and spacebar for quick navigation
- **🎉 Celebration**: Confetti animation when you complete a deck
- **📚 Custom Subjects**: Personalize the celebration message for any subject
- **💾 Simple File Format**: Easy-to-edit text files for your flashcards

## 🚀 Quick Start

1. **Download the files** to your computer
2. **Unzip** all the files (Important!)
3. **Open `index.html`** in any modern web browser
4. **Enter your subject** (e.g., "SAT", "Spanish", "Biology") in the input field
5. **Click "Load Flashcards"** and select your flashcard file
6. **Start studying!** Use the buttons or keyboard to navigate

## 📝 Creating Flashcards

Create a text file (`.txt`) with your flashcards using this simple format:

```
# Flashcard Format Instructions
# Each flashcard must follow this exact format:
# Q: [Your question here]
# A: [Your answer here]
# 
# Rules:
# - Each question must start with "Q: " (capital Q, colon, space)
# - Each answer must start with "A: " (capital A, colon, space)
# - Leave a blank line between each flashcard pair
# - Questions and answers can span multiple lines if needed
# - Comments start with # and are ignored by the app

Q: What does "ubiquitous" mean?
A: Present, appearing, or found everywhere; omnipresent

Q: What is the definition of "sagacious"?
A: Having or showing keen mental discernment and good judgment; wise

Q: What does "ameliorate" mean?
A: To make something better; improve
```

### 💡 Tips for Creating Great Flashcards

- **Keep questions concise** - Clear, specific questions work best
- **Use your own words** - Rephrase definitions to help retention
- **Add context** - Include example sentences when helpful
- **Break down complex topics** - One concept per card
- **Use the sample file** - Start with `flashcards.txt` as a template

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` Left Arrow | Previous card |
| `→` Right Arrow | Next card |
| `Space` or `Enter` | Flip card |

## 🎮 How to Use

1. **Load your flashcards** - Click "Load Flashcards" and select your `.txt` file
2. **Review the question** - Read the question side carefully
3. **Think of the answer** - Try to recall the answer before flipping
4. **Flip the card** - Click the card, press Space, or use the Flip button
5. **Check your answer** - Compare with the correct answer
6. **Move to next card** - Use the Next button or right arrow key
7. **Track progress** - Watch your progress bar fill up as you review cards
8. **Celebrate completion** - Enjoy the confetti when you finish the deck! 🎉

## 📁 File Structure

```
flashcard-app/
├── index.html          # Main application file
├── styles.css          # Styling and dark theme
├── script.js           # Application logic and functionality
├── flashcards.txt      # Sample flashcard file (SAT vocabulary)
└── README.md           # This file
```

## 🛠️ Technical Details

- **No installation required** - Just open `index.html` in a browser
- **Pure HTML/CSS/JavaScript** - No frameworks or dependencies
- **Local file processing** - Your flashcard files stay on your device
- **Modern browser support** - Works in Chrome, Firefox, Safari, Edge

## 🎯 Perfect For

- **SAT/ACT Prep** - Vocabulary and concept review
- **Language Learning** - Vocabulary, phrases, grammar rules
- **Medical/Science Studies** - Terminology and definitions
- **History** - Dates, events, and key figures
- **Any subject** requiring memorization and recall

## 🤝 Sharing with Friends

To share this app with friends:

1. **Send them the entire folder** containing all files
2. **Tell them to open `index.html`** in their browser
3. **Share the flashcard format** so they can create their own cards
4. **Include sample files** to help them get started

## 🔧 Customization

Want to modify the app? Here are some easy customizations:

- **Colors**: Edit the CSS gradients in `styles.css`
- **Animations**: Adjust timing and effects in the CSS
- **Celebration message**: Modify the `celebrateCompletion()` function
- **Card layout**: Update the HTML structure and corresponding CSS

## 📄 License

This project is open source and available under the Apache 2.0 License. Feel free to use, modify, and share!

## 🐛 Issues or Questions?

If you encounter any problems or have suggestions for improvement, feel free to create an issue or reach out!

---

**Happy studying! 📚✨**

> *Remember: The key to effective flashcard studying is active recall. Always try to answer the question before flipping the card!*
>  
> Note: This is an experiment with Claude Code. Nearly here was written by Claude, a Large Language Model developed by Anthropic. You can find more about Claude here at https://www.anthropic.com/claude
