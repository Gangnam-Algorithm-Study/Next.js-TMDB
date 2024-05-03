import { getDetail, prefetchDetail } from '@/apis/detail'
import { queryClient } from '@/pages/_app'

import { Movie } from '@/typings'

import { dehydrate, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'

interface DetailProps {
  detail: any
  id: Movie['id']
}
const Detail = ({ id }: DetailProps) => {
  const { data } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id),
    staleTime: 1000000,
  })
  console.log(data)

  return <div>{id}</div>
}

export default Detail

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query

    await prefetchDetail(id as unknown as Movie['id'])
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        id: id,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}
