//JavaScriptTutorial.jsを読み込んでいる画面から、下記idの要素を取得して変数へ代入
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
//ローカルストレージからキーをtodosとした値をJSON形式に変換して取得
const todos = JSON.parse(localStorage.getItem("todos"));
//todosにデータが存在していた場合、変数todoに代入して関数addへ渡す
if (todos.length > 0) {
  todos.forEach((todo) => {
    add(todo);
  });
}

//画面上でsubmit時にinputに入力した値を画面に表示する
form.addEventListener("submit", function (event) {
  //submit後に起きた処理を途中で止める為の記述、eventは画面上で起きた処理を代入されている
  event.preventDefault();
  //関数addを呼び出し
  add();
});

//ulを親とした子要素としてliを挿入する
function add(todo) {
  //inputに入力されている値を取得し、変数todoTextへ代入
  let todoText = input.value;

  //引数todoにデータが存在する場合、todoTextにオブジェクトtodoのtextの値を代入する
  if (todo) {
    //
    todoText = todo.text;
  }

  //todooTextが0文字以上なら処理を行う
  if (todoText.length > 0) {
    //liタグを生成し、変数liへ代入
    const li = document.createElement("li");
    //todoTextの値を取得
    li.innerText = todoText;
    //生成されるliタグにclassを設定
    li.classList.add("list-group-item");

    //todoにデータがあり、かつ打ち消し線もtrueの場合、打ち消し線を付ける
    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    //liの上で右クリックをすると、当該liを一行削除する
    li.addEventListener("contextmenu", function (event) {
      //右クリックでメニュー（切り取り・コピー等が出来るアレ）が表示されてしまうので、その処理を停止
      event.preventDefault();
      //右クリックされたliを一行削除
      li.remove();
      //関数saveDataを呼び出し、ローカルストレージに現在の状態を保存する
      saveData();
    });
    //liの上で左クリックをすると、当該liの値に打ち消し線を書き込む・もう一度押すと打ち消し線を消す
    li.addEventListener("click", function () {
      li.classList.toggle("text-decoration-line-through");
      //現在の状態を保存
      saveData();
    });
    //ulの子要素としてliの挿入
    ul.appendChild(li);
    //inputは念のため空にしておく
    input.value = "";
    //関数saveDataを呼び出し
    saveData();
  }
}

//子要素として追加したliの値をローカルストレージに保存する
function saveData() {
  //全てのli要素内の値を取得
  const lists = document.querySelectorAll("li");
  //配列todosの宣言
  let todos = [];

  //listsが取得した値と状態をすべて、配列todosに代入する
  lists.forEach((list) => {
    let todo = {
      //取得したtextの値の保持
      text: list.innerText,
      //打ち消し線が入っていたら、その情報も保持
      completed: list.classList.contains("text-decoration-line-through"),
    };
    //オブジェクトtodoを配列todosに代入
    todos.push(todo);
  });
  //ローカルストレージにキーを文字todosとし、文字形式に変換した配列todosの値を保持する
  localStorage.setItem("todos", JSON.stringify(todos));
}
