// Управление появлением/исчезновением плеера при наведении
document.addEventListener('DOMContentLoaded', function() {
    const playerContainer = document.getElementById('player-container');
    const playerHoverArea = document.querySelector('.player-hover-area');
    
    if (!playerContainer || !playerHoverArea) return;
    
    let hideTimeout;
    let isPlayerVisible = false;
    let isMouseOverPlayer = false;
    let isMouseOverHoverArea = false;
    
    // Функция показа плеера
    function showPlayer() {
        if (isPlayerVisible) return;
        
        clearTimeout(hideTimeout);
        playerContainer.style.transform = 'translateY(0)';
        playerContainer.style.opacity = '1';
        playerContainer.style.visibility = 'visible';
        isPlayerVisible = true;
    }
    
    // Функция скрытия плеера
    function hidePlayer() {
        if (!isPlayerVisible) return;
        
        // Проверяем, находится ли курсор над плеером или областью активации
        if (isMouseOverPlayer || isMouseOverHoverArea) {
            return; // Не скрываем, если курсор все еще над плеером
        }
        
        hideTimeout = setTimeout(() => {
            // Дополнительная проверка перед скрытием
            if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                playerContainer.style.transform = 'translateY(100%)';
                playerContainer.style.opacity = '0';
                playerContainer.style.visibility = 'hidden';
                isPlayerVisible = false;
            }
        }, 1500);
    }
    
    // Обработчики для области активации
    playerHoverArea.addEventListener('mouseenter', function() {
        isMouseOverHoverArea = true;
        showPlayer();
    });
    
    playerHoverArea.addEventListener('mouseleave', function() {
        isMouseOverHoverArea = false;
        // Не скрываем сразу, даем время для перехода на плеер
        setTimeout(() => {
            if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                hidePlayer();
            }
        }, 100);
    });
    
    // Обработчики для плеера
    playerContainer.addEventListener('mouseenter', function() {
        isMouseOverPlayer = true;
        clearTimeout(hideTimeout);
        showPlayer();
    });
    
    playerContainer.addEventListener('mouseleave', function() {
        isMouseOverPlayer = false;
        // Не скрываем сразу, даем время для перехода на область активации
        setTimeout(() => {
            if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                hidePlayer();
            }
        }, 100);
    });
    
    // Дополнительно: показываем плеер при клике на область активации
    playerHoverArea.addEventListener('click', function(e) {
        e.preventDefault();
        showPlayer();
    });
    
    // Отслеживание движения мыши для более точного определения позиции
    document.addEventListener('mousemove', function(e) {
        const playerRect = playerContainer.getBoundingClientRect();
        const hoverAreaRect = playerHoverArea.getBoundingClientRect();
        
        // Проверяем, находится ли курсор в пределах плеера
        const isOverPlayer = e.clientY >= playerRect.top && 
                           e.clientY <= playerRect.bottom && 
                           e.clientX >= playerRect.left && 
                           e.clientX <= playerRect.right;
        
        // Проверяем, находится ли курсор в пределах области активации
        const isOverHoverArea = e.clientY >= hoverAreaRect.top && 
                              e.clientY <= hoverAreaRect.bottom && 
                              e.clientX >= hoverAreaRect.left && 
                              e.clientX <= hoverAreaRect.right;
        
        // Обновляем состояние
        if (isOverPlayer && !isMouseOverPlayer) {
            isMouseOverPlayer = true;
            clearTimeout(hideTimeout);
            showPlayer();
        } else if (!isOverPlayer && isMouseOverPlayer) {
            isMouseOverPlayer = false;
            setTimeout(() => {
                if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                    hidePlayer();
                }
            }, 100);
        }
        
        if (isOverHoverArea && !isMouseOverHoverArea) {
            isMouseOverHoverArea = true;
            showPlayer();
        } else if (!isOverHoverArea && isMouseOverHoverArea) {
            isMouseOverHoverArea = false;
            setTimeout(() => {
                if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                    hidePlayer();
                }
            }, 100);
        }
    });
    
    // Инициализация: скрываем плеер при загрузке страницы
    setTimeout(() => {
        playerContainer.style.transform = 'translateY(100%)';
        playerContainer.style.opacity = '0';
        playerContainer.style.visibility = 'hidden';
        isPlayerVisible = false;
    }, 100);
});
