function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
  
    // Проверка сохранённой темы
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
    // Установка темы
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);
  
    // Обработчик клика
    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButton(newTheme);
    });
  }
  
  function updateThemeButton(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '☀️ Светлая' : '🌙 Тёмная';
      themeToggle.setAttribute('title', theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему');
    }
  }
  
  // Инициализация при загрузке
  document.addEventListener('DOMContentLoaded', initTheme);