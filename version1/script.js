// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = '#fff';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    }

    // 숫자 카운터 애니메이션
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeProgress * target);

                stat.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };

            requestAnimationFrame(updateNumber);
        });
    }

    // 스크롤 시 애니메이션 트리거
    const aboutSection = document.querySelector('.about');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateNumbers();
            }
        });
    }, { threshold: 0.3 });

    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // 스크롤 애니메이션
    const fadeElements = document.querySelectorAll('.feature-card, .service-card, .vehicle-card, .stat-card');

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // 폼 제출 처리
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const departure = document.getElementById('departure').value;
            const destination = document.getElementById('destination').value;
            const cargo = document.getElementById('cargo').value;

            if (!name || !phone || !departure || !destination || !cargo) {
                showNotification('필수 항목을 모두 입력해주세요.', 'error');
                return;
            }

            showNotification('견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            contactForm.reset();
        });
    }

    // 알림 메시지
    function showNotification(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 16px 24px;
            border-radius: 8px;
            background: ${type === 'success' ? '#1e40af' : '#dc2626'};
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 애니메이션 키프레임
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification button {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});
