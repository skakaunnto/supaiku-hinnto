<style>
/* センサーカードを並べるコンテナ */
.sensor-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 25px;
    max-width: 1400px;
    margin: 30px auto;
}

/* センサー枠（共通スタイル） */
.sensor-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    color: #333333;
    border: 1px solid #e0e0e0;
}

.sensor-card:hover {
    transform: translateY(-5px);
}

/* センサーごとのテーマカラー */
.color-sensor { border-left: 6px solid #e74c3c; }
.distance-sensor { border-left: 6px solid #3498db; }
.force-sensor { border-left: 6px solid #2ecc71; }
.gyro-sensor { border-left: 6px solid #f1c40f; }

.sensor-card h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.3rem;
    color: #2c3e50;
    font-family: sans-serif;
}

.sensor-card p {
    margin: 0 0 15px 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #555;
    font-family: sans-serif;
}

/* カード内のミニコード枠 */
.sensor-card pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 12px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;
    margin: 0;
}
</style>

# 📚 LEGO Education SPIKE (App 3) 公式 Python API 辞書

SPIKE アプリのナレッジベースに準拠した公式のモジュールと関数のリファレンスです。

---

[📥 ここをクリックしてVS Code用のオフライン辞書（拡張機能）をダウンロードする](./extension.spike-hint.vsix)

---

## 🏎 motor （単体モーター）
ハブに接続された個々のモーターを制御する公式モジュールです。

### ◆ モーターを指定位置まで動かす
<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
import motor
from hub import port

async def main():
    # Aポートを速度720で360度まわす
    await motor.run_for_degrees(port.A, 360, 720)
    # 2秒間まわす
    await motor.run_for_time(port.A, 2000, 720)
</pre>

### ◆ ずっと回転させる・止める
<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
# 指定した速度でずっと回転
motor.run(port.A, 720)
# ブレーキをかけて止める
motor.stop(port.A, stop=motor.BRAKE)
</pre>

## 👥 motor_pair （モーターペア）
2つのモーターを同期させて、ロボットを移動させるモジュールです。

### ◆ ペアの設定と基本移動
<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
import motor_pair
from hub import port

# 左モーターをA、右モーターをBに設定
motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
# まっすぐ360度分進む
await motor_pair.move_for_degrees(motor_pair.PAIR_1, 360, steering=0, velocity=720)

# まっすぐ2000ミリ秒（2秒間）進む
await motor_pair.move_for_time(motor_pair.PAIR_1, 2000, steering=0, velocity=720)
</pre>

### ◆ 旋回（曲がる）と停止
<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
# その場で右にスピン旋回する（steering=100 で右スピン、-100 で左スピン）
await motor_pair.move_for_degrees(motor_pair.PAIR_1, 180, steering=100, velocity=360)

# ペアモーターを完全に停止させる
motor_pair.stop(motor_pair.PAIR_1, stop=motor.HOLD)
</pre>

---

## 🔌 センサー（無限ループ・非同期処理対応）

<div class="sensor-container">

    <!-- カラーセンサー -->
    <div class="sensor-card color-sensor">
        <h3>🎨 カラーセンサー (color_sensor)</h3>
        <p>周囲の色や反射光の強さを測定します。非同期ループで常に色を監視するコードです。</p>
<pre>
import color_sensor
import runloop
from hub import port

async def main():
    # 無限ループで色を監視（非同期処理）
    while True:
        color = color_sensor.color(port.C)
        if color == color_sensor.RED:
            print("赤を検知！")
        # フリーズ防止の非同期待機
        await runloop.sleep_ms(10)

runloop.run(main())
</pre>
    </div>

    <!-- 超音波距離センサー -->
    <div class="sensor-card distance-sensor">
        <h3>🦇 距離センサー (distance_sensor)</h3>
        <p>障害物までの距離（mm）を測定します。一定距離に近づくまでループで待機する非同期処理です。</p>
<pre>
import distance_sensor
import runloop
from hub import port

async def main():
    print("壁を探しています...")
    # 壁に近づくまで非同期でループ
    while True:
        dist = distance_sensor.distance(port.D)
        if dist is not None and dist < 100:
            print("壁まで残り10cm以内！")
            break # ループを抜ける
        await runloop.sleep_ms(10)

runloop.run(main())
</pre>
    </div>

    <!-- フォースセンサー -->
    <div class="sensor-card force-sensor">
        <h3>🖲️ フォースセンサー (force_sensor)</h3>
        <p>ボタンの押し込みや圧力を測定します。押されるまで非同期で「待ち続ける」ループ処理です。</p>
<pre>
import force_sensor
import runloop
from hub import port

async def main():
    print("スイッチを押してください")
    # 押されるまで無限ループで待機
    while not force_sensor.pressed(port.E):
        await runloop.sleep_ms(10)
        
    print("スイッチが押されました！")

runloop.run(main())
</pre>
    </div>

    <!-- 内蔵ジャイロセンサー -->
    <div class="sensor-card gyro-sensor">
        <h3>🧭 内蔵ジャイロセンサー (imu)</h3>
        <p>ハブの傾きや向き（角度）を測定します。指定の角度に到達するまで非同期で監視します。</p>
<pre>
import imu
import runloop

async def main():
    imu.reset_yaw(0)
    # 90度（数値は10倍の900）になるまでループ
    while imu.rotation() < 900:
        # 非同期でハブの動きをチェック
        await runloop.sleep_ms(5)
    print("90度回転しました！")

runloop.run(main())
</pre>
    </div>

</div>

---

## ⚙️ runloop （実行ループ）
SPIKEのプログラムを正しく制御し、並行処理や待機を行うための必須モジュールです。

<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
import runloop

async def main():
    # ここにメインのプログラムを書きます
    print("プログラムを開始します")
    
    # 指定した時間だけプログラムを一時停止する（例: 1000ミリ秒 = 1秒待つ）
    await runloop.sleep_ms(1000)

# メイン関数を実行ループに登録して起動する
runloop.run(main())
</pre>

---

## 🛠️ 【実践】よくあるトラブル解決と高度なテクニック

公式辞書には載っていない、プログラムを思い通りに動かすための重要なノウハウです。

### 1. 「プログラムが途中で止まらない！」を解決する（無限ループの抜け方）
センサーの値を待つ際、単純な `while True:` を使うとハブがフリーズしたようになり、ボタン操作を受け付けなくなることがあります。安全にループを回すには、必ず `runloop.sleep_ms()` を挟みます。

<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
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
</pre>

### 2. 「ジャイロセンサーでピタッと90度曲がる」コード
ロボットのバッテリー残量や床の滑りやすさに影響されず、正確に90度旋回するための決定版コードです。

<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
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
</pre>

### 3. 「ライントレース（線に沿って走る）」の基本構造
カラーセンサーの反射光（0〜100）を使って、黒い線の「境界線」をなぞるように走る基本（2値制御）のコードです。

<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
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
</pre>

### 4. ハブのライトマトリクス（5x5画面）に文字や絵を出す
デバッグ（今どのプログラムが動いているか）や、センサーの値をハブの画面で確認したいときに役立ちます。

<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
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
</pre>

### 5. ハブの「BEEP音（スピーカー）」を鳴らす
プログラムが特定の場所まで到達したか、センサーが反応したかを「音」で知らせるデバッグテクニックです。

<pre style="background:#2d2d2d; color:#f8f8f2; padding:15px; border-radius:6px; font-family:monospace; line-height:1.6;">
import sound
import runloop

async def main():
    # 高い音（音高 60、100ミリ秒間）を鳴らす
    await sound.play_beep(60, 100)
    
    # 音量を変更する（0 〜 100%）
    sound.volume(50)

runloop.run(main())
</pre>
