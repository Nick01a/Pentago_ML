package com.game.classes;

import java.util.ArrayList;
import java.util.Arrays;

public class Board {
    private int[][] board = new int[6][6];
    public void initBoard(){
        for (int[] row: this.board)
            Arrays.fill(row, 0);
    }

    public int[][] getBoard() {
        return board;
    }

    public void setBoard(int[][] board) {
        this.board = board;
    }
    private int[][] rotateClockWise() {
        int size = this.board.length;
        int[][] ret = new int[size][size];

        for (int i = 0; i < size; ++i)
            for (int j = 0; j < size; ++j)
                ret[i][j] = this.board[size - j - 1][i]; //***

        return ret;
    }
    public boolean isCurrentPlayerWinner(int id){
        for (int[] row:this.board) {
            if (Arrays.equals(Arrays.copyOfRange(row,0,5), new int[]{id, id, id, id, id}) ||
                    Arrays.equals(Arrays.copyOfRange(row,1,6), new int[]{id, id, id, id, id}))
                return true;
        }
        int[][] rotated_board = rotateClockWise();
        for (int[] row:rotated_board) {
            if (Arrays.equals(Arrays.copyOfRange(row,0,5), new int[]{id, id, id, id, id}) ||
                    Arrays.equals(Arrays.copyOfRange(row,1,6), new int[]{id, id, id, id, id}))
                return true;
        }
        int[] row = new int[6];
        int[] r_row = new int[6];
        for (int i = 0; i < 6; i++) {
            int j = 5-i;
            row[i] = this.board[i][i];
            r_row[i] = this.board[i][j];
        }
        if (Arrays.equals(Arrays.copyOfRange(row,0,5), new int[]{id, id, id, id, id}) ||
                Arrays.equals(Arrays.copyOfRange(row,1,6), new int[]{id, id, id, id, id}))
            return true;
        return Arrays.equals(Arrays.copyOfRange(r_row, 0, 5), new int[]{id, id, id, id, id}) ||
                Arrays.equals(Arrays.copyOfRange(r_row, 1, 6), new int[]{id, id, id, id, id});
    }

    public ArrayList<Move> getPossibleMoves(){
        ArrayList<Move> moves = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 6; j++) {
                if (this.board[i][j] == 0){
                    for (int k = 1; k < 5; k++) {
                        moves.add(new Move(j,i,k));
                    }
                }
            }
        }
        return moves;
    }
    public void applyMove(Move move){
        int[][] tmp = new int[3][3];
        this.board[move.getY()][move.getX()] = move.getPlayer_id();
        switch (move.getSector()){
            case 1:
                for (int i = 0; i < 3; i++) {
                    for (int j = 0; j < 3; j++) {
                        tmp[i][j] = this.board[3 - j - 1][i];
                    }
                }
                for (int i = 0; i < 3; i++) {
                    System.arraycopy(tmp[i], 0, board[i], 0, 3);
                }
                break;
            case 2:
                for (int i = 0; i < 3; i++) {
                    for (int j = 3; j < 6; j++) {
                        tmp[j-3][i] = board[i][6 - j + 2];
                    }
                }
                for (int i = 0; i < 3; i++) {
                    System.arraycopy(tmp[i], 0, board[i], 3, 3);
                }
                break;
            case 3:
                for (int i = 3; i < 6; i++) {
                    for (int j = 0; j < 3; j++) {
                        tmp[j][i-3] = board[6-i+2][j];
                    }
                }
                for (int i = 3; i < 6; i++) {
                    System.arraycopy(tmp[i - 3], 0, board[i], 0, 3);
                }
                break;
            case 4:
                for (int i = 3; i < 6; i++) {
                    for (int j = 3; j < 6; j++) {
                        tmp[i - 3][j - 3] = this.board[6 - j + 2][6-i+2];
                    }
                }
                for (int i = 3; i < 6; i++) {
                    System.arraycopy(tmp[i - 3], 0, board[i], 3, 3);
                }
                break;
        }
    }

}
