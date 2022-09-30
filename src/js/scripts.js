//navigation    
document.querySelectorAll('.header__nav-link').forEach(function (navLink) {
  navLink.addEventListener('click', (e) => {

    document.querySelectorAll('.header__nav-link').forEach(function (unactive) {
      unactive.classList.remove('header__nav-link--active')
    });

    e.currentTarget.classList.add('header__nav-link--active');

  });
});


//range-slider
const rangeSlider = document.getElementById('range-slider');

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
        encoder: function(value) {
          return value / 1000000
        }
      })
    }
  });

  const inputPrice = document.getElementById('input-slider');
  const noUiPlus = document.querySelectorAll('.noUi-value-large');

  noUiPlus[3].textContent = '40+'

  console.log(noUiPlus);
  
  rangeSlider.noUiSlider.on('update', (values, handle) => {
    inputPrice.value =  Math.round(values[handle])
    inputPrice.value = new Intl.NumberFormat('ru-RU').format(inputPrice.value);
  });
  
  inputPrice.addEventListener('change', (e) => {
    rangeSlider.noUiSlider.set(e.currentTarget.value)
  });

};


//square
const inputSquare =  document.querySelector('.form-order__input-square');
const btnMin = document.querySelector('.form-order__button-min');
const btnPlus = document.querySelector('.form-order__button-plus');

inputSquare.value = 200;

btnMin.addEventListener('click', (e) => {
  if(inputSquare.value <= 1){inputSquare.value = inputSquare.value;} 
  else{inputSquare.value--}
});

btnPlus.addEventListener('click', (e) => {
  inputSquare.value++; 
});


//files    
const dropArea = document.querySelector('.form-order__file');
const dragText = document.querySelector('.form-order__file-descr--title');
const inputFile = dropArea.querySelector('input');
const fileNameBlock = document.getElementById('file-name-block');
const btnFileDelete = document.querySelectorAll('.btn-file-cross');


let file; //this is a global variable and we'll use it inside multiple functions
let fileText = "";
inputFile.addEventListener('change', () => {
  if ('files' in inputFile) {
    if (inputFile.files.length == 0) {
      fileText = "";
    } else {
      for (let i = 0; i < inputFile.files.length; i++) {
        fileText += "<div class='file-block'><button class='btn-reset btn-file-cross'></button>";
        const file = inputFile.files[i];
        if ('name' in file) {
          fileText += "<span>filename-" + file.name + "</span></div>";
        }
      }
    }
  } 
  else {
    if (inputFile.value == "") {
      fileText += "";
    } else {
      fileText += "Разрешение файлов не поддерживается" + inputFile.value;// If the browser does not support the files property, it will return the path of the selected file instead. 
    }
  }
  fileNameBlock.innerHTML = fileText;

  console.log(inputFile.files.length)
});

inputFile.addEventListener('change', function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add('form-order__file--active');  
});

//If user Drag File Over DropArea
dropArea.addEventListener('dragover', (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add('form-order__file--active');
  dragText.textContent = "Поместите файлы в данное поле.";
});
//If user leave dragged File from DropArea
dropArea.addEventListener('dragleave', ()=>{
  dropArea.classList.remove('form-order__file--active');
  dragText.textContent = "Кликните или перенесите файлы в эту область.";
});
dropArea.addEventListener('drop', (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  let fileText = "";
  let uploadDragFiles = event.dataTransfer.files;
  let fileName = file.name; //getting selected file type
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  
  if (uploadDragFiles.length == 0) {
    fileText = "";
  } else {
    for (let i = 0; i < uploadDragFiles.length; i++) {
      fileText += "<div class='file-block'><button class='btn-reset btn-file-cross'></button>";
      fileText += "<span>filename-" + fileName + "</span></div>";
    }
  }
  if(validExtensions.includes(fileType)) { //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    let fileDropBlock = fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      fileNameBlock.innerHTML = fileText; //adding that created file name inside area container
    }
    fileReader.readAsDataURL(file);
  } else{
    alert("Недопустимый формат файла");
    dropArea.classList.remove("form-order__file--active");
    dragText.textContent = "Поместите файлы в данное поле.";
  }
  dropArea.classList.remove("form-order__file--active");
  dragText.textContent = "Кликните или перенесите файлы в эту область.";
});
dropArea.addEventListener('mouseenter', () => {
  dropArea.classList.add("form-order__file--active");
});
dropArea.addEventListener('mouseleave', () => {
  dropArea.classList.remove("form-order__file--active");
});


//choices
document.addEventListener('DOMContentLoaded', function () {
  const selectChoice = document.getElementById('selectMaterials');
    const selectorChoices = new Choices(selectChoice, {
      searchEnabled: false,
      shouldSort: false,
      itemSelectText: '',
  });
  const inputChoice = document.getElementById('choices-text-remove-button');
  const textChoices = new Choices(inputChoice,
    {
      allowHTML: true,
      delimiter: ',',
      editItems: true,
      maxItemCount: 5,
      removeItemButton: true,
      placeholder: true,
      placeholderValue: 'укажите через запятую',
      addItemText: (value) => {
        return `Нажмите Enter чтобы добавить: <b>"${value}"</b>`;
      },
      maxItemText: (maxItemCount) => {
        return `Может быть добавлено только ${maxItemCount} значений`;
      },
    } 
  );

  const choicesWishes = document.querySelectorAll('.choices');
  const choicesInput = document.querySelectorAll('.choices__input');
  const choicesReset = document.querySelectorAll('.choices__inner');
  const choicesDropdown = document.querySelectorAll('.choices__list--dropdown');

  choicesDropdown[1].classList.add('choices-dropdown-custom')
  choicesReset[1].classList.add('choices-reset')

  choicesInput[2].addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
      choicesWishes[1].classList.add('choices-wishes')

    }
  });
});


//password
const passInput = document.querySelector('.form-order__input-password');
const passBtn = document.querySelector('.password-btn');

passBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(passInput.getAttribute('type') == 'password') {
    passInput.setAttribute('type', 'text')
  } else {
    passInput.setAttribute('type', 'password')
  };
});


//tabs
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.gallery__filter-btn').forEach(function(filterBtn) {
    filterBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path
      const pag = event.currentTarget.dataset.pag
      document.querySelectorAll('.swiper-spoiler').forEach(function(filterSpoiler) {
        filterSpoiler.classList.remove('swiper-spoiler--active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('swiper-spoiler--active')

      document.querySelectorAll('.swiper-pagination').forEach(function(pagination) {
        pagination.classList.remove('swiper-pagination--active')
      })
      document.querySelector(`[data-target="${pag}"]`).classList.add('swiper-pagination--active')
      
      
      document.querySelectorAll('.gallery__filter-btn').forEach(function(filterBtn) {
        filterBtn.classList.remove('gallery__filter-btn--active')
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('gallery__filter-btn--active')
    })
  })
})


//Swiper
const swiperBathhouse = new Swiper('.swiper-bathhouse', {
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
    prevEl: '.swiper-button-prev--bathhouse',
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
      simulateTouch: true,
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      simulateTouch: true,
    },
    1441: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      },
      slidesPerGroup: 4,
      spaceBetween: 23,
    }
  }

});

const swiperSauna = new Swiper('.swiper-sauna', {
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
    prevEl: '.swiper-button-prev--sauna',
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
      simulateTouch: true,
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      simulateTouch: true,
    },
    1441: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      },
      slidesPerGroup: 4,
      spaceBetween: 23,
    }
  }

});

const swiperHammam = new Swiper('.swiper-hammam', {

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
    prevEl: '.swiper-button-prev--hammam',
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
      simulateTouch: true,
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      simulateTouch: true,
    },
    1441: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      },
      slidesPerGroup: 4,
      spaceBetween: 23,
    }
  }

});

const swiperPool = new Swiper('.swiper-pool', {

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
    prevEl: '.swiper-button-prev--pool',
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
      simulateTouch: true,
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 10,
      simulateTouch: true,
    },
    1441: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      },
      slidesPerGroup: 4,
      spaceBetween: 23,
    }
  }

});


//validate
document.addEventListener('DOMContentLoaded', function () {
  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7 (999) 999-99-99");

  im.mask(selector);
  
  const validation = new JustValidate('.form-order', {
    errorLabelStyle: {
      color: ''
    },
  });

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите название',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 символа',
      },
      {
        rule: 'maxLength',
        value: 25,
        errorMessage: 'Максимальное значение 25 символов',
      },
    ])
    .addField('#phone', [
      {
        validator: (name, value) => { 
        const phone = selector.inputmask.unmaskedvalue()
        console.log(phone)
        return Number(phone) && phone.length === 10
        },
        errorMessage: 'Введите номер телефона',
      }
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите e-mail',
      },
      {
        rule: 'email',
        errorMessage: 'Пример username@gmail.com',
      },
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Введите пароль',
      },
      {
        rule: 'minLength',
        value: 8,
        errorMessage: 'Пароль должен содержать минимум 8 символов',
      },
      {
        rule: 'password',
        errorMessage: 'Пароль должен содержать 1 цифру и <br>1 букву латинского алфавита',
      },
    ])
});


//lazyload
var lazyLoadInstance = new LazyLoad({});