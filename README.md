# Plurk IMG viewer v0.3.1

> 最後更新日 2021/05/25

## 功能

-   快速檢視河道圖片
-   預覽範圍：
    1. 使用者上傳到河道的圖片
    2. twitter 貼文的附圖
    3. Youtube 影片的自訂縮圖
    4. 手動轉文的貼文附圖

## 使用方式

1. github 專案上方綠色按鈕下載 ZIP 檔
2. 開啟 chrome 瀏覽器右上角選單
3. 更多工具 >> 擴充功能
4. 右上角開發人員模式啟動
5. 左上角載入未封裝項目
6. 選取整個 專案資料夾載入 (plurkimgviewer-master 或自行更換名稱，此名稱會成為 extension 的名稱)
7. 回到噗浪測試滑鼠移過圖片效果
8. 有任何問題或者建議請隨時回報！

> 右上角擴充功能 ICON，點開後可以設定圖片最大寬高

## 待更新項目

-   使用者自訂 viewer 展開位置功能
-   美化 popup 視窗

## 版本紀錄

---

> v0.3.1 - 20210527

-   利用 onerror 處理難以判斷的噗浪圖檔副檔名邏輯 (效果可呈現但 console 可能會跳 404)
-   原 imgs 排除條件改為\_mt 與 avatar
-   支援 live.staticflickr.com 網域
-   支援 plurk.com/p/ 噗浪系統轉貼附圖
-   將 Loading 圖更換為噗浪肉骨獸

> v0.3.0 - 20210526

-   修正 popup 視窗只在 install 執行一次之錯誤
-   加入 twitter 與 youtube 預覽功能

> v0.2.1 - 20210525

-   升級至 manifest.json V3 規範
-   移除 background 行為
-   設定僅作用於噗浪(綁定 https)
-   移除非必要的 jQuery 依賴
-   非河道頁面不觸發

> v0.2.0 - 20210525

-   改變 loading 行為邏輯，圖片失去滑鼠焦點後模糊化
-   程式碼微幅簡化

> v0.1.1 - 20210524

-   取消手動 key in 寬高，添加圖片垂直置中程式
-   修正 object-fit，避免圖片放大

---

## 作者

鄭安
starknows99@gmail.com
