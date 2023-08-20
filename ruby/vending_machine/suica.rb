class Suica
    # Suicaの初期残金(balance)は500円
    def initialize
        @balance = 500
    end

    # 現在のチャージ残高を取得(getterメソッド)
    def get_current_balance
        @balance
    end

    # 支払い処理 (購入時にSuicaのチャージ残高を減らす)
    def pay(amount)
        if amount > @balance
            raise "残高が足りません"
        end
        @balance -= amount
    end

    private

    # 100円未満の金額(amount)をチャージしようとしたら例外エラー
    def charge(amount)
        if amount < 100
            raise "100円未満の金額はチャージ出来ません"
        end
        @balance += amount
    end
end