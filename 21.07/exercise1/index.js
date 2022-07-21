function calcularPreco(name, price) {
  let shipping;
  if (price <= 2000) shipping = 300
  else if (price > 2000 && price <= 4000) shipping = 450
  else if (price > 4000) shipping = 700
  return (
    `O produto ${name} custa R$${price}. Seu custo de envio é
R$${shipping}. Portanto, o preço final é R$${price + shipping}`
  )
}

console.log(calcularPreco('Macbook', 2500));
console.log(calcularPreco('Celular', 500));
console.log(calcularPreco('Playstation', 4500));
