require 'date'
require 'optparse'

def print_calendar(year, month)
    # 指定された月の1日と最後の日を取得
    first_day = Date.new(year, month, 1)
    last_day = Date.new(year, month, -1)

    # カレンダーのヘッダーを表示
    puts "    #{month}月 #{year}    "
    puts "月 火 水 木 金 土 日"

    # 月の1日が始まる位置までスペースを表示
    # 月曜日始まりにするために、曜日番号を調整
    adjusted_wday = first_day.wday == 0 ? 6 : first_day.wday - 1 
    print "   " * adjusted_wday

    # 月の各日を表示
    (first_day..last_day).each do |date|
        print date.day.to_s.rjust(2) + " "
        # 日曜日なら改行
        puts if date.sunday?
    end

    puts
end

# コマンドラインオプションの解析
options = {}
opt = OptionParser.new
# opt.on("-m month", Integer) do |month|
#     options[:month] = month
# end
opt.on("-m month", Integer) { |month| options[:month] = month } # 処理が1行なので{}のブロック記法を採用
opt.parse!(ARGV)


# 現在の年と月を取得
now = Date.today
year = now.year
# 指定があった月、何も入力がなければ現在の月
month = options[:month] ||= now.month 

# 月のバリデーション
if month < 1 || 12 < month
    puts "#{month} is neither a month number (1..12) nor a name"
    exit
end

print_calendar(year, month)