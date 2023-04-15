import './style.css'

type StreamEvent =
  | 'data'
  | 'close'

type StreamEventHandler =
  | ['data', (chunk: any, next: () => void) => void]
  | ['close', () => void]

function stream() {

  const onceQueue = Array<StreamEventHandler>()

  function dispatch(event: 'close'): void
  function dispatch(event: 'data', chunk: any): void
  function dispatch(event: StreamEvent, ...args: any[]): void {

  }


  return {
    dispatch
  }
}
