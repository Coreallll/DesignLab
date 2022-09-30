"use strict";

//navigation    
document.querySelectorAll('.header__nav-link').forEach(function (navLink) {
  navLink.addEventListener('click', function (e) {
    document.querySelectorAll('.header__nav-link').forEach(function (unactive) {
      unactive.classList.remove('header__nav-link--active');
    });
    e.currentTarget.classList.add('header__nav-link--active');
  });
}); //range-slider

var rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [20000000],
    connect: 'lower',
    step: 10,
    range: {
      'min': [10000000],
      'max': [40000000]
    },
    pips: {
      mode: 'positions',
      values: [0, 34, 65, 100],
      density: 100,
      format: wNumb({
        decimals: 0,
        encoder: function encoder(value) {
          return value / 1000000;
        }
      })
    }
  });
  var inputPrice = document.getElementById('input-slider');
  var noUiPlus = document.querySelectorAll('.noUi-value-large');
  noUiPlus[3].textContent = '40+';
  console.log(noUiPlus);
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputPrice.value = Math.round(values[handle]);
    inputPrice.value = new Intl.NumberFormat('ru-RU').format(inputPrice.value);
  });
  inputPrice.addEventListener('change', function (e) {
    rangeSlider.noUiSlider.set(e.currentTarget.value);
  });
}

; //square

var inputSquare = document.querySelector('.form-order__input-square');
var btnMin = document.querySelector('.form-order__button-min');
var btnPlus = document.querySelector('.form-order__button-plus');
inputSquare.value = 200;
btnMin.addEventListener('click', function (e) {
  if (inputSquare.value <= 1) {
    inputSquare.value = inputSquare.value;
  } else {
    inputSquare.value--;
  }
});
btnPlus.addEventListener('click', function (e) {
  inputSquare.value++;
}); //files    

var dropArea = document.querySelector('.form-order__file');
var dragText = document.querySelector('.form-order__file-descr--title');
var inputFile = dropArea.querySelector('input');
var fileNameBlock = document.getElementById('file-name-block');
var btnFileDelete = document.querySelectorAll('.btn-file-cross');
var file; //this is a global variable and we'll use it inside multiple functions

var fileText = "";
inputFile.addEventListener('change', function () {
  if ('files' in inputFile) {
    if (inputFile.files.length == 0) {
      fileText = "";
    } else {
      for (var i = 0; i < inputFile.files.length; i++) {
        fileText += "<div class='file-block'><button class='btn-reset btn-file-cross'></button>";
        var _file = inputFile.files[i];

        if ('name' in _file) {
          fileText += "<span>filename-" + _file.name + "</span></div>";
        }
      }
    }
  } else {
    if (inputFile.value == "") {
      fileText += "";
    } else {
      fileText += "Разрешение файлов не поддерживается" + inputFile.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
    }
  }

  fileNameBlock.innerHTML = fileText;
  console.log(inputFile.files.length);
});
inputFile.addEventListener('change', function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add('form-order__file--active');
}); //If user Drag File Over DropArea

dropArea.addEventListener('dragover', function (event) {
  event.preventDefault(); //preventing from default behaviour

  dropArea.classList.add('form-order__file--active');
  dragText.textContent = "Поместите файлы в данное поле.";
}); //If user leave dragged File from DropArea

dropArea.addEventListener('dragleave', function () {
  dropArea.classList.remove('form-order__file--active');
  dragText.textContent = "Кликните или перенесите файлы в эту область.";
});
dropArea.addEventListener('drop', function (event) {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one

  file = event.dataTransfer.files[0];
  var fileText = "";
  var uploadDragFiles = event.dataTransfer.files;
  var fileName = file.name; //getting selected file type

  var fileType = file.type; //getting selected file type

  var validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array

  if (uploadDragFiles.length == 0) {
    fileText = "";
  } else {
    for (var i = 0; i < uploadDragFiles.length; i++) {
      fileText += "<div class='file-block'><button class='btn-reset btn-file-cross'></button>";
      fileText += "<span>filename-" + fileName + "</span></div>";
    }
  }

  if (validExtensions.includes(fileType)) {
    //if user selected file is an image file
    var fileReader = new FileReader(); //creating new FileReader object

    var fileDropBlock = fileReader.onload = function () {
      var fileURL = fileReader.result; //passing user file source in fileURL variable

      fileNameBlock.innerHTML = fileText; //adding that created file name inside area container
    };

    fileReader.readAsDataURL(file);
  } else {
    alert("Недопустимый формат файла");
    dropArea.classList.remove("form-order__file--active");
    dragText.textContent = "Поместите файлы в данное поле.";
  }

  dropArea.classList.remove("form-order__file--active");
  dragText.textContent = "Кликните или перенесите файлы в эту область.";
});
dropArea.addEventListener('mouseenter', function () {
  dropArea.classList.add("form-order__file--active");
});
dropArea.addEventListener('mouseleave', function () {
  dropArea.classList.remove("form-order__file--active");
}); //choices

document.addEventListener('DOMContentLoaded', function () {
  var selectChoice = document.getElementById('selectMaterials');
  var selectorChoices = new Choices(selectChoice, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: ''
  });
  var inputChoice = document.getElementById('choices-text-remove-button');
  var textChoices = new Choices(inputChoice, {
    allowHTML: true,
    delimiter: ',',
    editItems: true,
    maxItemCount: 5,
    removeItemButton: true,
    placeholder: true,
    placeholderValue: 'укажите через запятую',
    addItemText: function addItemText(value) {
      return "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 Enter \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C: <b>\"".concat(value, "\"</b>");
    },
    maxItemText: function maxItemText(maxItemCount) {
      return "\u041C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E ".concat(maxItemCount, " \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439");
    }
  });
  var choicesWishes = document.querySelectorAll('.choices');
  var choicesInput = document.querySelectorAll('.choices__input');
  var choicesReset = document.querySelectorAll('.choices__inner');
  var choicesDropdown = document.querySelectorAll('.choices__list--dropdown');
  choicesDropdown[1].classList.add('choices-dropdown-custom');
  choicesReset[1].classList.add('choices-reset');
  choicesInput[2].addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      //checks whether the pressed key is "Enter"
      choicesWishes[1].classList.add('choices-wishes');
    }
  });
}); //password

var passInput = document.querySelector('.form-order__input-password');
var passBtn = document.querySelector('.password-btn');
passBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (passInput.getAttribute('type') == 'password') {
    passInput.setAttribute('type', 'text');
  } else {
    passInput.setAttribute('type', 'password');
  }

  ;
}); //tabs

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.gallery__filter-btn').forEach(function (filterBtn) {
    filterBtn.addEventListener('click', function (event) {
      var path = event.currentTarget.dataset.path;
      var pag = event.currentTarget.dataset.pag;
      document.querySelectorAll('.swiper-spoiler').forEach(function (filterSpoiler) {
        filterSpoiler.classList.remove('swiper-spoiler--active');
      });
      document.querySelector("[data-target=\"".concat(path, "\"]")).classList.add('swiper-spoiler--active');
      document.querySelectorAll('.swiper-pagination').forEach(function (pagination) {
        pagination.classList.remove('swiper-pagination--active');
      });
      document.querySelector("[data-target=\"".concat(pag, "\"]")).classList.add('swiper-pagination--active');
      document.querySelectorAll('.gallery__filter-btn').forEach(function (filterBtn) {
        filterBtn.classList.remove('gallery__filter-btn--active');
      });
      document.querySelector("[data-path=\"".concat(path, "\"]")).classList.add('gallery__filter-btn--active');
    });
  });
}); //Swiper

var swiperBathhouse = new Swiper('.swiper-bathhouse', {
  slidesPerView: 4,
  grid: {
    rows: 2,
    fill: "row"
  },
  slidesPerGroup: 4,
  spaceBetween: 23,
  simulateTouch: true,
  pagination: {
    el: '.swiper-pagination--bathhouse',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next--bathhouse',
    prevEl: '.swiper-button-prev--bathhouse'
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
      simulateTouch: true
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      simulateTouch: true
    },
    1441: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      },
      slidesPerGroup: 4,
      spaceBetween: 23
    }
  }
});
var swiperSauna = new Swiper('.swiper-sauna', {
  slidesPerView: 4,
  grid: {
    rows: 2,
    fill: "row"
  },
  slidesPerGroup: 4,
  spaceBetween: 23,
  simulateTouch: true,
  pagination: {
    el: '.swiper-pagination--sauna',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next--sauna',
    prevEl: '.swiper-button-prev--sauna'
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
      simulateTouch: true
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      simulateTouch: true
    },
    1441: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      },
      slidesPerGroup: 4,
      spaceBetween: 23
    }
  }
});
var swiperHammam = new Swiper('.swiper-hammam', {
  slidesPerView: 4,
  grid: {
    rows: 2,
    fill: "row"
  },
  slidesPerGroup: 4,
  spaceBetween: 23,
  simulateTouch: true,
  pagination: {
    el: '.swiper-pagination--hammam',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next--hammam',
    prevEl: '.swiper-button-prev--hammam'
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
      simulateTouch: true
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      simulateTouch: true
    },
    1441: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      },
      slidesPerGroup: 4,
      spaceBetween: 23
    }
  }
});
var swiperPool = new Swiper('.swiper-pool', {
  slidesPerView: 4,
  grid: {
    rows: 2,
    fill: "row"
  },
  slidesPerGroup: 4,
  spaceBetween: 23,
  simulateTouch: true,
  pagination: {
    el: '.swiper-pagination--pool',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next--pool',
    prevEl: '.swiper-button-prev--pool'
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
      simulateTouch: true
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      simulateTouch: true
    },
    1441: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      },
      slidesPerGroup: 4,
      spaceBetween: 23
    }
  }
}); //validate

document.addEventListener('DOMContentLoaded', function () {
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);
  var validation = new JustValidate('.form-order', {
    errorLabelStyle: {
      color: ''
    }
  });
  validation.addField('#name', [{
    rule: 'required',
    errorMessage: 'Введите название'
  }, {
    rule: 'minLength',
    value: 3,
    errorMessage: 'Введите минимум 3 символа'
  }, {
    rule: 'maxLength',
    value: 25,
    errorMessage: 'Максимальное значение 25 символов'
  }]).addField('#phone', [{
    validator: function validator(name, value) {
      var phone = selector.inputmask.unmaskedvalue();
      console.log(phone);
      return Number(phone) && phone.length === 10;
    },
    errorMessage: 'Введите номер телефона'
  }]).addField('#email', [{
    rule: 'required',
    errorMessage: 'Введите e-mail'
  }, {
    rule: 'email',
    errorMessage: 'Пример username@gmail.com'
  }]).addField('#password', [{
    rule: 'required',
    errorMessage: 'Введите пароль'
  }, {
    rule: 'minLength',
    value: 8,
    errorMessage: 'Пароль должен содержать минимум 8 символов'
  }, {
    rule: 'password',
    errorMessage: 'Пароль должен содержать 1 цифру и <br>1 букву латинского алфавита'
  }]);
}); //lazyload

var lazyLoadInstance = new LazyLoad({});