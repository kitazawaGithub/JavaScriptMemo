"use strict";
//const formTest1 = document.getElementById("form_test1");
//console.log(formTest1);
//上記でも可能だが、下記の方が簡潔。document.formsは、そのHTMLページ内の全てのform要素を内部の要素を含めて丸ごと取得する
const formTest = document.forms;
console.log(formTest);
//document.formsは、オブジェクトである為.id.name～等とつなげてさらに細かく要素を指定できる。
//formTest1は、取得した全form要素から、idがform_test1かつyourNameという名前がついている要素を指定していることになる。
//formTest2は、form_test2の要素を全取得
const formTest1_name = document.forms.form_test1.yourName;
console.log(formTest1_name);
//formTest1_nameに取得した要素に何か入力されたら処理を行う
formTest1_name.addEventListener("input", () => {
  //Idを指定してdiv要素を丸っと取得
  let yourNameValue = document.getElementById("yourName_value");
  //取得したdiv要素にテキストとして、form_test1のform内のyourName要素に入力された値の長さを取得・数値として表示。
  //lengthを消してvalueだけにすれば入力した文字列が取得・表示される
  yourNameValue.textContent = formTest1_name.value.length;
});

const formTest2 = document.forms.form_test2.form2_input.value;
console.log(formTest2);
//これなんでtrueになるの？
console.log(((2.0 == "2") == new Boolean(true)) == "1");

//全formタグのform_test1と名前がついている要素のpreviewと名前がついた要素を指定し、previewに入れる
const preview = document.forms.form_test1.preview;
//image_uploadと名前がついた要素が変更された時、その変更されたデータを引数として処理を行う。
document.forms.form_test1.image_upload.addEventListener("change", (event) => {
  //F12で配列の中身を見ると、引数のデータ内にtargetがある。その中のsize項目からデータの容量を確認可能
  console.log(event.target.files[0].size);
  //引数データのファイルを配列番号指定してuploadFileに入れる
  const uploadFile = event.target.files[0];

  // FileReaderはファイルを読み込み・表示する処理があるオブジェクト、コンストラクタ。
  const fileReader = new FileReader();
  //ファイルのデータを読み込む。FileReader.readAsDataURL(引数)で引数のファイルが読み込まれる。
  //FileReader部分は、上記のように変数にして、下記のようにつなげる事で利用可能
  fileReader.readAsDataURL(uploadFile);

  //処理が読み込まれたら処理開始
  fileReader.addEventListener("load", () => {
    //FileReaderで読み込まれたデータを、Base64形式に変換したアドレスでpreviewと名前が付いた要素のsrcに入れる
    //.resultに、Base64に変換されたアドレスが格納されているので、それをpreview.srcに入れている。
    //HTML側のpreviewと名前が付いた要素のsrcにアドレスが入り、結果画像が表示される。
    preview.src = fileReader.result;
    console.log(preview.src);
  });
});

//バリデーションは、const 変数 = obj1.match(str)としてstrを正規表現のデータにすることで、判別可能
//正規表現とobj1がマッチしていたら、obj1の内容が返される。
//アンマッチであれば、nullになる
