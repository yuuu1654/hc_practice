require_relative "suica"
require_relative "juice"

class VendingMachine
    def initialize
        @pepsi = [Juice.new("Pepsi", 150)] * 5
        @monster = [Juice.new("Monster", 230)] * 5
        @irohasu = [Juice.new("Irohasu", 120)] * 5
        @sales = 0
    end

    # 在庫を取得
    def get_stock(name)
        case name
        when "Pepsi"
            @pepsi.count
        when "Monster"
            @monster.count
        when "Irohasu"
            @irohasu.count
        else
            0
        end
    end

    # ジュースを購入できるかを判定
    def can_purchase?(name, suica)
        juice = get_juice(name)
        # 残高がジュースの値段以上で、ジュースの在庫が存在する時
        suica.get_current_balance >= juice.price && get_stock(name) > 0
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
        ["Pepsi", "Monster", "Irohasu"].select { |name| can_purchase?(name, suica) }
    end

    # 在庫を補充
    def add_stock(name, count)
        case name
        when "Pepsi"
            @pepsi += [Juice.new("Pepsi", 150)] * count
        when "Monster"
            @monster += [Juice.new("Monster", 230)] * count
        when "Irohasu"
            @irohasu += [Juice.new("Irohasu", 120)] * count
        end
    end

    # 現在の売り上げ金額を取得
    def get_current_sales
        @sales
    end

    # 指定したジュースインスタンスを返すヘルパーメソッド
    def get_juice(name)
        case name
        when "Pepsi"
            Juice.new("Pepsi", 150)
        when "Monster"
            Juice.new("Monster", 230)
        when "Irohasu"
            Juice.new("Irohasu", 120)
        end
    end

    private

    # 在庫を減らす
    def reduce_stock(name)
        case name
        when "Pepsi"
            @pepsi.pop
        when "Monster"
            @monster.pop
        when "Irohasu"
            @irohasu.pop
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

vending_machine.add_stock("Monster", 10)

puts suica.get_current_balance
puts vending_machine.get_stock("Monster")

vending_machine.purchase("Monster", suica)
puts suica.get_current_balance
puts vending_machine.get_current_sales

puts vending_machine.available_drinks(suica)