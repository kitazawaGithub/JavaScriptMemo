"use strict";

//const err = new Error();
//err.message = "エラーですよ";

function test1() {
  return "kekka1";
}

console.log(test1());

//Promiseの返却値は以下
//1. 状態（ok/ng)と値
//2. Promiseチェーン
//callback関数をPromiseの中に記載する
//引数は okかng(二つ一緒でも可能　ok , ng　と記載)
function promiseTest1() {
  //インプット無しバージョンのPPromise
  //Promiseの場合はPromiseを返すことで、Promiseチェーンが出来る
  return new Promise((ok) => {
    ok("PromiseOK!");
  });
}

console.log(promiseTest1());

//オブジェクトにぶっこむことも出来る
const promiseTest2 = new Promise((ok) => {
  ok("PromiseOK2!!!");
});

console.log(promiseTest2);

//引数を入れてPromiseを発火させることも可能
function testPromise3(input) {
  return new Promise((ok) => {
    //inputが引数で、``はテンプレートリテラルとする為の括り
    //プレースホルダーで使用するのに必要なので、覚えておこう
    ok(`${input}です`);
  });
}

console.log(testPromise3("ゴミ"));
