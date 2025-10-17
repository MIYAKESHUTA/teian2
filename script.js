// script.js
// 料理アキネーター完全版（Yes/No式）
// index.html / style.css と一緒に使います

// ---------- ユーティリティ（表示ヘルパー） ----------
function el(id) { return document.getElementById(id); }

function renderIngredients(ings) {
  if (!ings || ings.length === 0) return "<p>材料情報なし</p>";
  return "<ul>" + ings.map(i => `<li>${i.name}${i.amount ? "： " + i.amount : ""}</li>`).join("") + "</ul>";
}

function renderSteps(steps) {
  if (!steps || steps.length === 0) return "<p>手順情報なし</p>";
  return "<ol>" + steps.map(s => `<li>${s}</li>`).join("") + "</ol>";
}

function renderTips(tips) {
  if (!tips || tips.length === 0) return "";
  return `<div class="recipe-section"><h3>コツ・ポイント</h3><ul>${tips.map(t=>`<li>${t}</li>`).join("")}</ul></div>`;
}

function renderMeta(recipe) {
  const meta = [];
  if (recipe.servings) meta.push(`分量: ${recipe.servings} 人分`);
  if (recipe.prepTime) meta.push(`下ごしらえ: ${recipe.prepTime}`);
  if (recipe.cookTime) meta.push(`調理時間: ${recipe.cookTime}`);
  return meta.length ? `<p class="small">${meta.join(" ・ ")}</p>` : "";
}

// ---------- レシピツリー（Yes/Noのノード） ----------
// structure: { q: "質問文", yes: {...}, no: {...} } or { result: "料理名", ingredients: [...], steps: [...], tips: [...] }
const tree = {
  q: "温かい料理が食べたいですか？",
  yes: {
    q: "ご飯ものが食べたいですか？",
    yes: {
      q: "和食のご飯ものが良いですか？",
      yes: {
        q: "丼ものが良いですか？",
        yes: {
          q: "揚げ物が入った丼は良いですか？",
          yes: {
            // カツ丼
            result: "カツ丼",
            servings: 1,
            prepTime: "15分",
            cookTime: "15分",
            ingredients: [
              { name: "豚ロース（とんかつ用）", amount: "1枚（約120g）" },
              { name: "小麦粉", amount: "適量" },
              { name: "卵（衣用）", amount: "1個" },
              { name: "パン粉", amount: "適量" },
              { name: "揚げ油", amount: "適量" },
              { name: "玉ねぎ", amount: "1/2個（薄切り）" },
              { name: "だし汁（顆粒だし可）", amount: "150ml" },
              { name: "醤油", amount: "大さじ1.5" },
              { name: "みりん", amount: "大さじ1" },
              { name: "砂糖", amount: "小さじ1" },
              { name: "卵（とじ用）", amount: "2個" },
              { name: "ご飯", amount: "丼1杯分" }
            ],
            steps: [
              "1. 豚ロースは筋切りをして軽く塩・こしょうを振る。",
              "2. 小麦粉→溶き卵→パン粉の順に衣をつける。",
              "3. 170〜180℃の油で片面約3分ずつ揚げ、食べやすい幅に切る。",
              "4. 鍋にだし汁・醤油・みりん・砂糖を入れて温め、玉ねぎを入れて透き通るまで煮る。",
              "5. カツを入れて溶き卵を回し入れ、半熟になったら火を止める。",
              "6. ご飯にのせて完成。"
            ],
            tips: [
              "衣は揚げる直前に付けるとサクッと揚がる。",
              "溶き卵を2回に分けて加えるとふわっと仕上がる。"
            ]
          },
          no: {
            // 親子丼
            result: "親子丼",
            servings: 1,
            prepTime: "10分",
            cookTime: "10分",
            ingredients: [
              { name: "鶏もも肉", amount: "120g（小さめ一口大）" },
              { name: "玉ねぎ", amount: "1/2個（薄切り）" },
              { name: "だし汁", amount: "150ml" },
              { name: "醤油", amount: "大さじ1.5" },
              { name: "みりん", amount: "大さじ1" },
              { name: "砂糖", amount: "小さじ1" },
              { name: "卵", amount: "2個" },
              { name: "ご飯", amount: "丼1杯分" }
            ],
            steps: [
              "1. 鶏肉を一口大に切り、玉ねぎは薄切りにする。",
              "2. 鍋にだし汁・醤油・みりん・砂糖を入れて煮立て、玉ねぎを入れて煮る。",
              "3. 鶏肉を加え、火が通るまで煮る。",
              "4. 溶き卵を回し入れて半熟にし、ご飯にのせる。"
            ],
            tips: [
              "卵を混ぜすぎないことでふわっと仕上がる。",
              "顆粒だしで手早く作れる。"
            ]
          }
        },
        no: {
          q: "焼き魚や煮魚などの定食系はどうですか？",
          yes: {
            // 鯖の味噌煮
            result: "鯖の味噌煮",
            servings: 2,
            prepTime: "10分",
            cookTime: "15分",
            ingredients: [
              { name: "鯖切り身", amount: "2切れ" },
              { name: "味噌", amount: "大さじ2" },
              { name: "みりん", amount: "大さじ2" },
              { name: "酒", amount: "大さじ2" },
              { name: "砂糖", amount: "大さじ1" },
              { name: "水", amount: "150ml" },
              { name: "生姜（薄切り）", amount: "5〜6枚" }
            ],
            steps: [
              "1. 鍋に水・酒・みりん・砂糖・生姜を入れて煮立てる。",
              "2. 鯖を皮目を上にして入れ、中火で落とし蓋をして6〜8分煮る。",
              "3. 味噌を少量の煮汁で溶き入れて1〜2分煮る。"
            ],
            tips: [
              "味噌は最後に加えると焦げにくい。",
              "落とし蓋が無ければアルミホイルで代用可。"
            ]
          },
          no: {
            q: "家庭の煮物系（肉じゃがなど）はどうですか？",
            yes: {
              // 肉じゃが
              result: "肉じゃが",
              servings: 3,
              prepTime: "15分",
              cookTime: "30分",
              ingredients: [
                { name: "牛薄切り肉", amount: "200g" },
                { name: "じゃがいも", amount: "中2個" },
                { name: "玉ねぎ", amount: "1個" },
                { name: "にんじん", amount: "1本" },
                { name: "だし", amount: "350ml" },
                { name: "醤油", amount: "大さじ2" },
                { name: "みりん", amount: "大さじ1" },
                { name: "砂糖", amount: "大さじ1" }
              ],
              steps: [
                "1. 材料を切る（じゃがいもは一口大、玉ねぎはくし切り）。",
                "2. 牛肉を炒め色が変わったら野菜を加える。",
                "3. だしを加えアクをとり調味料を加え落とし蓋で中火で20分煮る。"
              ],
              tips: [
                "冷めてから再加熱すると味が染みる。",
                "豚肉でも美味しくできる。"
              ]
            },
            no: {
              q: "揚げ物単品が良いですか？",
              yes: {
                // 唐揚げ
                result: "鶏の唐揚げ",
                servings: 2,
                prepTime: "10分（漬け時間除く）",
                cookTime: "10分",
                ingredients: [
                  { name: "鶏もも肉", amount: "300g" },
                  { name: "醤油", amount: "大さじ2" },
                  { name: "酒", amount: "大さじ1" },
                  { name: "おろしにんにく", amount: "小さじ1" },
                  { name: "おろし生姜", amount: "小さじ1" },
                  { name: "片栗粉", amount: "適量" },
                  { name: "揚げ油", amount: "適量" }
                ],
                steps: [
                  "1. 鶏肉を一口大に切り調味料で下味を30分程度漬ける。",
                  "2. 片栗粉をまぶして180℃の油で揚げる（4〜5分）。",
                  "3. 油を切って盛り付ける。"
                ],
                tips: [
                  "二度揚げでよりカリッと仕上がる。",
                  "下味をしっかり付けると冷めても美味しい。"
                ]
              },
              no: {
                // 天ぷら
                result: "天ぷら盛り合わせ",
                servings: 2,
                prepTime: "15分",
                cookTime: "15分",
                ingredients: [
                  { name: "海老", amount: "4尾" },
                  { name: "かぼちゃ", amount: "適量" },
                  { name: "なす", amount: "1本" },
                  { name: "天ぷら粉", amount: "適量" },
                  { name: "揚げ油", amount: "適量" }
                ],
                steps: [
                  "1. 材料を切り、衣は冷水で溶いて冷たく保つ。",
                  "2. 170〜180℃の油で揚げる。"
                ],
                tips: [
                  "衣は混ぜすぎないのがコツ。",
                  "油温が下がるとべちゃっとするので注意。"
                ]
              }
            }
          }
        }
      },
      no: {
        q: "洋食系のご飯もの（オムライス等）はどうですか？",
        yes: {
          // オムライス
          result: "オムライス",
          servings: 1,
          prepTime: "10分",
          cookTime: "10分",
          ingredients: [
            { name: "ご飯", amount: "茶碗1杯分" },
            { name: "鶏もも肉", amount: "80g" },
            { name: "玉ねぎ", amount: "1/4個" },
            { name: "ケチャップ", amount: "大さじ3" },
            { name: "卵", amount: "2個" },
            { name: "バター", amount: "10g" }
          ],
          steps: [
            "1. 鶏肉と玉ねぎを炒め、ご飯とケチャップを加えてチキンライスを作る。",
            "2. 溶き卵を薄く焼いてチキンライスを包むか載せる。"
          ],
          tips: [
            "卵は弱火でふんわり焼くときれいに包める。"
          ]
        },
        no: {
          // ドライカレー
          result: "ドライカレー",
          servings: 1,
          prepTime: "5分",
          cookTime: "15分",
          ingredients: [
            { name: "ご飯", amount: "茶碗1杯" },
            { name: "合いびき肉", amount: "100g" },
            { name: "玉ねぎ", amount: "1/4個" },
            { name: "カレー粉", amount: "大さじ1" },
            { name: "ケチャップ", amount: "大さじ1" }
          ],
          steps: [
            "1. ひき肉と玉ねぎを炒めカレー粉・ケチャップで味付けする。",
            "2. ご飯と合わせて炒める。"
          ],
          tips: [
            "冷ご飯のほうがパラッと仕上がる。"
          ]
        }
      }
    },
    no: {
      q: "麺類が食べたいですか？",
      yes: {
        q: "中華系の麺（ラーメン・焼きそば）ですか？",
        yes: {
          q: "ラーメン系にしますか？",
          yes: {
            q: "醤油・塩系が良いですか？（はい=醤油/塩, いいえ=味噌）",
            yes: {
              // 醤油ラーメン
              result: "醤油ラーメン",
              servings: 1,
              prepTime: "5分",
              cookTime: "10分",
              ingredients: [
                { name: "中華麺", amount: "1玉" },
                { name: "鶏ガラスープ", amount: "400ml" },
                { name: "醤油", amount: "大さじ1.5" },
                { name: "チャーシュー", amount: "2枚" },
                { name: "ねぎ", amount: "適量" }
              ],
              steps: [
                "1. スープを温め醤油で味を整える。",
                "2. 麺を茹で丼に入れスープを注ぎ具をのせる。"
              ],
              tips: [
                "市販のスープを活用すれば時短になる。"
              ]
            },
            no: {
              // 味噌ラーメン
              result: "味噌ラーメン",
              servings: 1,
              prepTime: "5分",
              cookTime: "10分",
              ingredients: [
                { name: "中華麺", amount: "1玉" },
                { name: "味噌", amount: "大さじ1.5" },
                { name: "鶏ガラスープ", amount: "400ml" },
                { name: "豚ひき肉", amount: "50g" },
                { name: "もやし", amount: "50g" }
              ],
              steps: [
                "1. ひき肉ともやしを炒めスープと味噌を加える。",
                "2. 麺を茹でスープを注ぎ具をのせる。"
              ],
              tips: [
                "具材の炒め加減で風味が変わる。"
              ]
            }
          },
          no: {
            // 焼きそば
            result: "焼きそば",
            servings: 1,
            prepTime: "5分",
            cookTime: "10分",
            ingredients: [
              { name: "焼きそば麺", amount: "1玉" },
              { name: "豚薄切り", amount: "80g" },
              { name: "キャベツ", amount: "1/4個" },
              { name: "ウスターソース", amount: "大さじ1.5" }
            ],
            steps: [
              "1. 豚肉と野菜を炒める。",
              "2. 麺を加えてほぐし、ソースで味付けする。"
            ],
            tips: [
              "麺はほぐしてから加えるとダマになりにくい。"
            ]
          }
        },
        no: {
          q: "和風の麺（うどん・そば）ですか？",
          yes: {
            q: "うどんにしますか？（はい=かけうどん, いいえ=ざるそば）",
            yes: {
              // かけうどん
              result: "かけうどん",
              servings: 1,
              prepTime: "5分",
              cookTime: "5分",
              ingredients: [
                { name: "うどん", amount: "1玉" },
                { name: "だし", amount: "350ml" },
                { name: "醤油・みりん", amount: "合わせて小さじ2" },
                { name: "ねぎ", amount: "適量" }
              ],
              steps: [
                "1. だしを温め醤油とみりんで味を整える。",
                "2. うどんを茹でてだしをかけねぎをのせる。"
              ]
            },
            no: {
              // ざるそば
              result: "ざるそば",
              servings: 1,
              prepTime: "5分",
              cookTime: "5分",
              ingredients: [
                { name: "そば", amount: "1人前" },
                { name: "つゆ（めんつゆ）", amount: "適量" },
                { name: "わさび", amount: "適量" }
              ],
              steps: [
                "1. そばを茹で冷水でしめる。",
                "2. つゆにつけて食べる。"
              ]
            }
          },
          no: {
            // ナポリタン
            result: "ナポリタン",
            servings: 1,
            prepTime: "5分",
            cookTime: "15分",
            ingredients: [
              { name: "スパゲッティ", amount: "100g" },
              { name: "玉ねぎ", amount: "1/4個" },
              { name: "ピーマン", amount: "1個" },
              { name: "ウインナー", amount: "2本" },
              { name: "ケチャップ", amount: "大さじ3" }
            ],
            steps: [
              "1. パスタを茹でる。",
              "2. 具を炒めパスタとケチャップで和える。"
            ]
          }
        }
      },
      no: {
        q: "冷たい料理や軽めのものが良いですか？",
        yes: {
          q: "冷製・サラダ系（冷やし中華・サラダなど）ですか？",
          yes: {
            // 冷やし中華
            result: "冷やし中華",
            servings: 1,
            prepTime: "10分",
            cookTime: "5分",
            ingredients: [
              { name: "中華麺", amount: "1玉" },
              { name: "きゅうり", amount: "1/2本" },
              { name: "ハム", amount: "2枚" },
              { name: "錦糸卵", amount: "卵1個分" },
              { name: "めんつゆ（希釈）", amount: "100ml" }
            ],
            steps: [
              "1. 麺を茹で冷水で締める。",
              "2. 具材を切り、麺に盛ってつゆをかける。"
            ]
          },
          no: {
            q: "パン系の軽食（サンド等）ですか？",
            yes: {
              // サンドイッチ（ハムチーズ）
              result: "サンドイッチ（ハムチーズ）",
              servings: 1,
              prepTime: "5分",
              cookTime: "0分",
              ingredients: [
                { name: "食パン", amount: "2枚" },
                { name: "ハム", amount: "2枚" },
                { name: "チーズ", amount: "1枚" },
                { name: "レタス", amount: "1枚" }
              ],
              steps: [
                "1. パンにマヨネーズを薄く塗り具材を挟む。",
                "2. 好みでトーストしてもよい。"
              ]
            },
            no: {
              // おにぎり
              result: "おにぎり（梅/鮭）",
              servings: 1,
              prepTime: "5分",
              cookTime: "0分",
              ingredients: [
                { name: "ご飯", amount: "茶碗1杯分" },
                { name: "具（梅干し/鮭フレーク等）", amount: "適量" },
                { name: "塩", amount: "少々" }
              ],
              steps: [
                "1. ご飯を軽く塩で味付けし中心に具を入れて握る。",
                "2. 海苔を巻いて完成。"
              ]
            }
          }
        },
        no: {
          q: "甘いもの（デザートやスイーツ）はいかがですか？",
          yes: {
            q: "焼き菓子系？冷たい系？（はい=焼くもの, いいえ=冷やす/蒸す）",
            yes: {
              // パンケーキ
              result: "パンケーキ",
              servings: 2,
              prepTime: "10分",
              cookTime: "10分",
              ingredients: [
                { name: "ホットケーキミックス", amount: "200g" },
                { name: "牛乳", amount: "180ml" },
                { name: "卵", amount: "1個" },
                { name: "バター", amount: "適量" }
              ],
              steps: [
                "1. 材料を混ぜフライパンで焼く。",
                "2. バターとシロップをかけて提供。"
              ]
            },
            no: {
              // プリン
              result: "プリン（カスタード）",
              servings: 4,
              prepTime: "15分",
              cookTime: "40分（湯煎）",
              ingredients: [
                { name: "卵", amount: "3個" },
                { name: "牛乳", amount: "300ml" },
                { name: "砂糖", amount: "60g" }
              ],
              steps: [
                "1. カラメルを作り器に入れる。",
                "2. 卵・砂糖・牛乳を混ぜ濾して型に入れ湯煎で焼く。",
                "3. 冷やして完成。"
              ]
            }
          },
          no: {
            // 軽い副菜
            result: "ポテトサラダ",
            servings: 3,
            prepTime: "10分",
            cookTime: "15分",
            ingredients: [
              { name: "じゃがいも", amount: "2個" },
              { name: "にんじん", amount: "1/4本" },
              { name: "きゅうり", amount: "1/2本" },
              { name: "マヨネーズ", amount: "大さじ3" }
            ],
            steps: [
              "1. じゃがいもを茹で潰す。",
              "2. 他の具材を混ぜマヨネーズで和える。"
            ]
          }
        }
      }
    }
  },
  no: {
    q: "冷たい料理や軽食、デザートの方が良いですか？",
    yes: {
      q: "冷製麺やサラダ、サンド系などですか？",
      yes: {
        // 冷やし中華（単独）
        result: "冷やし中華",
        servings: 1,
        prepTime: "10分",
        cookTime: "5分",
        ingredients: [
          { name: "中華麺", amount: "1玉" },
          { name: "きゅうり", amount: "1/2本" },
          { name: "ハム", amount: "2枚" },
          { name: "錦糸卵", amount: "卵1個分" },
          { name: "めんつゆ", amount: "適量" }
        ],
        steps: [
          "1. 麺を茹で冷水で締め具をのせる。",
          "2. めんつゆをかけて食べる。"
        ]
      },
      no: {
        q: "スイーツ（甘いもの）ですか？",
        yes: {
          q: "洋菓子系を作りますか？",
          yes: {
            // パンケーキ
            result: "パンケーキ（簡易）",
            servings: 2,
            prepTime: "10分",
            cookTime: "10分",
            ingredients: [
              { name: "ホットケーキミックス", amount: "200g" },
              { name: "牛乳", amount: "180ml" },
              { name: "卵", amount: "1個" },
              { name: "バター", amount: "適量" }
            ],
            steps: [
              "1. 生地を混ぜて焼く。",
              "2. シロップやフルーツで飾る。"
            ]
          },
          no: {
            // ヨーグルトパフェ
            result: "ヨーグルトパフェ",
            servings: 2,
            prepTime: "5分",
            cookTime: "0分",
            ingredients: [
              { name: "ヨーグルト", amount: "200g" },
              { name: "グラノーラ", amount: "50g" },
              { name: "フルーツ", amount: "適量" }
            ],
            steps: [
              "1. グラスに層を作るように盛り付ける。"
            ]
          }
        }
      }
    },
    no: {
      // 最終フォールバック
      q: "軽くて手早く作れるものが良いですか？",
      yes: {
        // トースト・簡単系
        result: "トースト（バター or ジャム）",
        servings: 1,
        prepTime: "2分",
        cookTime: "3分",
        ingredients: [
          { name: "食パン", amount: "1枚" },
          { name: "バターまたはジャム", amount: "適量" }
        ],
        steps: [
          "1. トースターで焼き、バターやジャムを塗る。"
        ]
      },
      no: {
        // ここまで来たら総合的にお任せ
        result: "おまかせ（冷蔵庫の余り物で適当に）",
        servings: 1,
        prepTime: "5分",
        cookTime: "0〜10分",
        ingredients: [
          { name: "冷蔵庫の余り物", amount: "適量" }
        ],
        steps: [
          "1. 冷蔵庫にある材料を組み合わせて一品作る（例：野菜炒め、簡単丼など）。"
        ]
      }
    }
  }
};

// ---------- UI / ロジック ----------
let currentNode = tree;

// 初期化表示
function init() {
  el("result").style.display = "none";
  el("resetArea").style.display = "none";
  el("buttons").style.display = "block";
  currentNode = tree;
  setQuestion(currentNode.q);
}

function setQuestion(text) {
  el("question").textContent = text || "質問がありません。";
}

// 結果表示
function showRecipe(node) {
  // node may contain result and ingredients/steps or refer to a simplified result
  const name = node.result || "料理";
  // ingredients may be in node.ingredients or as objects
  const ingredients = node.ingredients || node.ingredients || [];
  // For uniformity, ingredients are expected as {name, amount}
  // But some nodes may have ingredients as strings; convert if needed
  const ings = (ingredients.length && typeof ingredients[0] === "string")
    ? ingredients.map(s => ({ name: s, amount: "" }))
    : ingredients;

  const html = `
    <h2>🍛 ${name}</h2>
    ${renderMeta(node)}
    <div class="recipe-section">
      <h3>材料（分量）</h3>
      ${renderIngredients(ings)}
    </div>
    <div class="recipe-section">
      <h3>作り方</h3>
      ${renderSteps(node.steps || [])}
    </div>
    ${renderTips(node.tips || [])}
  `;
  el("question").textContent = "";
  el("result").innerHTML = html;
  el("result").style.display = "block";
  el("buttons").style.display = "none";
  el("resetArea").style.display = "block";
}

// 回答処理
function handleAnswer(answer) {
  if (!currentNode) return;
  // if currentNode is a result node already, ignore
  if (currentNode.result) return;

  const next = answer ? currentNode.yes : currentNode.no;
  if (!next) {
    // no next node: show error
    setQuestion("これ以上進めません。最初からやり直してください。");
    el("buttons").style.display = "none";
    el("resetArea").style.display = "block";
    return;
  }

  currentNode = next;

  // if the next node is a result, display recipe
  if (currentNode.result) {
    // If ingredient list is of strings (in earlier partials), normalize to objects
    if (currentNode.ingredients && currentNode.ingredients.length && typeof currentNode.ingredients[0] === "string") {
      currentNode.ingredients = currentNode.ingredients.map(s => {
        // split by "：" or ":" if present
        if (s.includes("：")) {
          const [name, amount] = s.split("：");
          return { name: name.trim(), amount: amount.trim() };
        } else if (s.includes(":")) {
          const [name, amount] = s.split(":");
          return { name: name.trim(), amount: amount.trim() };
        } else {
          // try split by full-width space or last numeric
          return { name: s, amount: "" };
        }
      });
    }
    showRecipe(currentNode);
    return;
  }

  // otherwise show the next question
  setQuestion(currentNode.q);
}

// リセット
function resetQuiz() {
  init();
  el("result").innerHTML = "";
}

// 初期化 on load
window.addEventListener("DOMContentLoaded", () => {
  init();
});
