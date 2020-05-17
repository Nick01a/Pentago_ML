package com.game.classes;


public class Move {
    private int x;
    private int y;
    private int sector;
    private int player_id;

    public int getPlayer_id() {
        return player_id;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getSector() {
        return sector;
    }

    public void setPlayer_id(int player_id) {
        this.player_id = player_id;
    }

    public Move(int x, int y, int sector){
        this.x = x;
        this.y = y;
        this.sector = sector;
    }
    @Override
    public String toString() {
        return "{" +
                "\"x\":" + x +
                ", \"y\":" + y +
                ", \"sector\":" + sector +
                '}';
    }
}
