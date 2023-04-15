import './style.css'

const test_modules = import.meta.glob('./test_*.ts', {
  eager: true
})

for (const moduleName of Object.keys(test_modules)) {
  console.log(moduleName)
}
