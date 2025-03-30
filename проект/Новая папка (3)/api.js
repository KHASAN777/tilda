document.addEventListener('DOMContentLoaded', function() {
    // Функция для получения курса валют
    async function fetchCurrencyRates() {
        try {
            // В реальном проекте здесь был бы API запрос
            // Для примера используем mock данные
            const mockData = {
                usd: 75.50 + Math.random().toFixed(2),
                eur: 85.20 + Math.random().toFixed(2)
            };
            
            // Обновляем данные на странице
            document.getElementById('usd-rate').textContent = mockData.usd;
            document.getElementById('eur-rate').textContent = mockData.eur;
            
            // Обновляем каждые 5 минут
            setTimeout(fetchCurrencyRates, 300000);
        } catch (error) {
            console.error('Ошибка при получении курса валют:', error);
            // Повторяем попытку через 1 минуту в случае ошибки
            setTimeout(fetchCurrencyRates, 60000);
        }
    }
    
    // Запускаем получение курса валют
    fetchCurrencyRates();
});