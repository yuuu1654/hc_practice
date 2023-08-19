scores = []

# 改行文字を取り除いた文字列を取得
x = gets.chomp.split(",").map(&:to_i) # 規定打数
y = gets.chomp.split(",").map(&:to_i) # プレーヤー打数

x.zip(y).each do |par, player|
    difference = player - par
    
    case difference
    when 4
        scores << "4ボギー"
    when 3
        scores << "3ボギー"
    when 2
        scores << "2ボギー"
    when 1
        scores << "ボギー"
    when 0
        scores << "パー"
    when -1
        scores << "バーディ"
    when -2
        if player == 1 && par == 3
            scores << "ホールインワン"
        else
            scores << "イーグル"
        end
    when -3
        if player == 1 && par == 4
            scores << "ホールインワン"
        else
            scores << "アルバトロス"
        end
    when -4
        scores << "コンドル"
    else
        "測定不能"
    end
end

puts scores.join(",")


# 解答例▼
# number_of_storokes = gets.chomp.split(",").map(&:to_i)
# scores = gets.chomp.split(",").map(&:to_i)
# score_mapping = {
#   3 => {
#     1 => "ホールインワン",
#     2 => "バーディ",
#     3 => "パー",
#     4 => "ボギー"
#   },
#   4 => {
#     1 => "ホールインワン",
#     2 => "イーグル",
#     3 => "バーディ",
#     4 => "パー",
#     5 => "ボギー"
#   },
#   5 => {
#     1 => "コンドル",
#     2 => "アルバトロス",
#     3 => "イーグル",
#     4 => "バーディ",
#     5 => "パー",
#     6 => "ボギー"
#   }
# }

# result = number_of_storokes.map.with_index do |storoke, i|
#   mapping = score_mapping[storoke]
#   mapping[scores[i]] || "#{scores[i] - storoke}ボギー"
# end

# puts result.join(",")