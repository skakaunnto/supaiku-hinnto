<style>
body { font-family: sans-serif; line-height: 1.6; background-color: #f8f9fa; padding: 20px; }
.card-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1200px; margin: 30px auto; }
.main-card { background-color: #ffffff; border-radius: 12px; padding: 30px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.2s ease, box-shadow 0.2s ease; color: #333333; border: 1px solid #e2e8f0; text-align: center; }
.card-link { text-decoration: none; display: block; cursor: pointer; }
.card-link:hover .main-card { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); }
.color-sensor { border-left: 6px solid #e74c3c; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.distance-sensor { border-left: 6px solid #3498db; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.force-sensor { border-left: 6px solid #2ecc71; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.gyro-sensor { border-left: 6px solid #f1c40f; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.async-basic { border-left: 6px solid #9b59b6; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.async-parallel { border-left: 6px solid #1abc9c; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.async-loop { border-left: 6px solid #e67e22; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.light-matrix { border-left: 6px solid #e84393; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.beep-sound { border-left: 6px solid #00cec9; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.main-card h3 { margin: 0 0 10px 0; font-size: 1.2rem; color: #2c3e50; }
.click-hint { font-size: 0.85rem; color: #3498db; font-weight: bold; margin: 0; }

/* 🌟 ここでコードブロックを完璧な黒色に上書きします（全角スペース無し） */
pre, code, .highlight, .highlight pre, div.highlighter-rouge .highlight {
  background-color: #1e1e1e !important;
  color: #ffffff !important;
  font-family: 'Courier New', Courier, monospace !important;
}
div.highlighter-rouge, pre {
  border: 1px solid #333333 !important;
  border-radius: 6px !important;
  padding: 15px !important;
  overflow-x: auto !important;
}
</style>

# 📚 LEGO Education SPIKE (App 3) 公式 Python API 辞書

SPIKE アプリのナレッジベースに準拠した公式モジュール・関数のリファレンス概要です。
[📥 ここをクリックしてVS Code用のオフライン辞書（拡張機能）をダウンロードする](./extension.spike-hint.vsix)

## 🏎 motor （単体モーター）

```python
import motor
from hub import port

async def main():
    await motor.run_for_degrees(port.A, 360, 720)
    await motor.run_for_time(port.A, 2000, 720)

motor.run(port.A, 720)
motor.stop(port.A, stop=motor.BRAKE)
```

## 👥 motor_pair （モーターペア）

2つのモーターを同期させて移動させるためのモジュールです。

```python
import motor_pair
from hub import port

# モーターのペアリング設定
motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

# まっすぐ進む・曲がる
await motor_pair.move_for_degrees(motor_pair.PAIR_1, 360, steering=0, velocity=720)
await motor_pair.move_for_time(motor_pair.PAIR_1, 2000, steering=0, velocity=720)
await motor_pair.move_for_degrees(motor_pair.PAIR_1, 180, steering=100, velocity=360)

# モーターペアの停止
motor_pair.stop(motor_pair.PAIR_1, stop=motor.HOLD)
```

---

## 🔌 センサー・機能別詳細メニュー（クリックで各解説ページへ）

<div class="card-container">

    <!-- ① カラーセンサー -->
    <a href="color.html" class="card-link">
        <div id="color" class="main-card color-sensor">
            <h3>🎨 カラーセンサー (color_sensor)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ② 超音波距離センサー -->
    <a href="distance.html" class="card-link">
        <div id="distance" class="main-card distance-sensor">
            <h3>🦇 距離センサー (distance_sensor)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ③ フォースセンサー -->
    <a href="force.html" class="card-link">
        <div id="force" class="main-card force-sensor">
            <h3>🖲️ フォースセンサー (force_sensor)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ④ 内蔵ジャイロセンサー -->
    <a href="imu.html" class="card-link">
        <div id="imu" class="main-card gyro-sensor">
            <h3>🧭 ジャイロセンサー (imu)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ⑤ 非同期の基本 -->
    <a href="async-basic.html" class="card-link">
        <div id="async-basic" class="main-card async-basic">
            <h3>🟣 非同期の基本 (async / await)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ⑥ 同時並行処理 -->
    <a href="async-parallel.html" class="card-link">
        <div id="async-parallel" class="main-card async-parallel">
            <h3>🟢 同時並行処理 (create_task)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ⑦ 無限ループのフリーズ防止 -->
    <a href="async-loop.html" class="card-link">
        <div id="async-loop" class="main-card async-loop">
            <h3>🟠 無限ループとフリーズ防止</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ⑧ ライトマトリクス -->
    <a href="light.html" class="card-link">
        <div id="light" class="main-card light-matrix">
            <h3>💡 ライトマトリクス (5x5画面)</h3>
            <p class="click-hint">詳しく見る ➔</p>
        </div>
    </a>

    <!-- ⑨ BEEP音 -->
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

```python
import runloop

async def main():
    print("プログラムを開始します")
    await runloop.sleep_ms(1000)

runloop.run(main())
```
