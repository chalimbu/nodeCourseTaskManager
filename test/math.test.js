const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math.js')

test('Should total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
        // if (total !== 13) {
        //     throw new Error('total tip should be 13. Got' + total)
        // }
})

test('Should total with 20% tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('Should convert 32 F to 0 C', () => {
    const celcius = fahrenheitToCelsius(32)
    expect(celcius).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const farenheit = celsiusToFahrenheit(0)
    expect(farenheit).toBe(32)
})

// test('Assync test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)

// })

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async() => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})