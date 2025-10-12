from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# --- Game Logic Functions ---

def check_winner(board):
    # Rows
    for row in board:
        if row[0] == row[1] == row[2] and row[0] != "":
            return row[0]
    # Columns
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] != "":
            return board[0][col]
    # Diagonals
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] != "":
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] != "":
        return board[0][2]
    return None

def is_full(board):
    return all(cell != "" for row in board for cell in row)

def minimax(board, depth, is_maximizing, alpha, beta):
    winner = check_winner(board)
    if winner == "O": return 10 - depth
    elif winner == "X": return depth - 10
    elif is_full(board): return 0

    if is_maximizing:
        best = -1000
        for i in range(3):
            for j in range(3):
                if board[i][j] == "":
                    board[i][j] = "O"
                    val = minimax(board, depth + 1, False, alpha, beta)
                    board[i][j] = ""
                    best = max(best, val)
                    alpha = max(alpha, best)
                    if beta <= alpha:
                        break
        return best
    else:
        best = 1000
        for i in range(3):
            for j in range(3):
                if board[i][j] == "":
                    board[i][j] = "X"
                    val = minimax(board, depth + 1, True, alpha, beta)
                    board[i][j] = ""
                    best = min(best, val)
                    beta = min(beta, best)
                    if beta <= alpha:
                        break
        return best

def best_move(board):
    best_val = -1000
    move = (-1, -1)
    for i in range(3):
        for j in range(3):
            if board[i][j] == "":
                board[i][j] = "O"
                move_val = minimax(board, 0, False, -1000, 1000)
                board[i][j] = ""
                if move_val > best_val:
                    best_val = move_val
                    move = (i, j)
    return move

# --- Flask Routes ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    board = data['board']
    move = best_move(board)
    return jsonify({"row": move[0], "col": move[1]})

if __name__ == '__main__':
    app.run(debug=True)
