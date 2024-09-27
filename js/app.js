function Calculator(form, summary) {
    this.prices = {
      products: 0.5,
      orders: 0.25,
      package: {
        basic: 0,
        professional: 25,
        premium: 60,
      },
      accounting: 35,
      terminal: 5,
    };
  
    this.form = {
      products: form.querySelector('#products'),
      orders: form.querySelector('#orders'),
      package: form.querySelector('#package'),
      accounting: form.querySelector('#accounting'),
      terminal: form.querySelector('#terminal'),
    };
  
    this.summary = {
      list: summary.querySelector('ul'),
      items: summary.querySelector('ul').children,
      total: {
        container: summary.querySelector('#total-price'),
        price: summary.querySelector('.total__price'),
      },
    };
  }
  

  Calculator.prototype.inputEvent = function (e) {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    const singlePrice = this.prices[id];
    const totalPrice = value * singlePrice;
  
    this.updateSummary(id, value + ' * $' + singlePrice, totalPrice, function (item, calc, total) {
      if (value < 0) {
        calc.innerHTML = null;
        total.innerText = 'Value should be greater than 0';
      }
  
      if (value.length === 0) {
        item.classList.remove('open');
      }
    });
  };
