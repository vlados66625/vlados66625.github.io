import {iosVhFix} from './utils/ios-vh-fix';
import {Form} from './modules/form-validate/form';
import {addEvtVideo} from './modules/play-button';
import {calculateVideoSize} from './modules/size-video';
import {activeInfoTrainer} from './modules/active-info-trainer';
import {addWorkingFields} from './utils/working-fields';
// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  addEvtVideo();
  calculateVideoSize();

  window.addEventListener('resize', function () {
    calculateVideoSize();
  });

  // Utils
  // ---------------------------------


  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    addWorkingFields();
    const form = new Form();
    window.form = form;
    form.init();

    activeInfoTrainer();
  });
});


// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
