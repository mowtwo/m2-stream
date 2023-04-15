import './style.css'

const test_modules = import.meta.glob('./test_*.ts', {
  eager: true
})

for (const moduleName of Object.keys(test_modules)) {
  console.log('run test:', moduleName)
  const testFn = Reflect.get(Reflect.get(test_modules, moduleName) as any, 'test') as () => void | Promise<void>
  await testFn()
}
