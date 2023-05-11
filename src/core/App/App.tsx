import { Main } from '../../screens'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from './styled'
import { Weather } from '../../screens/Weather/Weather'

export const App = () => {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/weather/:id' element={<Weather />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Container>
  )
}
