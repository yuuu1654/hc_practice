
# グループ分け問題
# 仕様
# A、B、C、D、E、Fという6人のグループがありました。
# このグループは定期的にみんなで通話をしています。
# しかし6人全員で通話はやりずらいので、3人ずつか2人と4人に別れることにしました。
# このグループを3人と3人、または2人と4人にランダムに分けるプログラムを書いてください。
# このプログラムは実行するごとに結果が変わります。
# また表示結果はアルファベット順にしてください。
# $ ruby random.rb
# ["B", "C"]
# ["A", "D", "E", "F"]

# ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

# 全員のリスト
members = ['A', 'B', 'C', 'D', 'E', 'F']

# ランダムにメンバーをシャッフル (元の配列はそのまま)
shuffled_members = members.shuffle

# グループの分け方をランダムに決める（2,4 or 4,2 or 3,3）
ratios = [[2, 4], [4, 2], [3, 3]]
ratio = ratios.sample
division_point = ratio[0]

# メンバーを取り出してグループに分ける
first_group = shuffled_members.slice(0, division_point)
second_group = shuffled_members.slice(division_point, ratio[1])

# アルファベット順に表示されるようにする
p first_group.sort
p second_group.sort


