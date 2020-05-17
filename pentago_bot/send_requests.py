import urllib.request
import json
import requests
from minimax import minmax, MAX, MIN, pseudo_min_max
from board import Board


def get_board():
    with urllib.request.urlopen("http://localhost:8080/get_board") as url:
        data = json.loads(url.read().decode())
        return data


def make_move():
    return pseudo_min_max(Board(get_board()["board"]), 1)


def send_move(move):
    from minimax import correct_move
    move['player_id'] = 1
    url = 'http://localhost:8080/set_move'
    r = requests.post(url, verify=False, json=move)
    return r.status_code


if __name__ == "__main__":
    while(True):
        try:
            input()
            move = make_move()
            send_move(move)
            print("Bot made a move: ", move)
        except:
            print("End game")

