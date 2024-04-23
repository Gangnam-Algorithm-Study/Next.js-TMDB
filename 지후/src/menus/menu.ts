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