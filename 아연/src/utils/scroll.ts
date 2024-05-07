const SCROLL_Y_Key = 'SCROLL_Y_KEY'

export const saveScrollY = () => {
  localStorage.setItem(SCROLL_Y_Key, window.scrollY.toString())
}
export const getScrollY = () => {
  return Number(localStorage.getItem(SCROLL_Y_Key))
}
export const setScrollY = () => {
  window.scrollTo({ top: getScrollY() })
  localStorage.removeItem(SCROLL_Y_Key)
}
