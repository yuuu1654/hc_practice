require_relative "suica"
require_relative "juice"

class VendingMachine
    def initialize
        @stock = {
            "Pepsi" => { juice: Juice.new("Pepsi", 150), count: 5 },
            "Monster" => { juice: Juice.new("Monster", 230), count: 5 },
            "Irohasu" => { juice: Juice.new("Irohasu", 120), count: 5 }
        }
        @sales = 0
    end

    # 在庫を取得
    def get_stock(name)
        @stock[name] ? @stock[name][:count] : 0
    end

    # ジュースを購入できるかを判定
    def can_purchase?(name, suica)
        item = @stock[name]
        return false unless item
        suica.get_current_balance >= item[:juice].price && item[:count] > 0
    end

    def purchase(name, suica)
        if can_purchase?(name, suica)
            # Suicaの支払い処理
            suica.pay(get_juice(name).price)
            # 在庫を減らす処理
            reduce_stock(name)
            # 売り上げを増やす処理
            increase_sales(get_juice(name).price)
        else
            raise "残金が足りないので購入することが出来ません"
        end
    end

    # 購入可能なドリンクのリストを取得
    def available_drinks(suica)
        @stock.keys.select { |name| can_purchase?(name, suica) }
    end

    # 在庫を補充
    def add_stock(name, count)
        if @stock[name]
            @stock[name][:count] += count
        else
            raise "補充できないジュースです"
        end
    end

    # 現在の売り上げ金額を取得
    def get_current_sales
        @sales
    end

    # 指定したジュースインスタンスを返すヘルパーメソッド
    def get_juice(name)
        @stock[name] ? @stock[name][:juice] : nil
    end

    private

    # 在庫を減らす
    def reduce_stock(name)
        if @stock[name] && @stock[name][:count] > 0
            @stock[name][:count] -= 1
        end
    end

    # 売り上げを増やす
    def increase_sales(amount)
        @sales += amount
    end
end

# 動作テスト
suica = Suica.new
vending_machine = VendingMachine.new

# 自動販売機の在庫補充
vending_machine.add_stock("Monster", 10)
# Suicaの現在のチャージ残高
puts suica.get_current_balance
# Monsterの在庫取得
puts vending_machine.get_stock("Monster")

# Monsterを購入
vending_machine.purchase("Monster", suica)
# Suicaの現在のチャージ残高
puts suica.get_current_balance
# 自動販売機の売上取得
puts vending_machine.get_current_sales
# 購入できるジュースリスト
puts vending_machine.available_drinks(suica)
