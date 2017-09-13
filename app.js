document.addEventListener('DOMContentLoaded', function() {

  // ............. slider .................

  var next = document.querySelector(".next");
  var prev = document.querySelector(".prev");
  var slides = document.querySelectorAll(".slider-cnt .slide");
  var index = 0;

  slides[index].classList.add('visible');

  next.addEventListener('click', function() {
    if (index === slides.length-1) {
      slides[index].classList.remove('visible');
      index = 0;
      slides[index].classList.add('visible');
    } else {
      slides[index].classList.remove('visible');
      index++;
      slides[index].classList.add('visible');
    }
  })

  prev.addEventListener('click', function() {
    if (index === 0) {
      slides[index].classList.remove('visible');
      index = slides.length-1;
      slides[index].classList.add('visible');
    } else {
      slides[index].classList.remove('visible');
      index--;
      slides[index].classList.add('visible');
    }
  })

  // ............. calculator .................

  //myChair - zmienna przechowujaca konfiguracje fotela w zaleznosci od wartosci select-ów
  var myChair = {
    model: {
      name: '',
      price: 0
    },
    material: {
      name: '',
      price: 0
    },
    color: {
      name: '',
      price: 0
    },
    transport: {
      price: 0
    },
    calculatePrice: function() {
      return this.model.price + this.material.price + this.color.price + this.transport.price + " zł";
    }
  };
  //modelInfo - zmienna przechowujaca ceny foteli
  var modelInfo = {
    'Chair Clair': 669,
    'Chair Margarita': 899,
    'Chair Selena': 1499
  }
  //modelInfo - zmienna przechowujaca informacje o doplatach za poszczegolne kolory
  var colorInfo = {
    'Czerwony': 149,
    'Czarny': 0,
    'Pomarańczowy': 249
  }
  //modelInfo - zmienna przechowujaca informacje o doplatach za materialy
  var materialInfo = {
    'Tkanina': 0,
    'Skóra': 599
  }
  var transportPrice = 99;
  var calculatorForm = document.querySelector('.section-calculator form');
  var chairModelSelect = document.querySelector('select[name = "model"]');
  var chairColorSelect = document.querySelector('select[name = "color"]');
  var chairMaterialSelect = document.querySelector('select[name = "material"]');
  var transportAdded = document.querySelector('.checkbox-label input[type="checkbox"]');
  var summaryList = document.querySelector('.summary-list ul');
  var summaryPrices = document.querySelector('.summary-prices ul');
  var summaryTotalAmount = document.querySelector('.summary-total-amount');

  //umozliwienie rozwiniecia pol kolor i material dopiero po wybraniu modelu fotela
  calculatorForm.addEventListener('click', function() {
    if (chairModelSelect.value !== '') {
      chairColorSelect.removeAttribute('disabled');
      chairMaterialSelect.removeAttribute('disabled');
    }
  })
  //sledzenie zmian wartosci pola select z modelami foteli i aktualizacja zmiennej myChair
  chairModelSelect.addEventListener('change', function(event) {
      myChair.model.name = chairModelSelect.value;
      myChair.model.price = modelInfo[chairModelSelect.value];
      summaryList.children[0].innerText = myChair.model.name;
      summaryPrices.children[0].innerText = myChair.model.price;
      summaryTotalAmount.innerText = myChair.calculatePrice();
  })
  //sledzenie zmian wartosci pola select z kolorami foteli i aktualizacja zmiennej myChair
  chairColorSelect.addEventListener('change', function(event) {
      myChair.color.name = chairColorSelect.value;
      myChair.color.price = colorInfo[chairColorSelect.value];
      summaryList.children[1].innerText = myChair.color.name;
      summaryPrices.children[1].innerText = '+ ' + myChair.color.price;
      summaryTotalAmount.innerText = myChair.calculatePrice();
  })
  //sledzenie zmian wartosci pola select z materialami i aktualizacja zmiennej myChair
  chairMaterialSelect.addEventListener('change', function(event) {
      myChair.material.name = chairMaterialSelect.value;
      myChair.material.price = materialInfo[chairMaterialSelect.value];
      summaryList.children[2].innerText = myChair.material.name;
      summaryPrices.children[2].innerText = '+ ' + myChair.material.price;
      summaryTotalAmount.innerText = myChair.calculatePrice();
  })
  //sledzenie zaznaczenia opcji transport i aktualizacja zmiennej myChair
  transportAdded.addEventListener('click', function(event) {
      if (transportAdded.checked) {
        myChair.transport.price = transportPrice;
        summaryList.children[3].innerText = 'Transport';
        summaryPrices.children[3].innerText = '+ ' + myChair.transport.price;
      } else {
        myChair.transport.price = 0;
        summaryList.children[3].innerText = '';
        summaryPrices.children[3].innerText = '';
      }
      summaryTotalAmount.innerText = myChair.calculatePrice();
  })

})
