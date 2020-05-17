package com.game;

import com.game.classes.Board;
import com.game.classes.Move;
import com.game.classes.MoveDTO;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Random;

@CrossOrigin
@RestController
public class MainController {
    private Board board = new Board();
    @GetMapping("/get_board")
    public ResponseEntity createBoard() throws ParseException {
        String json = "{ \"board\":" +
                Arrays.deepToString(board.getBoard()) +
                "," +
                "\"moves\":" +
                board.getPossibleMoves().toString() +
                "}";
        JSONParser parser = new JSONParser(json);
        return ResponseEntity.ok(parser.parse());
    }

    @PostMapping("/set_move")
    public ResponseEntity setBoard(@RequestBody MoveDTO move) {
        Move m = new Move(move.getX(),move.getY(),move.getSector());
        m.setPlayer_id(move.getPlayer_id());
        board.applyMove(m);
        if (board.isCurrentPlayerWinner(m.getPlayer_id())){
            move.setPlayer_id(0);
        }
        return ResponseEntity.ok(move);
    }

    @GetMapping("/reset_board")
    public ResponseEntity refresh() throws ParseException {
        board = new Board();
        String json = "{ \"board\":" +
                Arrays.deepToString(board.getBoard()) +
                "," +
                "\"moves\":" +
                board.getPossibleMoves().toString() +
                "}";
        JSONParser parser = new JSONParser(json);
        return ResponseEntity.ok(parser.parse());
    }
}
