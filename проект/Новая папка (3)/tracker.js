document.addEventListener('DOMContentLoaded', function() {
    const trackBtn = document.getElementById('track-order');
    const trackingInput = document.getElementById('tracking-number');
    const trackerResult = document.getElementById('tracker-result');
    
    // Устанавливаем минимальную дату для записи (сегодня)
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('input[type="date"]').min = today;
    
    // Заполняем варианты времени
    fillTimeSlots();
    
    trackBtn.addEventListener('click', function() {
        const orderNumber = trackingInput.value.trim();
        
        if (orderNumber) {
            // Здесь должен быть запрос к API, но используем mock данные
            const mockData = {
                number: orderNumber,
                device: "HP Pavilion 15-dk0002ur",
                issue: "Не включается, нет реакции на кнопку питания",
                status: "В процессе ремонта",
                date: "15.06.2023",
                eta: "20.06.2023",
                step: 3
            };
            
            displayOrderStatus(mockData);
        } else {
            alert("Пожалуйста, введите номер заказа");
        }
    });
    
    function displayOrderStatus(data) {
        document.getElementById('order-number').textContent = data.number;
        document.getElementById('order-device').textContent = data.device;
        document.getElementById('order-issue').textContent = data.issue;
        document.getElementById('order-status').textContent = data.status;
        document.getElementById('order-date').textContent = data.date;
        document.getElementById('order-eta').textContent = data.eta;
        
        // Обновляем прогресс
        document.querySelectorAll('.step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.toggle('active', stepNum <= data.step);
        });
        
        trackerResult.classList.remove('hidden');
    }
    
    function fillTimeSlots() {
        const timeSelect = document.querySelector('select[name="time"]');
        const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18];
        
        timeSelect.innerHTML = '<option value="">Выберите время</option>';
        
        hours.forEach(hour => {
            const option = document.createElement('option');
            option.value = `${hour}:00`;
            option.textContent = `${hour}:00 - ${hour + 1}:00`;
            timeSelect.appendChild(option);
        });
    }
});