export const changeIconSite = (iconUrlPublic: string) => {
  const icon = document.querySelector("link[rel*='icon']")
  if (icon && 'href' in icon) {
    icon.href = iconUrlPublic
  }
}
