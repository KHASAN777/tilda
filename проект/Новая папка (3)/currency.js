// Полный рабочий курс валют с несколькими источниками
document.addEventListener('DOMContentLoaded', function() {
    const currencyWidget = document.getElementById('currency-widget');
    const refreshBtn = currencyWidget.querySelector('.refresh-btn');
    
    // Загружаем курс сразу при загрузке страницы
    loadCurrencyRates();
    
    // Обновляем по клику на кнопку обновления
    refreshBtn.addEventListener('click', function() {
        refreshBtn.classList.add('rotating');
        loadCurrencyRates();
    });
    
    // Обновляем каждые 30 минут
    setInterval(loadCurrencyRates, 1800000);
});

async function loadCurrencyRates() {
    const currencyRates = document.getElementById('currency-rates');
    
    try {
        // Показываем загрузку
        currencyRates.innerHTML = `
            <div class="currency-loading">
                <div class="spinner"></div>
                <span>Загрузка курсов...</span>
            </div>
        `;
        
        // Получаем курс USD и EUR от ЦБ РФ
        const cbrResponse = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        const cbrData = await cbrResponse.json();
        
        const usdRate = cbrData.Valute.USD.Value.toFixed(2);
        const eurRate = cbrData.Valute.EUR.Value.toFixed(2);
        
        // Получаем курс KZT от другого API (пример)
        const kztResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const kztData = await kztResponse.json();
        const kztRate = (1 / kztData.rates.KZT).toFixed(2);
        
        // Форматируем дату обновления
        const updateTime = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Отображаем курсы
        currencyRates.innerHTML = `
            <div class="currency-rate">
                <span class="currency-flag">🇺🇸</span>
                <span class="currency-code">USD:</span>
                <span class="currency-value">${usdRate} ₽</span>
            </div>
            <div class="currency-rate">
                <span class="currency-flag">🇪🇺</span>
                <span class="currency-code">EUR:</span>
                <span class="currency-value">${eurRate} ₽</span>
            </div>
            <div class="currency-rate">
                <span class="currency-flag">🇰🇿</span>
                <span class="currency-code">KZT:</span>
                <span class="currency-value">${kztRate} ₽</span>
            </div>
            <div class="currency-update">
                Обновлено: ${updateTime}
            </div>
        `;
        
    } catch (error) {
        console.error('Ошибка при загрузке курсов:', error);
        
        // Запасные данные
        currencyRates.innerHTML = `
            <div class="currency-rate">
                <span class="currency-flag">🇺🇸</span>
                <span class="currency-code">USD:</span>
                <span class="currency-value">75.50 ₽</span>
            </div>
            <div class="currency-rate">
                <span class="currency-flag">🇪🇺</span>
                <span class="currency-code">EUR:</span>
                <span class="currency-value">85.20 ₽</span>
            </div>
            <div class="currency-rate">
                <span class="currency-flag">🇰🇿</span>
                <span class="currency-code">KZT:</span>
                <span class="currency-value">16.50 ₽</span>
            </div>
            <div class="currency-error">
                Не удалось загрузить актуальные курсы
            </div>
        `;
    } finally {
        document.querySelector('.refresh-btn').classList.remove('rotating');
    }
}