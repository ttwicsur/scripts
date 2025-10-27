// Небольшой «тематический» UX-штрих: случайные подсказки и сообщение об ошибке
    (function(){
      const hints = [
        "👻 Tip: Не говори своё настоящее имя призракам.",
        "🕸 Tip: Пароль не должен быть «pumpkin» 😉",
        "🦇 Tip: Летучие мыши — друзья, не враги.",
      ];
      const user = document.getElementById('username');
      user.placeholder = hints[Math.floor(Math.random()*hints.length)].replace('Tip: ', '');

      const form = document.getElementById('loginForm');
      const msg = document.getElementById('message');

      // Если твой admin.js сам обрабатывает submit — убери обработчик ниже.
      form.addEventListener('submit', function(e){
        // Демо-обработчик для красивого эффекта (не мешает твоему admin.js, если он preventDefault)
        msg.textContent = "…проверяем печати и прогоняем духов…";
        setTimeout(()=>{ msg.textContent = "" }, 2500);
      }, { capture: true });
    })();

console.log("🟢 Хэллуинский скрипт загружен полностью!");
