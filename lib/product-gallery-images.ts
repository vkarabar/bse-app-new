export const GARAGE_DOOR_IMAGE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export function garageDoorImageSrc(id: number): string {
  return `/vrati/vrata${id}.jpg`;
}

export const PERGOLA_GALLERY = [
  { id: 1, src: '/pergoli/pg1.png' },
  { id: 2, src: '/pergoli/pg2.jpg' },
  { id: 3, src: '/pergoli/pg3.jpg' },
  { id: 4, src: '/pergoli/pg4.jpg' },
  { id: 5, src: '/pergoli/pg5.jpg' },
] as const;

export function pergolaImageSrc(id: number): string {
  return (
    PERGOLA_GALLERY.find((item) => item.id === id)?.src ??
    `/pergoli/pg${id}.jpg`
  );
}

/** Homepage hero carousel */
export const HOME_HERO_DOOR_IDS = [1, 2, 3, 4, 6, 8, 10] as const;

/** Homepage garage doors offering slider */
export const HOME_VRATI_SLIDER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/** Homepage project gallery */
export const HOME_GARAGE_GALLERY_IDS = [1, 2, 4, 6, 7, 8, 10, 3] as const;

/** Garage doors product page slider */
export const VRATI_PAGE_SLIDER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export function toGarageDoorSliderItems(
  ids: readonly number[],
  title: (number: number) => string,
) {
  return ids.map((id, index) => ({
    id: index + 1,
    title: title(id),
    imageSrc: garageDoorImageSrc(id),
  }));
}

export function toPergolaSliderItems(title: (id: number) => string) {
  return PERGOLA_GALLERY.map((item) => ({
    id: item.id,
    title: title(item.id),
    imageSrc: item.src,
  }));
}
