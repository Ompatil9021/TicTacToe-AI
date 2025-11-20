⭕❌ Unbeatable Tic-Tac-Toe AI

A web-based Tic-Tac-Toe game featuring an unbeatable AI opponent. The AI is powered by the Minimax algorithm optimized with Alpha-Beta Pruning, ensuring it never loses a match.

📸 Preview

<!-- INSTRUCTION: Take a screenshot of your game, name it 'preview.png', create a folder named 'screenshots' in your repo, and place the image there. -->

A clean, responsive interface where Humans fight the Machine.

🚀 Features

Unbeatable AI: You can tie, but you cannot win.

Minimax Algorithm: The AI calculates every possible future move to determine the optimal strategy.

Alpha-Beta Pruning: Optimized decision-making speed by eliminating irrelevant branches in the search tree.

Flask Backend: Robust Python server handling game logic.

REST API: The frontend communicates with the AI via JSON endpoints.

🛠️ Tech Stack

Backend: Python, Flask

Frontend: HTML, CSS, JavaScript (Fetch API)

Algorithm: Minimax with Alpha-Beta Pruning

🧠 How It Works

1. The Minimax Algorithm

The AI looks ahead at all possible moves. It assigns a score to the board state:

+10: AI Wins

-10: Human Wins

0: Draw

It recursively maximizes its own score while assuming the human player will try to minimize the AI's score.

2. Alpha-Beta Pruning

To make the AI faster, we use Alpha-Beta pruning. Instead of evaluating every single leaf node in the game tree, the algorithm stops evaluating a move as soon as it finds at least one possibility that proves the move is worse than a previously examined move. This significantly reduces computation time.

💻 Installation & Setup

Follow these steps to run the project locally.

Prerequisites

Python 3.x installed

Git installed

Steps

Clone the repository

git clone [https://github.com/Ompatil9021/TicTacToe-AI.git](https://github.com/Ompatil9021/TicTacToe-AI.git)
cd TicTacToe-AI


Create a virtual environment (Optional but Recommended)

python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate


Install Dependencies

pip install flask


Run the Application

python app.py


Play the Game
Open your web browser and navigate to:
http://127.0.0.1:5000

📂 Project Structure

TicTacToe-AI/
├── static/             # CSS and JS files
├── templates/
│   └── index.html      # Main game interface
├── app.py              # Flask server & Minimax Logic
└── README.md           # Project documentation


🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License

Distributed under the MIT License. See LICENSE for more information.

Author

Om Patil

GitHub: @Ompatil9021
