/**
 * Observer
 * @module Observer
 */
export default class Observer {
	/**
	 * Set default variables as properties
	 * @constructor
	 * @param {Object} options Related options
	 * @param {(HTMLElement|HTMLElement[])} options.elements HTML element/s
	 * @param {Callback} options.onIntersection Callback function when the element is intersecting
	 * @param {String} options.rootMargin Root margin to set on the IntersectionObserver
	 * @param {Number} options.threshold Threshod to set on the IntersectionObserver
	 * @param {Boolean} options.once Should the observer stop observing after intersection?
	 */
	constructor({
		elements = null,
		onIntersection = () => {},
		rootMargin = `0px 0px ${window.innerHeight}px 0px`,
		threshold = 0.0,
		once = true
	} = {}) {
		this.elements = elements
		this.onIntersection = onIntersection
		this.once = once

		this.observer = new IntersectionObserver(this.callbackOnIntersection.bind(this), {
			rootMargin,
			threshold
		})
	}

	/**
	 * Observe elements
	 */
	observe() {
		if (this.elements) {
			Array.isArray(this.elements)
				? this.elements.forEach((element) => this.observer.observe(element))
				: this.observer.observe(this.elements)
		} else {
			console.warn('Error: Observer::observe: No element to observe')
		}
	}

	/**
	 * Unobserve an element
	 * @param {HTMLElement} element Element to unobserve
	 */
	unobserve(element) {
		this.observer.unobserve(element)
	}

	/**
	 * Callback function: onIntersection actions
	 * @param {Array} entries List of HTML elements being watched
	 */
	callbackOnIntersection(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				this.once && this.unobserve(entry.target)
				this.onIntersection(entry)
			}
		})
	}
}
