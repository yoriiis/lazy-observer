// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jest } from '@jest/globals'

const Observer = (await import('../src/index')).default
let mockElement
let observer

const callbackFn = () => {
	/** Empty code */
}
const getInstance = () => {
	return new Observer({
		elements: mockElement,
		onIntersection: callbackFn,
		threshold: 1.0,
		once: false
	})
}

beforeEach(() => {
	Object.defineProperty(window, 'IntersectionObserver', {
		writable: true,
		value: jest.fn().mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn()
		}))
	})

	document.body.innerHTML = `
		<div class="item"></div>
		<div class="item"></div>
	`

	mockElement = document.querySelector('.item')
	observer = getInstance()
})

describe('Observer', () => {
	describe('constructor', () => {
		it('should throw an error if no elements is provived', () => {
			expect(() => new Observer()).toThrow(
				new Error('Observer :: The element supplied is not valid.')
			)
		})

		it('should set the module properties considering the parameters defined', () => {
			expect(observer.elements).toBe(mockElement)
			expect(observer.onIntersection).toEqual(callbackFn)
			expect(observer.once).toBe(false)
		})
	})

	describe('observe', () => {
		it('should observe a single element', () => {
			observer.observe()

			expect(observer.observer.observe).toHaveBeenCalledWith(observer.elements)
			expect(observer.observer.observe).toHaveBeenCalledTimes(1)
		})

		it('should observe a list of elements', () => {
			const customObserver = new Observer({
				elements: [...document.querySelectorAll('.item')],
				onLeaving: callbackFn,
				threshold: 1.0,
				once: true
			})

			customObserver.observe()

			expect(customObserver.observer.observe).toHaveBeenNthCalledWith(1, customObserver.elements[0])
			expect(customObserver.observer.observe).toHaveBeenNthCalledWith(2, customObserver.elements[1])
			expect(customObserver.observer.observe).toHaveBeenCalledTimes(2)
		})
	})

	describe('unobserve', () => {
		it('should unobserve the element', () => {
			observer.unobserve(mockElement)

			expect(observer.observer.unobserve).toHaveBeenCalledWith(mockElement)
		})
	})

	describe('callbackOnIntersection', () => {
		beforeEach(() => {
			observer.unobserve = jest.fn()
			observer.onIntersection = jest.fn()
		})

		it('should call onIntersection function if entry is intersecting', () => {
			const entries = [{ isIntersecting: true }, { isIntersecting: true }]

			observer.callbackOnIntersection(entries)

			expect(observer.onIntersection).toHaveBeenCalledTimes(2)
			entries.forEach((entry) => {
				expect(observer.onIntersection).toHaveBeenCalledWith(entry)
				expect(observer.unobserve).not.toHaveBeenCalled()
			})
		})

		it('should unobserve after one intersection is once is true', () => {
			const entries = [{ target: mockElement, isIntersecting: true }]

			observer.once = true

			observer.callbackOnIntersection(entries)

			expect(observer.onIntersection).toHaveBeenCalledTimes(1)
			entries.forEach((entry) => {
				expect(observer.onIntersection).toHaveBeenCalledWith(entry)
				expect(observer.unobserve).toHaveBeenCalledWith(entry.target)
			})
		})

		it('should do nothing if entry is not intersecting', () => {
			const entries = [{ isIntersecting: false }]

			observer.callbackOnIntersection(entries)

			entries.forEach((entry) => {
				expect(entry.isIntersecting).toBe(false)
				expect(observer.onIntersection).not.toHaveBeenCalled()
				expect(observer.unobserve).not.toHaveBeenCalled()
			})
		})
	})
})
