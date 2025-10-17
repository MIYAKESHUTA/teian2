// ================================
// 🍽️ 料理アキネーター Script.js
// ================================

// --- スタート画面処理 ---
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
});

// --- 🍳 Yes/No ロジック部分 ---
function handleAnswer(answer) {
  if (current.result) return;

  current = answer ? current.yes : current.no;

  if (!current) {
    document.getElementById("question").textContent = "質問が見つかりません。";
    document.getElementById("buttons").style.display = "none";
    return;
  }

  if (current.result) {
    showResult(current);
  } else {
    document.getElementById("question").textContent = current.q;
  }
}

function showResult(r) {
  document.getElementById("question-container").style.display = "none";
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h2>🍛 あなたにおすすめの料理は「${r.result}」！</h2>
    <div class="recipe-section">
      <h3>材料（${r.servings || "2人分"}）</h3>
      <ul>${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    </div>
    <div class="recipe-section">
      <h3>作り方</h3>
      <ol>${r.steps.map(s => `<li>${s}</li>`).join("")}</ol>
    </div>
  `;
  document.getElementById("restart").style.display = "inline-block";
}

// --- イベント ---
document.getElementById("yes").addEventListener("click", () => handleAnswer(true));
document.getElementById("no").addEventListener("click", () => handleAnswer(false));
document.getElementById("restart").addEventListener("click", () => location.reload());

// --- キーボード操作（Y/N対応） ---
document.addEventListener("keydown", e => {
  if (e.key === "y") handleAnswer(true);
  if (e.key === "n") handleAnswer(false);
});

// ================================
// 🌳 質問ツリー（Yes/No 形式）
// ================================
const tree = {
  q: "温かい料理が食べたいですか？",
  yes: {
    q: "ご飯ものが良いですか？",
    yes: {
      q: "和食が好きですか？",
      yes: {
        q: "揚げ物が食べたいですか？",
        yes: {
          result: "カツ丼",
          servings: "2人分",
          ingredients: [
            "ご飯 2膳分",
            "豚ロース肉 2枚",
            "卵 3個",
            "玉ねぎ 1個",
            "だし 100ml",
            "醤油 大さじ2",
            "みりん 大さじ2",
            "砂糖 小さじ1",
            "サラダ油 適量",
            "塩・こしょう 少々"
          ],
          steps: [
            "豚ロース肉に塩・こしょうを振り、小麦粉・溶き卵・パン粉の順に衣をつける。",
            "170〜180℃の油で両面がきつね色になるまで揚げる。",
            "鍋にだし・醤油・みりん・砂糖を入れて火にかけ、薄切りにした玉ねぎを加えて煮る。",
            "揚げたカツを加え、溶き卵を回しかけて半熟になったら火を止める。",
            "ご飯を丼に盛り、上に乗せて完成。"
          ]
        },
        no: {
          q: "卵を使った料理がいいですか？",
          yes: {
            result: "親子丼",
            servings: "2人分",
            ingredients: [
              "ご飯 2膳分",
              "鶏もも肉 150g",
              "玉ねぎ 1/2個",
              "卵 2個",
              "だし 100ml",
              "醤油 大さじ2",
              "みりん 大さじ2",
              "砂糖 小さじ1"
            ],
            steps: [
              "鍋にだし・醤油・みりん・砂糖を入れて火にかける。",
              "薄切りの玉ねぎと一口大に切った鶏肉を加え、鶏肉に火が通るまで煮る。",
              "溶き卵を半分加えて軽く固め、残りを加えて半熟状態で火を止める。",
              "ご飯にのせて完成。"
            ]
          },
          no: {
            result: "牛丼",
            servings: "2人分",
            ingredients: [
              "ご飯 2膳分",
              "牛こま切れ肉 200g",
              "玉ねぎ 1/2個",
              "だし 100ml",
              "醤油 大さじ2",
              "みりん 大さじ2",
              "砂糖 大さじ1"
            ],
            steps: [
              "鍋にだし・醤油・みりん・砂糖を入れて火にかけ、玉ねぎを加えて煮る。",
              "牛肉を入れて色が変わるまで煮る。",
              "ご飯にのせて完成。"
            ]
          }
        }
      },
      no: {
        q: "洋風のご飯料理がいいですか？",
        yes: {
          q: "ソースたっぷりが好きですか？",
          yes: {
            result: "ハヤシライス",
            servings: "2人分",
            ingredients: [
              "ご飯 2膳分",
              "牛薄切り肉 200g",
              "玉ねぎ 1個",
              "マッシュルーム 4個",
              "デミグラスソース缶 1缶",
              "ケチャップ 大さじ2",
              "バター 10g",
              "塩・こしょう 少々"
            ],
            steps: [
              "フライパンにバターを熱し、薄切りの玉ねぎとマッシュルームを炒める。",
              "牛肉を加えて炒め、塩・こしょうを振る。",
              "デミグラスソースとケチャップを加え、10分ほど煮込む。",
              "ご飯にかけて完成。"
            ]
          },
          no: {
            result: "オムライス",
            servings: "2人分",
            ingredients: [
              "ご飯 300g",
              "鶏もも肉 100g",
              "玉ねぎ 1/4個",
              "ケチャップ 大さじ3",
              "卵 3個",
              "バター 10g",
              "塩・こしょう 少々"
            ],
            steps: [
              "鶏肉と玉ねぎを炒め、ご飯とケチャップを加えてチキンライスを作る。",
              "別のフライパンで卵を焼き、チキンライスを包む。",
              "お好みでケチャップをかけて完成。"
            ]
          }
        },
        no: {
          result: "チャーハン",
          servings: "2人分",
          ingredients: [
            "ご飯 300g",
            "卵 2個",
            "チャーシュー 50g",
            "長ねぎ 1/4本",
            "醤油 小さじ2",
            "塩・こしょう 少々",
            "ごま油 小さじ1"
          ],
          steps: [
            "フライパンにごま油を熱し、溶き卵を入れて軽く炒める。",
            "ご飯と刻んだチャーシュー、ねぎを加えて炒める。",
            "醤油を回しかけ、塩・こしょうで味を整える。"
          ]
        }
      }
    },
    no: {
      q: "麺料理はどうですか？",
      yes: {
        q: "和風の麺料理がいいですか？",
        yes: {
          result: "うどん",
          servings: "2人分",
          ingredients: [
            "うどん 2玉",
            "だし 400ml",
            "醤油 大さじ2",
            "みりん 大さじ2",
            "ねぎ・かまぼこ 適量"
          ],
          steps: [
            "鍋にだし・醤油・みりんを入れて温める。",
            "別ゆでしたうどんを入れ、具材をのせて完成。"
          ]
        },
        no: {
          result: "ラーメン",
          servings: "1人分",
          ingredients: [
            "中華麺 1玉",
            "鶏がらスープ 400ml",
            "醤油 大さじ2",
            "ごま油 小さじ1",
            "チャーシュー・メンマ・ねぎ 適量"
          ],
          steps: [
            "スープを温め、醤油・ごま油で味を整える。",
            "ゆでた麺を加え、具材をのせて完成。"
          ]
        }
      },
      no: {
        result: "グラタン",
        servings: "2人分",
        ingredients: [
          "マカロニ 100g",
          "鶏肉 100g",
          "玉ねぎ 1/2個",
          "バター 20g",
          "小麦粉 大さじ2",
          "牛乳 300ml",
          "チーズ 適量",
          "塩・こしょう 少々"
        ],
        steps: [
          "フライパンで鶏肉と玉ねぎを炒める。",
          "バターと小麦粉を加えて炒め、牛乳を少しずつ加えてホワイトソースを作る。",
          "ゆでたマカロニを加えて混ぜ、耐熱皿に入れる。",
          "チーズをのせてオーブンで焼き色がつくまで焼く。"
        ]
      }
    }
  },
  no: {
    q: "冷たい料理が食べたいですか？",
    yes: {
      result: "冷やし中華",
      servings: "2人分",
      ingredients: [
        "中華麺 2玉",
        "きゅうり・ハム・卵・トマト 各適量",
        "酢 大さじ2",
        "醤油 大さじ2",
        "砂糖 小さじ2",
        "ごま油 小さじ1"
      ],
      steps: [
        "麺をゆでて冷水で締める。",
        "具材を細切りにする。",
        "タレを混ぜ合わせてかける。"
      ]
    },
    no: {
      result: "サラダボウル",
      servings: "2人分",
      ingredients: [
        "レタス 1/2個",
        "トマト 1個",
        "アボカド 1個",
        "ゆで卵 1個",
        "ドレッシング 適量"
      ],
      steps: [
        "野菜を食べやすい大きさに切る。",
        "ゆで卵をスライスする。",
        "すべてをボウルに入れ、ドレッシングをかけて完成。"
      ]
    }
  }
};

// --- 初期質問設定 ---
let current = tree;
document.getElementById("question").textContent = tree.q;
