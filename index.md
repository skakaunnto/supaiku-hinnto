
theme: jekyll-theme-cayman
---

# 📚 LEGO Education SPIKE (App 3) 公式 Python API 辞書

SPIKE アプリのナレッジベースに準拠した公式のモジュールと関数のリファレンスです。

---

## 🏎️ motor （単体モーター）
ハブに接続された個々のモーターを制御する公式モジュールです。
※最新版では、時間や角度を指定して動かす際、必ず頭に `await` をつけます。

### ◆ モーターを指定位置まで動かす
```python
import motor
from hub import port

# Aポートのモーターを360度（1回転）まわす（速度: 1秒間に720度回転する速さ）
await motor.run_for_degrees(port.A, 360, 720)

# Aポートのモーターを2000ミリ秒（2秒間）まわす
await motor.run_for_time(port.A, 2000, 720)
```

### ◆ ずっと回転させる・止める
```python
# モーターを指定した速度（720度/秒）でずっと回転させる（await不要）
motor.run(port.A, 720)

# モーターを止める
# stopの種類: motor.COAST（惰性で止める）, motor.BRAKE（ブレーキ）, motor.HOLD（位置をキープ）
motor.stop(port.A, stop=motor.BRAKE)
```

---

## 👥 motor_pair （モーターペア）
2つのモーターを同期させて、ロボットを移動・旋回させる公式モジュールです。

### ◆ ペアの設定と基本移動
```python
import motor_pair
from hub import port

# PAIR_1 として、左モーターをA、右モーターをBに割り当てる
motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

# まっすぐ（steering=0）360度分だけ進む（速度720）
await motor_pair.move_for_degrees(motor_pair.PAIR_1, 360, steering=0, velocity=720)

# まっすぐ2000ミリ秒（2秒間）進む
await motor_pair.move_for_time(motor_pair.PAIR_1, 2000, steering=0, velocity=720)
```

### ◆ 旋回（曲がる）と停止
```python
# その場で右にスピン旋回する（steering=100 で右スピン、-100 で左スピン）
await motor_pair.move_for_degrees(motor_pair.PAIR_1, 180, steering=100, velocity=360)

# ペアモーターを完全に停止させる
motor_pair.stop(motor_pair.PAIR_1, stop=motor.HOLD)
```

---

## 🎨 color_sensor （カラーセンサー）
周囲の色や、地面から反射する光の強さを測定する公式モジュールです。

### ◆ 色の検知
```python
import color_sensor
from hub import port

# センサーが検知している色を取得する
# 戻り値: color_sensor.RED, color_sensor.BLUE, color_sensor.GREEN, None（色なし）など
detected_color = color_sensor.color(port.C)

if detected_color == color_sensor.RED:
    print("赤色を検知しました")
```

### ◆ 反射光の検知（ライントレース用）
```python
# 反射光の強さを取得する（戻り値: 0 〜 100 の整数値）
# 黒い線の上では数値が小さくなり、白い床の上では数値が大きくなります
brightness = color_sensor.reflection(port.C)
```

---

## 🦇 distance_sensor （距離センサー）
超音波を使って、前方の障害物までの距離を測定する公式モジュールです。

```python
import distance_sensor
from hub import port

# 障害物までの距離をミリメートル（mm）で取得する
# 戻り値: 整数（ミリメートル）。測定不能または近すぎる場合は None 
mm_distance = distance_sensor.distance(port.D)

if mm_distance is not None and mm_distance < 150:
    print("前方15cm以内に障害物があります")
```

---

## 🖲️ force_sensor （フォースセンサー）
ボタンの押し込み状態や、加えられている力（圧力）を測定する公式モジュールです。

```python
import force_sensor
from hub import port

# 1. いまボタンが押されているかどうかを調べる（戻り値: True または False）
if force_sensor.pressed(port.E):
    print("ボタンが押されています")

# 2. ボタンが押されている強さを測定する（戻り値: 0 〜 10 ニュートン）
force_n = force_sensor.force(port.E)
```

---

## 🧭 imu （内蔵ジャイロセンサー）
ハブに内蔵された6軸ジャイロを使って、ロボットの向きや傾きを測定する公式モジュールです。

```python
import imu

# ハブの現在の向き（ヨー角：旋回した角度）を取得する
# 💡注意: 戻り値は「度数の10倍」の整数で返ってきます（例: 90度のときは 900）
raw_angles = imu.rotation()
yaw_angle = raw_angles / 10  # 10で割ることで、正しい「〇度」に変換できます

# 現在の向きを「0度」として基準をリセットする
imu.reset_yaw(0)
```

---

## ⚙️ runloop （実行ループ）
SPIKEのプログラムを正しく制御し、並行処理や待機を行うための必須モジュールです。

```python
import runloop

async def main():
    # ここにメインのプログラムを書きます
    print("プログラムを開始します")
    
    # 指定した時間だけプログラムを一時停止する（例: 1000ミリ秒 = 1秒待つ）
    await runloop.sleep_ms(1000)

# メイン関数を実行ループに登録して起動する
runloop.run(main())
```
---

## 🛠️ 【実践】よくあるトラブル解決と高度なテクニック

公式辞書には載っていない、プログラムを思い通りに動かすための重要なノウハウです。

### 1. 「プログラムが途中で止まらない！」を解決する（無限ループの抜け方）
センサーの値を待つ際、単純な `while True:` を使うとハブがフリーズしたようになり、ボタン操作を受け付けなくなることがあります。安全にループを回すには、必ず `runloop.sleep_ms()` を挟みます。

```python
import color_sensor
from hub import port
import runloop

async def main():
    print("黒い線をさがしています...")
    # 反射光が30未満（黒）になるまで、プログラムを10ミリ秒ずつ休憩しながら待つ
    while color_sensor.reflection(port.C) > 30:
        await runloop.sleep_ms(10)
        
    print("黒い線をみつけました！")

runloop.run(main())
```

### 2. 「ジャイロセンサーでピタッと90度曲がる」コード
ロボットのバッテリー残量や床の滑りやすさに影響されず、正確に90度旋回するための決定版コードです。

```python
import motor_pair
import imu
from hub import port
import runloop

async def main():
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
    
    # 1. いまの向きを 0度 にリセット
    imu.reset_yaw(0)
    await runloop.sleep_ms(100) # リセットが安定するまで少し待つ
    
    # 2. 右にスピン旋回を開始（ずっと回すモード）
    motor_pair.move(motor_pair.PAIR_1, steering=100, velocity=200)
    
    # 3. ジャイロの角度が「90度（900）」になるまで監視する
    # ※imu.rotation()は10倍の数値が返るため、90度は 900 と書きます
    while imu.rotation() < 900:
        await runloop.sleep_ms(5)
        
    # 4. 90度になったらガチッと止める
    motor_pair.stop(motor_pair.PAIR_1, stop=motor.HOLD)
    print("90度旋回が完了しました")

runloop.run(main())
```

### 3. 「ライントレース（線に沿って走る）」の基本構造
カラーセンサーの反射光（0〜100）を使って、黒い線の「境界線」をなぞるように走る基本（2値制御）のコードです。

```python
import motor_pair
import color_sensor
from hub import port
import runloop

async def main():
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
    
    # 5秒間（5000ミリ秒）だけライントレースを実行する例
    for _ in range(500): 
        brightness = color_sensor.reflection(port.C)
        
        if brightness < 40: # 黒の上なら
            # 右に曲がって白の側へ出る
            motor_pair.move(motor_pair.PAIR_1, steering=30, velocity=300)
        else: # 白の上なら
            # 左に曲がって黒の側へ入る
            motor_pair.move(motor_pair.PAIR_1, steering=-30, velocity=300)
            
        await runloop.sleep_ms(10) # 10ミリ秒ごとにセンサーをチェック
        
    motor_pair.stop(motor_pair.PAIR_1)

runloop.run(main())
```

### 4. ハブのライトマトリクス（5x5画面）に文字や絵を出す
デバッグ（今どのプログラムが動いているか）や、センサーの値をハブの画面で確認したいときに役立ちます。

```python
import hub
import runloop

async def main():
    # ハブの画面に「GO」という文字をスクロール表示する
    await hub.light_matrix.write("GO")
    
    # 特定の形（笑顔など）をパッと表示する
    # 0が消灯、9が一番明るい（光の強さを0〜9で指定）
    smiley = [
        0,9,0,9,0,
        0,9,0,9,0,
        0,0,0,0,0,
        9,0,0,0,9,
        0,9,9,9,0
    ]
    hub.light_matrix.show(smiley)

runloop.run(main())
```

### 5. ハブの「BEEP音（スピーカー）」を鳴らす
プログラムが特定の場所まで到達したか、センサーが反応したかを「音」で知らせるデバッグテクニックです。

```python
import sound
import runloop

async def main():
    # 高い音（音高 60、100ミリ秒間）を鳴らす
    await sound.play_beep(60, 100)
    
    # 音量を変更する（0 〜 100%）
    sound.volume(50)

runloop.run(main())
