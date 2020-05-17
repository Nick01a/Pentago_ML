import numpy as np


class Board:
    def __init__(self, matrix):
        self.matrix = np.array(matrix)

    def make_move(self, move, player):
        self.addPiece(move["y"], move["x"], player)
        if move["sector"] == 1: self.rotate([0, 0], -1)
        elif move["sector"] == 2: self.rotate([0, 1], -1)
        elif move["sector"] == 3: self.rotate([1, 0], -1)
        elif move["sector"] == 4:self.rotate([1, 1], -1)

    def addPiece(self, x, y, value):
        self.matrix[x, y] = value

    def get(self, x, y):  # return value at a position; needed for player method play piece
        return self.matrix[x, y]

    def get_all_moves(self):
        all_moves = []
        for i in range(len(self.matrix)):
            for j in range(len(self.matrix[i])):
                if self.is_valid(i, j):
                    for s in range(1,5):
                        all_moves.append({"x": j, "y": i, "sector": s})
        return all_moves

    def rotate(self, n, direction):
        x = n[0] * 3
        y = n[1] * 3
        self.matrix[x:x + 3, y:y + 3] = np.rot90(self.matrix[x:x + 3, y:y + 3], direction)


    def is_valid(self, x, y):
        if self.matrix[x, y] == 0:
            return True
        else:
            return False

    def check_solved(self):
        for k in [[0, 0], [0, 5], [5, 0], [5, 5]]:
            a = np.delete(self.matrix, k[0], 0)
            a = np.delete(a, k[1], 1)
            for i in range(1, 3):
                mask = a == i
                if mask.all(0).any() | mask.all(1).any() | np.diag(mask).all() | np.diag(mask[:, ::-1]).all():
                    return True
        return False



