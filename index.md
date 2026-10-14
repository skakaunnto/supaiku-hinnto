<style>
/* 全体のフォントなどの基本調整 */
body {
    font-family: sans-serif;
    line-height: 1.6;
}

/* カードを並べるコンテナ */
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 25px;
    max-width: 1400px;
    margin: 30px auto;
}

/* カード・通常のコード枠（共通スタイル） */
.main-card, .code-block {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #333333;
    border: 1px solid #e0e0e0;
    text-align: left;
}

/* カード内の黒いプログラム枠、および独立した黒いプログラム枠 */
.main-card pre, .code-block {
    background: #2d2d2d !important;
    color: #f8f8f2 !important;
    padding: 15px !important;
    border-radius: 6px !important;
    font-family: monospace !important;
    font-size: 0.85rem;
    line-height: 1.6;
    overflow-x: auto;
    margin: 0 0 15px 0;
    border: none !important;
    box-shadow: none !important;
}

/* カードをクリックできるボタンにするための設定 */
.card-link {
    text-decoration: none;
    display: block;
    cursor: pointer;
}

/* ホバー時の演出 */
.card-link:hover .main-card {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    background-color: #fafafa;
}

/* 各項目のテーマカラー（左側の線） */
.color-sensor { border-left: 6px solid #e74c3c; }
.distance-sensor { border-left: 6px solid #3498db; }
.force-sensor { border-left: 6px solid #2ecc71; }
.gyro-sensor { border-left: 6px solid #f1c40f; }
.async-basic { border-left: 6px solid #9b59b6; } 
.async-parallel { border-left: 6px solid #1abc9c; } 
.async-loop { border-left: 6px solid #e67e22; } 

.main-card h3 {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 1.3rem;
    color: #2c3e50;
}

/* 詳細ページへの案内テキスト */
.click-hint {
    font-size: 0.8rem;
    color: #3498db;
    margin-bottom: 10px;
    font-weight: bold;
}

.main-card p {
    margin: 0 0 15px 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #555;
}

.main-card pre:last-child {
    margin-bottom: 0;
}

/* 小見出しスタイル */
.main-card h4 {
    margin: 15px 0 5px 0;
    font-size: 1rem;
    color: #34495e;
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
<pre class="code-block">
import motor
from hub import port

async def main():
    # Aポートを速度720で360度まわす
    await motor.run_for_degrees(port.A, 360, 720)
    # 2秒間まわす
    await motor.run_for_time(port.A, 2000, 720)
</pre>

### ◆ ずっと回転させる・止める
<pre class="code-block">
# 指定した速度でずっと回転
motor.run(port.A, 720)
# ブレーキをかけて止める
motor.stop(port.A, stop=motor.BRAKE)
</pre>

## 👥 motor_pair （モーターペア）
2つのモーターを同期させて、ロボットを移動させるモジュールです。

### ◆ ペアの設定と基本移動
<pre class="code-block">
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
<pre class="code-block">
# その場で右にスピン旋回する（steering=100 で右スピン、-100 で左スピン）
await motor_pair.move_for_degrees(motor_pair.PAIR_1, 180, steering=100, velocity=360)

# ペアモーターを完全に停止させる
motor_pair.stop(motor_pair.PAIR_1, stop=motor.HOLD)
</pre>

---

## 🔌 センサーモジュール一覧（基本・応用・トラブル解決）

<div class="card-container">

    <!-- カラーセンサー -->
    <a href="#" class="card-link">
        <div class="main-card color-sensor">
            <h3>🎨 カラーセンサー (color_sensor)</h3>
            <div class="click-hint">👉 クリックで詳細ページを開く（準備中）</div>
            <p>周囲の色や反射光の強さを測定します。ライントレースや特定の色での停止に使用します。</p>
            
            <h4>① 色の常時監視（非同期）</h4>
<pre>
import color_sensor
import runloop
from hub import port

async def main():
    while True:
        color = color_sensor.color(port.C)
        if color == color_sensor.RED:
            print("赤を検知！")
        await runloop.sleep_ms(10)

runloop.run(main())
</pre>

            <h4>② 実践：ライントレース（2値制御）</h4>
<pre>
import motor_pair
import color_sensor
from hub import port
import runloop

async def main():
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
    for _ in range(500):
        brightness = color_sensor.reflection(port.C)
        if brightness < 40:
            motor_pair.move(motor_pair.PAIR_1, steering=30, velocity=300)
        else:
            motor_pair.move(motor_pair.PAIR_1, steering=-30, velocity=300)
        await runloop.sleep_ms(10)
    motor_pair.stop(motor_pair.PAIR_1)

runloop.run(main())
</pre>
        </div>
    </a>

    <!-- 超音波距離センサー -->
    <a href="#" class="card-link">
        <div class="main-card distance-sensor">
            <h3>🦇 距離センサー (distance_sensor)</h3>
            <div class="click-hint">👉 クリックで詳細ページを開く（準備中）</div>
            <p>障害物までの距離（mm）を測定します。壁の検知や迷路攻略に必須です。</p>
            
            <h4>① 障害物の接近を監視</h4>
<pre>
import distance_sensor
import runloop
from hub import port

async def main():
    while True:
        dist = distance_sensor.distance(port.D)
        if dist is not None and dist < 100:
            print("壁まで残り10cm以内！")
            break
        await runloop.sleep_ms(10)

runloop.run(main())
</pre>

            <h4>② トラブル解決：安全なループ待機</h4>
<pre>
while distance_sensor.distance(port.D) > 150:
    await runloop.sleep_ms(10)
</pre>
        </div>
    </a>

    <!-- フォースセンサー -->
    <a href="#" class="card-link">
        <div class="main-card force-sensor">
            <h3>🖲️ フォースセンサー (force_sensor)</h3>
            <div class="click-hint">👉 クリックで詳細ページを開く（準備中）</div>
            <p>ボタンの押し込みや圧力を測定します。バンパースイッチなどの検知に使用します。</p>
            
            <h4>① スイッチが押されるのを待つ</h4>
<pre>
import force_sensor
import runloop
from hub import port

async def main():
    print("スイッチ待ち...")
    while not force_sensor.pressed(port.E):
        await runloop.sleep_ms(10)
    print("押されました！")

runloop.run(main())
</pre>
        </div>
    </a>

    <!-- 内蔵ジャイロセンサー -->
    <a href="#" class="card-link">
        <div class="main-card gyro-sensor">
            <h3>🧭 内蔵ジャイロセンサー (imu)</h3>
            <div class="click-hint">👉 クリックで詳細ページを開く（準備中）</div>
            <p>ハブの傾きや向き（角度）を測定します。ブレのない正確な旋回を実現します。</p>
            
            <h4>① 指定角度の監視（戻り値は10倍）</h4>
<pre>
import imu
import runloop

async def main():
    imu.reset_yaw(0)
    while imu.rotation() < 900:
        await runloop.sleep_ms(5)
    print("目標角度に到達！")

runloop.run(main())
</pre>

            <h4>② 実践：ピタッと90度曲がる決定版コード</h4>
<pre>
import motor_pair
import imu
from hub import port
import runloop

async def main():
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
    imu.reset_yaw(0)
    await runloop.sleep_ms(100)
    motor_pair.move(motor_pair.PAIR_1, steering=100, velocity=200)
    
    while imu.rotation() < 900:
        await runloop.sleep_ms(5)
        
    motor_pair.stop(motor_pair.PAIR_1, stop=motor.HOLD)

runloop.run(main())
</pre>
        </div>
    </a>

</div>

---

## ⚡ 非同期処理・並行タスク一覧

<div class="card-container">

    <!-- 非同期の基本 -->
    <a href="#" class="card-link">
        <div class="main-card async-basic">
            <h3>基本：async と await</h3>
            <div class="click-hint">👉 クリックで詳細ページを開く（準備中）</div>
            <p>SPIKEの時間待ち関数などは非同期で作られているため、呼び出す時は必ず頭に「await」をつけます。</p>
<pre>
import runloop

async def main():
    print("スタート")
    await runloop.sleep_ms(1000)
    print("1秒経ちました")

runloop.run(main())
</pre>
        </div>
    </a>

    <!-- 同時並行処理 -->
    <a href="#" class="card-link">
        <div class="main-card async-parallel">
            <h3>応用：2つのタスクを同時に動かす</h3>
            <div class="click-hint">👉 クリックで詳細ページを開く（準備中）</div>
            <p>「音を鳴らす」と「画面を光らせる」など、別の処理を完全に同時に並行して実行させる技法です。</p>
<pre>
import runloop
import sound
import hub

async def task_sound():
    while True:
        await sound.play_beep(60, 200)
        await runloop.sleep_ms(1000)

async def task_light():
    while True:
        await hub.light_matrix.write("!")
        await runloop.sleep_ms(500)

async def main():
    runloop.create_task(task_sound())
    runloop.create_task(task_light())
    
    while True:
        await runloop.sleep_ms(10)

runloop.run(main())
</pre>
        </div>
    </a>

    <!-- 無限ループのフリーズ防止 -->
    <a href="#" class="card-link">
        <div class="main-card async-loop">
            <h3>重要：無限ループのフリーズ防止</h3>
            <div class="click-hint">👉 クリックで詳細ページを開く（準備中）</div>
            <p>whileループの中に待機処理を入れないとハブのシステム全体がフリーズします。必ず休憩を挟みます。</p>
<pre>
import runloop

async def main():
    while True:
        print("ループ中")
        await runloop.sleep_ms(1)

runloop.run(main())
</pre>
        </div>
    </a>

</div>

---

## ⚙️ runloop （実行ループ）
SPIKEのプログラムを正しく制御し、並行処理や待機を行うための必須モジュールです。

<pre class="code-block">
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

## 💡 その他の応用テクニック

### 1. ハブのライトマトリクス（5x5画面）に文字や絵を出す
デバッグや、センサーの値をハブの画面で確認したいときに役立ちます。

<pre class="code-block">
import hub
import runloop

async def main():
    # ハブの画面に「GO」という文字をスクロール表示する
    await hub.light_matrix.write("GO")
    
    # 画面にビルトインの笑顔マークを出します
    hub.light_matrix.show(hub.light_matrix.IMAGE_HAPPY)

runloop.run(main())
</pre>

### 2. ハブの「BEEP音（スピーカー）」を鳴らす
プログラムが特定の場所まで到達したか、センサーが反応したかを「音」で知らせるデバッグテクニックです。

<pre class="code-block">
import sound
import runloop

async def main():
    # 高い音（音高 60、100ミリ秒間）を鳴らす
    await sound.play_beep(60, 100)
    
    # 音量を変更する（0 〜 100%）
    sound.volume(50)

runloop.run(main())
</pre>
