import { filterData } from '@/utils/customFilter'

export const flatFn = (data) => {
  const result = data?.pages.flatMap((page) => [...page.results])
  console.log(data)
  return result
}

export const selectFn = (original_data, filters) => {
  const array = flatFn(original_data)
  console.log(typeof original_data)
  const data = filterData(array, filters)
  console.log(array, data)
  return data
}
