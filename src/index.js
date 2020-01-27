/**
 * @license MIT
 * @name LazyObserver
 * @version 1.0.1
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: Observer module with Intersection Observer to execute a function when the element is intersecting
 * {@link https://github.com/yoriiis/lazy-observer}
 * @copyright 2020 Joris DANIEL
 **/

module.exports = class Observer {
	/**
	 * Instanciate the constructor
	 *
	 * @constructor
	 *
	 * @param {Object} options Configuration
	 */
	constructor (options) {
		// Merge options with default options
		this.options = Object.assign(
			{
				element: null,
				once: true,
				onIntersection: null,
				rootMargin: `0px 0px ${window.innerHeight}px 0px`
			},
			options || {}
		);

		this.parsed = false;

		// Instanciate the Interection Observer
		this.observer = new IntersectionObserver(this.callbackIntersection.bind(this), {
			rootMargin: this.options.rootMargin,
			threshold: 0.0
		});
	}

	/**
	 * Observe the element
	 */
	observe () {
		this.observer.observe(this.options.element);
	}

	/**
	 * Callback function called when the element is intersecting
	 * and respected the rootMargin option
	 *
	 * @param {Array} entries List of element entries with observer parameters
	 * @param {Object} observer Observer instance
	 */
	callbackIntersection (entries, observer) {
		entries.forEach(entry => {
			// Check if the element is intersecting and is not parsed yet
			// Callback function is called only once
			if (entry.isIntersecting && !this.parsed) {
				if (this.options.once) {
					this.parsed = true;
				}

				// Check the validity of the callback function from options
				if (typeof this.options.onIntersection === 'function') {
					this.options.onIntersection();
				}
			}
		});
	}
};
