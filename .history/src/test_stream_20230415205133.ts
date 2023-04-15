import { stream } from './Stream'


const s = stream()

s.on('data', (chunk, next) => {
  console.log('infinite', chunk)
  next()
})

s.on('data', (chunk) => {
  console.log('once', chunk)
})

s.on('close', () => {
  console.log('close 1')
})

s.on('close', () => {
  console.log('close 2')
})

s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 2)
s.dispatch('close')
s.dispatch('data', 2)
