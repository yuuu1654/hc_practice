# Moduleを使ってインターフェースのように動作させる
module NameService
    private

    def change_name(new_name)
        raise NotImplementedError, "change_nameメソッドを実装して下さい"
    end

    def get_name
        raise NotImplementedError, "get_nameメソッドを実装して下さい"
    end
end

# 抽象クラスであるPokemonクラスを作成
class Pokemon
    include NameService

    # nameはprivateな変数
    def initialize
        @name = ""
    end

    # 抽象メソッドのように振る舞うメソッドを定義
    def type1
        raise NotImplementedError, "type1のゲッターメソッドを実装して下さい"
    end

    def type2
        raise NotImplementedError, "type2のゲッターメソッドを実装して下さい"
    end

    def hp
        raise NotImplementedError, "hpのゲッターメソッドを実装して下さい"
    end

    def attack
        raise NotImplementedError, "attackメソッドを実装して下さい"
    end

    # nameのセッターメソッドを定義
    def change_name(new_name)
        @name = new_name
    end

    # nameのゲッターメソッドを定義
    def get_name
        @name
    end
end

# 3.Pikachuクラス作成
class Pikachu < Pokemon
    attr_reader :type1, :type2, :hp

    def initialize(type1, type2, hp)
        super()
        @type1 = type1
        @type2 = type2
        @hp = hp
    end

    def attack
        puts "#{get_name} の100万ボルト"
    end
end

# 4.Playerクラス作成
class Player
    include NameService

    def change_name(new_name)
        @name = new_name
    end

    def get_name
        @name
    end
end
