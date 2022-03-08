//スコープが厳格になり、関数内でグローバル変数を作ることができなくなるので潜在的エラーが少なくなる
//必ずつけるべきもの
"use strict";

//連想配列のインスタンスを作成
const map = new Map();

//インスタンスに値をセット
map.set("id", 1);
map.set("name", "北澤");

//インスタンスを呼び出し、中身を表示
console.log(map);

//インスタンスのidキーに格納されている値を表示
console.log(map.get("id"));

//インスタンスに格納されている値をmapListへ代入
const mapList = map.values();
//mapListからvalueへ値を取り出し、コンソールへ表示
for (const value of mapList) {
  console.log(value);
}

//配列の作成
const fruits = new Array();
fruits[0] = ["りんご"];
console.log(fruits);

//配列に2つ値を追加
fruits.push("みかん", "ゆず");
console.log(fruits);

//コールバック関数、コールバック関数とは、ある関数を呼び出す時に、引数に指定する別の関数のこと
fruits.forEach(function (input) {
  console.log(input);
});

//アロー関数について
//関数名前有り functionで作成するものの省略化、意味は同じになる
//引数が1個なら間の（ ）は不要、0個は省略不可能
//処理が1行なら｛　｝も不要、returnも不要
const getItems = () => {
  console.log("arrow");
};
getItems();
//関数名前なし、31行目からのコールバック関数も引数1個　処理1行ならこうなる
fruits.forEach((input) => console.log(input));

//Allay.filter　配列から要素を指定してフィルターをかける
// === は同値比較
const scores = [10, 20, 30];
const newScores = scores.filter((value) => value === 30);
console.log(newScores);

//Array.find 配列から値を検索する
const members = ["北澤", "福家", "東條"];
const member = members.find((value) => value === "北澤");
console.log(member);

//Array.map 配列を元に新しい配列を作る
//テンプレート文字列　`${}`⇐これに入れた値と文字をくっつける事が出来るようになる
// バッククォート``は＠キーをSHIFT押しつつ押すと出る
const userList = [10, 20, 30, 40, 50];
const user = userList.map((value) => {
  return `user_${value}`;
});
console.log(user);

//オブジェクト Object.何某（引数）等で使用出来る、
//const test = new Object();
const test = {
  test1: 10,
  test2: 20,
  test3: 30,
};
console.log(Object.values(test));

for (const testValue of Object.values(test)) {
  console.log(testValue);
}

//組み込み関数　正規表現等は無し
//関数名は基本的に　動詞＋名詞で書くのが好ましい
const postalCode = "123-45678";

//オブジェクトにメソッドや値を組み込む
//関数を代入する場合、functionと書かずとも下記のような形で関数を作成可能
const posting = {
  //オブジェクト内で使用する値やメソッドが複数ある場合は、カンマ（,）で区切ることで複数仕込める
  postalCode: "380-0907",

  checkPostalCode() {
    //this.と付ける事で、この関数内のpostalCodeを使用すると指定できる。
    const replaced = this.postalCode.replace("-", "").length;
    //const length = replaced.length;

    //postNumberの長さが7だったらtrueを返す、処理終了
    if (replaced === 7) {
      console.log("7文字です");
      return true;
    }
    return false;
  },
};
//関数を組み込んだ変数.変数内で使用する関数名()で、変数内の特定の関数を呼び出し可能
console.log(posting.checkPostalCode());

//.の後にメソッドを追加する事で、メソッドを繋げて使用できる
//return thisで、複数のメソッドを使用可能
//return thisのthisはこのオブジェクト自体に戻るという意味になる
const person = {
  name: "ktzw3",
  age: "36",
  getName() {
    console.log(this.name);
    return this;
  },
  getAge() {
    console.log(this.age);
    return this;
  },
};
//変数名.関数.関数・・・とつなげる事でreturn thisされている分だけ関数を取得できる。
person.getName().getAge();

//対象HTMLのidの要素を取得して出力
//クォーテーションで囲むのを忘れずに
//classListは、CSSを参照する
//今回は、該当idが付けられたdiv要素の中身をまるっと取得して表示する
const getterElement = document.getElementById("testElement");
getterElement.classList.add("red");
console.log(getterElement);

//対象HTMLの要素を取得、#ならID　.ならClass要素を取得
//querySelectorは最初の一つ目の要素しか取得しない
//タグ内のすべての要素を取得したい場合は、querySelectorAllを使うquerySelectorAllはNodeListとして返却する
const getterClassElement = document.querySelector(".testElement_list");
const getterQueryAll = document.querySelectorAll(".testElement_list");
console.log(getterClassElement);
console.log(getterQueryAll);

//appendChildで要素を追加する。
//appendChildは、指定した階層の一番最後に追加される。
//特定の場所に追加したい場合は、querySelectorで追加したい場所の要素を指定し
//insertBeforeでその要素の前に追加
const createDiv = document.createElement("div");
const reference = document.querySelector(".testElement_list");
createDiv.id = "test";
createDiv.className = "test2";
createDiv.classList.add("red");
createDiv.textContent = "test";
//getterElement.parentNode.appendChild(createDiv); parentNodeで親要素を指定してその親と同じ階層にappend
//親Nodeの子として追加するので、親要素以下にする事
//insertBefore(追加する要素, 追加したい場所)で指定
getterElement.insertBefore(createDiv, reference);

//イベントの設定　イベントハンドラー
//要素にid等を設定して、そのidを指定することで要素を取得、onclickでクリックしたときに関数の中のイベントを起こす
//これは、onclickで指定しているが、同じHTML内でonclickは1つしか設定できず
//複数設定した場合、一番最後に設定されたonclickのみが動くことになる為、非推奨
//document.getElementById("onclickEvent").onclick = function () {
//  console.log("押された！");
//};

//イベント設定　イベントリスナー
//こちらは上記と違って複数設定可能 こちらが推奨
//EventListenerの場合は、onclickではなくclick
//他にも種類があるので、公式リファレンス参照
const eventListener = document.getElementById("onclickEvent");
eventListener.addEventListener("click", (e) => {
  //e は　click時のイベントの詳細情報を取得している
  console.log(e);
  //バブリングによる、不必要な処理の伝播をさせない為に必要
  e.stopPropagation();

  console.log("押された！");
});

//modal windowについては、Notionにて記載
