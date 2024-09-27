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

  Calculator.prototype.selectEvent = function (e) {
    this.form.package.classList.toggle('open');
  
    const value = typeof e.target.dataset.value !== 'undefined' ? e.target.dataset.value : '';
    const text = typeof e.target.dataset.value !== 'undefined' ? e.target.innerText : 'Choose package';
  
    if (value.length > 0) {
      this.form.package.dataset.value = value;
      this.form.package.querySelector('.select__input').innerText = text;
  
      this.updateSummary('package', text, this.prices.package[value]);
    }
  };

  Calculator.prototype.checkboxEvent = function (e) {
    const checkbox = e.currentTarget;
    const id = checkbox.id;
    const checked = e.currentTarget.checked;
  
    this.updateSummary(id, undefined, this.prices[id], function (item) {
      if (!checked) {
        item.classList.remove('open');
      }
    });
  };
  
  Calculator.prototype.addEvents = function () {
    // Inputs
    this.form.products.addEventListener('change', this.inputEvent.bind(this));
    this.form.products.addEventListener('keyup', this.inputEvent.bind(this));
    this.form.orders.addEventListener('change', this.inputEvent.bind(this));
    this.form.orders.addEventListener('keyup', this.inputEvent.bind(this));
  
    // Select
    this.form.package.addEventListener('click', this.selectEvent.bind(this));
  
    // Checkboxes
    this.form.accounting.addEventListener('change', this.checkboxEvent.bind(this));
    this.form.terminal.addEventListener('change', this.checkboxEvent.bind(this));
  };
  