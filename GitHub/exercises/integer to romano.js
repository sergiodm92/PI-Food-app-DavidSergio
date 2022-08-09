function solution(number){
  // convert the number to a roman numeral
  if (typeof number != 'number' || !Number.isInteger(number)) {
        return null;
    }

    const ROMANOS = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
    '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
    '','I','II','III','IV','V','VI','VII','VIII','IX'];

    let digitos = String(number).split('');
  	console.log(digitos)
    let romano = '';
    let i = 3;

    while (i--) {
        romano = (ROMANOS[+digitos.pop() + (i * 10)] || '') + romano
    }

    return Array(+digitos.join('') + 1).join('M') + romano;
		}

console.log(solution(115));  // XI
console.log(solution(5544));  // XXIII
console.log(solution(8));  // VIII