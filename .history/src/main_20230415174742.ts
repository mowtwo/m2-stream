import './style.css'

type StreamEvent =
  | 'data'
  | 'close'


type StreamEventItem =
  | ['data', (chunk: any, next: () => void) => void]
  | ['close', () => void]

function stream() {

  const onceQueue = Array<StreamEventItem>()

  function dispatch(event: 'close'): void
  function dispatch(event: 'data', chunk: any): void
  function dispatch(event: StreamEvent, chunk?: any): void {
    let position = onceQueue.length
    while (position--) {
      const item = onceQueue.shift()
      if (item) {
        const [key, handler] = item
        if (key !== event) {
          onceQueue.push(item)
          continue
        }
        if (key === 'close') {
          handler.call(undefined)
        } else {
          handler.call(undefined, chunk!, () => {
            onceQueue.push(item)
          })
        }
      }
    }
  }

  function on(event: 'close', handler: () => void): void
  function on(event: 'data', handler: (chunk: any, next: () => void) => void): void
  function on(event: StreamEvent, handler: (...args: any[]) => void): void {
    onceQueue.push([event, handler])
  }


  return {
    dispatch,
    on
  }
}
