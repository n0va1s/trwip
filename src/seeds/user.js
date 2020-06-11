import User from '../models/user'
import bcrypt from 'bcrypt'
import config from '../config'

const SALT_ROUNDS = config.SALT_ROUNDS

export default {
  model: User,
  items: [
    {
      id: 'gabriel',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'gabrielsclimaco@gmail.com',
      gender: 'male',
      name: 'Gabriel',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    },
    {
      id: 'matheus',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'matheus.godinho@outlook.com',
      gender: 'male',
      name: 'Matheus',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    },
    {
      id: 'henrique',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'hlopes13@hotmail.com',
      gender: 'male',
      name: 'Henrique',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    },
    {
      id: 'carlos',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'carlos@gmail.com',
      gender: 'male',
      name: 'Carlos',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    },
    {
      id: 'icaro',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'icaro@gmail.com',
      gender: 'male',
      name: 'Ícaro',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    },
    {
      id: 'phelipe',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'phelipe@gmail.com',
      gender: 'male',
      name: 'Phelipe',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    },
    {
      id: 'beatriz',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'f.beatriz.snts@gmail.com',
      gender: 'female',
      name: 'Beatriz',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    },
    {
      id: 'paula',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'paulagurgel2@gmail.com',
      gender: 'female',
      name: 'Paula',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    },
    {
      id: 'maria',
      country: 'brasil',
      cpf: '055.728.891-64',
      email: 'mariaclara.ac@hotmail.com',
      gender: 'female',
      name: 'Maria',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      pathToProfilePic: ''
    }
  ]
}
