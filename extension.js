const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    const provider = {
        resolveWebviewView: function(webviewView) {
            webviewView.webview.options = { enableScripts: true };
            
            // ワークスペース内の index.md を読み込んで簡易的にHTML化
            const folderPath = context.extensionPath;
            const mdPath = path.join(folderPath, 'index.md');
            let mdContent = "辞書ファイルが見つかりません。";
            
            if (fs.existsSync(mdPath)) {
                mdContent = fs.readFileSync(mdPath, 'utf8');
            }

            // マークダウンのコードブロック（```python）を綺麗な黒枠HTMLに変換
            let htmlContent = mdContent
                .replace(/`([^`\n]+)`/g, '<code style="background:#2d2d2d;color:#f8f8f2;padding:2px 6px;border-radius:4px;">\$1</code>')
                .replace(/```python([\s\S]*?)```/g, '<pre style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:6px;overflow-x:auto;border:1px solid #3c3c3c;font-family:monospace;line-height:1.5;">\$1</pre>')
                .replace(/```([\s\S]*?)```/g, '<pre style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:6px;overflow-x:auto;font-family:monospace;">\$1</pre>')
                .replace(/### (.*)/g, '<h3 style="color:#4ec9b0;margin-top:20px;">\$1</h3>')
                .replace(/## (.*)/g, '<h2 style="color:#569cd6;border-bottom:1px solid #3c3c3c;padding-bottom:5px;margin-top:30px;">\$1</h2>')
                .replace(/# (.*)/g, '<h1 style="color:#cee7a3;text-align:center;">\$1</h1>')
                .replace(/\n/g, '<br>');

            webviewView.webview.html = `
                <!DOCTYPE html>
                <html>
                <body style="font-family:sans-serif;padding:10px;color:#cccccc;background-color:#1e1e1e;">
                    ${htmlContent}
                </body>
                </html>
            `;
        }
    };

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('spikeHintWebview', provider)
    );
}

function deactivate() {}

module.exports = { activate, deactivate };
