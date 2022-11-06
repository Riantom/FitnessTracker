

// components
import {Helmet} from 'react-helmet';
import Tabnav from '../components/Tabnav'

const Home = () => {
  return (
    <div className="page">
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
      <Tabnav/>
    </div>
  )
}

export default Home
