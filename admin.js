const users = [
    { username: "Samra", password: "1" },
    { username: "RockStone", password: "2" },
    { username: "5Staars", password: "3" },
    { username: "Bolgarka", password: "4"},
    { username: "Irealchik", password: "5"},
    { username: "Blekixx", password: "6"},
];

const specialUsers = [
    { username: "test", password: "test", redirect: "UgadaiPapku13" }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const specialUser = specialUsers.find(u => u.username === username && u.password === password);

    if (specialUser) {
        document.getElementById('message').textContent = "Success";
        document.getElementById('message').style.color = "green";
        window.location.href = specialUser.redirect;
        return;
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById('message').textContent = "Success";
        document.getElementById('message').style.color = "green";
        window.location.href = "UgadaiPapku13";
    } else {
        document.getElementById('message').textContent = "Wrong username or password.";
        document.getElementById('message').style.color = "red";
    }
});

console.log("Скрипт загружен!"); // Просто для проверки
