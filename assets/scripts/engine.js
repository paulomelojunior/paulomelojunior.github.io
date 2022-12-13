function formatValue(coin, val) {
	return (
		`${coin} ` + Intl.NumberFormat('pt-BR', {
			maximumFractionDigits: 2,
			minimumFractionDigits: 2
		}).format(val)
	)
}

function getPrices() {
	fetch('https://economia.awesomeapi.com.br/last/USD-BRL,BTC-BRL')
		.then(response => response.json())
		.then(prices => { 
			const price = {
				btc: Number(prices.BTCBRL.bid * 1000),
				usd: Number(prices.USDBRL.bid).toFixed(2)
			}
			document.querySelector('#btc').value = price.btc
			document.querySelector('#usd').value = Number(price.usd)
		})
		.catch(erro => {
			console.log(erro)
		});
}

getPrices()

const values = ['brl', 'sat', 'btc', 'usd']

function getValue() {
	const result = values.reduce((acc, current) => {
		acc[current] = document.querySelector(`#${current}`).value
		return acc
	}, {})

	return result
}

function getResult() {
	const satLabel = document.querySelector('label[for="sat"]')
	const {brl, sat, btc, usd} = getValue()
	let pnl = (sat * btc) - brl

	if(sat != 0 && usd != 0) {
		profitAndLoss.innerHTML = formatValue('BRL', pnl)
		turningPoint.innerHTML = formatValue('BRL', brl / sat)
		
		profitAndLoss__usd.innerHTML = formatValue('USD', pnl / usd)
		turningPoint__usd.innerHTML = formatValue('USD', brl / sat / usd)
		
		brlSaved.innerHTML = formatValue('BRL', sat * btc)
		usdSaved.innerHTML = formatValue('USD', sat * btc / usd)
		
		let valueColor
		
		pnl > 0 ? valueColor = 'green' : valueColor = 'red'
		
		profitAndLoss.className = `color-${valueColor}`

		satLabel.removeAttribute('class')
	} else {
		profitAndLoss.innerHTML = formatValue('BRL', 0)
		turningPoint.innerHTML = formatValue('BRL', 0)
		
		profitAndLoss__usd.innerHTML = formatValue('USD', 0)
		turningPoint__usd.innerHTML = formatValue('USD', 0)

		profitAndLoss.removeAttribute('class')

		satLabel.classList.add('color-red')
	}
}