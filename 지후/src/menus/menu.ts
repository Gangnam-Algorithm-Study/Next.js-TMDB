import { FilterMenuTypes } from "@/types/utilsType"

export const navMenu = [
    {
        title: '영화',
        sub_menu: [
            {
                title: '인기',
                path: '/movie'
            },
            {
                title: '현재 상영중',
                path: '/movie/now-playing'
            },
            {
                title: '개봉 예정',
                path: '/movie/upcoming'
            },
            {
                title: '높은 평점',
                path: '/movie/top-rated'
            }
        ]
    },
    {
        title: 'TV 프로그램',
        sub_menu: [
            {
                title: '인기',
                path: '/tv'
            },
            {
                title: '오늘 방영',
                path: '/tv/airing-today'
            },
            {
                title: 'TV 방영 중',
                path: '/tv/on-the-air'
            },
            {
                title: '높은 평점',
                path: '/tv/top-rated'
            }
        ]
    },
    {
        title: '인물',
        sub_menu: [
            {
                title: '인기 인물',
                path: '/person'
            },
        ]
    },
    {
        title: 'More',
        sub_menu: [
            {
                title: '토론 내역',
                path: '/discuss'
            },
            {
                title: '기여 랭킹',
                path: '/leaderboard'
            },
            {
                title: '지원',
                path: '/talk'
            }
        ]
    }
]

export const filterMenu: FilterMenuTypes[] = [
    {
        title: '정렬',
        type: 'sort'
    },
    {
        title: 'Where To Watch',
        type: 'whereWatch'
    },
    {
        title: '필터',
        type: 'filter'
    }
]

// sortFilter
export const sortResults = [
    {
        title: '인기도 내림차순',
        type: 'popularity.desc' //default
    },
    {
        title: '인기도 오름차순',
        type: 'popularity.asc'
    },
    {
        title: '평점 내림차순',
        type: 'vote_average.desc'
    },
    {
        title: '평점 오름차순',
        type: 'vote_average.asc'
    },
    {
        title: '상영일 내림차순',
        type: 'primary_release_date.desc'
    },
    {
        title: '상영일 오름차순',
        type: 'primary_release_date.asc'
    },
    {
        title: '제목 내림차순',
        type: 'title.desc'
    },
    {
        title: '제목 오름차순',
        type: 'title.asc'
    }
]

export const genreFilter = [
    {
        type: 28,
        title: "액션"
    },
    {
        type: 12,
        title: "모험"
    },
    {
        type: 16,
        title: "애니메이션"
    },
    {
        type: 35,
        title: "코미디"
    },
    {
        type: 80,
        title: "범죄"
    },
    {
        type: 99,
        title: "다큐멘터리"
    },
    {
        type: 18,
        title: "드라마"
    },
    {
        type: 10751,
        title: "가족"
    },
    {
        type: 14,
        title: "판타지"
    },
    {
        type: 36,
        title: "역사"
    },
    {
        type: 27,
        title: "공포"
    },
    {
        type: 10402,
        title: "음악"
    },
    {
        type: 9648,
        title: "미스터리"
    },
    {
        type: 10749,
        title: "로맨스"
    },
    {
        type: 878,
        title: "SF"
    },
    {
        type: 10770,
        title: "TV 영화"
    },
    {
        type: 53,
        title: "스릴러"
    },
    {
        type: 10752,
        title: "전쟁"
    },
    {
        type: 37,
        title: "서부"
    }
]