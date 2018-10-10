export const addEntity = (entity) => new CustomEvent('addentity', {
	bubbles: true,
	detail: { entity }
})

export const leftClick = detail => new CustomEvent('leftclick', {
	bubbles: false,
	detail
})

export const rightClick = detail => new CustomEvent('rightclick', {
	bubbles: false,
	detail
})