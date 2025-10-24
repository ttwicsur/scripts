const users = [
    { username: "Lena", password: "1" }
];

const specialUsers = [
    { username: "test", password: "test", redirect: "UgadaiPapku13" }
];

// --- Отчёт при загрузке страницы
console.group("📊 Отчёт загрузки admin.js");

// Проверка доступности DOM-элементов
console.group("🔍 Проверка DOM");
console.log("loginForm:", document.getElementById('loginForm'));
console.log("username:", document.getElementById('username'));
console.log("password:", document.getElementById('password'));
console.log("message:", document.getElementById('message'));
console.groupEnd();

// Проверка данных пользователей
console.group("👥 Данные пользователей");
console.table(users);
console.table(specialUsers);
console.groupEnd();

// Проверка подключённых файлов (если доступны)
console.group("📁 Проверка ресурсов");
console.log("CSS файл:", "admin/style.css");
console.log("JS файл:", "scripts/admin.js");
console.log("Изображения:", "img/logo.png");
console.groupEnd();

console.groupEnd(); // конец основного отчёта

// --- Обработчик логина
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.group("🔐 Попытка входа");
    console.log("Введено имя пользователя:", username);
    console.log("Введён пароль:", password);

    const specialUser = specialUsers.find(u => u.username === username && u.password === password);
    const user = users.find(u => u.username === username && u.password === password);

    if (specialUser) {
        console.log("✅ Найден specialUser:", specialUser);
        document.getElementById('message').textContent = "Success";
        document.getElementById('message').style.color = "green";
        window.location.href = specialUser.redirect;
    } else if (user) {
        console.log("✅ Найден обычный user:", user);
        document.getElementById('message').textContent = "Success";
        document.getElementById('message').style.color = "green";
        window.location.href = "UgadaiPapku13";
    } else {
        console.warn("❌ Неверные данные для входа");
        document.getElementById('message').textContent = "Wrong username or password.";
        document.getElementById('message').style.color = "red";
    }

    console.groupEnd();
});

console.log("🟢 Скрипт admin.js загружен полностью!");
