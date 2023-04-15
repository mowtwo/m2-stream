import './style.css'

type StreamEvent =
  | 'data'
  | 'close'

function stream() {
  interface EventHandler {
    (): void
    (chunk: any, next: () => void): void
  }

  const eventMap = new Map<string, Set<EventHandler>>()

  function dispatch(event: 'close'): void
  function dispatch(event: 'data', chunk: any): void
  function dispatch(event: StreamEvent, ...args: any[]): void {

  }


  return {
    dispatch
  }
}
