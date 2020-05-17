from board import Board
import copy
from random import shuffle

current_move = None
correct_move = None
MAX = 10000
MIN = -10000


def estimation(board, player):
    if player == 1:
        opponent = 2
    else:
        opponent = 1
    return board_cost(board, player) #- board_cost(board, opponent)


def board_cost(board, player):
    if board.check_solved():
        return MAX
    utility = 0
    streak = 0
    # Horizontal
    for i in range(0, 6):
        for j in range(0, 5):
            if board.matrix[i][j] == player and board.matrix[i][j + 1] == player:
                utility += streak + 1
                streak += 1
            else:
                streak = 0
    # Vertical
    for i in range(0, 6):
        for j in range(0, 5):
            if board.matrix[j][i] == player and board.matrix[j + 1][i] == player:
                utility += streak + 1
                streak += 1
            else:
                streak = 0
    # R Diagonal
    for i in range(0, 5):
        if board.matrix[i][i] == player and board.matrix[i + 1][i + 1] == player:
            utility += streak + 1
            streak += 1
        else:
            streak = 0
    # L Diagonal
    for i in range(0, 5):
        if board.matrix[i][5 - i] == player and board.matrix[i + 1][4 - i] == player:
            utility += streak + 1
            streak += 1
        else:
            streak = 0
    return utility


def minmax(depth, field, player, alpha, beta, maximizer, minimizer):
    global correct_move, current_move, MIN, MAX
    DEPTH = 2
    maximum = maximizer
    minimum = minimizer
    if depth == 0:
        if player == 1:
            maximum = 1
            minimum = 2
        else:
            maximum = 2
            minimum = 1
    next_player = minimum if player == maximum else maximum
    if depth >= DEPTH or field.check_solved():
        return estimation(field, player)
    moves = field.get_all_moves()
    if player == maximum:
        best = MIN
        for move in moves:
            if depth == 0:
                current_move = move
            new_board = copy.deepcopy(field)
            new_board.make_move(move, player)
            val = minmax(depth + 1, new_board,
                         next_player, alpha, beta, maximum, minimum)

            best = max(best, val)
            alpha = max(alpha, best)
            if beta <= alpha:
                correct_move = current_move
                break
        return best
    else:
        best = MAX
        for move in moves:
            new_board = copy.deepcopy(field)
            new_board.make_move(move, player)
            val = minmax(depth + 1, new_board,
                         next_player, alpha, beta, maximum, minimum)
            best = min(best, val)
            beta = min(beta, best)
            if beta <= alpha:
                correct_move = current_move
                break
        return best


def pseudo_min_max(board, player):
    values = []
    moves = board.get_all_moves()
    shuffle(moves)
    for move in moves:
        new_board = copy.deepcopy(board)
        new_board.make_move(move, player)
        values.append(estimation(new_board, player))
    return moves[values.index(max(values))]

