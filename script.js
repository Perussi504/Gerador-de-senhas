// Gera uma senha de 10 caracteres contendo exatamente 5 letras e 5 números
(function () {
  const generateBtn = document.getElementById('generateBtn');
  const copyBtn = document.getElementById('copyBtn');
  const passwordEl = document.getElementById('password');
  const messageEl = document.getElementById('message');
  const allowUppercaseEl = document.getElementById('allowUppercase');

  function randInt(max) {
    return Math.floor(Math.random() * max);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function randomLetter(allowUppercase) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let ch = letters[randInt(letters.length)];
    if (allowUppercase && Math.random() < 0.5) ch = ch.toUpperCase();
    return ch;
  }

  function randomDigit() {
    return String(randInt(10));
  }

  function generatePassword() {
    const allowUppercase = allowUppercaseEl.checked;
    const parts = [];
    for (let i = 0; i < 5; i++) parts.push(randomLetter(allowUppercase));
    for (let i = 0; i < 5; i++) parts.push(randomDigit());
    shuffle(parts);
    return parts.join('');
  }

  generateBtn.addEventListener('click', () => {
    const pwd = generatePassword();
    passwordEl.textContent = pwd;
    copyBtn.disabled = false;
    messageEl.textContent = 'Senha gerada com 5 letras e 5 números.';
  });

  copyBtn.addEventListener('click', async () => {
    const text = passwordEl.textContent;
    if (!text || text === '—') return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      messageEl.textContent = 'Senha copiada para a área de transferência.';
    } catch (err) {
      messageEl.textContent = 'Não foi possível copiar automaticamente.';
    }
  });

  // Gera uma senha inicial ao abrir
  document.addEventListener('DOMContentLoaded', () => {
    const initial = generatePassword();
    passwordEl.textContent = initial;
    copyBtn.disabled = false;
  });
})();
