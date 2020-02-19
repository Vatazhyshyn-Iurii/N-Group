window.addEventListener('DOMContentLoaded', function() {
  //menu
  const menuButton = document.querySelector('.menu-btn');
  const menuNav = document.querySelector('.menu-nav');

  menuButton.addEventListener('click', function(event) {
    event.preventDefault();
    this.classList.toggle('menu-btn_active');
    menuNav.classList.toggle('menu-nav_active');
  });

  //tabs
  const tabs = document.querySelectorAll('.services__header-tab');
  const tabContainer = document.querySelector('.services__header');
  const tabContent = document.querySelectorAll('.services__tabcontent');

  function hideTabContent(firstTab) {
    for (let i = firstTab; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  tabContainer.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('services__header-tab')) {
      for (let i = 0; i < tabs.length; i++) {
        if (target == tabs[i]) {
          hideTabContent(0);
          showContent(i);
          break;
        }
      }
    }
  });

  //cards

  const catalogTabs = document.querySelectorAll('.catalog__tab');
  const catalogTabContainer = document.querySelector('.catalog__tabs');
  const catalogTabContent = document.querySelectorAll('.catalog__content');

  function hideCatalogTabContent(firstCatalog) {
    for (let i = firstCatalog; i < catalogTabContent.length; i++) {
      catalogTabContent[i].classList.remove('catalog__content-active');
    }
  }

  hideCatalogTabContent(1);

  catalogTabContainer.addEventListener('click', event => {
    const target = event.target;

    catalogTabs.forEach(item => {
      item.classList.remove('catalog__tab_active');
    });
    target.classList.add('catalog__tab_active');

    if (target && target.classList.contains('catalog__tab')) {
      for (let i = 0; i < catalogTabs.length; i++) {
        if (target == catalogTabs[i]) {
          hideCatalogTabContent(0);
          catalogTabContent[i].classList.add('catalog__content-active');
          break;
        }
      }
    }
  });

  // Modal
  //consultation
  const buttonConsultation = document.querySelector(
    '[data-modal=consultation]'
  );
  const overlay = document.querySelector('.overlay');
  const modalConsultation = document.getElementById('consultation');
  const closeModal = document.querySelectorAll('.modal__close');

  buttonConsultation.addEventListener('click', function() {
    overlay.style.display = 'block';
    this.classList.add('splash');
    modalConsultation.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  closeModal.forEach(elem => {
    elem.addEventListener('click', function() {
      overlay.style.display = 'none';
      buttonConsultation.classList.remove('splash');
      modalConsultation.style.display = 'none';
      modalOrder.style.display = 'none';
      document.body.style.overflow = '';
    });
  });

  //order
  const buttonsOrder = document.querySelectorAll('.button_small');
  const modalOrder = document.getElementById('order');
  const modalOrderDescription = document.querySelector(
    '#order .modal__description'
  );
  const catalogTitles = document.querySelectorAll('.catalog-item__title');
  let productValue = document.querySelector('[name=product]').value;

  buttonsOrder.forEach((elem, index) => {
    elem.addEventListener('click', function() {
      for (let i = 0; i < catalogTitles.length; i++) {
        if (index == i) {
          modalOrderDescription.innerHTML = catalogTitles[i].textContent;
          productValue = catalogTitles[i].textContent;
          console.log(productValue);
        }
      }
      overlay.style.display = 'block';
      modalOrder.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  //email
  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function() {
      $(this)
        .find('input')
        .val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });
});
