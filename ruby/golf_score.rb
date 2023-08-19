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