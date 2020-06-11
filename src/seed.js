import seeds from './seeds'

async function seed () {
  var promises = []

  try {
    seeds.map(s => {
      s.items.map(i => promises.push((new s.model(i)).save())) // eslint-disable-line new-cap
    })
    return Promise.all(promises)
  } catch (err) {
    console.log(err)
  }
}

async function drop () {
  for (var s of seeds) {
    try {
      console.log('Dropping ' + s.model.getTableName() + '...')
      await s.model.delete()
    } catch (error) {
      // console.log(error)
    }
  }
}

async function main () {
  if (process.argv[2] !== '--no-drop') {
    await drop()
  }
  await seed()
  process.exit(0)
}

main()
