function Changer(x, y, sector, player_id = 2) {
    this.x = x;
    this.y = y;
    this.sector = sector;
    this.player_id = player_id;
}
document.getElementById('arrowUp1').addEventListener('click', function () {
    arrChanger[0].sector = 1;
    sendServer(arrChanger[0]);
})
document.getElementById('arrowUp2').addEventListener('click', function () {
    arrChanger[0].sector = 2;
    sendServer(arrChanger[0]);
})
document.getElementById('arrowDown3').addEventListener('click', function () {
    arrChanger[0].sector = 3;
    sendServer(arrChanger[0]);
})
document.getElementById('arrowDown4').addEventListener('click', function () {
    arrChanger[0].sector = 4;
    sendServer(arrChanger[0]);
});

// отримуємо з сервера
let Http = new XMLHttpRequest();
Http.open("GET", 'http://192.168.0.105:8080/get_board');
Http.onload = function () {
    var obj = JSON.parse(this.response);
    if (Http.status == 200 && Http.readyState == 4) {
        buildBoard(obj.board);
    }
    else {
        console.log("no");
    }
}
Http.send();

// відправляємо на сервер
function sendServer(obj) {
    var json = JSON.stringify(obj);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://192.168.0.105:8080/set_move')
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
}


//  переробляється дошка, отримана з сервера 
var all_matrix = [];
var new_matrix_sec_1 = [];
var new_matrix_sec_2 = [];
var new_matrix_sec_3 = [];
var new_matrix_sec_4 = [];
function buildBoard(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            all_matrix.push(matrix[i][j]);
        }
    }
    var y0 = [];
    var y1 = [];
    var y2 = [];
    var y3 = [];
    var y4 = [];
    var y5 = [];
    y0.push(all_matrix.slice(0, 6));
    y1.push(all_matrix.slice(6, 12));
    y2.push(all_matrix.slice(12, 18));
    y3.push(all_matrix.slice(18, 24));
    y4.push(all_matrix.slice(24, 30));
    y5.push(all_matrix.slice(30, 36));
    console.log("y", y0[0]);


    new_matrix_sec_1[0] = y0[0][0];
    new_matrix_sec_1[1] = y0[0][1];
    new_matrix_sec_1[2] = y0[0][2];
    new_matrix_sec_3[0] = y0[0][3];
    new_matrix_sec_3[1] = y0[0][4];
    new_matrix_sec_3[2] = y0[0][5];

    new_matrix_sec_1[3] = y1[0][0];
    new_matrix_sec_1[4] = y1[0][1];
    new_matrix_sec_1[5] = y1[0][2];
    new_matrix_sec_3[3] = y1[0][3];
    new_matrix_sec_3[4] = y1[0][4];
    new_matrix_sec_3[5] = y1[0][5];

    new_matrix_sec_1[6] = y2[0][0];
    new_matrix_sec_1[7] = y2[0][1];
    new_matrix_sec_1[8] = y2[0][2];
    new_matrix_sec_3[6] = y2[0][3];
    new_matrix_sec_3[7] = y2[0][4];
    new_matrix_sec_3[8] = y2[0][5];

    new_matrix_sec_2[0] = y3[0][0];
    new_matrix_sec_2[1] = y3[0][1];
    new_matrix_sec_2[2] = y3[0][2];
    new_matrix_sec_4[0] = y3[0][3];
    new_matrix_sec_4[1] = y3[0][4];
    new_matrix_sec_4[2] = y3[0][5];

    new_matrix_sec_2[3] = y4[0][0];
    new_matrix_sec_2[4] = y4[0][1];
    new_matrix_sec_2[5] = y4[0][2];
    new_matrix_sec_4[3] = y4[0][3];
    new_matrix_sec_4[4] = y4[0][4];
    new_matrix_sec_4[5] = y4[0][5];

    new_matrix_sec_2[6] = y5[0][0];
    new_matrix_sec_2[7] = y5[0][1];
    new_matrix_sec_2[8] = y5[0][2];
    new_matrix_sec_4[6] = y5[0][3];
    new_matrix_sec_4[7] = y5[0][4];
    new_matrix_sec_4[8] = y5[0][5];

    console.log(new_matrix_sec_2);

    var arrId = ['quad1', 'quad2', 'quad3', 'quad4'];
    var arrNewMatrix = [new_matrix_sec_1, new_matrix_sec_2, new_matrix_sec_3, new_matrix_sec_4];
    for (let id in arrId) {
        builder(arrId[id], arrNewMatrix[id]);

    }
    function builder(id, sector) {
        for (let i = 0; i < sector.length; i++) {
            if (sector[i] == 2) {
                document.getElementById(`${id}`).children[i].classList.remove('bgcGreen');
                document.getElementById(`${id}`).children[i].classList.add('bgcWhite');
            }
            else if (sector[i] == 1) {
                document.getElementById(`${id}`).children[i].classList.remove('bgcGreen');
                document.getElementById(`${id}`).children[i].classList.add('bgcBlack');
            }
        }
    }
}


var x;
var y;
var sector = 0;
var circleList = document.getElementsByClassName("circle");
var arrChanger = [];
for (let i = 0; i < circleList.length; i++) {
    circleList[i].addEventListener('click', function () {
        this.classList.remove('bgcGreen');
        this.classList.add('bgcWhite');
        if (i >= 0 && i < 3) { x = 0; y = i };
        if (i >= 3 && i < 6) { x = 1; y = i % 3 };
        if (i >= 6 && i < 9) { x = 2; y = i % 6 };
        if (i >= 9 && i < 12) { x = 3; y = i % 3 };
        if (i >= 12 && i < 15) { x = 4; y = i % 3 };
        if (i >= 15 && i < 18) { x = 5; y = i % 3 };

        if (i >= 18 && i < 21) { x = 0; y = Math.floor(i / 6) + i % 9 };
        if (i >= 21 && i < 24) { x = 1; y = Math.floor(i / 7) + i % 7 };
        if (i >= 24 && i < 27) { x = 2; y = Math.floor(i / 8) + i % 8 };

        if (i >= 27 && i < 30) { x = 3; y = Math.floor(i / 9) + i % 9 };
        if (i >= 30 && i < 33) { x = 4; y = Math.floor(i / 10) + i % 10 };
        if (i >= 33 && i < 36) { x = 5; y = Math.floor(i / 11) + i % 11 };
        let newX = x;
        let newY = y;
        let newChanger = new Changer(newY, newX);
        arrChanger.unshift(newChanger);
    })

}










































