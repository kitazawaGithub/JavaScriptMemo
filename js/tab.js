"use strict";

const tabLabels = document.querySelectorAll(".tab__label li a");
console.log(tabLabels);
const tabContents = document.querySelectorAll(".tab__content");
console.log(tabContents);

//tabLabelsでtab__labelクラスのli a要素を取得
//clickedLabelに取得した要素を投入し、addEventListenerでクリックされた要素に対して以降の処理を行う
tabLabels.forEach(function (clickedLabel) {
  clickedLabel.addEventListener("click", function (e) {
    e.preventDefault(); //aタグのリンク遷移を消す
    //一度取得した要素全てからactiveのclassを外す
    tabLabels.forEach(function (label) {
      label.classList.remove("active");
    });
    //クリックした要素にactiveのclassを付与
    clickedLabel.classList.add("active");
    //コンテンツの方からもactiveを削除
    tabContents.forEach(function (content) {
      content.classList.remove("active");
    });
    //今回はdata-typeであるため、dataset.typeとなっているが、data-typeのtype部分が別の文字であっても設定可能である
    //例えば、data-type等とした場合は、dataset.typeになる。dataset = data-　と覚えておこう
    //getElementByIdで、クリックされたdata-typeの要素と同じ名前のid要素を指定し、activeのclassを付与している
    document.getElementById(clickedLabel.dataset.type).classList.add("active");
    console.log(clickedLabel.dataset.type);
  });
});
