<link rel="icon" type="image/png" href="/supaiku-hinnto/logo.png">

<style>
/* 全体のフォントなどの基本調整（フォントの外部読み込みを廃止し、システムの標準フォントに任せる） */
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    background-color: #f8f9fa;
    padding: 20px;
}

/* カードを並べるコンテナ */
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 30px auto;
}

/* メニューカードの共通スタイル */
.main-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 30px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    color: #333333;
    border: 1px solid #e2e8f0;
    text-align: center;
}

/* カードをクリックできるボタンにするための設定 */
.card-link {
    text-decoration: none;
    display: block;
    cursor: pointer;
}

/* ホバー時に浮き上がる演出 */
.card-link:hover .main-card {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
}

/* 各項目のテーマカラー（左側のアクセント線） */
.color-sensor { border-left: 6px solid #e74c3c; }
.distance-sensor { border-left: 6px solid #3498db; }
.force-sensor { border-left: 6px solid #2ecc71; }
.gyro-sensor { border-left: 6px solid #f1c40f; }
.async-basic { border-left: 6px solid #9b59b6; } 
.async-parallel { border-left: 6px solid #1abc9c; } 
.async-loop { border-left: 6px solid #e67e22; } 
.light-matrix { border-left: 6px solid #e84393; }
.beep-sound { border-left: 6px solid #00cec9; }

/* カードのタイトル（見出し） */
.main-card h3 {
    margin: 0 0 10px 0;
    font-size: 1.3rem;
    color: #2c3e50;
}

/* クリックを促すテキスト */
.click-hint {
    font-size: 0.85rem;
    color: #3498db;
    font-weight: bold;
    margin: 0;
}
</style>


# <img src="logo.png" width="200" style="vertical-align: middle; margin-right: 10px;"> supaiku-hinnto


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

## 🔌 センサー・機能別詳細メニュー（クリックで各解説ページへ）

<div class="card-container">

    <!-- カラーセンサー -->
    <a href="color.html" class="card-link">
        <div id="color" class="main-card color-sensor">
            <h3>🎨 カラーセンサー (color_sensor)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- 超音波距離センサー -->
    <a href="distance.html" class="card-link">
        <div id="distance" class="main-card distance-sensor">
            <h3>🦇 距離センサー (distance_sensor)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- フォースセンサー -->
    <a href="force.html" class="card-link">
        <div id="force" class="main-card force-sensor">
            <h3>🖲️ フォースセンサー (force_sensor)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- 内蔵ジャイロセンサー -->
    <a href="imu.html" class="card-link">
        <div id="imu" class="main-card gyro-sensor">
            <h3>🧭 ジャイロセンサー (imu)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- 非同期の基本 -->
    <a href="async-basic.html" class="card-link">
        <div id="async-basic" class="main-card async-basic">
            <h3>🟣 非同期の基本 (async / await)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- 同時並行処理 -->
    <a href="async-parallel.html" class="card-link">
        <div id="async-parallel" class="main-card async-parallel">
            <h3>🟢 同時並行処理 (create_task)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- 無限ループのフリーズ防止 -->
    <a href="async-loop.html" class="card-link">
        <div id="async-loop" class="main-card async-loop">
            <h3>🟠 無限ループとフリーズ防止</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ライトマトリクス -->
    <a href="light.html" class="card-link">
        <div id="light" class="main-card light-matrix">
            <h3>💡 ライトマトリクス (5x5画面)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- BEEP音 -->
    <a href="sound.html" class="card-link">
        <div id="sound" class="main-card beep-sound">
            <h3>🎵 BEEP音・スピーカー制御</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

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
