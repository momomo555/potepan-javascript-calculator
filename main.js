//数式計算処理
function calculate(button) {

  //電卓の入出力表示箇所のHTML要素を取得
  let result = document.getElementById("result");
  //押されたボタン要素のテキストを取得
  let buttonInner = button.innerHTML;
  //演算子配列
  let operatorArray = ["+","-","*","/"];

  //電卓の表示がNaN、Infinity、-Infinityのとき(0で割ったときにとる値のとき)
  if(["NaN","Infinity","-Infinity"].includes(result.innerHTML)) {
    //0で表示をクリアする(後ろに次の文字が続かないようにする)
    result.innerHTML = "0"
  }

  //ACが押されたとき
  if (buttonInner == "AC") {

    //0で表示をクリアする
    result.innerHTML = "0";

  }

  //=が押されたとき
  else if (buttonInner == "=") {

    //式を計算する
    let total = eval(result.innerHTML);
    //小数点第6位を四捨五入して第５位まで表示
    let decimalPlace = 100000
    result.innerHTML = Math.round(total * decimalPlace) / decimalPlace;
    //計算結果が小数のとき
    if (result.innerHTML.includes(".")) {
      //小数点ボタンを非活性化
      disblePoint();
    }
    //計算結果が整数のとき
    else {
      //小数点ボタンを活性化
      enablePoint();
    }

  }

  //ACと=以外が押されたとき
  else {

    //電卓の表示が0のとき
    if (result.innerHTML == "0") {
      //00が押されたとき
      if (buttonInner == "00") {
        //何もしない(0表示のまま)
      }
      //四則演算子もしくは小数点が押されたとき
      else if (operatorArray.includes(buttonInner) || buttonInner == ".") {
        //0の後に文字を追加
        result.innerHTML += buttonInner;
      }
      //00、四則演算子、小数点以外が押されたとき(0-9が押されたとき)
      else {
        //押されたボタンの文字で書き換え
        result.innerHTML = buttonInner;
      }

    }

    //電卓の表示が0でないとき
    else {

      //末尾の文字を取得
      let finalChara = result.innerHTML.slice(-1);
      //末尾が四則演算子のとき
      if (operatorArray.includes(finalChara)) {

        //00が押されたとき
        if (buttonInner == "00") {
          //0を末尾に追加
          result.innerHTML += "0";
        }
        //四則演算子が押されたとき
        else if (operatorArray.includes(buttonInner)) {
          //末尾の文字を新たな四則演算子に置換
          result.innerHTML = result.innerHTML.replace(/.$/, buttonInner);
        }
        //小数点が押されたとき
        else if (buttonInner == ".") {
          //小数点の前に0を挿入して末尾に追加
          result.innerHTML += "0" + buttonInner;
        }
        //00、四則演算子、小数点以外が押されたとき(0-9が押されたとき)
        else {
          //押された文字を末尾に追加
          result.innerHTML += buttonInner;
        }

      }

      //末尾が小数点の時
      else if (finalChara == ".") {

        //小数点が押されたとき
        if (buttonInner == ".") {
          //何もしない(小数点の連続入力不可)
        }
        //四則演算子が押されたとき
        else if (operatorArray.includes(buttonInner)) {
          //四則演算子の前に0を挿入(小数点以下を0に設定)
          result.innerHTML += "0" + buttonInner;
        }
        //小数点、四則演算子以外が押されたとき(00、0-9が押されたとき)
        else {
          //押された文字を末尾に追加
          result.innerHTML += buttonInner;
        }

      }

      //末尾が0のとき
      else if (finalChara == "0") {

        //一つ前の文字が四則演算子のとき
        if (operatorArray.includes(result.innerHTML.slice(-2, -1))) {
          //数字が押されたとき
          if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(buttonInner)) {
            //末尾の文字を押された数字で置換
            result.innerHTML = result.innerHTML.replace(/.$/, buttonInner);
          }
          //00が押されたとき
          else if (buttonInner == "00") {
            //何もしない(末尾が0表示のまま)
          }
          //数字、00以外が押された時(四則演算子、小数点が押されたとき)
          else {
            //押された文字を末尾に追加
            result.innerHTML += buttonInner;
          }
        }
        //一つ前の文字が四則演算子以外のとき(小数点、0-9のとき)
        else {
          //押された文字を末尾に追加
          result.innerHTML += buttonInner;
        }

      }

      //末尾が四則演算子、小数点、0以外のとき(1-9のとき)
      else {
        //押された文字を末尾に追加
        result.innerHTML += buttonInner;
      }

    }
  }
}

//小数点ボタンを非活性化
function disblePoint() {
  document.getElementById("point").disabled = true;
}

//小数点ボタンを活性化
function enablePoint() {
  document.getElementById("point").disabled = false;
}
