const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.calculator-display');

let firstOperand = null; // 첫 번째 피연산자
let operator = null;     // 연산자

// 계산을 수행하는 함수
function calculate(firstOperand, operator, secondOperand) {
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);

    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '÷':
            return secondOperand === 0 ? 'Error' : firstOperand / secondOperand; // 0으로 나누는 경우 처리
        case '%':
            return firstOperand % secondOperand; // 모듈로 연산
        default:
            return secondOperand; // 기본값: 두 번째 피연산자 반환
    }
}

buttons.forEach((eachBtn) => {
    eachBtn.addEventListener('click', () => {
        const numText = eachBtn.textContent;

        if (eachBtn.classList.contains("num")) {  // 숫자 버튼 클릭 시
            if (display.textContent === '0') {
                display.textContent = numText;  // 초기 값이 0일 때 클릭한 숫자로 변경
            } else {
                display.textContent += numText; // 기존 디스플레이 값에 숫자 추가
            }
        } else if (eachBtn.classList.contains("operator")) { // 연산기호 버튼 클릭 시
            if (firstOperand === null) {
                firstOperand = display.textContent; // 첫 번째 피연산자가 null이면 디스플레이 값을 저장
            } else {
                const secondOperand = display.textContent; // 두 번째 피연산자로 현재 디스플레이 값을 저장
                const result = calculate(firstOperand, operator, secondOperand); // 계산 수행
                display.textContent = result; // 계산 결과를 디스플레이에 표시
                firstOperand = result; // 결과를 첫 번째 피연산자로 설정
            }
            operator = numText;  // 클릭된 연산기호 저장

            console.log("firstOperand:", firstOperand);
            console.log("operator:", operator);

            // 다음 입력을 위해 디스플레이 초기화
            display.textContent = '0'; 
        } else if (numText === '=') { // '=' 버튼 클릭 시
            if (firstOperand !== null && operator !== null) {
                const secondOperand = display.textContent; // 현재 디스플레이 값을 두 번째 피연산자로 저장
                const result = calculate(firstOperand, operator, secondOperand); // 계산 수행
                display.textContent = result; // 결과를 디스플레이에 표시
                
                // 계산 후 변수 초기화
                firstOperand = null;
                operator = null;

                
            }
        }

        // C 버튼 클릭 시 처리 (리셋 기능)
        if (eachBtn.textContent === 'C') {
            firstOperand = null; // 첫 번째 피연산자 초기화
            operator = null; // 연산자 초기화
            display.textContent = '0'; // 디스플레이 초기화
        }
    });
});
