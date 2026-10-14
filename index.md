<style>
/* センサーカードを並べるコンテナ */
.sensor-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 30px auto;
}

/* センサー枠（共通スタイル） */
.sensor-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    color: #333333; /* 文字を読みやすく黒に固定 */
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
    font-size: 1.25rem;
    color: #2c3e50;
    font-family: sans-serif;
}

.sensor-card p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #555;
    font-family: sans-serif;
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

## 🔌 センサー（各モジュール一覧）

<div class="sensor-container">

    <!-- カラーセンサー -->
    <div class="sensor-card color-sensor">
        <h3>🎨 カラーセンサー (color_sensor)</h3>
        <p>周囲の色（8色）や、床面から反射する光の強さ（0〜100）を測定します。ライントレースや、特定の色のブロックを検知してロボットを止めるプログラムに必須のセンサーです。</p>
    </div>

    <!-- 超音波距離センサー -->
    <div class="sensor-card distance-sensor">
        <h3>🦇 距離センサー (distance_sensor)</h3>
        <p>超音波を使って、前方にある障害物までの距離をミリメートル（mm）単位で正確に測定します。壁の手前で速度を落としたり、迷路を解いたりするロボットに最適です。</p>
    </div>

    <!-- フォースセンサー -->
    <div class="sensor-card force-sensor">
        <h3>🖲️ フォースセンサー (force_sensor)</h3>
        <p>ボタンが「押されたか・離されたか」の検知に加え、加えられている圧力の強さをニュートン（0〜10N）単位で測定します。バンパースイッチや、物を掴む力の制御に使います。</p>
    </div>

    <!-- 内蔵ジャイロセンサー -->
    <div class="sensor-card gyro-sensor">
        <h3>🧭 内蔵ジャイロセンサー (imu)</h3>
        <p>SPIKEハブに最初から内蔵されている6軸センサーです。ロボットの傾きや、旋回した正確な角度（ヨー角）をリアルタイムに検出して、ブレのない正確な移動を実現します。</p>
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
