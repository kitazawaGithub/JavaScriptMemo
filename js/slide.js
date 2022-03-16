"use strict";

const images = ["../images/neko.jpg", "../images/イッヌ.jpg", "../images/勉強しろ.jpg"];

let currentIndex = 0;
//該当idの要素を取得
const mainImage = document.getElementById("carousel__main");

//コンテンツがロードされたら処理を行う
document.addEventListener("DOMContentLoaded", () => {
  //setIntervalは、最後に着けた秒数（今回は2秒）毎に記載した処理を繰り返し実行する関数
  setInterval(() => {
    //Math.floorは、小数点以下切り捨て　Math.ceilは切り上げ　Math.roundは四捨五入
    //Math.random()の初期値は1な為、lengthをかければ配列番号の最大値が設定できる。
    let target = Math.floor(Math.random() * images.length);

    //2秒毎にcarousel__thumbnailsクラスの子要素li[配列番号]をクリックした時と同じイベント処理を行う
    document.querySelectorAll(".carousel__thumbnails > li")[target].click();
    console.log(currentIndex);
    currentIndex = target;
  }, 2000);
});

//即時関数　functionを()で囲み、最後に();をつけると、ページが読み込まれた際に即座に実行される関数となる。
//(function())内はスコープになる
(function immediate() {
  console.log("即時関数です");
})();

//配列imagesのn番目の値を取得し、上記で取得した要素に画像のアドレスを付加する
//.srcと付けることで、画像のアドレスを取得
//mainImage.src = images[currentIndex];

//.srcを付けると、画像のアドレスが取得される　付けなければ、該当Idの要素が取得される
//console.log(mainImage.src);

//配列の番号(index)と画像のアドレス(image)を取得
//.entries()は配列内の要素のキーと値のペアを取得してくれる
for (let [index, image] of images.entries()) {
  console.log(index, image);
  //img要素を作成
  //imgに取得した画像のアドレスを代入
  const img = document.createElement("img");
  img.src = image;
  //li要素を作成
  const li = document.createElement("li");
  //取得した要素のキーが現在の値と同じであれば、li要素にcurrentクラスを付与する
  if (index === currentIndex) {
    li.classList.add("current");
  }
  //li要素がクリックされた場合クリックされた画像にactiveクラスを付与する、onclickと同じイベント
  //li要素に、clickされた時に行う動作を追加（EventListenerをaddしているという考え方、イベント動作をli要素に格納・付与している）
  li.addEventListener("click", () => {
    mainImage.src = image;
    mainImage.classList.add("active");
    //0.8秒経過でactiveクラスを削除する
    setTimeout(() => {
      mainImage.classList.remove("active");
    }, 800);
    //carousel__thumbnailsクラスの子要素のli要素を取得　>　で繋げることで、そのクラス or IDの子要素の～という意味になる。
    //更に　>　で繋げる事で孫要素　曾孫要素とつなげる事も可能
    const thumbnails = document.querySelectorAll(".carousel__thumbnails > li");
    //現在のcurrentIndexの画像要素から、currentクラスを削除
    //indexの値をcurrentIndexに代入し、currentIndexの画像要素にcurrentクラスを再付与
    thumbnails[currentIndex].classList.remove("current");
    currentIndex = index;
    thumbnails[currentIndex].classList.add("current");
  });

  //作成したli要素に、作成したimg要素を付与
  li.appendChild(img);
  //作成したli要素をcarousel__thumbnailsクラスが設定されている要素に付与する
  document.querySelector(".carousel__thumbnails").appendChild(li);
}

//carousel__nextというIDの要素を取得
const next = document.getElementById("carousel__next");
next.addEventListener("click", () => {
  //クリックしたらcurrentIndexの値を＋１する
  let target = currentIndex + 1;
  //もし、currentIndexの値がimages配列の長さと同じ値になったらcurrentIndexを0に戻す（配列は0から始まるため）
  if (target === images.length) {
    target = 0;
  }
  //.carousel__thumbnails > li の[配列番号]の要素を全て取得
  //子要素li[配列番号]に対してクリックされた時と同じイベントの処理を行う
  document.querySelectorAll(".carousel__thumbnails > li")[target].click();
});

//carousel__prevというIDの要素を取得
const prev = document.getElementById("carousel__prev");
prev.addEventListener("click", () => {
  //クリックしたらcurrentIndexの値を－１する
  let target = currentIndex - 1;
  //もし、currentIndexの値が0より小さい値になっていたら、長さ－1の値をcurrentIndexに代入（配列の最大値は、配列の長さ－1になる）
  if (target < 0) {
    target = images.length - 1;
  }
  //.carousel__thumbnails > li の[配列番号]の要素を全て取得
  //子要素li[配列番号]に対してクリックされた時と同じイベントの処理を行う
  document.querySelectorAll(".carousel__thumbnails > li")[target].click();
});
