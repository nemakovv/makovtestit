const videos = [
    {
        id: '1',
        thumbnail: "https://i.ytimg.com/vi/CrZlect0-Uo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCb1JX3R6UjBwcaE3rpJISCXshCqA",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Кто Найдёт Больше Дорогих Вещей в Дубае! (Бустер, Сатир, ФрамеТаме..',
        channel: 'ExileShow'
    },
    {
        id: '2',
        thumbnail: "https://i.ytimg.com/vi/AvYx2WhLhYE/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCjJVPpMDLVe67biMOrlgCvanozog",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: '6 Комнат! Обмани - Получи 500.000! (Бустер, ФрамеТамер, Кокошка..',
        channel: 'ExileShow'
    },
    {
        id: '3',
        thumbnail: "https://i.ytimg.com/vi/Rpz8cl6vTOI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBwq2vvPDSsAsONELJ1LTO8ysJDZQ",
        avatar: 'https://yt3.googleusercontent.com/cvCEUTMuNTkbkiVc4XBBscJRBNORnmulkzSdPXAbIfx5HbyG6FWxjY2EBQPZJuH5_0vEkxAB=s160-c-k-c0x00ffffff-no-rj',
        title: 'nowkie - Дисс на Эксайла (feat. DK, Palmdropov) 3 минуты 33 секунды',
        channel: 'nowkie'
    },
    {
        id: '4',
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Эпичное Шоу: Выживание в Небольшом Челлендже',
        channel: 'ExileShow'
    },
    {
        id: '5',
        thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Невероятные Приключения в Новом Формате',
        channel: 'ExileShow'
    },
    {
        id: '6',
        thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/cvCEUTMuNTkbkiVc4XBBscJRBNORnmulkzSdPXAbIfx5HbyG6FWxjY2EBQPZJuH5_0vEkxAB=s160-c-k-c0x00ffffff-no-rj',
        title: 'Музыкальный Трек: Новый Стиль',
        channel: 'nowkie'
    },
    {
        id: '7',
        thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Большой Розыгрыш Друзей',
        channel: 'ExileShow'
    },
    {
        id: '8',
        thumbnail: "https://i.ytimg.com/vi/L_jWHppIx5E/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/cvCEUTMuNTkbkiVc4XBBscJRBNORnmulkzSdPXAbIfx5HbyG6FWxjY2EBQPZJuH5_0vEkxAB=s160-c-k-c0x00ffffff-no-rj',
        title: 'Фристайл: Новые Горизонты',
        channel: 'nowkie'
    },
    {
        id: '9',
        thumbnail: "https://i.ytimg.com/vi/tAGnKpE4NCI/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Испытание на Прочность: Кто Победит?',
        channel: 'ExileShow'
    },
    {
        id: '10',
        thumbnail: "https://i.ytimg.com/vi/hT_nvWreIhg/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Секретные Локации: Исследуем Вместе',
        channel: 'ExileShow'
    },
    {
        id: '11',
        thumbnail: "https://i.ytimg.com/vi/YQHsXMglC9A/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/cvCEUTMuNTkbkiVc4XBBscJRBNORnmulkzSdPXAbIfx5HbyG6FWxjY2EBQPZJuH5_0vEkxAB=s160-c-k-c0x00ffffff-no-rj',
        title: 'Коллаборация: Неожиданный Гость',
        channel: 'nowkie'
    },
    {
        id: '12',
        thumbnail: "https://i.ytimg.com/vi/fJ9rUzIMbZQ/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Челлендж с Препятствиями',
        channel: 'ExileShow'
    },
    {
        id: '13',
        thumbnail: "https://i.ytimg.com/vi/QH2-TGUlwu4/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Ночное Приключение в Городе',
        channel: 'ExileShow'
    },
    {
        id: '14',
        thumbnail: "https://i.ytimg.com/vi/nfWlot6h_JM/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/cvCEUTMuNTkbkiVc4XBBscJRBNORnmulkzSdPXAbIfx5HbyG6FWxjY2EBQPZJuH5_0vEkxAB=s160-c-k-c0x00ffffff-no-rj',
        title: 'Шок Контент: Реакция Зрителей',
        channel: 'nowkie'
    },
    {
        id: '15',
        thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Финал Сезона: Невероятная Развязка',
        channel: 'ExileShow'
    },
    {
        id: '16',
        thumbnail: "https://i.ytimg.com/vi/OPf0YbXqDm0/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Специальный Выпуск: Гости из Прошлого',
        channel: 'ExileShow'
    },
    {
        id: '17',
        thumbnail: "https://i.ytimg.com/vi/M7FIvfx5J10/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/cvCEUTMuNTkbkiVc4XBBscJRBNORnmulkzSdPXAbIfx5HbyG6FWxjY2EBQPZJuH5_0vEkxAB=s160-c-k-c0x00ffffff-no-rj',
        title: 'Акустическая Версия Хитов',
        channel: 'nowkie'
    },
    {
        id: '18',
        thumbnail: "https://i.ytimg.com/vi/60ItHLz5WEA/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Мини-Игры на Выживание',
        channel: 'ExileShow'
    },
    {
        id: '19',
        thumbnail: "https://i.ytimg.com/vi/k3Vfj-e1Ma4/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/MW4JvUKyyL_3Gh9gsnlMdNGBjjmFlV4wITdlpM3bt4uGPpTdyAK3bAyJayWMZoUPqz45qFpqp2o=s160-c-k-c0x00ffffff-no-rj',
        title: 'Пранки Над Друзьями: Топ Моментов',
        channel: 'ExileShow'
    },
    {
        id: '20',
        thumbnail: "https://i.ytimg.com/vi/7qFfFVSerQo/hq720.jpg",
        avatar: 'https://yt3.googleusercontent.com/cvCEUTMuNTkbkiVc4XBBscJRBNORnmulkzSdPXAbIfx5HbyG6FWxjY2EBQPZJuH5_0vEkxAB=s160-c-k-c0x00ffffff-no-rj',
        title: 'Бэкстейдж: Как Мы Это Сняли',
        channel: 'nowkie'
    }
]

export default videos
