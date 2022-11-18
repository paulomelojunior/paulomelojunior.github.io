function formatValue(coin, val) {
	return (
		`${coin} ` + Intl.NumberFormat('pt-BR', {
			maximumFractionDigits: 2,
			minimumFractionDigits: 2
		}).format(val)
	)
}

function getResults() {
	var brl = document.querySelector('#brl').value
	var sat = document.querySelector('#sat').value
	var btc = document.querySelector('#btc').value
	var usd = document.querySelector('#usd').value

	var pnl = (sat * btc) - brl

	profitAndLoss.innerHTML = formatValue('BRL', pnl);
	turningPoint.innerHTML = formatValue('BRL', brl / sat);

	profitAndLoss__usd.innerHTML = formatValue('USD', pnl / usd);
	turningPoint__usd.innerHTML = formatValue('USD', brl / sat / usd);

	brlSaved.innerHTML = formatValue('BRL', sat * btc);
	usdSaved.innerHTML = formatValue('USD', sat * btc / usd);

	let valueColor

	pnl > 0 ? valueColor = 'green' : valueColor = 'red'

	profitAndLoss.className = `color-${valueColor}`
}

getResults();
