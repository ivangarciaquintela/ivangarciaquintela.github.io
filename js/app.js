
        // Función para animar el texto "Hi, I'm Ivan"
        function animateGreeting() {
            const greetingText = "Hi, I'm Ivan.";
            const greetingElement = document.getElementById('greeting');
            let i = 0;

            function typeWriter() {
                if (i < greetingText.length) {
                    greetingElement.textContent += greetingText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50); // Velocidad de escritura (ms)
                }
            }

            typeWriter(); // Inicia la animación
        }

        function animateTrayectoria() {
            const trayectoriaContainer = document.querySelector('.trayectoria-container');
            const line = document.querySelector('.trayectoria-line');
            const items = document.querySelectorAll('.trayectoria-item');

            // Comprueba si el contenedor de la trayectoria está visible
            if (!trayectoriaContainer || trayectoriaContainer.classList.contains('hidden')) {
                return; // No hacer nada si no está visible
            }
            //Añadir clase para animar la linea
            line.classList.add('line-complete');

            //Animar los elementos
            trayectoriaContainer.classList.add('animate-trayectoria');
            let delay = 0;
            items.forEach((item) => {
                // Reseteamos la animación en cada elemento antes de volver a aplicarla
                item.classList.remove('item-visible');
                // El truco para que el reset sea INMEDIATO
                void item.offsetWidth;

                setTimeout(() => {
                    item.classList.add('item-visible');
                }, delay);
                delay += 500;
            });

        }
        //Resetea la linea, quitando clase y forzando reflow
        function resetTrayectoriaAnimation() {
            const line = document.querySelector('.trayectoria-line');
            line.classList.remove('line-complete'); // Quitar la clase
            void line.offsetWidth; // Forzar un "reflow" para reiniciar la animación
            const items = document.querySelectorAll('.trayectoria-item');

            items.forEach((item) => {
                item.classList.remove('item-visible');
                // El truco para que el reset sea INMEDIATO

            });


        }

        // Llama a la función de animación cuando la página se carga
        window.onload = () => {
            animateGreeting();

        }

        function mostrarContenido(seccion) {
            const secciones = document.querySelectorAll('.contenido-seccion');
            // Ocultar todas las secciones
            secciones.forEach(s => {
                s.classList.add('hidden');
                s.classList.remove('fade-in');
            });

            // Mostrar la sección seleccionada con un ligero retraso
            const seccionAMostrar = document.getElementById(seccion);
            seccionAMostrar.classList.add('fade-in');
            seccionAMostrar.classList.remove('hidden');

            // Llamar a animarTrayectoria() SOLO si la sección es "trayectoria"
            if (seccion === 'trayectoria') {

                // 1. Resetear ANTES de animar
                resetTrayectoriaAnimation();

                // 2. Animar
                animateTrayectoria();
            }


            // Actualizar el menú
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => item.classList.remove('active'));
            event.currentTarget.classList.add('active');
        }