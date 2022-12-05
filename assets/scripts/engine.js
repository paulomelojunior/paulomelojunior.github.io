function formatValue(coin, val) {
	return (
		`${coin} ` + Intl.NumberFormat('pt-BR', {
			maximumFractionDigits: 2,
			minimumFractionDigits: 2
		}).format(val)
	)
}

const values = ['brl', 'sat', 'btc', 'usd']

function getValue() {
	const result = values.reduce((acc, current) => {
		acc[current] = document.querySelector(`#${current}`).value
		return acc
	}, {})
	return result
}

function getResult() {
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
	}
}

document.querySelector('#submit').addEventListener('click', () => {
	getResult()
})




