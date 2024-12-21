const canvas = document.getElementById("pongCanvas");
        const ctx = canvas.getContext("2d");

        // Game settings
        const paddleWidth = 10;
        const paddleHeight = 100;
        const ballRadius = 8;

        // Paddle positions
        const player1 = { x: 0, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
        const player2 = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, score: 0 };

        // Ball position and velocity
        let ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            dx: 4 * (Math.random() > 0.5 ? 1 : -1),
            dy: 4 * (Math.random() > 0.5 ? 1 : -1),
        };

        // Key state
        const keys = {};

        // Event listeners for key presses
        window.addEventListener("keydown", (e) => (keys[e.key] = true));
        window.addEventListener("keyup", (e) => (keys[e.key] = false));

        function drawPaddle(x, y) {
            ctx.fillStyle = "#fff";
            ctx.fillRect(x, y, paddleWidth, paddleHeight);
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();
        }

        function drawScore() {
            ctx.font = "20px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText(player1.score, canvas.width / 4, 20);
            ctx.fillText(player2.score, (3 * canvas.width) / 4, 20);
        }

        function movePaddles() {
            if (keys["w"] && player1.y > 0) player1.y -= 6;
            if (keys["s"] && player1.y < canvas.height - paddleHeight) player1.y += 6;

            if (keys["ArrowUp"] && player2.y > 0) player2.y -= 6;
            if (keys["ArrowDown"] && player2.y < canvas.height - paddleHeight) player2.y += 6;
        }

        function updateBall() {
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Ball collision with top and bottom walls
            if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
                ball.dy *= -1;
            }

            // Ball collision with paddles
            if (
                ball.x - ballRadius < player1.x + paddleWidth &&
                ball.y > player1.y &&
                ball.y < player1.y + paddleHeight
            ) {
                ball.dx *= -1;
                ball.x = player1.x + paddleWidth + ballRadius;
            }

            if (
                ball.x + ballRadius > player2.x &&
                ball.y > player2.y &&
                ball.y < player2.y + paddleHeight
            ) {
                ball.dx *= -1;
                ball.x = player2.x - ballRadius;
            }

            // Ball out of bounds
            if (ball.x - ballRadius < 0) {
                player2.score++;
                resetBall();
            }

            if (ball.x + ballRadius > canvas.width) {
                player1.score++;
                resetBall();
            }
        }

        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
            ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
        }

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawPaddle(player1.x, player1.y);
            drawPaddle(player2.x, player2.y);
            drawBall();
            drawScore();

            movePaddles();
            updateBall();

            requestAnimationFrame(gameLoop);
        }

        gameLoop();
