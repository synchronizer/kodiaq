

Array.from(document.querySelectorAll('[data-nofocus]')).forEach(item => {
    item.setAttribute('tabindex', '-1')
    item.addEventListener('focus', () => item.blur())
})
Array.from(document.querySelectorAll('.notifications')).forEach(notifications => {
    window.pushNotification = (options) => {
        const { text, type, autoclose, closeAction} = options;
        const notifications__item = notifications.querySelector('.notifications__prototype > .notifications__item').cloneNode(true);
        if (type) { notifications__item.classList.add(`notifications__item_${type}`) }
        notifications__item.querySelector('.notifications__item-text').innerText = text;
        notifications.appendChild(notifications__item);

        const notifications__itemClose = notifications__item.querySelector('.notifications__item-close');
        notifications__itemClose.addEventListener('click', () => {
            closeAction && closeAction()
            notifications__item.remove()
        })
        

        if (autoclose) {
            setTimeout(() => {
                notifications__item.classList.add('notifications__item_hide')
                setTimeout(() => {
                    notifications__item.remove()
                }, 600)
            }, 7000)
        }
    }
})

Array.from(document.querySelectorAll('.notifications__item')).forEach(notifications__item => {
    notifications__item.querySelector('.notifications__item-close').addEventListener('click', () => {
        notifications__item.classList.add('notifications__item_hide')
                setTimeout(() => {
                    notifications__item.remove()
                }, 600)
    })
})


Array.from(document.querySelectorAll('.call-request')).forEach(item => {
    const title = item.querySelector('.call-request__title'),
        name = item.querySelector('[name="name"]'),
        phone = item.querySelector('[name="phone"]'),
        send = item.querySelector('[name="send"]'),
        email = item.querySelector('[name="email"]'),
        comment = item.querySelector('[name="comment"]');
    // utm_source = item.getAttribute('utm_source'),
    // utm_medium = item.getAttribute('utm_medium'),
    // utm_campaign = item.getAttribute('utm_campaign'),
    // utm_term = item.getAttribute('utm_term'),
    // utm_content = item.getAttribute('utm_content');

    function checkFields() {
        if (
            (name && !name.value)
            || (phone && phone.value.length) < 3
            // || (email && !email.b.valid)
        ) { send.setAttribute('disabled', '') } else { send.removeAttribute('disabled') }
    };
    checkFields();
    if (name) name.addEventListener('input', checkFields);
    if (phone) phone.addEventListener('input', checkFields);
    if (email) email.addEventListener('input', checkFields);

    send.onclick = () => {
        const form = new FormData();
        form.append('TYPE', 'feedback');
        if (title) form.append('TITLE', title.textContent);
        if (name) form.append('NAME', name.value);
        if (phone) form.append('PHONE', phone.value);
        if (email) form.append('EMAIL', email.value);
        if (comment) form.append('COMMENT', comment.value);
        form.append('PAGE', location.pathname);

        // if (utm_source) form.append('UTM_SOURCE', utm_source);
        // if (utm_medium) form.append('UTM_MEDIUM', utm_medium);
        // if (utm_campaign) form.append('UTM_CAMPAIGN', utm_campaign);
        // if (utm_term) form.append('UTM_TERM', utm_term);
        // if (utm_content) form.append('UTM_CONTENT', utm_content);

        // send.b.loadStart();
        // if (name) name.b.disable();
        // if (phone) phone.b.disable();
        // if (email) email.b.disable();
        // if (comment) comment.b.disable();


        fetch('https://evev.tupo.best/action.php', {
            method: 'POST',
            body: form,
        }).then(response => {

            if (response.status == 200) {
                window.pushNotification({
                    text: `Заявка на звонок по номеру ${phone.value} отправлена`,
                    type: 'success',
                    autoclose: true,
                })
            }
            else {
                window.pushNotification({
                    text: `Заявку на звонок по не удалось отправить`,
                    type: 'error',
                    autoclose: false,
                })
            }
        }).catch(() => {
            window.pushNotification({
                text: `Заявку на звонок возможно не удалось отправить`,
                type: 'attention',
                autoclose: true,
            })
        })

    }
})
Array.from(document.querySelectorAll('.carousel')).forEach(carousel => {
    const   left = carousel.querySelector('.carousel__left'),
            right = carousel.querySelector('.carousel__right'),
            content = carousel.querySelector('.carousel__content');

    const checkControls = () => {
        if (content.scrollLeft <= 0) {
            left.classList.add('carousel__left_hide')
        } else {
            left.classList.remove('carousel__left_hide')
        }

        if (content.offsetWidth + content.scrollLeft >= content.scrollWidth) {
            right.classList.add('carousel__right_hide')
        } else {
            right.classList.remove('carousel__right_hide')
        }

    }

    window.addEventListener('load', checkControls)
    
    content.addEventListener('scroll', checkControls)

    left.addEventListener('click', () => {
        content.scrollTo({
            top: 0,
            left: content.scrollLeft - content.offsetWidth * .99,
            behavior: "smooth",
          });
    })

    right.addEventListener('click', () => {
        content.scrollTo({
            top: 0,
            left: content.scrollLeft + content.offsetWidth * .99,
            behavior: "smooth",
          });
    })
})
// const points = [{
//     coordinates: [37.619683, 55.763483],
//     address: "Россия, Москва, Неглинная улица, 17с1",
//     name: "Ресторан Романов",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Ресторан-Романов_96.png",
// },
// {
//     coordinates: [37.636778, 55.757921],
//     address: "Россия, Москва, улица Маросейка, 15",
//     name: "Megobari",
//     logo: "https://evev.tupo.best/wp-content/uploads/Megobari_96.png",
// },
// {
//     coordinates: [37.635188, 55.756437],
//     address: "Россия, Москва, Большой Спасоглинищевский переулок, 3с5",
//     name: "МосКальян (Китай-город)",
//     logo: "https://evev.tupo.best/wp-content/uploads/МосКальян-Китай-город_96.png",
// },
// {
//     coordinates: [37.592851, 55.753012],
//     address: "Россия, Москва, улица Новый Арбат, 12",
//     name: "МосКальян (Новый Арбат)",
//     logo: "https://evev.tupo.best/wp-content/uploads/МосКальян-Новый-Арбат_96.png",
// },
// {
//     coordinates: [37.637596, 55.73555],
//     address: "Россия, Москва, Татарская улица, 1/7",
//     name: "Restobar 1/7",
//     logo: "https://evev.tupo.best/wp-content/uploads/Restobar-1-7_96.png",
// },
// {
//     coordinates: [37.612398, 55.757891],
//     address: "Россия, Москва, Тверская улица, 5/6",
//     name: "Монополь",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Монополь_96.png",
// },
// {
//     coordinates: [37.636105, 55.753757],
//     address: "Россия, Москва, Солянский проезд, 1/4с1",
//     name: "Чебуречная",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Чебуречная_96.png",
// },
// {
//     coordinates: [37.4758, 55.727643],
//     address: "Россия, Москва, Славянский бульвар, вл3",
//     name: "Kulinari",
//     logo: "https://evev.tupo.best/wp-content/uploads/Kulinari_96.png",
// },
// {
//     coordinates: [37.598339, 55.591259],
//     address: "Россия, Москва, Варшавское шоссе, 152к2",
//     name: "Огни Баку",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Огни-Баку_96.png",
// },
// {
//     coordinates: [37.736375, 55.686132],
//     address: "Россия, Москва, Люблинская улица, 40",
//     name: "Люблинские Вечера",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Люблинские-Вечера_96.png",
// },
// {
//     coordinates: [37.30247, 55.685934],
//     address: "Россия, Московская область, Одинцово, Можайское шоссе, 151",
//     name: "Пивотека 465",
//     logo: "https://evev.tupo.best/wp-content/uploads/Пивотека-465_96.png",
// },
// {
//     coordinates: [37.642501, 55.646386],
//     address: "Россия, Москва, Котляковская улица, 9с3",
//     name: "Биджо",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Биджо_96.png",
// },
// {
//     coordinates: [37.495132, 55.667127],
//     address: "Россия, Москва, проспект Вернадского, 93",
//     name: "Панорама 93",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Панорама-93_96.png",
// },
// {
//     coordinates: [37.641045, 55.758509],
//     address: "Россия, Москва, улица Покровка, 4",
//     name: "Тай Тай",
//     logo: "https://evev.tupo.best/wp-content/uploads/Тай-Тай_96.png",
// },
// {
//     coordinates: [37.579645, 55.726877],
//     address: "Россия, Москва, Комсомольский проспект, 28",
//     name: "ПивоROOM",
//     // logo: "https://evev.tupo.best/wp-content/uploads/ПивоROOM_96.png",
// },
// {
//     coordinates: [37.59277, 55.740892],
//     address: "Россия, Москва, улица Пречистенка, 21",
//     name: "Галерея Художника",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Галерея-Художника_96.png",
// },
// {
//     coordinates: [37.598411, 55.771884],
//     address: "Россия, Москва, 4-я Тверская-Ямская улица, 2/11с2",
//     name: "Roaster coffee",
//     logo: "https://evev.tupo.best/wp-content/uploads/Roaster-coffee_96.png",
// },
// {
//     coordinates: [37.810908, 55.744977],
//     address: "Россия, Москва, Перовская улица, 73с1",
//     name: "Ресторан Гандзак",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Ресторан-Гандзак_96.png",
// },
// {
//     coordinates: [37.785009, 55.803155],
//     address: "Россия, Москва, Сиреневый бульвар, 15",
//     name: "Чё-чё",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Чё-чё_96.png",
// },
// {
//     coordinates: [37.635206, 55.762667],
//     address: "Россия, Москва, Мясницкая улица, 24",
//     name: "Кулинария-Кондитерская Без забот",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Кулинария-Кондитерская-Без-забот_96.png",
// },
// {
//     coordinates: [37.683221, 55.772811],
//     address: "Россия, Москва, улица Фридриха Энгельса, 21",
//     name: "Ресторан-караоке Энгельс",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Ресторан-караоке-Энгельс_96.png",
// },
// {
//     coordinates: [37.294799, 55.689253],
//     address: "Россия, Московская область, Одинцово, улица Говорова, 9А",
//     name: "Хинкальная Иды Сюда",
//     logo: "https://evev.tupo.best/wp-content/uploads/Хинкальная-Иды-Сюда_96.png",
// },
// {
//     coordinates: [37.660691, 55.72926],
//     address: "Россия, Москва, улица Симоновский Вал, 2",
//     name: "SancTuary",
//     // logo: "https://evev.tupo.best/wp-content/uploads/SancTuary_96.png",
// },
// {
//     coordinates: [37.613503, 55.786283],
//     address: "Россия, Москва, Октябрьская улица, 9/1",
//     name: "Point 242",
//     logo: "https://evev.tupo.best/wp-content/uploads/Point-242_96.png",
// },
// {
//     coordinates: [37.527373, 55.656407],
//     address: "Россия, Москва, улица Обручева, 30/1с1",
//     name: "АндерСон",
//     logo: "https://evev.tupo.best/wp-content/uploads/АндерСон_96.png",
// },
// {
//     coordinates: [37.211004, 56.002279],
//     address: "Россия, Москва, Зеленоградский административный округ, площадь Юности, 2с1",
//     name: "АндерСон",
//     logo: "https://evev.tupo.best/wp-content/uploads/АндерСон_96.png",
// },
// {
//     coordinates: [37.483023, 55.799588],
//     address: "Россия, Москва, улица Маршала Бирюзова, 32",
//     name: "АндерСон",
//     logo: "https://evev.tupo.best/wp-content/uploads/АндерСон_96.png",
// },
// {
//     coordinates: [37.637461, 55.754557],
//     address: "Россия, Москва, улица Забелина, 1",
//     name: "Today",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Today_96.png",
// },
// {
//     coordinates: [37.637461, 55.754557],
//     address: "Большой Спасоглинищевский пер., 9/1с14, Москва",
//     name: "Колбаса",
//     logo: "https://evev.tupo.best/wp-content/uploads/Колбаса_96.png",
// },
// {
//     coordinates: [37.655284, 55.708973],
//     address: "Россия, Москва, улица Ленинская Слобода, 19с1",
//     name: "Марков двор",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Марков-двор_96.png",
// },
// {
//     coordinates: [37.623016, 55.7578],
//     address: "Россия, Москва, Никольская улица, 17с1",
//     name: "Subway",
//     logo: "https://evev.tupo.best/wp-content/uploads/Subway_96.png",
// },
// {
//     coordinates: [37.820322, 55.750824],
//     address: "Россия, Москва, Зелёный проспект, 62А",
//     name: "KFC",
//     logo: "https://evev.tupo.best/wp-content/uploads/KFC_96.png",
// },
// {
//     coordinates: [37.729628, 55.613473],
//     address: "Россия, Москва, Борисовский проезд, вл46А",
//     name: "KFC",
//     logo: "https://evev.tupo.best/wp-content/uploads/KFC_96.png",
// },
// {
//     coordinates: [37.641045, 55.870642],
//     address: "Россия, Москва, проезд Дежнёва, 13",
//     name: "МухранИ",
//     // logo: "https://evev.tupo.best/wp-content/uploads/МухранИ_96.png",
// },
// {
//     coordinates: [37.740094, 55.665284],
//     address: "Россия, Москва, Люблинская улица, 84",
//     name: "Ресторан Усадьба",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Ресторан-Усадьба_96.png",
// },
// {
//     coordinates: [37.627984, 55.742914],
//     address: "Россия, Москва, Пятницкая улица, 14",
//     name: "Корчма Тарас Бульба",
//     logo: "https://evev.tupo.best/wp-content/uploads/Корчма-Тарас-Бульба_96.png",
// },
// {
//     coordinates: [37.544647, 55.7902],
//     address: "Россия, Москва, Ленинградский проспект, 37Б",
//     name: "Град Урюк",
//     logo: "https://evev.tupo.best/wp-content/uploads/Урюк_96.png",
// },
// {
//     coordinates: [37.603873, 55.792255],
//     address: "Россия, Москва, улица Сущёвский Вал, 18А",
//     name: "Урюк",
//     logo: "https://evev.tupo.best/wp-content/uploads/Урюк_96.png",
// },
// {
//     coordinates: [37.571938, 55.714952],
//     address: "Россия, Москва, Лужнецкая набережная, 2/4с51",
//     name: "MashUp Kitchen",
//     // logo: "https://evev.tupo.best/wp-content/uploads/MashUp-Kitchen_96.png",
// },
// {
//     coordinates: [37.63509, 55.761305],
//     address: "Россия, Москва, Кривоколенный переулок, 10с2",
//     name: "Max Bar",
//     logo: "https://evev.tupo.best/wp-content/uploads/Max-Bar_96.png",
// },
// {
//     coordinates: [37.627166, 55.745427],
//     address: "Россия, Москва, Пятницкая улица, 3/4с1",
//     name: "Mitzva Bar",
//     logo: "https://evev.tupo.best/wp-content/uploads/Mitzva-Bar_96.png",
// },
// {
//     coordinates: [37.584568, 55.778558],
//     address: "Россия, Москва, улица Бутырский Вал, 5",
//     name: "Subway",
//     logo: "https://evev.tupo.best/wp-content/uploads/Subway_96.png",
// },
// {
//     coordinates: [37.636958, 55.7544],
//     address: "Россия, Москва, Большой Спасоглинищевский переулок, 9/1с16",
//     name: "Колбаса",
//     logo: "https://evev.tupo.best/wp-content/uploads/Колбаса_96.png",
// },
// {
//     coordinates: [37.637335, 55.754507],
//     address: "Россия, Москва, Большой Спасоглинищевский переулок, 9/1с16А",
//     name: "Officina",
//     logo: "https://evev.tupo.best/wp-content/uploads/Officina_96.png",
// },
// {
//     coordinates: [37.651735, 55.739554],
//     address: "Россия, Москва, Народная улица, 4с1",
//     name: "Аруба",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Аруба_96.png",
// },
// {
//     coordinates: [37.622369, 55.760601],
//     address: "Россия, Москва, Пушечная улица, 4с1",
//     name: "Бар Мастерская",
//     logo: "https://evev.tupo.best/wp-content/uploads/Бар-Мастерская_96.png",
// },
// {
//     coordinates: [37.50822, 55.751771],
//     address: "Россия, Москва, Новозаводская улица, 8",
//     name: "Лю Милье",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Лю-Милье_96.png",
// },
// {
//     coordinates: [37.620896, 55.857811],
//     address: "Россия, Москва, Олонецкая улица, 24",
//     name: "Вилла Де Ла Тусса",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Вилла-Де-Ла-Тусса_96.png",
// },
// {
//     coordinates: [37.651286, 55.723212],
//     address: "Россия, Москва, Дербеневская набережная, 7с31",
//     name: "Холст и Масло",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Холст-и-Масло_96.png",
// },
// {
//     coordinates: [37.620411, 55.76214],
//     address: "Россия, Москва, Неглинная улица, 10",
//     name: "Marrakesh",
//     logo: "https://evev.tupo.best/wp-content/uploads/Marrakesh_96.png",
// },
// {
//     coordinates: [37.663512, 55.730547],
//     address: "Россия, Москва, 3-й Крутицкий переулок, 13",
//     name: "Кофейня",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Кофейня_96.png",
// },
// {
//     coordinates: [37.659326, 55.785118],
//     address: "Россия, Москва, Верхняя Красносельская улица, 2/1с1",
//     name: "Виктория",
//     logo: "https://evev.tupo.best/wp-content/uploads/Виктория_96.png",
// },
// {
//     coordinates: [37.510125, 55.702835],
//     address: "Россия, Москва, Мичуринский проспект, 7",
//     name: "Kulinari",
//     logo: "https://evev.tupo.best/wp-content/uploads/Kulinari_96.png",
// },
// {
//     coordinates: [37.583598, 55.735941],
//     address: "Россия, Москва, улица Льва Толстого, 23к1",
//     name: "23 Tolstoy",
//     // logo: "https://evev.tupo.best/wp-content/uploads/23-Tolstoy_96.png",
// },
// {
//     coordinates: [37.6327, 55.771358],
//     address: "Россия, Москва, улица Сретенка, 34/1с1",
//     name: "Маэстро Ресто",
//     logo: "https://evev.tupo.best/wp-content/uploads/Маэстро-Ресто_96.png",
// },
// {
//     coordinates: [37.646291, 55.757612],
//     address: "Россия, Москва, Покровский бульвар, 6/20с1",
//     name: "Microbe",
//     logo: "https://evev.tupo.best/wp-content/uploads/Microbe_96.png",
// },
// {
//     coordinates: [37.646291, 55.757612],
//     address: "Россия, Москва, Покровский бульвар, 6/20с1",
//     name: "Мясо",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Мясо_96.png",
// },
// {
//     coordinates: [37.71936, 55.921148],
//     address: "Россия, Московская область, Мытищи, улица Мира, с32/2",
//     name: "Токио Сити",
//     logo: "https://evev.tupo.best/wp-content/uploads/Токио-Сити_96.png",
// },
// {
//     coordinates: [37.760458, 55.681326],
//     address: "Россия, Москва, Ставропольская улица, 38/2",
//     name: "Наманган",
//     logo: "https://evev.tupo.best/wp-content/uploads/Наманган_96.png",
// },
// {
//     coordinates: [37.600217, 55.760616],
//     address: "Россия, Москва, Тверской бульвар, 15с2",
//     name: "Недальний Восток",
//     logo: "https://evev.tupo.best/wp-content/uploads/Недальний-Восток_96.png",
// },
// {
//     coordinates: [37.567698, 55.727374],
//     address: "Россия, Москва, Усачёва улица, 26",
//     name: "Оджахури",
//     logo: "https://evev.tupo.best/wp-content/uploads/Оджахури_96.png",
// },
// {
//     coordinates: [37.296773105834724, 55.689204515153],
//     address: "Россия, Московская область, Одинцово, улица Говорова, 9А",
//     name: "Паб Лофт",
//     logo: "https://evev.tupo.best/wp-content/uploads/Паб-Лофт_96.png",
// },
// {
//     coordinates: [37.2940265238034, 55.688622693240355],
//     address: "Россия, Московская область, Одинцово, улица Говорова, 9А",
//     name: "Пироги",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Пироги_96.png",
// },
// {
//     coordinates: [37.284109, 55.668163],
//     address: "Россия, Московская область, Одинцово, Верхне-Пролетарская улица, 3А",
//     name: "Zebra",
//     logo: "https://evev.tupo.best/wp-content/uploads/Zebra_96.png",
// },
// {
//     coordinates: [37.583391, 55.791668],
//     address: "Россия, Москва, улица Нижняя Масловка, 5",
//     name: "Парус",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Парус_96.png",
// },
// {
//     coordinates: [37.608005, 55.747495],
//     address: "Россия, Москва, улица Волхонка, 7/6",
//     name: "Кафе Пельмени",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Кафе-Пельмени_96.png",
// },
// {
//     coordinates: [37.473222, 55.803186],
//     address: "Россия, Москва, улица Маршала Василевского, 3к1",
//     name: "Пироговая Рогова",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Пироговая-Рогова_96.png",
// },
// {
//     coordinates: [37.600846, 55.736579],
//     address: "Россия, Москва, Пречистенская набережная, 5",
//     name: "Rivage Restaurant & Lounge Bar",
//     logo: "https://evev.tupo.best/wp-content/uploads/Rivage-Restaurant-Lounge-Bar_96.png",
// },
// {
//     coordinates: [37.632691, 55.758742],
//     address: "Россия, Москва, Большой Златоустинский переулок, 7с1",
//     name: "Клуб Пропаганда",
//     logo: "https://evev.tupo.best/wp-content/uploads/Клуб-Пропаганда_96.png",
// },
// {
//     coordinates: [37.629664, 55.742656],
//     address: "Россия, Москва, Пятницкий переулок, 10с1",
//     name: "Шашлычная",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Шашлычная_96.png",
// },
// {
//     coordinates: [37.606379, 55.645817],
//     address: "Россия, Москва, Симферопольский бульвар, 31",
//     name: "Noosh",
//     logo: "https://evev.tupo.best/wp-content/uploads/Noosh_96.png",
// },
// {
//     coordinates: [37.498213, 55.868299],
//     address: "Россия, Москва, Клинская улица, 6",
//     name: "Сумах",
//     logo: "https://evev.tupo.best/wp-content/uploads/Сумах_96.png",
// },
// {
//     coordinates: [37.673187, 55.61628],
//     address: "Россия, Москва, Прохладная улица, 28",
//     name: "Театр МОГТЮЗ",
//     logo: "https://evev.tupo.best/wp-content/uploads/Театр-МОГТЮЗ_96.png",
// },
// {
//     coordinates: [37.532475, 55.725716],
//     address: "Россия, Москва, Мосфильмовская улица, 2В",
//     name: "Фреш Маркет 77",
//     logo: "https://evev.tupo.best/wp-content/uploads/Фреш-Маркет-77_96.png",
// },
// {
//     coordinates: [37.493156, 55.704093],
//     address: "Россия, Москва, Мосфильмовская улица, 88к2с4",
//     name: "Фреш Маркет 77",
//     logo: "https://evev.tupo.best/wp-content/uploads/Фреш-Маркет-77_96.png",
// },
// {
//     coordinates: [37.555139, 55.743684],
//     address: "Россия, Москва, улица Можайский Вал, 8",
//     name: "Фреш Маркет 77",
//     logo: "https://evev.tupo.best/wp-content/uploads/Фреш-Маркет-77_96.png",
// },
// {
//     coordinates: [37.737632, 55.621221],
//     address: "Россия, Москва, Шипиловская улица, 50к1с1",
//     name: "Кафе Хан",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Кафе-Хан_96.png",
// },
// {
//     coordinates: [37.474507, 55.630223],
//     address: "Россия, Москва, улица Академика Варги, 8к1",
//     name: "Хинкальная",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Хинкальная_96.png",
// },
// {
//     coordinates: [37.588386, 55.748873],
//     address: "Россия, Москва, улица Арбат, 36/2с1",
//     name: "Хинкальная",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Хинкальная_96.png",
// },
// {
//     coordinates: [37.657718, 55.762368],
//     address: "Россия, Москва, улица Земляной Вал, 7",
//     name: "Хинкальная",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Хинкальная_96.png",
// },
// {
//     coordinates: [37.586158, 55.75204],
//     address: "Россия, Москва, улица Новый Арбат, 21",
//     name: "Хинкальная",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Хинкальная_96.png",
// },
// {
//     coordinates: [37.507906, 55.643612],
//     address: "Россия, Москва, улица Академика Волгина, 29к1",
//     name: "Хинкальная",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Хинкальная_96.png",
// },
// {
//     coordinates: [37.564446, 55.738074],
//     address: "Россия, Москва, Бережковская набережная, 12",
//     name: "Хинкали Хаус",
//     logo: "https://evev.tupo.best/wp-content/uploads/Хинкали-Хаус_96.png",
// },
// {
//     coordinates: [37.785405, 55.717472],
//     address: "Россия, Москва, Рязанский проспект, 32к1",
//     name: "Шашлычная",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Шашлычная_96.png",
// },
// {
//     coordinates: [37.566386, 55.75168],
//     address: "Россия, Москва, Кутузовский проспект, вл2/1",
//     name: "Marani",
//     logo: "https://evev.tupo.best/wp-content/uploads/Marani_96.png",
// },
// {
//     coordinates: [37.566564, 55.752323],
//     address: "Россия, Москва, Кутузовский проспект, 2/1с6",
//     name: "Erwin",
//     logo: "https://evev.tupo.best/wp-content/uploads/Erwin_96.png",
// },
// {
//     coordinates: [37.566664, 55.752323],
//     address: "Россия, Москва, Кутузовский проспект, 2/1с6",
//     name: "Il Forno",
//     logo: "https://evev.tupo.best/wp-content/uploads/Il-Forno_96.png",
// },
// {
//     coordinates: [37.566764, 55.752323],
//     address: "Россия, Москва, Кутузовский проспект, 2/1с6",
//     name: "Soluxe Club",
//     logo: "https://evev.tupo.best/wp-content/uploads/Soluxe-Club_96.png",
// },
// {
//     coordinates: [37.566864, 55.752323],
//     address: "Россия, Москва, Кутузовский проспект, 2/1с6",
//     name: "Chef steak house by Erdal",
//     logo: "https://evev.tupo.best/wp-content/uploads/Chef-steak-house-by-Erdal_96.png",
// },
// {
//     coordinates: [37.566964, 55.752323],
//     address: "Россия, Москва, Кутузовский проспект, 2/1с6",
//     name: "Тоторо",
//     logo: "https://evev.tupo.best/wp-content/uploads/Тоторо_96.png",
// },
// {
//     coordinates: [37.702499, 55.774608],
//     address: "Россия, Москва, улица Новая Дорога, 11с6",
//     name: "Ресторан Bodrum",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Ресторан-Bodrum_96.png",
// },
// {
//     coordinates: [37.734012, 55.783554],
//     address: "Россия, Москва, Мироновская улица, 2",
//     name: "Nargila № 1",
//     logo: "https://evev.tupo.best/wp-content/uploads/Nargila-№-1_96.png",
// },
// {
//     coordinates: [37.347979, 55.517016],
//     address: "Россия, Москва, поселение Десёновское, Нововатутинский проспект, 7",
//     name: "Al Posto",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Al-Posto_96.png",
// },
// {
//     coordinates: [37.347647, 55.597546],
//     address: "Россия, Москва, Московский, 3-й микрорайон, 21",
//     name: "Панда",
//     logo: "https://evev.tupo.best/wp-content/uploads/Панда_96.png",
// },
// {
//     coordinates: [37.65629, 55.761305],
//     address: "Россия, Москва, улица Земляной Вал, 14-16с1",
//     name: "Alex Coffee",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Alex-Coffee_96.png",
// },
// {
//     coordinates: [37.589042, 55.765215],
//     address: "Россия, Москва, Садовая-Кудринская улица, 21А",
//     name: "Stories",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Stories_96.png",
// },
// {
//     coordinates: [37.546336, 55.749106],
//     address: "Россия, Москва, Краснопресненская набережная, 14соор1",
//     name: "Тандыр",
//     // logo: "https://evev.tupo.best/wp-content/uploads/Тандыр_96.png",
// },
// ]


// Array.from(document.querySelectorAll('.clients-map')).forEach(clientsMap => {
//     initMap(clientsMap);
// })

// async function initMap(node) {
    
//     await ymaps3.ready;

//     const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } = ymaps3;

//     const map = new YMap(
//         node.querySelector('.clients-map__map'),
//         {
//             location: {
//                 center: [37.588144, 55.733842],
//                 zoom: 10
//             }
//         }
//     );



//     map.addChild(new YMapDefaultSchemeLayer());
//     map.addChild(new YMapDefaultFeaturesLayer());

//     points.forEach(item => {
//         const markerElement = document.createElement('div');
//         markerElement.className = 'marker';
//         markerElement.setAttribute('title', item.name + '\n' + item.address)
//         markerElement.setAttribute('data-coordinates', item.coordinates.join(","))
//         markerElement.style.backgroundImage = `
//         url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">  <path d="M16.528 2H7.47198C6.26898 2 5.66798 2 5.18398 2.299C4.70098 2.597 4.43198 3.135 3.89398 4.211L2.49098 7.76C2.16598 8.58 1.88298 9.546 2.42898 10.239C2.6863 10.5656 3.03904 10.8039 3.4381 10.9207C3.83717 11.0375 4.26272 11.0271 4.65556 10.8908C5.0484 10.7545 5.38899 10.4991 5.62994 10.1602C5.8709 9.82137 6.00024 9.41581 5.99998 9C5.99998 9.53043 6.21069 10.0391 6.58576 10.4142C6.96083 10.7893 7.46954 11 7.99998 11C8.53041 11 9.03912 10.7893 9.41419 10.4142C9.78926 10.0391 9.99998 9.53043 9.99998 9C9.99998 9.53043 10.2107 10.0391 10.5858 10.4142C10.9608 10.7893 11.4695 11 12 11C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9C14 9.53043 14.2107 10.0391 14.5858 10.4142C14.9608 10.7893 15.4695 11 16 11C16.5304 11 17.0391 10.7893 17.4142 10.4142C17.7893 10.0391 18 9.53043 18 9C17.9999 9.41573 18.1294 9.82114 18.3704 10.1599C18.6115 10.4986 18.9521 10.7538 19.3449 10.8899C19.7377 11.0261 20.1631 11.0365 20.5621 10.9197C20.9611 10.8028 21.3137 10.5646 21.571 10.238C22.117 9.545 21.833 8.579 21.509 7.759L20.105 4.211C19.567 3.135 19.299 2.597 18.815 2.299C18.332 2 17.73 2 16.528 2Z" fill="white" fill-opacity="0.75"/>  <path fill-rule="evenodd" clip-rule="evenodd" d="M20 21.25H22C22.1989 21.25 22.3897 21.3291 22.5303 21.4697C22.671 21.6104 22.75 21.8011 22.75 22C22.75 22.199 22.671 22.3897 22.5303 22.5304C22.3897 22.671 22.1989 22.75 22 22.75H2C1.80109 22.75 1.61032 22.671 1.46967 22.5304C1.32902 22.3897 1.25 22.199 1.25 22C1.25 21.8011 1.32902 21.6104 1.46967 21.4697C1.61032 21.3291 1.80109 21.25 2 21.25H4V12.5C4.744 12.5 5.433 12.268 6 11.873C6.58696 12.2814 7.28494 12.5003 8 12.5C8.744 12.5 9.433 12.268 10 11.873C10.587 12.2814 11.2849 12.5003 12 12.5C12.744 12.5 13.433 12.268 14 11.873C14.587 12.2814 15.2849 12.5003 16 12.5C16.744 12.5 17.433 12.268 18 11.873C18.587 12.2814 19.2849 12.5003 20 12.5V21.25ZM9.5 21.25H14.5V18.5C14.5 17.565 14.5 17.098 14.299 16.75C14.1675 16.5217 13.9781 16.332 13.75 16.2C13.402 16 12.935 16 12 16C11.065 16 10.598 16 10.25 16.2C10.0219 16.332 9.83251 16.5217 9.701 16.75C9.5 17.098 9.5 17.565 9.5 18.5V21.25Z" fill="white" fill-opacity="0.75"/></svg>'),
        
//         `
//         if (item.logo) {
//             markerElement.style.backgroundImage = `url('${item.logo}')`
//             markerElement.style.backgroundSize = `cover`

//         };
//         markerElement.addEventListener('click', () => {
//             console.log(map)
//             map.setLocation({
//                 center: markerElement.getAttribute('data-coordinates').split(','),
//                 zoom: map.zoom < 16 ? 16 : map.zoom,
//                 duration: "500",
//             })
//         })

//         const marker = new YMapMarker(
//             {
//                 coordinates: item.coordinates,
//             },
//             markerElement
//         );

//         map.addChild(marker);
//     })

//     node.querySelector('.clients-map__search-input').addEventListener('input', e => {
//         node.querySelector('.clients-map__search-suggest').innerHTML = '';
//         if (e.target.value.length < 3) return;

//         const filteredCompanies = points.filter(company =>
//         company.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
//         company.address.toLowerCase().includes(e.target.value.toLowerCase()));

//         filteredCompanies.forEach(company => {
//             const findedCompany = document.createElement('div');
//             findedCompany.className = 'clients-map__finded-company rounded-s';
//             findedCompany.setAttribute('data-coordinates', company.coordinates.join(","))
//             findedCompany.setAttribute('tabindex', "0")
//             const logoStyle = company.logo ? `background-image: url('${company.logo}'); background-size: cover` : "";
//             findedCompany.innerHTML = `
//             <div class="clients-map__finded-company-logo" style="${logoStyle}"></div>
//             <div class="clients-map__finded-company-info">
//                 <h4 class="clients-map__finded-company-name">${company.name}</h4>
//                 <div class="clients-map__finded-company-address">${company.address.replace('Россия, ', '')}</div>
//             </div>
//             `
//             findedCompany.addEventListener('click', () => {
//                 map.setLocation({
//                     center: findedCompany.getAttribute('data-coordinates').split(','),
//                     zoom: map.zoom < 15 ? 15 : map.zoom,
//                     duration: "500",
//                 })
//             })
//             node.querySelector('.clients-map__search-suggest').appendChild(findedCompany);

//         });
//     })
// }
if (!window.localStorage.getItem('acceptCookies')) {
    pushNotification({
        text: 'Сайт использует cookies',
        closeAction: () => {
            window.localStorage.setItem('acceptCookies', true)
        },
    })
}
Array.from(document.querySelectorAll('.example')).forEach(example => {
    const example__htmlSrc = example.querySelector('.example__html-src'),
          example__block = example.querySelector('.example__block'),
          example__htmlReset = example.querySelector('.example__html-reset');

    example__htmlSrc.value = example__block.innerHTML;

    const reset = example__block.innerHTML;

    example__htmlSrc.addEventListener('input', () => {
        example__block.innerHTML = example__htmlSrc.value;
    })

    example__htmlReset.addEventListener('click', () => {
        example__block.innerHTML = reset;
        example__htmlSrc.value = reset;
    })
})
Array.from(document.querySelectorAll('.filterable-group'))
.forEach(filterableGroup => {
    
  Array.from(filterableGroup.querySelectorAll('[data-filter]')).forEach(item =>{

    
  item.addEventListener('change', () => {
    const filterName = item.getAttribute('data-filter')
    
    Array.from(filterableGroup.querySelectorAll(`[${filterName}]`)).forEach(filteredItem => {

       if(item.value == "*" || filteredItem.getAttribute(`${filterName}`) == item.value) {
        return filteredItem.classList.remove(`hidden_by_filter_${filterName}`)
        
      } 
        filteredItem.classList.add(`hidden_by_filter_${filterName}`)
      
    })
  })
})
})

Array.from(document.querySelectorAll('.fullscreen-gallery')).forEach(fullscreenGallery => {
    const fullscreenGallery__close = fullscreenGallery.querySelector('.fullscreen-gallery__close'),
        fullscreenGallery__items = fullscreenGallery.querySelectorAll('.fullscreen-gallery__item');

    const showPreviev = () => {
        const previewElement = document
            .querySelectorAll(`
            [data-fullscreen-gallery="${fullscreenGallery
                    .getAttribute('id')
                }"]
            `)[Math.round(fullscreenGallery.scrollLeft / fullscreenGallery.offsetWidth)];
        if (!previewElement) return;



        setTimeout(() => {
            previewElement.focus({ focusVisible: true })
        }, 1)


    }

    fullscreenGallery.addEventListener('cancel', showPreviev)
    
    fullscreenGallery__close.addEventListener('click', () => {
        showPreviev()
        fullscreenGallery.close()
    })

    Array
        .from(fullscreenGallery__items)
        .forEach(fullscreenGallery__item => {
            fullscreenGallery__item.addEventListener('click', () => {
                showPreviev()
                fullscreenGallery.close()
            })

            fullscreenGallery__item.querySelector('.fullscreen-gallery__item > *').addEventListener('click', e => {
                e.stopPropagation();
            })
        })



})


Array.from(document.querySelectorAll('.fullscreen-gallery')).forEach(fullscreenGallery => {
    const left = fullscreenGallery.querySelector('.fullscreen-gallery__left'),
        right = fullscreenGallery.querySelector('.fullscreen-gallery__right');

    left.addEventListener('click', () => {
        fullscreenGallery.scrollTo({
            left: fullscreenGallery.scrollLeft - fullscreenGallery.offsetWidth,
            // behavior: "smooth",
        });
    })

    right.addEventListener('click', () => {
        fullscreenGallery.scrollTo({
            left: fullscreenGallery.scrollLeft + fullscreenGallery.offsetWidth,
            // behavior: "smooth",
        });
    })

    fullscreenGallery.addEventListener('keydown', e => {
        if (e.code === 'ArrowRight') right.click();
        if (e.code === 'ArrowLeft') left.click();
    })

    const checkLeftArrow = () => {

        if (fullscreenGallery.scrollLeft + fullscreenGallery.offsetLeft <= 1) {
            left.classList.add('fullscreen-gallery__left_hide');
            return
        }

        left.classList.remove('fullscreen-gallery__left_hide')
    }

    const checkRightArrow = () => {

        if (fullscreenGallery.scrollWidth - fullscreenGallery.scrollLeft - fullscreenGallery.offsetWidth + fullscreenGallery.offsetLeft <= 1) {
            right.classList.add('fullscreen-gallery__right_hide');
            return
        }

        right.classList.remove('fullscreen-gallery__right_hide')
    }

    const checkControls = () => {
        checkLeftArrow();
        checkRightArrow()
    }

    window.addEventListener('DOMContentLoaded', checkControls)
    fullscreenGallery.addEventListener('scroll', checkControls)


    const id = fullscreenGallery.getAttribute('id');
    const triggersList = document.querySelectorAll(`[data-fullscreen-gallery="${id}"]`);
    Array
        .from(triggersList)
        .forEach((trigger, key) => {
            trigger.addEventListener('click', () => {
                fullscreenGallery.showModal()
                fullscreenGallery.scrollTo({
                    left: fullscreenGallery.offsetWidth * key,
                });
                checkControls();
            })
        })

})

Array.from(document.querySelectorAll('.fullscreen-slider')).forEach(fullscreenSlider => {
    const left = fullscreenSlider.querySelector('.fullscreen-slider__left'),
        right = fullscreenSlider.querySelector('.fullscreen-slider__right'),
        content = fullscreenSlider.querySelector('.fullscreen-slider__content');


    const checkLeftArrow = () => {

        if (content.scrollLeft + content.offsetLeft <= 1) {
            left.classList.add('fullscreen-slider__left_hide');
            return
        }

        left.classList.remove('fullscreen-slider__left_hide')
    }

    const checkRightArrow = () => {
        console.log(content.scrollWidth - content.scrollLeft - content.offsetWidth + content.offsetLeft);

        if (content.scrollWidth - content.scrollLeft - content.offsetWidth + content.offsetLeft <= 1) {
            right.classList.add('fullscreen-slider__right_hide');
            return
        }

        right.classList.remove('fullscreen-slider__right_hide')
    }

    const checkControls = () => {
        checkLeftArrow();
        checkRightArrow()
    }

    window.addEventListener('DOMContentLoaded', checkControls)
    content.addEventListener('scroll', checkControls)

    left.addEventListener('click', () => {
        content.scrollTo({
            top: 0,
            left: content.scrollLeft - content.offsetWidth,
            behavior: "smooth",
        });
    })

    right.addEventListener('click', () => {
        content.scrollTo({
            top: 0,
            left: content.scrollLeft + content.offsetWidth,
            behavior: "smooth",
        });
    })


    fullscreenSlider.addEventListener('keydown', e => {
        if (e.code === 'ArrowRight') right.click();
        if (e.code === 'ArrowLeft') left.click();
    })
})

Array.from(document.querySelectorAll('.header')).forEach(header => {
    document.addEventListener('scroll', () => {
        if (header.getBoundingClientRect().y <= -20) {
            header.classList.add('header_sticked')
        } else {
            header.classList.remove('header_sticked')
        }
    })
})
Array.from(document.querySelectorAll('.image-slider')).forEach(imageSlider => {
    const   left = imageSlider.querySelector('.image-slider__left'),
            right = imageSlider.querySelector('.image-slider__right'),
            content = imageSlider.querySelector('.image-slider__content');

    const checkControls = () => {
        if (content.scrollLeft <= 0) {
            left.classList.add('image-slider__left_hide')
        } else {
            left.classList.remove('image-slider__left_hide')
        }

        if (content.offsetWidth + content.scrollLeft >= content.scrollWidth - 1) {
            right.classList.add('image-slider__right_hide')
        } else {
            right.classList.remove('image-slider__right_hide')
        }

    }

    window.addEventListener('load', checkControls)

    
    content.addEventListener('scroll', checkControls)
    content.addEventListener('focus', () => {
        console.log('focus');
        setTimeout(checkControls, 50)
        
    })
    

    left.addEventListener('click', () => {
        content.scrollTo({
            top: 0,
            left: content.scrollLeft - content.offsetWidth,
            // behavior: "smooth",
          });
    })

    right.addEventListener('click', () => {
        content.scrollTo({
            top: 0,
            left: content.scrollLeft + content.offsetWidth,
            // behavior: "smooth",
          });
    })
})
const showModal = modalId => {
    const modal = document.querySelector(`#${modalId}`);
    modal.showModal();
}

Array.from(document.querySelectorAll('[data-modal]')).forEach(modalTrigger => {
    modalTrigger.addEventListener('click', () => { showModal(modalTrigger.getAttribute('data-modal')) })
})

Array.from(document.querySelectorAll('.modal')).forEach(modal => {
    const modal__close = modal.querySelector('.modal__close'),
        modal__scroller = modal.querySelector('.modal__scroller'),
        modal__content = modal.querySelector('.modal__content');


    modal__close.addEventListener('click', () => { modal.close() })
    modal__scroller.addEventListener('click', () => { modal.close() })

    modal__content.addEventListener('click', e => {
        e.stopPropagation();
    })

})
Array.from(document.querySelectorAll(".slider-new")).forEach((slider) => {

  slider.style.setProperty('--__duration', slider.getAttribute('data-duration') + 'ms');

  const teasers = Array.from(slider.querySelectorAll(".slider-new__teaser")),
    contents = Array.from(slider.querySelectorAll(".slider-new__content"));

  const itemsNum = teasers.length;
  slider.style.gridTemplateColumns = `repeat(${itemsNum}, 1fr)`;

  let currentSlide = 0;
  
  const sliderChange = (num) => {
    contents.forEach((content) => {
      content.classList.remove("slider-new__content_current");
    });
    contents[num].classList.add("slider-new__content_current");
  };


  sliderChange(currentSlide);

  let timerID

  const play = () => {
    slider.classList.remove('slider-new_paused')
    timerID = setInterval(() => {
      currentSlide = currentSlide < teasers.length - 1 ? currentSlide + 1 : 0;
      sliderChange(currentSlide);
    }, slider.getAttribute('data-duration'))
  }

  const pause = () => {
    slider.classList.add('slider-new_paused')
    clearInterval(timerID)
  }

  play()

  teasers.forEach((teaser, num) => {


    teaser.addEventListener("click", () => {
      pause()
      sliderChange(num);
      currentSlide = num;
      setTimeout(play, slider.getAttribute('data-pause'))
    });

  });
});


Array.from(document.querySelectorAll('.slider')).forEach(slider => {
    const time = parseFloat(slider.getAttribute('data-time')),
            pause = parseFloat(slider.getAttribute('data-pause'));
    
    const items = Array.from(slider.querySelectorAll('.slider__content > *')),
            teasers = Array.from(slider.querySelectorAll('.slider__teaser'));
    
            teasers.forEach((teaser, key) => {
                teaser.querySelector('.slider__teaser-bar').style.animationDuration = `${time}s`;
        
            });

    let activeNumber = 0, timerPlay, timerPause;

    const sliderPlay = () => {
        items.forEach(item => item.classList.remove('slider__item_active'));
        teasers.forEach(teaser => teaser.classList.remove('slider__teaser_active'));
        teasers.forEach(teaser => teaser.querySelector('.slider__teaser-bg').classList.remove('rounded-s'));

        items[activeNumber].classList.add('slider__item_active');
        teasers[activeNumber] && teasers[activeNumber].classList.add('slider__teaser_active');
        teasers[activeNumber] && teasers[activeNumber].querySelector('.slider__teaser-bg').classList.add('rounded-s');

        timerPlay = setTimeout(() => {
            activeNumber = (activeNumber + 1) % items.length;
            sliderPlay();
        }, time * 1000)
    };

    const sliderPause = () => {
        slider.classList.add('slider_pause');
        clearTimeout(timerPlay);
        clearTimeout(timerPause);
        timerPause = setTimeout(() => {
            slider.classList.remove('slider_pause');
            sliderPlay();   
        }, pause * 1000);
    }

    slider.addEventListener('click', sliderPause);

    teasers.forEach((teaser, key) => teaser.addEventListener('click', () => {
        activeNumber = key;

        items.forEach(item => item.classList.remove('slider__item_active'));
        teasers.forEach(teaser => teaser.classList.remove('slider__teaser_active'));
        teasers.forEach(teaser => teaser.querySelector('.slider__teaser-bg').classList.remove('rounded-s'));

        items[activeNumber].classList.add('slider__item_active');
        teasers[activeNumber] && teasers[activeNumber].classList.add('slider__teaser_active');
        teasers[activeNumber] && teasers[activeNumber].querySelector('.slider__teaser-bg').classList.add('rounded-s');

        sliderPause();
    }))

    sliderPlay();

})
document.querySelector('#products-tab, #services-tab, #photo-tab, #reviews-tab').checked = true
Array.from(document.querySelectorAll('.partner-company__banner'))
.forEach(banner => {
    const close = banner.querySelector('.partner-company__banner-close');

    close.addEventListener('click', () => {banner.style.display = 'none'})
})




// document.addEventListener('keydown', e => {
//     if (e.code != 'Space' && e.code != 'Enter') return;
//     if (!Array.from(document.activeElement.classList).includes('button_abstract')) return;
//     document.activeElement.click()
// })
Array.from(document.querySelectorAll('.check-button')).forEach(checkButton => {

    const checkButton__checkbox = checkButton.querySelector('.check-button__checkbox');

        checkButton.addEventListener('click', () => {
            checkButton__checkbox.click();
        })

    // const updateCounter = () => {
    //     if (!checkButton.getAttribute('data-counter')) return;
    //     checkButton.querySelector('.button').setAttribute('data-counter', checkButton.getAttribute('data-counter'))
    // }

    // updateCounter()

    // checkButton.addEventListener('change', updateCounter)
})
Array.from(document.querySelectorAll('.input')).forEach(item => {
    const input = item.querySelector('.input__input');
    const clear = item.querySelector('.input__clear');
    
    input.b = {};
    
    input.b.enable = () => {
      item.classList.remove('input_disabled');
      input.disabled = false;
    }
    
    input.b.disable = () => {
      item.classList.add('input_disabled');
      input.disabled = true;
    }
    
  //  clear.onclick = () => {input.value = ''};
    
    const validateTel = () => {
      
      
      input.value = '+7' + input.value
        .replace('+7', '')
        .replace(/\D/g, '')
        .substring(0,10);
      
      input.value =(
        input.value.slice(0, 8) + ' ' +
        input.value.slice(8, 10) + ' ' +
        input.value.slice(10))
      .trim()
      .replaceAll(' ', '-')
      
      input.value =(
        input.value.slice(0, 2) + ' ' +
        input.value.slice(2, 5) + ' ' +
        input.value.slice(5))
      .trim()
      
    }
    if (input.getAttribute('type') == "tel") {
      validateTel()
      input.addEventListener('input', () => validateTel())
    }
    
    const validateEmail = () => {
      input.b.valid = input.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      
    };
    
    if (input.getAttribute('type') == "email") {
      validateEmail()
      input.addEventListener('input', () => validateEmail())
    }
  })