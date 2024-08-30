function luhnAlgorithm(cardNumber) {
    let totalSum = 0;
    const reverseDigits = cardNumber.split('').reverse();

    reverseDigits.forEach((digit, i) => {
        let n = parseInt(digit, 10);
        if (i % 2 === 1) {
            n *= 2;
            if (n > 9) {
                n -= 9;
            }
        }
        totalSum += n;
    });

    return totalSum % 10 === 0;
}

function isValidCard(cardNumber) {
    if (!/^\d+$/.test(cardNumber)) { // Check if cardNumber contains only digits
        return false;
    }

    // Check if it's a Visa card
    if (([13, 16, 19].includes(cardNumber.length)) && cardNumber[0] === '4') {
        return luhnAlgorithm(cardNumber);
    }

    // Check if it's a MasterCard
    const firstTwoDigits = parseInt(cardNumber.slice(0, 2), 10);
    const firstFourDigits = parseInt(cardNumber.slice(0, 4), 10);

    if (cardNumber.length === 16 &&
        ((firstTwoDigits >= 51 && firstTwoDigits <= 55) ||
         (firstFourDigits >= 2221 && firstFourDigits <= 2720))) {
        return luhnAlgorithm(cardNumber);
    }

    return false;
}

export default isValidCard;